import React from 'react';
import {nanoid} from "nanoid";

const OraiKasValanada = (props) => {
    console.log(Object.keys(props.info))

    return (
        <div>
            {/*{props.info.map(a => <p style={{border:'2px solid black', margin: '0'}}>{a}</p>)}*/}
            {props.info.airTemperature.map(temp => <h3 key={nanoid()}>{temp}</h3> )}
        </div>
    );
};

export default OraiKasValanada;