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
	total = 0,
	value
}: {
	total?: number;
	value: number;
}): JSX.Element {
	const percentage = (total > 0 ? Math.round((value / total) * 100) : value) + "%"
	return (
		<OuterBar>
			{percentage}
			<InnerBar width={percentage} />
		</OuterBar>
	);
}
