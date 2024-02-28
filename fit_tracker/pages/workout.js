import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import React, { useEffect } from 'react';
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/router';
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const url = "https://icvxrwuyoricxsaevqrk.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)

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
const rows = [];//list of set data

function Set({index,name}){
  const [reps, setReps] = useState("")//variable
  const [weight, setWeight] = useState("")

  function update(weight,reps){//update the variables and the list of data
    setWeight(weight)
    setReps(reps);
    rows[index] = {'name':name,'weight':Math.floor(weight),'reps':Math.floor(reps)}
  }

  return (
    <>
    <input style={inlineStyles.input} value={reps} onChange={e => update(weight,e.target.value)} placeholder="reps"></input>
    <input style={inlineStyles.input} value={weight} onChange={e => update(e.target.value,reps)} placeholder="weight"></input>
    </>
  )
}

function Exercise({name, id}) {
  const [sets, setSets] = useState([<div key={id}><Set name={name} index={rows.length}></Set><br></br></div>]);
  const [prtext, setPrText] = useState("")

  // Function to add a new set to the list
  const addRow = () => {
    const newSet = <div key={id}><Set name={name} index={rows.length}></Set><br></br></div>;
    rows.push(null)
    setSets([...sets, newSet]);
  };
  useEffect(() => {//load the records of the user when they load the exercise
    async function load(){
      const {data,error} = await supabase.from("prs").select("*").eq("id",id).eq("exercise",name)
      return data
    }
    async function fetch_data(){
    let d = await load()
    if (d.length > 0){
      setPrText("Record is "+d[0].weight+" for "+ d[0].reps + " reps")
    }

  }
    fetch_data();


},[])
  return (//render the exercise
    <>
      <h2 className={font1.className} style={styles.h2}>{name}</h2><p>{prtext}</p>
      {sets.map((item, index) => <div key={index}>{item}</div>)}{/* this shows the list of sets */}
      <button style={inlineStyles.button} onClick={addRow}>Add Set</button>
    </>
  );
}

function FullWorkout({id}) {
  // State to hold the list of components
  const [data, updateData] = useState([]);//variables (needed to update UI and variable simultaneously)
  const [exercise, setExercise] = useState("");

  // Function to add a new exercise to the list
  function addExercise(exercise){
    if (exercise != ""){
    const newExercise = <div><Exercise name={exercise} id={id}></Exercise><br></br></div>;
    setExercise("")
    updateData([...data, newExercise]);
    }
    else {
      alert("Exercise Must Have A Name")
    }
  };
  return (//this renders the workout section of the page
    <div> 
      {data.map((item, index) => <div key={index}>{item}</div>)}
      <button style={inlineStyles.button} onClick={() => addExercise(exercise)}>Add Exercise</button><input style={inlineStyles.input} value={exercise} onChange={e => setExercise(e.target.value)}></input>
    </div>
  );
}

async function submit(rows,id){//upload the workouts
  let prs = 0
  for (let i = 0; i < rows.length; i++){
      const {data, error} = await supabase.from("prs").select("*").eq("id",id).eq("exercise",rows[i].name)
      console.log(data)
      if (data.length > 0){//if there is existing data
        if (rows[i].weight > data[0].weight){//if weight is higher this time, update
          const {error} = await supabase.from("prs").update({"weight":rows[i].weight,"reps":rows[i].reps}).eq("id",id).eq("exercise",rows[i].name)
        }
      }
      else {// if there is no data, add this workout
        const {error} = await supabase.from("prs").insert({"unique":id+rows[i].name,"id":id,"exercise":rows[i].name,"weight":rows[i].weight,"reps":rows[i].reps})
      }
  }
  alert("finished workout")
}


export default function Home() {
  const router = useRouter();
  const id = router.query.id;//get user

  return (
    <div>
    <h1 className={font1.className} style={styles.h2}>Workout</h1>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/", query: {'id':id}})}>Home</button>
    <hr></hr>
    <div id="list">
    
    <FullWorkout id={id}></FullWorkout>
    <button style={inlineStyles.button} onClick={()=>submit(rows,id)}>Finish Workout</button>

    </div>
    </div>
  );
}//h1 - title
//button - home button
// fullworkout - component with a list of "exercises"
// within each "exercise" you can add a set with weight and reps
// each set gets put into a list, and then that list is used to update the dataset

// and finaly a button where you can submit the workout
