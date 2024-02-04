"use client"
import React, { useState } from "react";
import Image from "next/image";
import './index.css';
import pic from "./pics/main-pic.png";
import { orderBy, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, Timestamp } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQcJvIgidYB51hRJafqBOpbdIJlnejVwk",
  authDomain: "todo-app-134e0.firebaseapp.com",
  projectId: "todo-app-134e0",
  storageBucket: "todo-app-134e0.appspot.com",
  messagingSenderId: "677209122034",
  appId: "1:677209122034:web:745fe73ca1fdb1630e1c6b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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
          <Image src={pic} alt="" className="left-main-img"/>
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
