import { createContext, useContext, useState } from "react";
import { WeatherContextType } from "../definitions";

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weather, setWeather] = useState({
    location: "San Francisco",
  });

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = () => {
  const context = useContext(WeatherContext);

  if (!context) {
    throw new Error("No Weather Context Found.");
  }

  return context;
};
