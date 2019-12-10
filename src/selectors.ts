import { orderBy } from "lodash";
import { Guide, Item, Lane } from "./types";

export const ANY_LANE: Lane = { text: "Any Lane", value: null };

export function distinctLanes(results: Guide[]): Lane[] {
	const result = results
		.map(x => x.lane)
		.filter(onlyDistinct)
		.map<Lane>(lane => ({
			text: `${lane} (${results.filter(y => y.lane === lane).length})`,
			value: lane
		}));
	result.push(ANY_LANE);
	return orderBy(result, "text");
}

const onlyDistinct = <T>(value: T, index: number, self: any): boolean =>
	self.indexOf(value) === index;

export function filteredByLane(results: Guide[], lane: Lane) {
	return results.filter(
		x => lane.value === ANY_LANE.value || x.lane === lane.value
	);
}

export function aggregated(results: Guide[]): AggregatedGuideResult[] {
	const aggregated = results
		.reduce<Item[]>((agg, x) => [...agg, ...x.items], [])
		.reduce<{ [name: string]: { name: string; count: number; timing: number; image: string } }>(
			(agg, val) => {
				let existing = agg[val.name];
				if (existing) {
					existing.count++;
					existing.timing += val.timing;
				} else {
					agg[val.name] = {
						name: val.name,
						count: 1,
						timing: val.timing,
						image: val.image
					};
				}

				return agg;
			},
			{}
		);

	const aggregatedArray = Object.keys(aggregated).map(key => ({
		name: key,
		count: aggregated[key].count,
		timing: aggregated[key].timing,
		image: aggregated[key].image
	}));

	return orderBy(aggregatedArray, ["count"], ["desc"]);
}

interface AggregatedGuideResult {
	name: string;
	count: number;
	timing: number;
	image: string;
}
