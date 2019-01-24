import React from "react";
import styled from "../theme";

const OuterBar = styled.div`
	color: ${x => x.theme.text.primary};
	width: 300px;
	font-size: 12px;
`;

const InnerBar = styled.div<{ width: string }>`
	width: ${x => x.width};
	background: ${x => x.theme.text.link};
	height: 5px;
`;

export function ProgressBar({
	total,
	value
}: {
	total: number;
	value: number;
}): JSX.Element {
	const percentage = Math.round((value / total) * 100) + "%";
	return (
		<OuterBar>
			{percentage}
			<InnerBar width={percentage} />
		</OuterBar>
	);
}
