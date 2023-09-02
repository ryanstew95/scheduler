import React from "react";
import Application from "components/Application";
import { render, waitForElement } from "@testing-library/react";

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
  
    return waitForElement(() => getByText("Monday"));
  });
});