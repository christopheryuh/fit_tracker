import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import Link from 'next/link'

import { createClient } from '@supabase/supabase-js'

const inter = Inter({ subsets: ["latin"] });



export default function Home() {
  const router = useRouter();
  const d = router.query;

  return (
    <div>
    <h1>FIT TRACKER</h1>
    <button onClick={()=>router.push({ pathname: "/calories", query: {'id':d.id}})}>Calories</button>
    <br></br>
    <button onClick={()=>router.push({ pathname: "/workout", query: {'id':d.id}})}>Workout</button>
    <br></br>
    <Link href="/login">Log In</Link>
    <br></br>
    <Link href="/sign_up">Sign Up</Link>
    </div>
  );
}
