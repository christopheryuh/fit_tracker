import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from 'react';
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';

import Link from 'next/link'

import { createClient } from '@supabase/supabase-js'


const url = "https://icvxrwuyoricxsaevqrk.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const router = useRouter();

  let goal_calories = 1000//load from database
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [weight, setWeight] = useState();

  async function handleSubmit() {

    const { data, error } = await supabase.from("login").select("*").eq('username',username)
    if (data.length == 0){ 
        const msg = await supabase.from("login").insert({'username':username,'password':password})
        const {data, error} = await supabase.from("ids").select("*")
        const {data2, error2} = await supabase.from("ids").insert({'username':username,'id':(data.length+1)})
        //const wcd = await supabase.from("wc").select("*")
        let time = new Date()
        const wc_submit = await supabase.from("wc").insert({'id':(data.length+1),'weight':Math.floor(weight),'goal_calories':Math.floor(weight)*15,'calories':0,last_updated:time.getDay()})
        alert("Account Created")
        router.push(
            { pathname: "/", query: {id:(data.length+1)} }
          );
    }
    else{
        alert("Username Is Taken")
    }
  };


  return (
    <div>
    <h1>Sign Up</h1>
    <Link href="/">Home</Link>
    <hr></hr>
    <p>Enter A Username</p><input value={username} onChange={e => setUsername(e.target.value)}></input>
    <p>Enter A Password</p><input value={password} onChange={e => setPassword(e.target.value)}></input>
    <p>Enter Weight</p><input value={weight} onChange={e => setWeight(Math.floor(e.target.value))}></input>
    
    <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}
