import React from "react";
import styled from "../theme";
import { PulseLoader } from "react-spinners";
import { Hero, Guide } from "../types";

const CardList = styled.ol`
	padding: 0;
	margin: 0;
`;

const CardListItem = styled.div<{
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

const CardListItemText = styled.div`
	position: absolute;
	bottom: 0;
	font-weight: bold;
	left: 3px;
	text-shadow: 0px 0px 2px #0a0a0a;
	font-size: 13px;
	color: ${x => x.theme.text.primary};
`;

interface Props<T> {
	isLoading: boolean;
	results: Hero[];
	loadGuide(hero: Hero): void;
	selectedHero: Hero | null;
}

export function Heroes<T>({
	isLoading,
	results,
	loadGuide: onLoadGuide,
	selectedHero
}: Props<T>): JSX.Element {
	return (
		<React.Fragment>
			{isLoading && (
				<h1 style={{ textAlign: "center" }}>
					<PulseLoader color="#FFF" />
				</h1>
			)}
			<CardList>
				{results.map(hero => (
					<CardListItem
						key={hero.name}
						imageBackground={hero.image}
						isSelected={
							selectedHero !== null && hero.name === selectedHero.name
						}
						onClick={() => onLoadGuide(hero)}
					>
						<CardListItemText>{hero.name}</CardListItemText>
					</CardListItem>
				))}
			</CardList>
		</React.Fragment>
	);
}
