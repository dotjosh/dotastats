import React from "react";
import styled from "@emotion/styled";

const OuterBar = styled.div`
	color: ${x => x.theme.text.primary};
	width: 300px;
	font-size: 12px;
`;

const InnerBar = styled.div`
	width: ${x => x.width};
	background: ${x => x.theme.text.link};;
	height: 5px;
`;

export function ProgressBar({ total, value }) {
	const percentage = Math.round((value / total) * 100) + "%";
	return (
		<OuterBar>
			{percentage}
			<InnerBar width={percentage} />
		</OuterBar>
	);
}
