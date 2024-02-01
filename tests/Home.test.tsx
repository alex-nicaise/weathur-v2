import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "../src/pages/Home";

describe("Home Page", () => {
  it("should render the city name when given a zipcode", () => {
    // render(<Home />);
    // screen.debug();
    // userEvent.type(screen.getByTestId("city-input"), "11102{enter}");
    // expect(screen.getByTestId("city-location-header")).toHaveTextContent(
    //   "Astoria"
    // );
  });
});
