import React, { useEffect, useState } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";

const Weather = () => {
  const API_KEY = "4866f54586dd3e47a2e78c113d8d6a3c";
  var [temp, setWeather] = useState({});
  var [search, setSearch] = useState("Ahmedabad");
  useEffect(async () => {
    try {
      var url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`;
      var data = await axios.get(url);
      if (data.status === 404) {
        throw "404 Error";
      }
      if (data.status === 200) {
        await setWeather(() => {
          console.log(data.data);
          return data.data;
        });
      }
    } catch (err) {
      //console.log(err)
    }
  }, [search]);

  return (
    <>
      <h1 className={"mt-5"}>Weather</h1>
      <input
        type="text"
        placeholder="Enter City"
        onChange={async (e) => {
          await setSearch(e.target.value);
        }}
        value={search}
        style={{
          marginTop: "2rem",
          height: "10vh",
          width: "25vw",
          paddingLeft: "10px",
          fontSize: "1.5rem",
        }}
      />
      {temp.weather ? (
        <>
          <div className="card">
            <div className="ml-4 pt-4">
              <h3>{`${temp.name},${temp.sys.country}`}</h3>
              <p className="mt-1 font">
                {`Current Temperature: ${(temp.main.temp - 273.15).toFixed(2)}`}
                <span>&deg;C</span>
              </p>
              <p className="mt-1 font">
                {`Feels Like: ${(temp.main.feels_like - 273.15).toFixed(2)}`}
                <span>&deg;C</span>
              </p>
              <p className="mt-1 font">
                <span>
                  {`Max: ${(temp.main.temp_max - 273.15).toFixed(2)}`}{" "}
                </span>
                <span>&deg;C</span>,
                {`Min: ${(temp.main.temp_min - 273.15).toFixed(2)}`}
                <span>&deg;C</span>
              </p>
              <div className="row mt-2">
                <div className="col-7">
                  <p className="font">{`${temp.weather[0].main}`}</p>
                  <p>{temp.weather[0].description}</p>
                </div>
                <div className="col-5">
                  <img
                    src={`http://openweathermap.org/img/w/${temp.weather[0].icon}.png`}
                    alt="Weather Image"
                    style={{
                      height: "70px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Weather;
