import styled from "../../theme";

export const CardList = styled.ol`
	padding: 0;
	margin: 0;
`;

export const CardListItem = styled.div<{
	isSelected?: boolean;
	imageBackground: string;
}>`
	width: 120px;
	cursor: pointer;
	float: left;
	height: 65px;
	vertical-align: bottom;
	position: relative;
	border: solid 7px ${x => x.theme.text.primary};
	list-style-type: none;
	padding: 0;
	border-color: ${x =>
		x.isSelected ? x.theme.color.highlight : x.theme.color.primary};
	background: ${x => x.imageBackground};
	&:hover {
		border-color: ${x => x.theme.color.highlight};
	}
`;

export const CardListItemText = styled.div`
	position: absolute;
	bottom: 0;
	font-weight: bold;
	left: 3px;
	text-shadow: 0px 0px 2px #0a0a0a;
	font-size: 13px;
	color: ${x => x.theme.text.primary};
`;
