import { useState } from "react";
import WeatherContext from "../lib/WeatherContext";
import Header from "../components/Header";
import WeatherDisplay from "../components/WeatherDisplay";

const Home = () => {
  const [weather, setWeather] = useState({
    location: "San Francisco",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      cityZip: { value: string };
    };
    setWeather({ location: target.cityZip.value });
    target.cityZip.value = "";
  };

  return (
    <WeatherContext.Provider value={weather}>
      <Header>
        <h2>Weathur</h2>
        <form
          id="search-form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            name="cityZip"
            placeholder="Search City or Zip..."
          />
        </form>
      </Header>
      <article id="weather-container">
        <section id="weather-body">
          <WeatherDisplay />
        </section>
      </article>
    </WeatherContext.Provider>
  );
};

export default Home;
