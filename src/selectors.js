import { orderBy } from "lodash";

export function distinctLanes(results) {
	const result = results.map(x => x.lane).filter(onlyDistinct);
	result.push("Any Lane");
	result.sort();
	return result;
}

const onlyDistinct = (value, index, self) => self.indexOf(value) === index;

export function filteredByLane(results, lane) {
	return results.filter(x => lane === "Any Lane" || x.lane === lane);
}

export function aggregated(results) {
	const aggregated = results
		.reduce((agg, x) => [...agg, ...x.items], [])
		.reduce((agg, val) => {
			let existing = agg[val.name];
			if (existing) {
				existing.count++;
			} else {
				agg[val.name] = {
					name: val.name,
					count: 1,
					image: val.image
				};
			}

			return agg;
		}, {});

	const aggregatedArray = Object.keys(aggregated).map(key => ({
		name: key,
		count: aggregated[key].count,
		image: aggregated[key].image
	}));

	const sortedArray = orderBy(aggregatedArray, ["count"], ["desc"]);

	return sortedArray;
}
