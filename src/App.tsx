import Header from "./components/Header";
import { ErrorContextProvider } from "./lib/Context/ErrorContext";
import { LoadingContextProvider } from "./lib/Context/LoadingContext";
import { WeatherContextProvider } from "./lib/Context/WeatherContext";
import Home from "./pages/Home";

function App() {
  return (
    <WeatherContextProvider>
      <ErrorContextProvider>
        <LoadingContextProvider>
          <Header />
          <Home />
        </LoadingContextProvider>
      </ErrorContextProvider>
    </WeatherContextProvider>
  );
}

export default App;
