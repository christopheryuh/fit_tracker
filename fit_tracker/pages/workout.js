import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

const rows = [];

function Row({index}){
  const [weight, setWeight] = useState("")
 
  let weightplaceholder = null;

  function update(val){
    setWeight(val);
    rows[index] = weight;
  }

  return (
    <>
    <input value={weight} onChange={e => update(e.target.value)}></input>
    </>
  )
}

function Exercise() {
  // State to hold the list of components
  const [rows, setRow] = useState([]);

  // Function to add a new component to the list
  const addRow = () => {
    const newRow = <div><Row index={rows.length}></Row><br></br></div>;
    setRow([...rows, newRow]);
  };
  return (
    <div>
      {/* Render the list of components */}
      {rows.map(row => row)}
      {/* Button to add a new component */}
      <button onClick={addRow}>Add Set</button>
    </div>
  );
}

function FullWorkout() {
  // State to hold the list of components
  const [data, update] = useState([]);

  // Function to add a new component to the list
  const addExercise = () => {
    const newExercise = <div><Exercise></Exercise><br></br></div>;
    update([...data, newExercise]);
  };
  return (
    <div>
      {/* Render the list of components */}
      {data.map(row => row)}
      {/* Button to add a new component */}
      <button onClick={addExercise}>New Exercise</button>
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
