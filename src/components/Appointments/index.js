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

// appointment component
export default function Appointment(props) {
  // declaring state variables
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  // using custom hook useVisualMode to export transition and back functions
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // save function to save input values and create new appointment 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((error) => transition(ERROR_SAVE, true))
  }
// delete function to delete specific appointment
  function destroy(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING, true);
    props.cancelInterview(props.id, interview)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true))
  }
  // rendering whole appointment component
  return (
  <article className="appointment" data-testid="appointment">
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
    {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={back} />}
    {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={back} />}
    {mode === CONFIRM && <Confirm
      message="Are you sure you would like to delete?"
      onConfirm={destroy}
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