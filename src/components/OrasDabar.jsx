import React, {useEffect, useState} from 'react';
import {nanoid} from "nanoid";
import DienosOrai from "./DienosOrai/DienosOrai";
import './style.scss'
import OraiKasValanada from "./oraiKasValanda/OraiKasValanada";

const OrasDabar = (props) => {

    const [savaitesOrai, setSavaitesOrai] = useState([])
    const [diena, setDiena] = useState()
    const [kitoksDiena, setKitoksDiena] = useState([])
    let oruMasyvas = [];
    useEffect( () => {
         fetch(`https://api.meteo.lt/v1/places/${props.city}/forecasts/long-term`)
            .then(response => response.json())
            .then(data => {
                let orai = data["forecastTimestamps"];
                for(let dienos = 0; dienos < 7; dienos++){
                    let diena = new Date();
                    diena.setDate(diena.getDate() + dienos);
                    let dienosPrognoze = orai.filter(obj => {
                        if(new Date(obj["forecastTimeUtc"]).getDate() !== diena.getDate()){
                            return
                        }
                        return obj;
                    })

                    let dienosOras = {};
                    const savDiena = new Date(diena).getDay();

                    for(const oras of dienosPrognoze){
                        for(const raktas in oras){
                            if(Array.isArray(dienosOras[raktas])){
                                dienosOras[raktas].push(oras[raktas])
                            } else{
                                dienosOras[raktas] = [oras[raktas]];
                            }
                            dienosOras['diena'] = savaitesDiena(savDiena);
                        }
                    }
                    oruMasyvas = [...oruMasyvas, dienosOras];
                }
                setSavaitesOrai(oruMasyvas)
                //setDiena(oruMasyvas[0]);
            })
    }, []);

    // function weatherFromNow(){
    //     const date = new Date();
    //     const dateStr =
    //         date.getFullYear() + "-" +
    //         ("00" + date.getMonth() + 1).slice(-2) + "-" +
    //         ("00" + (date.getDate())).slice(-2) +" " +
    //         ("00" + date.getHours()).slice(-2) /*+ ":" +
    //     ("00" + date.getMinutes()).slice(-2) + ":" +
    //     ("00" + date.getSeconds()).slice(-2);*/
    //     //console.log('valanda - ',dateStr.slice(8, 10));
    //     //console.log(date.getDate())
    ////setOraiNuoDabar(naglaFunkcija(data.forecastTimestamps.filter(laikas =>laikas.forecastTimeUtc.slice(0, 13) >= weatherFromNow()))))
    //     return dateStr
    // }

    function savaitesDiena(diena){
        switch(diena){
            case 0: return 'S';//'Sekmadienis';
            case 1: return 'P'; //'Pirmadienis';
            case 2: return 'A'; //'Antradienis';
            case 3: return 'T'; //'Treciadienis';
            case 4: return 'K'; //'Ketvirtadienis';
            case 5: return 'Pn'; //'Penktadienis';
            case 6: return 'Š'; //'Sestadienis';
        }
    }

    function nustatytiOrus(obj){
        setDiena(obj)
    }

    // useEffect(() => {
    //     if(diena){
    //         const mas = [];
    //         for(let i=0; i<diena.airTemperature.length; i++){
    //             const obj = {
    //                 val: diena.forecastTimeUtc[i].slice(11, 16),
    //                 temp: diena.airTemperature[i],
    //                 vejoGreitis: diena.windSpeed[i]
    //             }
    //             mas.push(obj)
    //         }
    //         setKitoksDiena(mas)
    //     }
    // }, [diena])

    console.log('savataites orai ',savaitesOrai)
    console.log('dienos orai ', diena)

    return (
        <>
            <div className='dienos'>
                {
                    savaitesOrai.length ? savaitesOrai.map(diena => <DienosOrai nustatyti={nustatytiOrus} key={nanoid()} orai={diena}/>) :
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                }
            </div>
            {
                diena ? <OraiKasValanada info={diena}/> :
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </>

    );
};

export default OrasDabar;