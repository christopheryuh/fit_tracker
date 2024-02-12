import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

let data = []

class Set {
    constructor(){
        this.reps = ""
        this.weight = ""
    }
}


function ExerciseSection({name}){
    return (
        <h2>{name}</h2>

    )
}

function RenderData({data}){
    return ({data})
}


// function SetRow({reps,weight}){
//     return ()
// }

function AddExercise(){
    return (
        <p>Add New Exercise</p><input></input>
    );
}


export default function Home() {

    let exercise_names = [];
    let sets = [];
    let reps = [];
  return (
    <div>
    <h1>Workout</h1>
    <Link href="/">home</Link>
    <hr></hr>
    <div id="list">

    <Exercise name="bench"></Exercise>

    </div>
    <RenderData data={data}></RenderData>
    </div>
  );
}
