import React, { Component } from 'react';
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
        background:"#1C242D"
    },
    leftPanel: {
        flexBasis: "420px",
        overflowY: "scroll",
        height:"100%"
    },
    rightPanel: {
        flexGrow:"2",
        paddingLeft:"30px",
        paddingBottom:"90px",
        overflowY:"scroll"
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
        const guideCount = 20;
        
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
                    <h1 style={{color:"#F3F3F3"}}>{selectedHero} {items.isLoading && <PulseLoader color={"#F3F3F3"}/>}</h1>
                    {(!items.isLoading && selectedHero)  && (
                        <article style={{background:"rgb(36, 47, 57)", maxWidth:"972px", padding:"6px 15px"}}>
                            
                            <h3 style={{letterSpacing:".3px", color:"#F3F3F3", fontWeight:"normal", fontSize:"15px"}}>FINAL ITEMS BASED ON TOP {guideCount} GUIDES</h3>
                            <table cellPadding="0" cellSpacing="0" style={{width:"auto"}}>
                                <thead>
                                    <tr>
                                        <th style={{color:"#FFF", textAlign:"left", fontSize:"13px", fontWeight:"bold", paddingBottom:"8px"}}>Item</th>
                                        <th/>
                                        <th style={{color:"#FFF", textAlign:"left", fontSize:"13px", fontWeight:"bold", paddingBottom:"8px"}}>Pick Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.results.map(item => 
                                        <tr>
                                            <td style={{paddingRight:"20px"}}><img src={item.image} style={{width:"36px"}}/></td>
                                            <td style={{paddingRight:"30px", color:"#333", fontWeight:"600", verticalAlign:"middle"}}><a style={{color:"#A9CF54", fontSize:"12px"}}>{item.name}</a></td>
                                            <td style={{paddingBottom:"6px"}}><ProgressBar value={item.count} total={guideCount}/></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </article>
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

function ProgressBar({total, value}){
    const percentage = Math.round((value/total)*100) + '%';
    return (
        <div style={{color:"#F3F3F3", width:"300px", fontSize:"12px"}}>
            {percentage}
            <div style={{width:percentage, background:"#A9CF54", height:"5px"}}></div>
        </div>
    );
}

export default App;
