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

  function addSpots(state, id) {
    console.log(state.appointments)
    for (let i of state.days) {
      if (state.appointments[id].id <= 5 && i.name === "Monday") {
        setState({...state, days: [i.spots++]})
      } else if ((state.appointments[id].id > 5 && state.appointments[id].id <= 10) && i.name === "Tuesday") {
        setState({...state, days: [i.spots++]})
      } else if ((state.appointments[id].id > 10 && state.appointments[id].id <= 15) && i.name === "Wednesday") {
        setState({...state, days: [i.spots++]})
      } else if ((state.appointments[id].id > 15 && state.appointments[id].id <= 20) && i.name === "Thursday") {
        setState({...state, days: [i.spots++]})
      } else if ((state.appointments[id].id > 20 && state.appointments[id].id <= 25) && i.name === "Friday") {
        setState({...state, days: [i.spots++]})
      }
    }
    return state.days;
  }

  function removeSpots(state, id) {
    for (let i of state.days) {
      if (state.appointments[id].id <= 5 && i.name === "Monday") {
        setState({...state, days: [i.spots--]})
      } else if ((state.appointments[id].id > 5 && state.appointments[id].id <= 10) && i.name === "Tuesday") {
        setState({...state, days: [i.spots--]})
      } else if ((state.appointments[id].id > 10 && state.appointments[id].id <= 15) && i.name === "Wednesday") {
        setState({...state, days: [i.spots--]})
      } else if ((state.appointments[id].id > 15 && state.appointments[id].id <= 20) && i.name === "Thursday") {
        setState({...state, days: [i.spots--]})
      } else if ((state.appointments[id].id > 20 && state.appointments[id].id <= 25) && i.name === "Friday") {
        setState({...state, days: [i.spots--]})
      }
    }
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
        days: removeSpots(state, id)
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
        days: addSpots(state, id)
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


const apps = {
  1:{"id": 1, "time": "12pm", "interview": 5},
  2:{"id": 2, "time": "1pm", "interview": null },
  3:{"id": 3, "time": "2pm", "interview": null },
  4:{"id": 4, "time": "3pm", "interview": null },
  5:{"id": 5, "time": "4pm", "interview": 5 }
};

const day =   {
  id: 1,
  name: "Monday",
  appointments: [1,2,3,4,5],
  spots: 2
}

// let num = 0;
// for (let i in state.days){
//   if (!state,days[i].interview) {
//     num++;
//   }
// }

// day.spots = num;

// console.log(day)

