import { describe, it, expect } from "vitest";
import { findCondition } from "../src/lib/utils";

// Find Condition Util

describe("findCondition", () => {
  it("should return the correct object for clear skies and night time", async () => {
    const returnedObject = await findCondition(1000, 0);
    expect(returnedObject).toStrictEqual({
      path: "/weather-icons/Artboard 2.svg",
      theme: "night-blue",
    });
  });
  it("should return the correct object for cloudy skies and night time", async () => {
    const returnedObject = await findCondition(1003, 0);
    expect(returnedObject).toStrictEqual({
      path: "/weather-icons/Artboard 6.svg",
      theme: "night-grey",
    });
  });
  it("should return the correct object for light rain and night time", async () => {
    const returnedObject = await findCondition(1183, 0);
    expect(returnedObject).toStrictEqual({
      path: "/weather-icons/Artboard 8.svg",
      theme: "night-grey",
    });
  });
  it("should return the correct object for overcast and day time", async () => {
    const returnedObject = await findCondition(1009, 1);
    expect(returnedObject).toStrictEqual({
      path: "/weather-icons/Artboard 4.svg",
      theme: "overcast",
    });
  });
});
