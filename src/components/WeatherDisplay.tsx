import { useContext, useEffect, useState } from "react";
import WeatherContext from "../lib/WeatherContext";
import { useForecast } from "../lib/utils";
import { APIResponseType, WeatherStateType } from "../lib/definitions";

const WeatherDisplay = () => {
  const weather = useContext(WeatherContext);
  const [weatherResponse, setWeatherResponse] = useState<WeatherStateType>({
    location: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_API__KEY;

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${weather.location}&days=3&aqi=no&alerts=no`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then(async (data: APIResponseType) => {
        let usingForecast = await useForecast(data, weather);
        setWeatherResponse(usingForecast);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [weather.location]);

  useEffect(() => {
    document.body.className = `${weatherResponse.theme}`;
  }, [weatherResponse]);

  return (
    <>
      <img
        src={weatherResponse?.icon}
        alt="Icon for the current weather"
        id="condition-icon"
      />

      <h1>{`${weatherResponse?.temperature}°`}</h1>
      <h3>{weatherResponse?.location}</h3>
      <h4>
        <strong>{weatherResponse?.condition}</strong>
      </h4>

      <hr />

      <section id="other-info">
        <div className="info-row">
          <span>{`Feels like: ${weatherResponse?.feelsLike}°`}</span>
          <span>{`Wind: ${weatherResponse?.gust}`}</span>
        </div>
        <div className="info-row">
          <span>{`Humidity: ${weatherResponse?.humidity}%`}</span>
          <span>{`UV Index: ${weatherResponse?.uvIndex}`}</span>
        </div>

        {/* {weather.extended && (
          <section id="day-forecast">
            <h3>Extended Forecast</h3>

            <div id="days">
              {weather.extended &&
                weather.extended.map((day, index) => {
                  return (
                    <section key={index}>
                      <h4>{day.dayOfWeek}</h4>
                      <p>
                        {day.cond}
                        <br />
                        {`Min: ${day.min}°`}
                        <br />
                        {`Max: ${day.max}°`}
                        <br />
                        {`Rain: ${day.rain}%`}
                        <br />
                        {day.snow !== 0 ? `Snow: ${day.snow}%` : ""}
                      </p>
                    </section>
                  );
                })}
            </div>
          </section>
        )} */}
      </section>
    </>
  );
};

export default WeatherDisplay;
