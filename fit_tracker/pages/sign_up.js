import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from 'react';
import { Ubuntu } from 'next/font/google'
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';

import Link from 'next/link'

import { createClient } from '@supabase/supabase-js'

const font1 = Ubuntu({//load font
  subsets: ['latin'],
  display: 'swap',
  weight: '500'
})
const inlineStyles = {//styles
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

const url = "https://icvxrwuyoricxsaevqrk.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)//load database

const inter = Inter({ subsets: ["latin"] });


export default function Home() {//full page

  let goal_calories = 1000//load from database
  const [username, setUsername] = useState();//variables (needed to update UI and variable simultaneously)
  const [password, setPassword] = useState();
  const [weight, setWeight] = useState();

  async function handleSubmit() {

    const { data, error } = await supabase.from("login").select("*").eq('username',username)// if there isnt a username in the database
    if (data.length == 0){//if there is nothing in data
        const msg = await supabase.from("login").insert({'username':username,'password':password})//create one in the username and password table
        const {data, error} = await supabase.from("ids").select("*")//get how many accounts there are
        const {data2, error2} = await supabase.from("ids").insert({'username':username,'id':(data.length+1)})// add a new id to the database 
        let time = new Date()
        const wc_submit = await supabase.from("wc").insert({'id':(data.length+1),'weight':Math.floor(weight),'goal_calories':Math.floor(weight)*15,'calories':0,last_updated:time.getDay()})//add the calorie data to the database
        //15 * weight is a base maintenance calorie value that I researched
        alert("Account Created")
        router.push(
            { pathname: "/", query: {id:(data.length+1)} }
          );
    }
    else{
        alert("Username Is Taken")
    }
  };


  return (//basic sign up form
    <div>
    <h1 style={inlineStyles.h1} className={font1.className}>Sign Up</h1>
    <Link href="/">Home</Link>
    <hr></hr>
    <p>Enter A Username</p><input style={inlineStyles.input} value={username} onChange={e => setUsername(e.target.value)}></input>
    <p>Enter A Password</p><input style={inlineStyles.input }value={password} onChange={e => setPassword(e.target.value)}></input>
    <p>Enter Weight</p><input style={inlineStyles.input} value={weight} onChange={e => setWeight(Math.floor(e.target.value))}></input>
    
    <button style={inlineStyles.button} onClick={() => handleSubmit()}>Submit</button>
    <p>Note that the suggested calorie amount is your theoretical maintenance calories (or the calories you would eat to stay at the same weight). Eat more than the goal to gain weight, and eat less to lose weight.</p>
    </div>
  );
}
