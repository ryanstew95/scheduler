import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (spots) => {
    return spots === 0 ? "no spots remaining" : spots === 1 ? "1 spot remaining" : `${spots} spots remaining`;
  };

  return (
    <li
      data-testid="day" // Add this data-testid attribute
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
