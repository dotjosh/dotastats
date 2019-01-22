import React, { Component } from 'react';
import { VictoryBar, VictoryPie, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

import { PulseLoader } from 'react-spinners';

const api = {
    getHeroes: () => fetch("/.netlify/functions/heroes")
                    .then(resp => resp.json()),
    getGuide: hero => fetch(`/.netlify/functions/guides?hero=${hero}`)
                    .then(resp => resp.json())
};

const style = {
    container: {
        display: "flex",
        flexDirection: "row",
        height:"100%",
        background:"#EEE"
    },
    leftPanel: {
        flexBasis: "420px",
        overflowY: "scroll",
        height:"100%",
        background:"#333"
    },
    rightPanel: {
        flexGrow:"2",
        paddingLeft:"10px",
        paddingBottom:"90px"
    },
    rightList: {
      padding:"0"  
    },
    card: {
        width:"120px",
        cursor:"pointer",
        float:"left",
        height:"65px",
        color:"#FFF",
        verticalAlign:"bottom",
        position:"relative",
        border:"solid 7px white",
        listStyleType:"none",
        padding:"0"
    },
    card_text: {
        position:"absolute",
        bottom:"0",
        fontWeight:"bold",
        left:"3px",
        textShadow: "0px 0px 2px #0a0a0a",
        fontSize:"13px"
    },

    item: {
        padding:"0",
        listStyleType: "none",
        fontSize:"12px"
    },
    item_image: {
        width: "30px",
        height:"30px",
    }
};

const defaultState = {
    items: {
        results: [],
        isLoading: false
    },
    heroes: {
        results: [],
        isLoading: false
    },
    selectedHero: null
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    }
    
    componentDidMount(){
        this.loadHeroes();
    }

    render() {
        const { heroes, items, selectedHero } = this.state;
        return (
            <div style={style.container}>
                <div style={style.leftPanel}>
                    {heroes.isLoading && <h1 style={{textAlign:"center"}}><PulseLoader color="#FFF"/></h1>}
                    <ol style={{padding:"0", margin:"0"}}>
                        {heroes.results.map(hero => (
                            <li key={hero.name} 
                                style={{...style.card, background: hero.image, borderColor: hero.name === selectedHero ? "blue" : "#333"}}
                                onClick={() => this.loadGuide(hero.name)}>
                                <span style={style.card_text}>{hero.name}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div style={style.rightPanel}>
                    {items.isLoading 
                        ? <h1 style={{paddingLeft:"20px"}}>{selectedHero} <PulseLoader/></h1>
                        : <h1 style={{paddingLeft:"20px"}}>{selectedHero}</h1>
                    }
                    {(!items.isLoading && selectedHero)  && (
                        <VictoryChart height={300} width={700} labelComponent={<CustomLabel />}>
                            <VictoryBar 
                                        
                                data={items.results.slice(0, 10).map(item  => ({
                                    x: item.name, 
                                    y: item.count
                                }))}
                                style={{
                                    data: {
                                        fill: (d) => d.x === 3 ? "#000000" : "#c43a31",
                                        stroke: (d) => d.x === 3 ? "#000000" : "#c43a31",
                                        fillOpacity: 0.7,
                                        strokeWidth: 1,
                                        marginBottom:3
                                    },
                                    labels: {
                                        fontSize: 15,
                                        fill: (d) => d.x === 3 ? "#000000" : "#c43a31"
                                    }
                                }}

                                labels={(d) => Math.round((d.y/20)*100) + '%'}
                            />
                            <VictoryAxis tickLabelComponent={<CustomLabel data={items.results}/>}/>
                            
                            <VictoryAxis 
                                         
                        />
                        </VictoryChart>
                    )}
                </div>
            </div>
        )
    }
    
    loadGuide = (selectedHero) =>{
        this.setState({
            items: {
                results: [],
                isLoading: true,
            },
            selectedHero
        });
        api.getGuide(selectedHero)
            .then(json =>
                this.setState({
                    items: {
                        results: json.result,
                        isLoading: false
                    }
                })
            );
    };

    loadHeroes = () => {
        this.setState({
            heroes: {
                results: [],
                isLoading: true
            }
        });
        api.getHeroes()
            .then(json =>
                this.setState({
                    heroes: {
                        results: json.result,
                        isLoading: false
                    }
                })
            );
    };
}
class CustomLabel extends React.Component {
    render() {
        const { data, text, x, y } = this.props;
        let find = data.find(x => x.name === text);
        var img = find && find.image;
        return <image x={x-25} y={y-8} href={img} height="50px" width="50px"/>;
    }
}

export default App;
