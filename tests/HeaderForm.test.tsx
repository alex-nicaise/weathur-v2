import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import { WeatherContextProvider } from "../src/lib/Context/WeatherContext";
import { ErrorContextProvider } from "../src/lib/Context/ErrorContext";
import { LoadingContextProvider } from "../src/lib/Context/LoadingContext";
import HeaderForm from "../src/components/HeaderForm";

const handleSubmitMock = vi.fn();

const renderElements = () => {
  render(
    <WeatherContextProvider>
      <ErrorContextProvider>
        <LoadingContextProvider>
          <HeaderForm handleSubmit={handleSubmitMock} />
        </LoadingContextProvider>
      </ErrorContextProvider>
    </WeatherContextProvider>
  );
};

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should trigger handleSubmit when form is submitted", async () => {
    renderElements();

    const input = screen.getByTestId("city-input");
    const button = screen.getByTestId("city-form-button");

    fireEvent.change(input, { target: { value: "11102" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleSubmitMock).toHaveBeenCalledTimes(1);
    });
  });

  it("should not allow a blank input to be submitted", async () => {
    renderElements();

    const input = screen.getByTestId("city-input");
    const button = screen.getByTestId("city-form-button");

    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleSubmitMock).not.toHaveBeenCalledTimes(1);
    });
  });
});
