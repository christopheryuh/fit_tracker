import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>

    <h1>PAGE 1</h1>
    <Link href="/calories">Calories</Link>
    <br></br>
    <Link href="/workout">Workout</Link>
    </div>
  );
}
