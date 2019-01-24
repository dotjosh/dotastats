import React, { Component } from "react";
import { HeroDetail } from "./components/HeroDetail";
import { Heroes } from "./components/Heroes";
import api from "./api";
import { ThemeProvider } from "emotion-theming";
import { GuideResponse, HeroResponse, Guide, Hero } from "./types";
import styled, { dotaBuff } from "./theme";

const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	background: ${x => x.theme.color.primary};
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

interface State {
	guides: {
		results: Guide[];
		isLoading: boolean;
	};
	heroes: {
		results: Hero[];
		isLoading: boolean;
	};
	selectedHero: null | Hero;
}

const defaultState: State = {
	guides: {
		results: [],
		isLoading: false
	},
	heroes: {
		results: [],
		isLoading: false
	},
	selectedHero: null
};

class App extends Component<{}, typeof defaultState> {
	state = defaultState;

	componentDidMount() {
		this.loadHeroes();
	}

	render() {
		const { heroes, guides, selectedHero } = this.state;

		return (
			<ThemeProvider theme={dotaBuff}>
				<Container>
					<LeftPanel>
						<Heroes
							{...heroes}
							selectedHero={selectedHero}
							loadGuide={this.handleLoadGuide}
						/>
					</LeftPanel>
					<RightPanel>
						<HeroDetail {...guides} selectedHero={selectedHero} />
					</RightPanel>
				</Container>
			</ThemeProvider>
		);
	}

	loadHeroes = () => {
		this.setState({
			heroes: {
				results: [],
				isLoading: true
			}
		});
		const onComplete = (response: HeroResponse) =>
			this.setState({
				heroes: {
					results: response.result,
					isLoading: false
				}
			});
		api.getHeroes().then(onComplete);
	};

	handleLoadGuide = (selectedHero: Hero): void => {
		this.setState({
			guides: {
				results: [],
				isLoading: true
			},
			selectedHero
		});
		const onComplete = (response: GuideResponse) =>
			this.setState({
				guides: {
					results: response.result,
					isLoading: false
				}
			});
		api.getGuide(selectedHero).then(onComplete);
	};
}

export default App;
