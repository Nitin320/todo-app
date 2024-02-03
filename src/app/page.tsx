"use client"
import React, { useState } from "react";
import Image from "next/image";
import './index.css'
import pic from "./pics/pic.png"
import { todo } from "node:test";
import { orderBy, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, Timestamp } from "firebase/firestore";
import {db} from "./firebase.js";
import firebase from "firebase/compat/app";

export default function Home() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useState(() => {
    const q = query(collection(db, 'todos'), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr: any[string] = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    });
    return () => unsubscribe();
  })

  const toggleComplete = async (stuff: any[string]) => { 
    await updateDoc(doc(db, 'todos', stuff.id), {
      completed: !stuff.completed
    })
  }

  const createTodo = async (e: any) => {
    e.preventDefault(e);
    if(input != ''){
      await addDoc(collection(db, 'todos'), {
        text: input,
        timestamp: Timestamp.now().toDate().toString()
      })
      setInput('')
      return
    }
  }


  const deleteTodo = async (id: any) => {
    await deleteDoc(doc(db, 'todos', id))
  }


  return (
    <main>
      <div className="main">
        <div className="left">
          <Image src={pic} alt="" className="left-main-img" height={250} width={300} />
          <h1 className="head">Todo App</h1>
          <input value={input} onChange={(e) => setInput(e.target.value)} className="task" type="text" name="" id="" placeholder="What's on your mind ? "/>
          <button onClick={createTodo} className="submit">Submit</button>
        </div>

        <div className="right">
          {todos.map((todo, index) => (
            <Todo key={index} stuff={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          ))}
        </div>
      </div>
    </main>
  );
}

function Todo({stuff, toggleComplete, deleteTodo}: {stuff: any, toggleComplete: any, deleteTodo: any}) {
  return(
    <div className="todo-main">
      <p>{stuff.text}</p>
      <p onClick={() => deleteTodo(stuff.id)} className="complete">Done !</p>
    </div>
  );
}
