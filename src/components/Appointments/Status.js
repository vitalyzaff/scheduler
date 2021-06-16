import React from "react";

// status component when saving/deleting an appointment with simple loader
export default function Status(props) {
  return(
    <main className="appointment__card appointment__card--status">
  <img
    className="appointment__status-image"
    src="images/status.png"
    alt="Loading"
  />
  <h1 className="text--semi-bold">{props.message}</h1>
</main>
  );
}