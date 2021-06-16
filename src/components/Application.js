import React from "react";


import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData"




export default function Application(props) {
  // using custom made hooks from useApplicationData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const interviewers = getInterviewersForDay (state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  // rendering and returning the list of appointments
  
  const AppointmentList = dailyAppointments.map(appointment => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment 
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
      )  
      })
// rendering the fron page with all available data
  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  key={state.days.id}
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {AppointmentList}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
