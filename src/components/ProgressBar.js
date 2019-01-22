import React from "react";
import styled from '@emotion/styled'

const OuterBar = styled.div`
    color:#F3F3F3;
    width:300px;
    font-size:12px;
`;

const InnerBar = styled.div`
    width: ${props => props.width};
    background: #A9CF54;
    height: 5px;
`;

export function ProgressBar({total, value}) {
    const percentage = Math.round((value / total) * 100) + '%';
    return (
        <OuterBar>
            {percentage}
            <InnerBar width={percentage}/>
        </OuterBar>
    );
}