import React from "react";
import styled from "../theme";
import { PulseLoader } from "react-spinners";
import { ProgressBar } from "./ProgressBar";
import { Tabs } from "./Tabs";
import * as selectors from "../selectors";
import { Hero, Lane } from "../types";

const Header = styled.h1`
	color: ${x => x.theme.text.primary};
`;

const LoadingAnimation = styled(PulseLoader)``;
LoadingAnimation.defaultProps = { color: "#F3F3F3" };

const Section = styled.article`
	background: ${x => x.theme.color.secondary};
	max-width: 972px;
	padding: 6px 15px;
`;

const SectionHeader = styled.h3`
	letter-spacing: 0.3px;
	color: ${x => x.theme.text.primary};
	font-weight: normal;
	font-size: 15px;
	margin: 4px 0 18px 0;
`;

const SectionTable = styled.table`
	th {
		color: ${x => x.theme.text.primary};
		text-align: left;
		font-size: 13px;
		font-weight: bold;
		padding-bottom: 8px;
	}

	tbody tr:nth-of-type(odd) {
		background: ${x => x.theme.color.alternate};
	}
`;
SectionTable.defaultProps = { cellPadding: "0", cellSpacing: "0" };

const SectionColumn = styled.td<{ isItem?: boolean }>`
	padding-right: ${x => (x.isItem ? "10px" : "30px")};
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

const SectionLink = styled.a`
	color: ${x => x.theme.text.link};
	font-size: 12px;
`;

interface State {
	selectedLane: Lane;
}

interface Props {
	selectedHero: Hero | null;
	isLoading: boolean;
	results: Array<any>;
}

export class HeroDetail extends React.Component<Props, State> {
	state: State = {
		selectedLane: selectors.ANY_LANE
	};

	render() {
		const { selectedHero, isLoading, results } = this.props;
		const { selectedLane } = this.state;
		const filteredByLane = selectors.filteredByLane(results, selectedLane);
		const aggregated = selectors.aggregated(filteredByLane);
		return (
			<React.Fragment>
				{selectedHero && (
					<Header>
						{selectedHero.name} {isLoading && <LoadingAnimation />}
					</Header>
				)}
				{!isLoading && selectedHero && (
					<React.Fragment>
						<SectionHeader>
							FINAL ITEMS BASED ON TOP {results.length} GUIDES
						</SectionHeader>
						<Tabs
							items={selectors.distinctLanes(results)}
							textFn={lane => lane.text}
							onClick={lane => this.setState({ selectedLane: lane })}
							keyFn={lane => lane.text}
							isSelectedFn={lane => selectedLane.value === lane.value}
						/>
						<Section>
							<SectionTable>
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
											<SectionColumn isItem>
												<ItemImage src={item.image} />
											</SectionColumn>
											<SectionColumn>
												<SectionLink>{item.name}</SectionLink>
											</SectionColumn>
											<SectionColumn>
												<ProgressBar
													value={item.count}
													total={filteredByLane.length}
												/>
											</SectionColumn>
										</tr>
									))}
								</tbody>
							</SectionTable>
						</Section>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
