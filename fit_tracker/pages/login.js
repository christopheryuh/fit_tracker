import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from 'react';
import { Ubuntu } from 'next/font/google'
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';

import Link from 'next/link'

import { createClient } from '@supabase/supabase-js'


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

const url = "https://icvxrwuyoricxsaevqrk.supabase.co"//database info
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imljdnhyd3V5b3JpY3hzYWV2cXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg1MjMyMzcsImV4cCI6MjAyNDA5OTIzN30.0CE9XmvK1d5qdkCbS8z5JcAYRFHVCFqdqnmKGWowUQM"
const supabase = createClient(url, key)

const inter = Inter({ subsets: ["latin"] });

async function authenticate(login){//look throught the database and try to find an entry with a matching username and passwork 
  //console.log({username:entered_username,password:entered_password})
  const { data, error } = await supabase.from("login").select("*").eq('username',login.username).eq('password',login.password)
  if (data.length > 0){// if it exists
    return true
  }
  else{
  return false
  }
}
async function get_id(username){//convert username to id
  const {data, error} = await supabase.from("ids").select("*").eq("username",username)
  console.log(data)
  return data[0].id
}


export default function Home() {
  const router = useRouter();

  let goal_calories = 1000//load from database
  const [username, setUsername] = useState();//variables (needed to update UI and variable simultaneously)
  const [password, setPassword] = useState();

  async function handleClick() {//use authenticate function to check if it's in the database, if it is, go to the home page
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


  return (//quick login form
    <div>
    <h1 style={inlineStyles.h1} className={font1.className}>Log In</h1>
    <Link href="/">Home</Link>
    <hr></hr>
    <p>Enter A Username</p><input style={inlineStyles.input} value={username} onChange={e => setUsername(e.target.value)}></input>
    <p>Enter A Password</p><input style={inlineStyles.input} value={password} onChange={e => setPassword(e.target.value)}></input>
    <button style={inlineStyles.button} onClick={() => handleClick()}>Submit</button>
    </div>
  );
}
