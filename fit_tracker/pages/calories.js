import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>

    <h1>Calories</h1>
    <Link href="/">home</Link>
    </div>
  );
}
