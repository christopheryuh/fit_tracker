import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from 'react';
import Link from 'next/link'

const inter = Inter({ subsets: ["latin"] });

const test_list = [];

function WorkoutRows() {
  // State to hold the list of components
  const [rows, setRow] = useState([]);

  // Function to add a new component to the list
  const addRow = () => {
    // Here, you can add whatever component you want to add to the list
    const newRow = <p key={rows.length}>New Component</p>;
    test_list.push(rows.lengths)
    setRow([...rows, newRow]);
  };

  return (
    <div>
      <h2>Component List</h2>
      {/* Render the list of components */}
      {rows.map(row => row)}
      {/* Button to add a new component */}
      <button onClick={addRow}>Add Row</button>
      <p>{test_list}</p>
    </div>
  );
}



export default function Home() {
  return (
    <div>
    <h1>Workout</h1>
    <Link href="/">home</Link>
    <hr></hr>
    <div id="list">
    
    <WorkoutRows></WorkoutRows>

    </div>
    </div>
  );
}
