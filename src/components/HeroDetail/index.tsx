import React from "react";
import { ProgressBar } from "../ProgressBar";
import { Tabs } from "../Tabs";
import * as selectors from "../../selectors";
import { Hero, Lane, Talent } from "../../types";
import { LoadingAnimation } from "../LoadingAnimation";
import {
	Header,
	Section,
	SectionHeader,
	SectionTable,
	SectionColumn,
	SectionLink,
	ItemImage,
	SectionHeaderLink,
	TalentName,
	TalentHeader
} from "./Components";
import { ItemTiming } from "../ItemTiming";

interface Props {
	selectedHero: Hero | null;
	isLoading: boolean;
	results: Array<any>;
	selectedLane: Lane;
	selectedLaneChanged(lane: Lane): void;
	talents: Talent[];
}

export class HeroDetail extends React.Component<Props> {
	render() {
		const { selectedHero, isLoading, results, selectedLane, selectedLaneChanged, talents } = this.props;
		const itemsFilteredByLane = selectors.filteredByLane(results, selectedLane);
		const aggregatedItems = selectors.aggregated(itemsFilteredByLane);
		const filteredHero = selectedHero ? selectedHero.name.replace(/ /g, "-").toLowerCase() : "";
		const dotabuffUrl = `https://www.dotabuff.com/heroes/${filteredHero}/guides`;
		const aggregatedTalents = selectors.aggregatedTalents(talents, results)
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
							onClick={lane => selectedLaneChanged(lane)}
							keyFn={lane => lane.text}
							isSelectedFn={lane => selectedLane.value === lane.value}
						/>
						<Section>
							<SectionTable>
								<thead>
									<tr>
										<th>Item</th>
										<th />
										<th>Avg Timing</th>
										<th>Pick Rate</th>
									</tr>
								</thead>
								<tbody>
									{aggregatedItems.map(item => (
										<tr key={item.name}>
											<SectionColumn isItem>
												<ItemImage src={item.image} />
											</SectionColumn>
											<SectionColumn>
												<SectionLink href={`https://www.dotabuff.com/items/${item.name.replace(" ", "-")}`}>{item.name}</SectionLink>
											</SectionColumn>
											<SectionColumn>
												<ItemTiming
													value={item.timing}
													total={item.count}
													/>
											</SectionColumn>
											<SectionColumn>
												<ProgressBar
													value={item.count}
													total={itemsFilteredByLane.length}
												/>
											</SectionColumn>
										</tr>
									))}
								</tbody>
							</SectionTable>
						</Section>
						<TalentHeader>
							TALENT DISTRIBUTION
						</TalentHeader>
						<Section>
						<SectionTable>
								<tbody>
									{aggregatedTalents.map(talent => (
										<tr key={talent.talent1Name}>
											<SectionColumn>
												<TalentName>{talent.talent1Name}</TalentName>
												<TalentName>{talent.talent2Name}</TalentName>
											</SectionColumn>
											<SectionColumn>
												<ProgressBar value={talent.talent1Percent}/>
												<ProgressBar value={talent.talent2Percent} marginTop={10} />
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
