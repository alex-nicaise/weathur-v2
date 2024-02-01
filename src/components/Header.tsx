import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeatherContext } from "../lib/Context/WeatherContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
      <form
        data-testid="city-form"
        autoComplete="off"
        id="search-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          data-testid="city-input"
          type="text"
          name="cityZip"
          placeholder="City or Zip..."
          aria-label="City or Zip Code Input"
          required
          onInvalid={(e) => {
            const target = e.target as HTMLInputElement;
            target.setCustomValidity("Please enter a valid city or zip code.");
          }}
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.setCustomValidity("");
          }}
        />
        <button type="submit" aria-label="Submit Button for Search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </header>
  );
};

export default Header;
