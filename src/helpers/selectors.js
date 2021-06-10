
export function getAppointmentsForDay(state, day) {
  const array = [];
  const specificDay = state.days.filter(thisDay => thisDay.name === day);
  if (specificDay.length > 0) {
  const appointments = Object.keys(state.appointments).map(Number);
  const match = appointments.filter(element => specificDay[0].appointments.includes(element))
  for (let i of match) {
    array.push(state.appointments[i])
  }
}
  return array;
}

export function getInterview(state, interview) {
  if (interview) {
    const obj = { student: interview.student, interviewer: state.interviewers[interview.interviewer]}
    return obj;
  } 
  return null;
}

export function getInterviewersForDay(state, day) {
  const array = [];
  const specificDay = state.days.filter(thisDay => thisDay.name === day);
  if (specificDay.length > 0) {
  const interviewers = Object.keys(state.interviewers).map(Number);
  const match = interviewers.filter(element => specificDay[0].interviewers.includes(element))
  for (let i of match) {
    array.push(state.interviewers[i])
  }
}
  return array;
}
