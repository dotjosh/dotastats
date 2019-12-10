import React, { Component } from "react";
import { HeroDetail } from "../../components/HeroDetail";
import { Heroes } from "../../components/Heroes";
import api from "../../api";
import { ThemeProvider } from "emotion-theming";
import { GuideResponse, HeroResponse, Guide, Hero, Lane } from "../../types";
import {Container, LeftPanel, RightPanel } from "./Components";
import { dotaBuff } from "../../theme";
import * as selectors from "../../selectors";

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
	selectedLane: Lane;
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
	selectedHero: null,
	selectedLane: selectors.ANY_LANE
};

class App extends Component<{}, typeof defaultState> {
	state = defaultState;

	componentDidMount() {
		this.loadHeroes();
	}

	render() {
		const { heroes, guides, selectedHero, selectedLane } = this.state;

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
						<HeroDetail {...guides} selectedHero={selectedHero} selectedLane={selectedLane} selectedLaneChanged={this.handleLaneChange} />
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
			selectedHero,
			selectedLane: selectors.ANY_LANE
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

	handleLaneChange = (lane: Lane): void => {
		this.setState({
			selectedLane: lane
		});
	}
}

export default App;
