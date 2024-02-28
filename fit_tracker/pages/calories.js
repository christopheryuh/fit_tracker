import Image from "next/image";
import { Carlito, Inter } from "next/font/google";
import { useState } from 'react';
import styles from "@/styles/Home.module.css";
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

import Link from 'next/link'

const font1 = Ubuntu({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
  })

const url = "https://icvxrwuyoricxsaevqrk.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)

let data = null

const inlineStyles = {//css styles
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

function Calories({ calorieData }) {
    return (// render the calories
        <div>
            {calorieData && calorieData.length > 0 && (
                <h2 style={inlineStyles.h2}>{calorieData[0].calories}/{calorieData[0].goal_calories}</h2>
            )}
        </div>
    );
}

async function update(input_cals,cals,id){
    const { error } = await supabase.from('wc').update({ calories: Math.floor(input_cals)+cals})
  .eq('id', id)//add calories to the database
}

export default function Home(){
    let router = useRouter()
    const [calorieData, setCalorieData] = useState(null);//variables (needed to update UI and variable simultaneously)
    const [input_calories, setInputCalories] = useState(0);
    const id = router.query.id;
    useEffect(() => {//load calorie data
        async function load(){
            const {data, error} = await supabase.from("wc").select("*").eq("id",id)
            return data

        }
        async function fetch_data(){    
        let data = await load()
        let time = new Date()
        try{
        if (data[0].last_updated != time.getDay()){// if it's a different day, reset the calories
            const { error } = await supabase.from('wc').update({ calories: 0, last_updated: time.getDay()}).eq('id', id)
            data = await load()
        }
        setCalorieData(data)}
        catch {
        }
        }
        fetch_data()

    }
    
    )  
    return (//link and simple calorie counter, <Calories> holds the actual counter. There is also an input, and a submit button
    <div>
    <h1 className={font1.className}>Calorie Tracker</h1>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/", query: {'id':id}})}>Go Home</button>
    <hr></hr>
    <Calories calorieData={calorieData}></Calories>
    <input style={inlineStyles.input} value={input_calories} onChange={e => setInputCalories(e.target.value)}></input><button style={inlineStyles.button} onClick={()=>update(input_calories,calorieData[0].calories,id)}>Update</button>
    <br></br>
    <Link href="https://recipes.howstuffworks.com/45-common-foods-and-the-number-of-calories-they-contain.htm">Refer to this link for calorie data for popular foods</Link>
    <Link href="https://www.cnet.com/health/fitness/which-workouts-burn-the-most-calories/">Refer to this link for calorie data for popular exercises</Link>
    </div>
    )
}