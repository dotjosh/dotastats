import React from "react";
import {PulseLoader} from "react-spinners";

export function HeroList({isLoading, results, loadGuide, selectedHero}) {
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
                        onClick={() => loadGuide(hero.name)}>
                        <span style={style.card_text}>{hero.name}</span>
                    </li>
                ))}
            </ol>
        </React.Fragment>
    );
}