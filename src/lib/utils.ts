import { codes } from "./data";
import { APIResponseType } from "./definitions";

export const findCondition = async (inputCode: number, isDay: number) => {
  // Find the Hour of Day for Certain Icons
  if (!inputCode && !isDay) {
    throw new Error();
  }

  // Check time to get night or day pathing
  if (isDay === 0) {
    if (inputCode == 1000 || inputCode == 1003) {
      return {
        path: codes[inputCode].pathNight,
        theme: codes[inputCode].themeNight,
      };
    }
    return {
      path: codes[inputCode].path,
      theme: codes[inputCode].themeNight,
    };
  }

  return {
    path: codes[inputCode].path,
    theme: codes[inputCode].theme,
  };
};

export const forecastSetter = async (data: APIResponseType) => {
  if (!data) {
    throw new Error();
  }
  const codePathAndType = await findCondition(
    data.current.condition.code,
    data.current.is_day
  );
  const returnedData = {
    location: data.location.name,
    condition: data.current.condition.text,
    icon: codePathAndType.path,
    theme: codePathAndType.theme,
    temperature: Math.round(data.current.temp_f),
    feelsLike: Math.round(data.current.feelslike_f),
    gust: `${data.current.gust_kph} mph ${data.current.wind_dir}`,
    humidity: data.current.humidity,
    uvIndex: data.current.uv,
    extended: [
      {
        dayOfWeek: new Date(
          data.forecast.forecastday[1].date
        ).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
        min: Math.round(data.forecast.forecastday[1].day.mintemp_f),
        max: Math.round(data.forecast.forecastday[1].day.maxtemp_f),
        cond: data.forecast.forecastday[1].day["condition"].text,
        rain: data.forecast.forecastday[1].day.daily_chance_of_rain,
        snow: data.forecast.forecastday[1].day.daily_chance_of_snow,
      },
      {
        dayOfWeek: new Date(
          data.forecast.forecastday[2].date
        ).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
        min: Math.round(data.forecast.forecastday[2].day.mintemp_f),
        max: Math.round(data.forecast.forecastday[2].day.maxtemp_f),
        cond: data.forecast.forecastday[2].day["condition"].text,
        rain: data.forecast.forecastday[2].day.daily_chance_of_rain,
        snow: data.forecast.forecastday[2].day.daily_chance_of_snow,
      },
    ],
  };
  if (
    data.location.country !== "United States of America" &&
    data.location.country !== "USA"
  ) {
    returnedData.temperature = Math.round(data.current.temp_c);
    returnedData.feelsLike = Math.round(data.current.feelslike_c);
    returnedData.gust = `${data.current.gust_kph} kph ${data.current.wind_dir}`;
    returnedData.extended[0].min = Math.round(
      data.forecast.forecastday[1].day.mintemp_c
    );
    returnedData.extended[0].max = Math.round(
      data.forecast.forecastday[1].day.maxtemp_c
    );
    returnedData.extended[1].min = Math.round(
      data.forecast.forecastday[2].day.mintemp_c
    );
    returnedData.extended[1].max = Math.round(
      data.forecast.forecastday[2].day.maxtemp_c
    );
  }
  return returnedData;
};

export const returnedForecast = async (data: APIResponseType) => {
  return await forecastSetter(data);
};
