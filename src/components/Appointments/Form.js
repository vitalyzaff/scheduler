import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button"

// form component for booking interview
export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");
  // function to handle name submission
  const handleChange = event => {
    const value = event.target.value
    setName(value)
  }
  // function to handle interviewer selection
  const handleInterviewer = (event) => {
    setInterviewer(event);
  }
// function to reset name and selected interviewer
  const reset = () => {
    setName("");
    setInterviewer(null)
  }
// function when cancelling form submission
  const cancel = () => {
    props.onCancel()
    reset()
  }
  // function to validate if name was typed into the form
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }
  // returning rendered form component 
  return (  
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => handleChange(event)}
        data-testid="student-name-input"
      />
    </form>
    <section className="appointment__validation">{error}</section>
    <InterviewerList 
      interviewers={props.interviewers} 
      interviewer={interviewer} 
      setInterviewer={(event) => handleInterviewer(event)} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={validate} confirm>Save</Button>
    </section>
  </section>
</main>
  );
}