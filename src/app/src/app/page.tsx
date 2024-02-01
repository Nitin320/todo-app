"use client"
import React, { useState } from "react";
import Image from "next/image";
import './index.css'
import pic1 from './pics/pic1.jpg'
import { todo } from "node:test";
import { QuerySnapshot, collection, onSnapshot, query } from "firebase/firestore";
import {db} from "./firebase.js";

export default function Home() {

  const [todos, setTodos] = useState([]);

  useState(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: any[string] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    });
    return () => unsubscribe();
  })

  return (
    <main>
      <div className="main">
        <div className="left">
          <Image src={pic1} alt="" className="left-main-img" height={200} width={300} />
          <h1 className="head">Todo App</h1>
          <input className="task" type="text" name="" id="" placeholder="What's on your mind ? "/>
          <button className="submit">Submit</button>
        </div>
        <div className="right">
          {todos.map((todo, index) => (
            <Todo key={index} stuff={todo} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Todo({stuff}: {stuff: any[string]}) {
  return(
    <div className="todo-main">
      <input type="checkbox" />
      <p>{stuff.text}</p>
      <svg height={20} width={20} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
    </div>
  );
}
