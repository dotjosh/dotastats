import React from "react";
import styled from '@emotion/styled'
import {PulseLoader} from "react-spinners";
import {ProgressBar} from "./ProgressBar";

const Header = styled.h1`
    color: #F3F3F3
`;

Header.LoadingAnimation = styled(PulseLoader)``;
Header.LoadingAnimation.defaultProps  = { color: "#F3F3F3"};

const Section = styled.article`
    background: rgb(36, 47, 57);
    max-width: 972px;
    padding: 6px 15px;
`;

Section.Header = styled.h3`
    letter-spacing: .3px;
    color: #F3F3F3;
    font-weight: normal;
    font-size: 15px;
    margin:4px 0 18px 0;
`;

Section.Table = styled.table`
    th {
        color: #FFF;
        text-align: left;
        font-size: 13px;
        font-weight: bold;
        padding-bottom: 8px;
    }
    
    tbody tr:nth-child(odd) {
        background:rgba(255,255,255,0.04);
    }
`;
Section.Table.defaultProps = { cellPadding: "0", cellSpacing: "0" };

Section.Column = styled.td`
    padding-right: ${props => props.isItem ? "10px" : "30px"};
    color: #333;
    font-weight: 600;
    vertical-align: middle;
    padding-top: 6px;
    padding-bottom: 6px;
    border:0;
`;

const ItemImage = styled.img`
    width:36px;
`;

Section.Link = styled.a`
    color: #A9CF54; 
    font-size: 12px;
`;
    
   
export function HeroGuide({selectedHero, isLoading, guideCount, results}) {
    return (
        <React.Fragment>
            <Header>{selectedHero} {isLoading && <Header.LoadingAnimation/>}</Header>
            {(!isLoading && selectedHero) && (
                <Section>
                    <Section.Header>FINAL ITEMS BASED ON TOP {guideCount} GUIDES</Section.Header>
                    <Section.Table>
                        <thead>
                        <tr>
                            <th>Item</th>
                            <th/>
                            <th>Pick Rate</th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(item =>
                            <tr key={item.name}>
                                <Section.Column isItem><ItemImage src={item.image} /></Section.Column>
                                <Section.Column><Section.Link>{item.name}</Section.Link></Section.Column>
                                <Section.Column><ProgressBar value={item.count} total={guideCount}/></Section.Column>
                            </tr>
                        )}
                        </tbody>
                    </Section.Table>
                </Section>
            )}
        </React.Fragment>
    );
}