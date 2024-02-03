import { useWeatherContext } from "../lib/Context/WeatherContext";
import HeaderForm from "./HeaderForm";

const Header = () => {
  const { setWeather } = useWeatherContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      cityZip: { value: string };
    };
    setWeather({ location: target.cityZip.value });
    target.cityZip.value = "";
  };

  return (
    <header>
      <h2>Weathur</h2>
      <HeaderForm handleSubmit={handleSubmit} />
    </header>
  );
};

export default Header;
