import { orderBy } from "lodash";
import { Guide, Item, Lane, Talent } from "./types";

export const ANY_LANE: Lane = { text: "Any Lane", value: null };

export function distinctLanes(results: Guide[]): Lane[] {
	let distinct = Object.create(null);
	const result = results
		.map(x => ({lane: x.lane, role: x.role}))
		.filter(x => {
			var key = x.lane + "|" + x.role;
			if (!distinct[key]) {
				distinct[key] = true;
				return true;
			}
		})
		.map<Lane>(lane => ({
			text: `${lane.lane} ${lane.role} (${results.filter(y => y.lane === lane.lane && y.role == lane.role).length})`,
			value: lane
		}));
		result.push(ANY_LANE);
	return orderBy(result, "text");
}	

export function filteredByLane(results: Guide[], lane: Lane) {
	return results.filter(
		x => lane.value === ANY_LANE.value || (x.lane === (lane.value === null ? null : lane.value.lane) && x.role === (lane.value === null ? null : lane.value.role))
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
				} else if (val.timing > 0) {
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

export function aggregatedTalents(talents: Talent[], selectedTalents: Guide[], lane: Lane): AggregatedTalentsResult[] {
	const aggregated = selectedTalents
		.filter(
			x => lane.value === ANY_LANE.value || (x.lane === (lane.value === null ? null : lane.value.lane) && x.role === (lane.value === null ? null : lane.value.role))
		)
		.reduce<Talent[]>((agg, x) => [...agg, ...x.talents], [])
		.reduce<{ [name: string]: { name: string; count: number; } }>(
			(agg, val) => {
				let existing = agg[val.name];
				if (existing) {
					existing.count++;
				} else {
					agg[val.name] = {
						name: val.name,
						count: 1,
					};
				}

				return agg;
			},
			{}
		);
	
	let lvl25Total = 0;
	let lvl20Total = 0;
	let lvl15Total = 0;
	let lvl10Total = 0;
	const finalCounts = talents.map((value, index) => {
		let matchedTalent = aggregated[value.name];
		let count = 0;
		if (matchedTalent) {
			count = matchedTalent.count;
			if (index == 0 || index == 1) {
				lvl25Total += count;
			}
			if (index == 2 || index == 3) {
				lvl20Total += count;
			}
			if (index == 4 || index == 5) {
				lvl15Total += count;
			}
			if (index == 6 || index == 7) {
				lvl10Total += count;
			}
		}
		return {
			name: value.name,
			count: count,
		};
	});

	const aggregatedCounts = finalCounts.map((talent, index) => {
		let percent = 0;
		if (index == 0 || index == 1) {
			percent = Math.round((talent.count / (lvl25Total === 0 ? talent.count : lvl25Total)) * 100);
		}
		if (index == 2 || index == 3) {
			percent = Math.round((talent.count / (lvl20Total === 0 ? talent.count : lvl20Total)) * 100);
		}
		if (index == 4 || index == 5) {
			percent = Math.round((talent.count / (lvl15Total === 0 ? talent.count : lvl15Total)) * 100);
		}
		if (index == 6 || index == 7) {
			percent = Math.round((talent.count / (lvl10Total === 0 ? talent.count : lvl10Total)) * 100);
		}
		return {
			name: talent.name,
			percent: percent
		};
	});

	let result = [];
	if (aggregatedCounts.length === 8) {
		for (var i = 0; i <= 7; i += 2) {
			result.push({
				talent1Name: aggregatedCounts[i].name,
				talent1Percent: aggregatedCounts[i].percent || 0,
				talent2Name: aggregatedCounts[i+1].name,
				talent2Percent: aggregatedCounts[i+1].percent || 0
			});
		}
	}
	
	return result;
}

interface AggregatedGuideResult {
	name: string;
	count: number;
	timing: number;
	image: string;
}

interface AggregatedTalentsResult {
	talent1Name: string;
	talent1Percent: number;
	talent2Name: string;
	talent2Percent: number;
}
