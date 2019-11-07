import React from "react";
import { ProgressBar } from "../ProgressBar";
import { Tabs } from "../Tabs";
import * as selectors from "../../selectors";
import { Hero, Lane } from "../../types";
import { LoadingAnimation } from "../LoadingAnimation";
import {
	Header,
	Section,
	SectionHeader,
	SectionTable,
	SectionColumn,
	SectionLink,
	ItemImage,
	SectionHeaderLink
} from "./Components";

interface Props {
	selectedHero: Hero | null;
	isLoading: boolean;
	results: Array<any>;
}

interface State {
	selectedLane: Lane;
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
		const filteredHero = selectedHero ? selectedHero.name.replace(/ /g, "-").toLowerCase() : "";
		const dotabuffUrl = `https://www.dotabuff.com/heroes/${filteredHero}/guides`;
		return (
			<React.Fragment>
				{selectedHero && (
					<Header>
						<SectionHeaderLink href={dotabuffUrl}>{selectedHero.name}</SectionHeaderLink> {isLoading && <LoadingAnimation />}
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
												<SectionLink href={`https://www.dotabuff.com/items/${item.name.replace(" ", "-")}`}>{item.name}</SectionLink>
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
