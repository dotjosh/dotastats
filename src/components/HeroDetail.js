import React from "react";
import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";
import { ProgressBar } from "./ProgressBar";
import * as selectors from "../selectors";

const Header = styled.h1`
	color: ${x => x.theme.text.primary};
`;

Header.LoadingAnimation = styled(PulseLoader)``;
Header.LoadingAnimation.defaultProps = { color: "#F3F3F3" };

const Section = styled.article`
	background: ${x => x.theme.color.secondary};
	max-width: 972px;
	padding: 6px 15px;
`;

Section.Header = styled.h3`
	letter-spacing: 0.3px;
	color: ${x => x.theme.text.primary};
	font-weight: normal;
	font-size: 15px;
	margin: 4px 0 18px 0;
`;

Section.Table = styled.table`
	th {
		color: ${x => x.theme.text.primary};
		text-align: left;
		font-size: 13px;
		font-weight: bold;
		padding-bottom: 8px;
	}

	tbody tr:nth-child(odd) {
		background: ${x => x.theme.color.alternate};
	}
`;
Section.Table.defaultProps = { cellPadding: "0", cellSpacing: "0" };

Section.Column = styled.td`
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

Section.Link = styled.a`
	color: ${x => x.theme.text.link};
	font-size: 12px;
`;
const Select = styled.select`
	font-size: 12px;
	padding: 8px 4px;
	background: ${x => x.theme.color.primary};
	color: ${x => x.theme.text.primary};
	margin: 0 0 15px 0;
	width: 168px;
	border: 0;
`;

const TabContainer = styled.div`
	background:${x => x.theme.color.primary};
`;

const TabItem = styled.div`
	background:${x => x.isSelected ? x.theme.color.secondary : x.theme.color.secondary_darker};
	color:${x => x.isSelected ? x.theme.text.primary : x.theme.text.primary_darker};
	display: inline-block;
	margin-right:10px;
	padding:10px;
	font-size:14px;
	cursor:pointer;
`;

function Tabs({ items, onClick, textFn, isSelectedFn }) {
	return (
		<TabContainer>
			{items.map(item => (
				<TabItem onClick={() => onClick(item)}
					isSelected={isSelectedFn(item)}>
					{textFn(item)}
				</TabItem>
			))}
		</TabContainer>
	);
}

export class HeroDetail extends React.Component {
	state = {
		selectedLane: null
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
					<React.Fragment>

						<Section.Header>
							FINAL ITEMS BASED ON TOP {results.length} GUIDES
						</Section.Header>
						<Tabs
							items={selectors.distinctLanes(results)}
							textFn={x => x.text}
							onClick={x => this.setState({ selectedLane: x.value })}
							isSelectedFn={x => x.value === selectedLane}
						/>
						<Section>
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
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}
