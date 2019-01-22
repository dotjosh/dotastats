import React, {Component} from 'react';
import {HeroList} from "./components/HeroList";
import {HeroGuide} from "./components/HeroGuide";

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
        const GUIDE_COUNT = 20;
        
        return (
            <div style={style.container}>
                <div style={style.leftPanel}>
                    <HeroList {...heroes} 
                              selectedHero={selectedHero} 
                              loadGuide={this.loadGuide} />
                </div>
                <div style={style.rightPanel}>
                    <HeroGuide
                        {...items}
                        selectedHero={selectedHero}
                        guideCount={GUIDE_COUNT}
                    />
                </div>
            </div>
        )
    }

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
}

export default App;
