import React from "react";
import Application from "components/Application";
import { render, waitForElement, prettyDOM, fireEvent, getByAltText, getByPlaceholderText, getByText, getAllByTestId, queryByText, getByTestId, getByDisplayValue } from "@testing-library/react";

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));


    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

fireEvent.click(getByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
   expect(
    getByText(appointment, "Are you sure you would like to delete?")
   ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));

 // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
 const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
  );

 expect(getByText(day, "2 spots remaining")).toBeInTheDocument();


  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
// 1. Render the Application
const { container } = render(<Application />);
// 2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));
// 3. Click the "Edit" button on the booked appointment.
const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
);


fireEvent.click(getByAltText(appointment, "Edit"));
// 4. Verify that the Form component is displayed with the current student name and interviewer selected.

const form = getByTestId(container, "student-name-input");
expect(form).toBeInTheDocument();

// expect(queryByText(form, "Archie Smith")).toBeInTheDocument();
// expect(getByText(form, "Interviewer Name")).toHaveTextContent("Sylvia Palmer");

// 5. Change the student name or interviewer
fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  target: { value: "Lydia Miller-Jones" }
});
// 6. Click the "Save" button on the Form component
fireEvent.click(getByText(appointment, "Save"));
// 7. Check that the element with the text "Saving" is displayed.
expect(getByText(appointment, "Saving")).toBeInTheDocument();
// 8. Wait until the element with the "Edit" button is displayed.
// expect(getByText(appointment, "Edit")).toBeInTheDocument();
// 9. Verify that the DayListItem with the text "Monday" still has the same number of spots remaining.
const mondayDayListItem = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);
expect(getByText(mondayDayListItem, "1 spot remaining")).toBeInTheDocument();
  });
});

