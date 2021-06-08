import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button"

export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");
  const handleChange = event => {
    console.log(event.target.value)
    const value = event.target.value
    setName(value)
  }
  const handleInterviewer = (event) => {
    setInterviewer(event);
  }

  const reset = () => {
    setName("");
    setInterviewer(null)
  }

  const cancel = () => {
    props.onCancel()
    reset()
  }
  const submit = event => {
    event.preventDefault()
    props.onSave(name, interviewer)
  }
  
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
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers} 
      interviewer={interviewer} 
      setInterviewer={(event) => handleInterviewer(event)} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button onClick={submit} confirm>Save</Button>
    </section>
  </section>
</main>
  );
}