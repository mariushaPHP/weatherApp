import React, {useEffect, useState} from 'react';
import OrasDabar from "../OrasDabar";

const Pradinis = () => {

    const [city, setCity] = useState('');

    useEffect(()=> {
        fetch('https://geolocation-db.com/json/2af03d10-55bd-11ec-99c6-3bef17a14b7a')
            .then(response => response.json())
            .then(data => setCity(data.city));
    }, [city]);

    return (
        <div className="container">

            {city.length ? <OrasDabar city={city}/> :
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

        </div>
    );
};

export default Pradinis;