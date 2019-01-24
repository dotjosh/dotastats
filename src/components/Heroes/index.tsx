import React from "react";
import { Hero } from "../../types";
import { CardList, CardListItem, CardListItemText } from "./Components";
import { LoadingAnimation } from "../LoadingAnimation";

interface Props<T> {
	isLoading: boolean;
	results: Hero[];
	loadGuide(hero: Hero): void;
	selectedHero: Hero | null;
}

export function Heroes<T>({
	isLoading,
	results,
	loadGuide,
	selectedHero
}: Props<T>): JSX.Element {
	return (
		<React.Fragment>
			{isLoading && (
				<h1 style={{ textAlign: "center" }}>
					<LoadingAnimation />
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
						onClick={() => loadGuide(hero)}
					>
						<CardListItemText>{hero.name}</CardListItemText>
					</CardListItem>
				))}
			</CardList>
		</React.Fragment>
	);
}
