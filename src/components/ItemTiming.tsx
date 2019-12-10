import styled from "../theme";
import React from "react";

const ItemTimingContainer = styled.div`
color: ${x => x.theme.text.primary};
width: 80px;
font-size: 12px;
`;

export function ItemTiming({
	total,
	value
}: {
	total: number;
	value: number;
}): JSX.Element {
	const avgSeconds = Math.round(value / total);
	let timing = new Date(avgSeconds * 1000).toISOString().substr(14, 5);
	return (
		<ItemTimingContainer>{timing}</ItemTimingContainer>
	);
}