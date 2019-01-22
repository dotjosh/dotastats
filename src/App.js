import React, { Component } from 'react';
import { VictoryBar, VictoryPie, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

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
        height:"100%"
    },
    leftPanel: {
        flexBasis: "200px",
        overflowY: "scroll",
        height:"100%"
    },
    rightPanel: {
        flexGrow:"2",
        paddingLeft:"30px",
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
        marginBottom: "3px"
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

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            heroes: []
        };
        api.getHeroes()
            .then(json => 
                this.setState({
                    heroes: json.result
                })
            );
    }

    loadHero = (hero) =>{
        this.setState({
            isLoading: true,
            hero
        });
        api.getGuide(hero)
            .then(json =>
                this.setState({
                    results: json.result, 
                    isLoading: false
                })
            );
    };

    render() {
        return (
            <div style={style.container}>
                <div style={style.leftPanel}>
                    <ol>
                        {this.state.heroes.map(hero => (
                            <li key={hero.name} 
                                style={{...style.card, background: hero.image}}
                                onClick={() => this.loadHero(hero.name)}>
                                <span style={style.card_text}>{hero.name}</span>
                            </li>
                        ))}
                    </ol>
                </div>
                <div style={style.rightPanel}>
                    {this.state.isLoading 
                        ? <h3>{this.state.hero} (LOADING...)</h3>
                        : <h3>{this.state.hero}</h3>
                    }
                    {(!this.state.isLoading && this.state.hero)  && (
                        <VictoryChart height={300} width={700} labelComponent={<CustomLabel />}>
                            <VictoryBar 
                                        
                                data={this.state.results.slice(0, 10).map(item  => ({
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

                                labels={(d) => d.y}
                            />
                            <VictoryAxis tickLabelComponent ={<CustomLabel data={this.state.results}/>}/>
                            
                            <VictoryAxis 
                                         
                        />
                        </VictoryChart>
                    )}
                </div>
            </div>
        )
    }
}
class CustomLabel extends React.Component {
    render() {
        const { data, text, x, y } = this.props;
            console.log(this.props)
        let find = data.find(x => x.name === text);
        var img = find && find.image;
        return <image x={x-25} y={y-8} href={img} height="50px" width="50px"/>;
    }
}

export default App;
