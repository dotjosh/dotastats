import styled from "../../theme";

export const Header = styled.h1`
	color: ${x => x.theme.text.primary};
`;

export const Section = styled.article`
	background: ${x => x.theme.color.secondary};
	max-width: 972px;
	padding: 6px 15px;
`;

export const SectionHeader = styled.h3`
	letter-spacing: 0.3px;
	color: ${x => x.theme.text.primary};
	font-weight: normal;
	font-size: 15px;
	margin: 4px 0 18px 0;
`;

export const SectionHeaderLink = styled.a`
color: ${x => x.theme.text.primary};
	text-decoration: none !important;
`;

export const SectionTable = styled.table`
	th {
		color: ${x => x.theme.text.primary};
		text-align: left;
		font-size: 13px;
		font-weight: bold;
		padding-bottom: 8px;
	}

	tbody tr:nth-of-type(odd) {
		background: ${x => x.theme.color.alternate};
	}
`;
SectionTable.defaultProps = { cellPadding: "0", cellSpacing: "0" };

export const SectionColumn = styled.td<{ isItem?: boolean }>`
	padding-right: ${x => (x.isItem ? "10px" : "30px")};
	font-weight: 600;
	vertical-align: middle;
	padding-top: 3px;
	padding-bottom: 3px;
	border: 0;
`;

export const TalentName = styled.div`
	font-size: 14px;
	margin: 10px 0 10px 0;
	color: ${x => x.theme.text.primary};
`;

export const ItemImage = styled.img`
	width: 36px;
	height: 26px;
`;

export const SectionLink = styled.a`
	color: ${x => x.theme.text.link};
	font-size: 12px;
	text-decoration: none;
`;
