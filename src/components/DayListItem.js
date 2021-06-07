import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const DayClass = classNames("li", "day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
});
  const formatSpots = (props) => {
    
    if (!props.spots) {
      return 'no spots remaining'; 
    } else if (props.spots === 1) {
    return  '1 spot remaining';
  } 
  return `${props.spots} spots remaining`;
}

  return (
    <li className={DayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{ formatSpots(props) }</h3>
    </li>
  );
}