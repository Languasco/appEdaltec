import React from 'react';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import './spinner.css'

export const Spinner = ({ loading }) => {
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
    `;
    return ( 
        <div className="spinnerCss" >
             <PulseLoader  css={override} color="#003575"  loading={loading} size={20} /> 
        </div>  
    )
}
