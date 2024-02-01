import { useEffect, useState } from "react";
import { useWeatherContext } from "../lib/Context/WeatherContext";
import { returnedForecast } from "../lib/utils";
import { WeatherStateType } from "../lib/definitions";
import WeatherDisplaySkeleton from "../skeletons/WeatherDisplaySkeleton";
import { useLoadingContext } from "../lib/Context/LoadingContext";
import { useErrorContext } from "../lib/Context/ErrorContext";
import ErrorDisplay from "./ErrorDisplay";

const WeatherDisplay = () => {
  const { weather } = useWeatherContext();
  const { loading, setLoading } = useLoadingContext();
  const { appError, setAppError } = useErrorContext();
  const [weatherResponse, setWeatherResponse] = useState<WeatherStateType>();

  useEffect(() => {
    setLoading(true);
    setAppError({ message: "", name: "" });

    const controller = new AbortController();
    const apiKey = import.meta.env.VITE_API_KEY;

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${weather.location}&days=3&aqi=no&alerts=no`,
      { signal: controller.signal }
    )
      .then((res) => res.json())
      .then(async (data) => {
        setWeatherResponse(await returnedForecast(data));
      })
      .catch((error: Error) => {
        setLoading(false);
        setAppError({
          message: error.message,
          name: error.name,
        });
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [setAppError, setLoading, weather.location]);

  useEffect(() => {
    document.body.className = `${weatherResponse?.theme}`;
  }, [weatherResponse]);

  if (loading) {
    return <WeatherDisplaySkeleton />;
  }

  if (appError.message !== "" && appError.name !== "AbortError") {
    return <ErrorDisplay />;
  }

  return (
    <span>
      <img
        src={weatherResponse?.icon}
        alt="Icon for the current weather"
        id="condition-icon"
      />

      <h1>{`${weatherResponse?.temperature}°`}</h1>
      <h3 data-testid="city-location-header">{weatherResponse?.location}</h3>
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
};

export default WeatherDisplay;
