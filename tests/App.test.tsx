import { render, waitFor } from "@testing-library/react";
import { screen } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
    vi.clearAllMocks();
  });

  it("should render the input and button", () => {
    const input = screen.getByTestId("city-input");
    const button = screen.getByTestId("city-form-button");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should render the location header", async () => {
    await waitFor(() => {
      const header = screen.getByTestId("city-location-header");
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent("San Francisco");
    });
  });
});
