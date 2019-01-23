import React, { Component } from "react";
import { HeroList } from "./components/HeroList";
import { HeroGuide } from "./components/HeroGuide";
import api from "./api";
import styled from "@emotion/styled";
import { ThemeProvider } from 'emotion-theming'

const theme = {
	color: {
		primary: "#1C242D",
		secondary: "rgb(36,47,57)",
		alternate: "rgba(255, 255, 255, 0.04)",
		highlight: "blue"
	},
	text:{
		primary: "#EEE",
		link: "#A9CF54"
	}
};

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

	componentDidMount() {
		this.loadHeroes();
	}

	render() {
		const { heroes, items, selectedHero } = this.state;

		return (
			<ThemeProvider theme={theme}>			
				<Container>
					<LeftPanel>
						<HeroList
							{...heroes}
							selectedHero={selectedHero}
							loadGuide={this.handleLoadGuide}
						/>
					</LeftPanel>
					<RightPanel>
						<HeroGuide {...items} selectedHero={selectedHero} />
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
		const onComplete = json =>
			this.setState({
				heroes: {
					results: json.result,
					isLoading: false
				}
			});
		api.getHeroes().then(onComplete);
	};

	handleLoadGuide = selectedHero => {
		this.setState({
			items: {
				results: [],
				isLoading: true
			},
			selectedHero
		});
		const onComplete = json =>
			this.setState({
				items: {
					results: json.result,
					isLoading: false
				}
			});
		api.getGuide(selectedHero).then(onComplete);
	};
}

export default App;
