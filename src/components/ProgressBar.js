import React from "react";

export function ProgressBar({total, value}) {
    const percentage = Math.round((value / total) * 100) + '%';
    return (
        <div style={{color: "#F3F3F3", width: "300px", fontSize: "12px"}}>
            {percentage}
            <div style={{width: percentage, background: "#A9CF54", height: "5px"}}></div>
        </div>
    );
}