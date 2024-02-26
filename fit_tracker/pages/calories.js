import Image from "next/image";
import { Carlito, Inter } from "next/font/google";
import { useState } from 'react';
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js'

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

const url = "https://icvxrwuyoricxsaevqrk.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)

let data = null

function Calories({ calorieData }) {
    //reset if it is loaded on a different day
    return (
        <div>
            {calorieData && calorieData.length > 0 && (
                <h2>{calorieData[0].calories}/{calorieData[0].goal_calories}</h2>
            )}
        </div>
    );
}

async function update(input_cals,cals,id){
    const { error } = await supabase.from('wc').update({ calories: Math.floor(input_cals)+cals})
  .eq('id', id)
}

export default function Home(){
    let router = useRouter()
    const [calorieData, setCalorieData] = useState(null);
    const [input_calories, setInputCalories] = useState(0);
    const id = router.query.id;
    useEffect(() => {
        async function load(){
            const {data, error} = await supabase.from("wc").select("*").eq("id",id)
            return data

        }
        async function fetch_data(){    
        let data = await load()
        let time = new Date()
        try{
        if (data[0].last_updated != time.getDay()){
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
    return (
    <div>
    <h1>Calories</h1>
    <button onClick={()=>router.push({ pathname: "/", query: {'id':id}})}>Go Home</button>
    <hr></hr>
    <Calories calorieData={calorieData}></Calories>
    <input value={input_calories} onChange={e => setInputCalories(e.target.value)}></input><button onClick={()=>update(input_calories,calorieData[0].calories,id)}>Update</button>
    <br></br>
    <Link href="https://recipes.howstuffworks.com/45-common-foods-and-the-number-of-calories-they-contain.htm">Refer to this link for calorie data for popular foods</Link>
    </div>
    )
}