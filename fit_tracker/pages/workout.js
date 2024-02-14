import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

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
    <input value={reps} onChange={e => update(weight,e.target.value)} placeholder="reps"></input>
    <input value={weight} onChange={e => update(e.target.value,reps)} placeholder="weight"></input>
    </>
  )
}

function Exercise({name}) {
  const [sets, setSets] = useState([]);

  // Function to add a new component to the list
  const addRow = () => {
    const newSet = <div><Set name={name} index={rows.length}></Set><br></br></div>;
    rows.push(null)
    setSets([...sets, newSet]);
  };
  return (
    <>
      <h2>{name}</h2>
      {sets.map(set => set)}
      <button onClick={addRow}>Add Set</button>
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
    updateData([...data, newExercise]);
  };
  return (
    <div>
      {data.map(row => row)}
      <button onClick={() => addExercise(exercise)}>Add Exercise</button><input value={exercise} onChange={e => setExercise(e.target.value)}></input>
    </div>
  );
}



export default function Home() {
  return (
    <div>
    <h1>Workout</h1>
    <Link href="/">home</Link>
    <hr></hr>
    <div id="list">
    
    <FullWorkout></FullWorkout>
    <button onClick={() => console.log(rows)}>log</button>

    </div>
    </div>
  );
}