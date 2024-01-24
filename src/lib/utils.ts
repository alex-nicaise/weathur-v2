import { codes } from "./data";
import { APIResponseType, WeatherStateType } from "./definitions";

export const useForecast = async (
  data: APIResponseType,
  weather: WeatherStateType
) => {
  const controller = new AbortController();
  const apiKey = import.meta.env.VITE_API__KEY;

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${weather.location}&days=3&aqi=no&alerts=no`,
    { signal: controller.signal }
  )
    .then((res) => res.json())
    .then(async (data: APIResponseType) => {
      forecastSetter(data);
    })
    .catch((error: Error) => {
      console.log(error);
    });

  const findCondition = async (inputCode: number, isDay: number) => {
    // Find the Hour of Day for Certain Icons
    if (!inputCode) {
      throw new Error("There was no condition code found.");
    }

    if (inputCode == 1000 || inputCode == 1003) {
      // Check time to get night or day pathing
      if (isDay === 0) {
        return {
          path: codes[inputCode].pathNight,
          theme: codes[inputCode].themeNight,
        };
      }
    }

    return {
      path: codes[inputCode].path,
      theme: codes[inputCode].theme,
    };
  };

  const forecastSetter = async (data: APIResponseType) => {
    let codePathAndType = await findCondition(
      data.current.condition.code,
      data.current.is_day
    );
    if (
      data.location.country !== "United States of America" &&
      data.location.country !== "USA"
    ) {
      return {
        location: data.location.name,
        condition: data.current.condition.text,
        icon: codePathAndType.path,
        theme: codePathAndType.theme,
        temperature: Math.round(data.current.temp_c),
        feelsLike: Math.round(data.current.feelslike_c),
        gust: `${data.current.gust_kph} kph ${data.current.wind_dir}`,
        humidity: data.current.humidity,
        uvIndex: data.current.uv,
      };
    }

    return {
      location: data.location.name,
      condition: data.current.condition.text,
      icon: codePathAndType.path,
      theme: codePathAndType.theme,
      temperature: Math.round(data.current.temp_f),
      feelsLike: Math.round(data.current.feelslike_f),
      gust: `${data.current.gust_kph} mph ${data.current.wind_dir}`,
      humidity: data.current.humidity,
      uvIndex: data.current.uv,
    };
  };

  return forecastSetter(data);
};
