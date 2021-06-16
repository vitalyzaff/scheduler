import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
// transition function to move to the next step
  function transition(mode, replace = false) {
    if (!replace) {
      setHistory(prev => [...prev, mode]);
    }
    setMode(mode); 
  }
  // back function to move to the next step
  function back() {
    if (history.length > 1) {
    history.pop()
    setMode(history[history.length - 1])
    }
  }; 
  return { mode, transition, back };
}
