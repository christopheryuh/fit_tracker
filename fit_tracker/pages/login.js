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

async function authenticate(login){
  //console.log({username:entered_username,password:entered_password})
  const { data, error } = await supabase.from("login").select("*").eq('username',login.username).eq('password',login.password)
  if (data.length > 0){
    return true
  }
  else{
  return false
  }
}
async function get_id(username){
  const {data, error} = await supabase.from("ids").select("*").eq("username",username)
  console.log(data)
  return data[0].id
}


export default function Home() {
  const router = useRouter();

  let goal_calories = 1000//load from database
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function handleClick() {
    const login_data = {
      username: username,
      password: password

     }
     let auth = await authenticate(login_data)
     if (auth){
    let id = await get_id(username)
    console.log("id")
    console.log(id)
    router.push(
      { pathname: "/", query: {'id':id}}
    );
     }
     else{
      alert('password not accepted')
     }
  };


  return (
    <div>
    <h1>Log In</h1>
    <Link href="/">Home</Link>
    <hr></hr>
    <p>Enter A Username</p><input value={username} onChange={e => setUsername(e.target.value)}></input>
    <p>Enter A Password</p><input value={password} onChange={e => setPassword(e.target.value)}></input>
    <button onClick={() => handleClick()}>Submit</button>
    </div>
  );
}
