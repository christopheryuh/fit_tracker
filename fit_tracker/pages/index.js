import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Ubuntu } from 'next/font/google'
import { useRouter } from 'next/router';
import Link from 'next/link'

import { createClient } from '@supabase/supabase-js'

const font1 = Ubuntu({//font
  subsets: ['latin'],
  display: 'swap',
  weight: '500'
})

const inlineStyles = {//css styling
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



export default function Home() {//A Bunch of links to the different pages
  const router = useRouter();
  const d = router.query;

  return (//main page. Just a bunch of buttons that lead to the different functions
    <div>
    <h1 className={font1.className} >FIT TRACKER</h1>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/calories", query: {'id':d.id}})}>Calories</button>
    <br></br>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/workout", query: {'id':d.id}})}>Workout</button>
    <br></br>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/login"})}>Login</button>
    <br></br>
    <button style={inlineStyles.button} onClick={()=>router.push({ pathname: "/sign_up"})}>Sign Up</button>
    
    <br></br>
    <p>

    Welcome to Fit Tracker.
    </p>
    <br></br>
    <p>
    This is a free, easy to use platform to track your workouts and calories.
    </p>
    <br></br>
    <p>
    If there is any errors loading data, make sure you are logged in.
    </p>
    </div>
  );
}
