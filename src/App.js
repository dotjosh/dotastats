import React, {Component} from 'react';
import {HeroList} from "./components/HeroList";
import {HeroGuide} from "./components/HeroGuide";
import api from "./api";

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
                              loadGuide={this.handleLoadGuide} />
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

    handleLoadGuide = (selectedHero) =>{
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
