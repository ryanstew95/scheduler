import React from "react";
import Application from "components/Application";
import { render, waitForElement, prettyDOM, fireEvent, getByAltText, getByPlaceholderText, getByText, getAllByTestId, queryByText } from "@testing-library/react";

describe("Appointment", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    return waitForElement(() => getByText("Monday"));
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
    
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const dayListItems = getAllByTestId(container, "day");
    const mondayDayListItem = dayListItems.find((dayListItem) => getByText(dayListItem, "Monday"));

    expect(mondayDayListItem).toBeInTheDocument();
    expect(getByText(mondayDayListItem, "no spots remaining")).toBeInTheDocument();
  
    console.log(prettyDOM(mondayDayListItem));
  });
});

