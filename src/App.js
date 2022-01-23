import React, {useEffect, useState} from "react";
import OrasDabar from "./components/OrasDabar";


const App = ()=> {

    const [city, setCity] = useState('');

    useEffect(()=> {
        fetch('https://geolocation-db.com/json/2af03d10-55bd-11ec-99c6-3bef17a14b7a')
            .then(response => response.json())
            .then(data => setCity(data.city));
    }, [city]);



    console.log(city);
    return (
        <div className="container">
            {city.length ? <OrasDabar city={city}/> :
            <h1>Fackiukas</h1>}
        </div>
    )
}

export default App;
