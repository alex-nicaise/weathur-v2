import Header from "../components/Header";
import WeatherDisplay from "../components/WeatherDisplay";
import { ErrorContextProvider } from "../lib/Context/ErrorContext";
import { LoadingContextProvider } from "../lib/Context/LoadingContext";
import { WeatherContextProvider } from "../lib/Context/WeatherContext";

const Home = () => {
  return (
    <WeatherContextProvider>
      <Header />
      <article id="weather-container">
        <section id="weather-body">
          <ErrorContextProvider>
            <LoadingContextProvider>
              <WeatherDisplay />
            </LoadingContextProvider>
          </ErrorContextProvider>
        </section>
      </article>
    </WeatherContextProvider>
  );
};

export default Home;
