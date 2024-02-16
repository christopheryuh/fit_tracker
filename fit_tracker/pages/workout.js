import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import { Ubuntu } from 'next/font/google'
import Link from 'next/link'

const font1 = Ubuntu({
  subsets: ['latin'],
  display: 'swap',
  weight: '500'
})
const inlineStyles = {
  input: {
    padding: '0.1rem .5rem',
    margin: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.1rem .5rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  h2: {
    fontSize: '1.5rem',
    margin: '1rem 0',
  },
  h1: {
    fontSize: '2.5rem',
    margin: '1rem 0',
  },
};
const rows = [];

function Set({index,name}){
  const [reps, setReps] = useState("")
  const [weight, setWeight] = useState("")

  function update(weight,reps){
    setWeight(weight)
    setReps(reps);
    rows[index] = {'name':name,'weight':weight,'reps':reps}
  }

  return (
    <>
    <input style={inlineStyles.input} value={reps} onChange={e => update(weight,e.target.value)} placeholder="reps"></input>
    <input style={inlineStyles.input} value={weight} onChange={e => update(e.target.value,reps)} placeholder="weight"></input>
    </>
  )
}

function Exercise({name}) {
  const [sets, setSets] = useState([<div><Set name={name} index={rows.length}></Set><br></br></div>]);

  // Function to add a new component to the list
  const addRow = () => {
    const newSet = <div><Set name={name} index={rows.length}></Set><br></br></div>;
    rows.push(null)
    setSets([...sets, newSet]);
  };
  return (
    <>
      <h2 className={font1.className} style={styles.h2}>{name}</h2>
      {sets.map(set => set)}
      <button style={inlineStyles.button} onClick={addRow}>Add Set</button>
    </>
  );
}

function FullWorkout() {
  // State to hold the list of components
  const [data, updateData] = useState([]);
  const [exercise, setExercise] = useState("");

  // Function to add a new component to the list
  function addExercise(exercise){
    const newExercise = <div><Exercise name={exercise}></Exercise><br></br></div>;
    setExercise("")
    updateData([...data, newExercise]);

  };
  return (
    <div>
      {data.map(row => row)}
      <button style={inlineStyles.button} onClick={() => addExercise(exercise)}>Add Exercise</button><input style={inlineStyles.input} value={exercise} onChange={e => setExercise(e.target.value)}></input>
    </div>
  );
}



export default function Home() {
  return (
    <div>
    <h1 className={font1.className} style={styles.h2}>Workout</h1>
    <Link href="/">home</Link>
    <hr></hr>
    <div id="list">
    
    <FullWorkout></FullWorkout>
    <button style={inlineStyles.button} onClick={() => console.log(rows)}>log</button>

    </div>
    </div>
  );
}
