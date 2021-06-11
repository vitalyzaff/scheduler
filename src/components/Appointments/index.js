import React from "react";
import "components/Appointments/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Status from "./Status";
import Error from "./Error";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  }
  
  return (
  <article className="appointment">
    <Header 
    time={props.time}
    />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === CREATE && (
      <Form 
      setName="setName"
      interviewers={props.interviewers}
      onSave={save}
      onCancel={back}
      setInterviewer="setInterviewer"
      />
    )}
    {mode === EDIT && (
      <Form 
      name={props.interview.student}
      interviewers={props.interviewers}
      interviewer={props.interview.interviewer.id}
      onSave={save}
      onCancel={back}
      setInterviewer="setInterviewer"
      />
    )}
    {mode === SAVING && <Status message="Saving"/>}
    {mode === DELETING && <Status message="Deleting"/>}
    {mode === CONFIRM && <Confirm
      message="Are you sure you would like to delete?"
      onConfirm={deleteInterview}
      onCancel={back}
      />
      }
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}

  </article>
  );
}