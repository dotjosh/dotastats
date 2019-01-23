import React from "react";
import styled from "@emotion/styled";
import { PulseLoader } from "react-spinners";

const CardList = styled.ol`
	padding: 0;
	margin: 0;
`;

CardList.Item = styled.div`
	width: 120px;
	cursor: pointer;
	float: left;
	height: 65px;
	color: #fff;
	vertical-align: bottom;
	position: relative;
	border: solid 7px white;
	list-style-type: none;
	padding: 0;
	border-color: ${props => (props.isSelected ? "blue" : "#333")};
	background: ${props => props.imageBackground};
`;

CardList.ItemText = styled.div`
	position: absolute;
	bottom: 0;
	font-weight: bold;
	left: 3px;
	text-shadow: 0px 0px 2px #0a0a0a;
	font-size: 13px;
	color: #f3f3f3;
`;

export function HeroList({
	isLoading,
	results,
	loadGuide: onLoadGuide,
	selectedHero
}) {
	return (
		<React.Fragment>
			{isLoading && (
				<h1 style={{ textAlign: "center" }}>
					<PulseLoader color="#FFF" />
				</h1>
			)}
			<CardList>
				{results.map(hero => (
					<CardList.Item
						key={hero.name}
						imageBackground={hero.image}
						isSelected={hero.name === selectedHero}
						onClick={() => onLoadGuide(hero.name)}
					>
						<CardList.ItemText>{hero.name}</CardList.ItemText>
					</CardList.Item>
				))}
			</CardList>
		</React.Fragment>
	);
}
