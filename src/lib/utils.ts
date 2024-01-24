import { codes } from "./data";
import { APIResponseType } from "./definitions";

const findCondition = async (inputCode: number, isDay: number) => {
  // Find the Hour of Day for Certain Icons
  if (!inputCode) {
    throw new Error();
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
  if (!data) {
    throw new Error();
  }
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

export const useForecast = async (data: APIResponseType) => {
  return forecastSetter(data);
};
