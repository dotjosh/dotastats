import React from "react";
import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";
import { ProgressBar } from "./ProgressBar";
import * as selectors from "../selectors";

const Header = styled.h1`
	color: #f3f3f3;
`;

Header.LoadingAnimation = styled(PulseLoader)``;
Header.LoadingAnimation.defaultProps = { color: "#F3F3F3" };

const Section = styled.article`
	background: rgb(36, 47, 57);
	max-width: 972px;
	padding: 6px 15px;
`;

Section.Header = styled.h3`
	letter-spacing: 0.3px;
	color: #f3f3f3;
	font-weight: normal;
	font-size: 15px;
	margin: 4px 0 18px 0;
`;

Section.Table = styled.table`
	th {
		color: #fff;
		text-align: left;
		font-size: 13px;
		font-weight: bold;
		padding-bottom: 8px;
	}

	tbody tr:nth-child(odd) {
		background: rgba(255, 255, 255, 0.04);
	}
`;
Section.Table.defaultProps = { cellPadding: "0", cellSpacing: "0" };

Section.Column = styled.td`
	padding-right: ${props => (props.isItem ? "10px" : "30px")};
	color: #333;
	font-weight: 600;
	vertical-align: middle;
	padding-top: 3px;
	padding-bottom: 3px;
	border: 0;
`;

const ItemImage = styled.img`
	width: 36px;
	height: 26px;
`;

Section.Link = styled.a`
	color: #a9cf54;
	font-size: 12px;
`;
const Select = styled.select`
	font-size: 12px;
	padding: 8px 4px;
	background: #1c242d;
	color: #fff;
	margin: 0 0 15px 0;
	width: 168px;
	border: 0;
`;

export class HeroGuide extends React.Component {
	state = {
		selectedLane: "Any Lane"
	};

	render() {
		const { selectedHero, isLoading, results } = this.props;
		const { selectedLane } = this.state;
		const filteredByLane = selectors.filteredByLane(results, selectedLane);
		const aggregated = selectors.aggregated(filteredByLane);
		return (
			<React.Fragment>
				<Header>
					{selectedHero} {isLoading && <Header.LoadingAnimation />}
				</Header>
				{!isLoading && selectedHero && (
					<Section>
						<Section.Header>
							FINAL ITEMS BASED ON TOP {results.length} GUIDES
						</Section.Header>
						<Select
							value={selectedLane}
							onChange={e => this.setState({ selectedLane: e.target.value })}
						>
							{selectors.distinctLanes(results).map(lane => (
								<option value={lane} key={lane}>
									{lane}
								</option>
							))}
						</Select>
						<Section.Table>
							<thead>
								<tr>
									<th>Item</th>
									<th />
									<th>Pick Rate</th>
								</tr>
							</thead>
							<tbody>
								{aggregated.map(item => (
									<tr key={item.name}>
										<Section.Column isItem>
											<ItemImage src={item.image} />
										</Section.Column>
										<Section.Column>
											<Section.Link>{item.name}</Section.Link>
										</Section.Column>
										<Section.Column>
											<ProgressBar
												value={item.count}
												total={filteredByLane.length}
											/>
										</Section.Column>
									</tr>
								))}
							</tbody>
						</Section.Table>
					</Section>
				)}
			</React.Fragment>
		);
	}
}
