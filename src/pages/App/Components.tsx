import styled from "../../theme";

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	height: 100%;
	background: ${x => x.theme.color.primary};
`;

export const LeftPanel = styled.div`
	flex-basis: 420px;
	overflow-y: scroll;
	height: 100%;
`;

export const RightPanel = styled.div`
	flex-grow: 2;
	padding-left: 30px;
	padding-bottom: 90px;
	overflow-y: scroll;
`;
