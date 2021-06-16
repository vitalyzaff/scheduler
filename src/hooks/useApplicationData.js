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

  // uodating spots functionality, so when user submits new appointment, spots automatically update
  function updateSpots(state) {
    const dayToUpdate = state.day;
    const dayObj = state.days.find(day => day.name === dayToUpdate);
    const dayObjIndex = state.days.findIndex(day => day.name === dayToUpdate);
    const listOfApptIds = dayObj.appointments;
    const spots = listOfApptIds.filter(apptId => !state.appointments[apptId].interview).length;
    const newDay = { ...dayObj, spots }
    const newDays = [...state.days];
    newDays[dayObjIndex] = newDay;
    setState({...state, ...state.days = newDays})
    
    return state
  }

  // custom hook to book a specified interview
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
      setState(updateSpots({ ...state, appointments }))
    })
  };
  // custom hook to delete a specified interview
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
      setState(updateSpots({ ...state, appointments }))
    })
  }
// useEffect to request data from api server
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


