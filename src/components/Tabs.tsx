import styled from "../theme";
import React from "react";

const TabContainer = styled.div`
	background: ${x => x.theme.color.primary};
`;

const TabItem = styled.div<{ isSelected: boolean }>`
	background: ${x =>
		x.isSelected ? x.theme.color.secondary : x.theme.color.secondary_darker};
	color: ${x =>
		x.isSelected ? x.theme.text.primary : x.theme.text.primary_darker};
	display: inline-block;
	margin-right: 10px;
	padding: 10px;
	font-size: 14px;
	cursor: pointer;
`;

interface Props<T> {
	items: T[];
	onClick(item: T): void;
	textFn(item: T): string;
	keyFn(item: T): string;
	isSelectedFn(item: T): boolean;
}

export function Tabs<T>({
	items,
	onClick,
	textFn,
	keyFn,
	isSelectedFn
}: Props<T>): JSX.Element {
	return (
		<TabContainer>
			{items.map(item => (
				<TabItem
					onClick={() => onClick(item)}
					isSelected={isSelectedFn(item)}
					key={keyFn(item)}
				>
					{textFn(item)}
				</TabItem>
			))}
		</TabContainer>
	);
}
