import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// individual interviewer item
export default function InterviewerListItem(props) {
  const InterviewerClass = classNames("li", "interviewers__item", {
    "interviewers__item--selected": props.selected
});
  return (
  <li className={InterviewerClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
);
}