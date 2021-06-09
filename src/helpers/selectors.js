
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
