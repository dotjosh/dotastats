import React from "react";
import {PulseLoader} from "react-spinners";
import {ProgressBar} from "./ProgressBar";

export function HeroGuide({selectedHero, isLoading, guideCount, results}) {
    return (
        <React.Fragment>
            <h1 style={{color: "#F3F3F3"}}>{selectedHero} {isLoading && <PulseLoader color={"#F3F3F3"}/>}</h1>
            {(!isLoading && selectedHero) && (
                <article style={{background: "rgb(36, 47, 57)", maxWidth: "972px", padding: "6px 15px"}}>

                    <h3 style={{letterSpacing: ".3px", color: "#F3F3F3", fontWeight: "normal", fontSize: "15px"}}>FINAL
                        ITEMS BASED ON TOP {guideCount} GUIDES</h3>
                    <table cellPadding="0" cellSpacing="0" style={{width: "auto"}}>
                        <thead>
                        <tr>
                            <th style={{
                                color: "#FFF",
                                textAlign: "left",
                                fontSize: "13px",
                                fontWeight: "bold",
                                paddingBottom: "8px"
                            }}>Item
                            </th>
                            <th/>
                            <th style={{
                                color: "#FFF",
                                textAlign: "left",
                                fontSize: "13px",
                                fontWeight: "bold",
                                paddingBottom: "8px"
                            }}>Pick Rate
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {results.map(item =>
                            <tr>
                                <td style={{paddingRight: "20px"}}><img src={item.image} style={{width: "36px"}}/></td>
                                <td style={{
                                    paddingRight: "30px",
                                    color: "#333",
                                    fontWeight: "600",
                                    verticalAlign: "middle"
                                }}><a style={{color: "#A9CF54", fontSize: "12px"}}>{item.name}</a></td>
                                <td style={{paddingBottom: "6px"}}><ProgressBar value={item.count} total={guideCount}/>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </article>
            )}
        </React.Fragment>
    );
}