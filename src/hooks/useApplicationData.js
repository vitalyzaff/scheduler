import { useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  function updateSpots(state, call) {
    const dayToUpdate = state.day;
    const dayObj = state.days.find(day => day.name === dayToUpdate);
    const dayObjIndex = state.days.findIndex(day => day.name === dayToUpdate);
    const listOfApptIds = dayObj.appointments;
    let spots = listOfApptIds.filter(apptId => !state.appointments[apptId].interview).length;

    if (call === "add") {
      spots++
    }
    if (call === "remove") {
      spots--
    }
    setState({...state, ...state.days[dayObjIndex].spots = spots})
    return state.days;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, 'remove')
      });
    })
  };

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days: updateSpots(state, 'add')
      });
    })
  }

    useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}));
    });
  }, [])
  return { state, setDay, bookInterview, cancelInterview };
};


