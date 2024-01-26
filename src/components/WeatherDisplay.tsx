import { useContext, useEffect, useState } from "react";
import WeatherContext from "../lib/WeatherContext";
import { useForecast } from "../lib/utils";
import { WeatherStateType } from "../lib/definitions";
import WeatherDisplaySkeleton from "../skeletons/WeatherDisplaySkeleton";

const WeatherDisplay = () => {
  const weather = useContext(WeatherContext);
  const [weatherResponse, setWeatherResponse] = useState<WeatherStateType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_API_KEY;

    setLoading(true);
    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${weather.location}&days=3&aqi=no&alerts=no`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then(async (data) => {
        let usingForecast = await useForecast(data);

        setWeatherResponse(usingForecast);
        setLoading(false);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    return () => {
      controller.abort();
    };
  }, [weather.location]);

  useEffect(() => {
    document.body.className = `${weatherResponse?.theme}`;
  }, [weatherResponse]);

  if (loading) {
    return <WeatherDisplaySkeleton />;
  } else {
    return (
      <span>
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

          {weatherResponse?.extended && (
            <section id="day-forecast">
              <h3>Extended Forecast</h3>

              <div id="days">
                {weatherResponse?.extended &&
                  weatherResponse?.extended.map((day, index) => {
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
          )}
        </section>
      </span>
    );
  }
};

export default WeatherDisplay;
