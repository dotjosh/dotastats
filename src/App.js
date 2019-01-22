import React, {Component} from 'react';
import {HeroList} from "./components/HeroList";
import {HeroGuide} from "./components/HeroGuide";
import api from "./api";
import styled from '@emotion/styled'

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100%;
    background: #1C242D;
`;

const LeftPanel = styled.div`
    flex-basis: 420px;
    overflow-y: scroll;
    height: 100%;
`;

const RightPanel = styled.div`
    flex-grow: 2;
    padding-left: 30px;
    padding-bottom: 90px;
    overflow-y: scroll;
`;

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
            <Container>
                <LeftPanel>
                    <HeroList {...heroes} 
                              selectedHero={selectedHero} 
                              loadGuide={this.handleLoadGuide} />
                </LeftPanel>
                <RightPanel>
                    <HeroGuide
                        {...items}
                        selectedHero={selectedHero}
                        guideCount={GUIDE_COUNT}
                    />
                </RightPanel>
            </Container>
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
