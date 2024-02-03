import WeatherDisplay from "../components/WeatherDisplay";

const Home = () => {
  return (
    <>
      <article id="weather-container">
        <section id="weather-body">
          <WeatherDisplay />
        </section>
      </article>
    </>
  );
};

export default Home;
