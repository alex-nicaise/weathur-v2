import { createContext } from "react";

const WeatherContext = createContext({
  location: "San Francisco",
});

export default WeatherContext;
