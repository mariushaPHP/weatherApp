import React from 'react';

const OraiKasValanada = (props) => {
    console.log(props.info.forecastTimeUtc)
    return (
        <div>
            {props.info.forecastTimeUtc.map(a => <p>{a.slice(11, 16)}</p>)}
        </div>
    );
};

export default OraiKasValanada;