import React from "react";
import {PulseLoader} from "react-spinners";
const style = {
    card: {
        width:"120px",
        cursor:"pointer",
        float:"left",
        height:"65px",
        color:"#FFF",
        verticalAlign:"bottom",
        position:"relative",
        border:"solid 7px white",
        listStyleType:"none",
        padding:"0"
    },
    card_text: {
        position:"absolute",
        bottom:"0",
        fontWeight:"bold",
        left:"3px",
        textShadow: "0px 0px 2px #0a0a0a",
        fontSize:"13px"
    },
};
export function HeroList({isLoading, results, loadGuide: onLoadGuide, selectedHero}) {
    return (
        <React.Fragment>
            {isLoading && <h1 style={{textAlign: "center"}}><PulseLoader color="#FFF"/></h1>}
            <ol style={{padding: "0", margin: "0"}}>
                {results.map(hero => (
                    <li key={hero.name}
                        style={{
                            ...style.card,
                            background: hero.image,
                            borderColor: hero.name === selectedHero ? "blue" : "#333"
                        }}
                        onClick={() => onLoadGuide(hero.name)}>
                        <span style={style.card_text}>{hero.name}</span>
                    </li>
                ))}
            </ol>
        </React.Fragment>
    );
}