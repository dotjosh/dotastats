import React, { Component } from 'react';

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
        paddingLeft:"30px"
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
                    <ol style={style.rightList}>
                        {this.state.results.map(item => (
                            <li key={item.name}
                                style={style.item}>
                                <img src={item.image}
                                        style={style.item_image}/>
                                {item.name} ({item.count})
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}


export default App;
