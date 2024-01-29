import Header from "../components/Header";
import WeatherDisplay from "../components/WeatherDisplay";
import { WeatherContextProvider } from "../lib/WeatherContext";

const Home = () => {
  return (
    <WeatherContextProvider>
      <Header />
      <article id="weather-container">
        <section id="weather-body">
          <WeatherDisplay />
        </section>
      </article>
    </WeatherContextProvider>
  );
};

export default Home;
