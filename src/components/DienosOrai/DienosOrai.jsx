import React from 'react';
import './style.scss';

const DienosOrai = ({...props}) => {

    const maxTemp = Math.max(...props.orai.airTemperature)
    const minTemp = Math.min(...props.orai.airTemperature)

    return (
        <div className='diena' onClick={()=> props.nustatyti(props.oraigit)}>
            <h5>{props.orai.diena}</h5>
            <h5>{maxTemp}<sup>o</sup>/{minTemp}<sup>o</sup></h5>
        </div>
    );
};

export default DienosOrai;