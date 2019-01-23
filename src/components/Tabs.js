import styled from "@emotion/styled";
import React from "react";


const TabContainer = styled.div`
	background:${x => x.theme.color.primary};
`;

const TabItem = styled.div`
	background:${x => x.isSelected ? x.theme.color.secondary : x.theme.color.secondary_darker};
	color:${x => x.isSelected ? x.theme.text.primary : x.theme.text.primary_darker};
	display: inline-block;
	margin-right:10px;
	padding:10px;
	font-size:14px;
	cursor:pointer;
`;

export function Tabs({ items, onClick, textFn, isSelectedFn }) {
    return (
        <TabContainer>
            {items.map(item => (
                <TabItem onClick={() => onClick(item)}
                         isSelected={isSelectedFn(item)}>
                    {textFn(item)}
                </TabItem>
            ))}
        </TabContainer>
    );
}