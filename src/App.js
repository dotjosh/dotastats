import React, { Component } from 'react';

const api = {
    getHeroes: () => fetch("/.netlify/functions/heroes")
                    .then(resp => resp.json()),
    getGuide: hero => fetch(`/.netlify/functions/guides?hero=${hero}`)
                    .then(resp => resp.json())
};

const style = {
    card: {
        width:"120px",
        cursor:"pointer",
        float:"left",
        height:"65px",
        color:"#FFF",
        verticalAlign:"bottom",
        position:"relative"
    },
    card_text: {
        position:"absolute",
        bottom:"0",
        left:"0",
        textShadow: "0px 0px 2px #0a0a0a",
        fontSize:"13px"
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
            isLoading: true
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
            <div>
                <ol>
                    {this.state.heroes.map(hero => (
                        <li key={hero.name} 
                            style={{...style.card, background: hero.image}}
                            onClick={() => this.loadHero(hero.name)}>
                            <span style={style.card_text}>{hero.name}</span>
                        </li>
                    ))}
                </ol>
                <div style={{clear:"both"}}/>
                {this.state.isLoading && <h3>LOADING...</h3>}
                <ol>
                    {this.state.results.map(result => (
                        <li key={result.name}>
                            {result.item} = {result.count}
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}


export default App;
