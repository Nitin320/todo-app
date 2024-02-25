"use client"
import React, { useState } from "react";
import { orderBy, addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, Timestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {StarsCanvas} from './star';
import './main.css';

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
    <main className="min-h-[100vh] min-w-[100vw] h-[100%] w-[100%]">
      <StarsCanvas/>
      <div className="bg-black min-h-[100vh] min-w-[100vw] h-[100%] w-[100%] pb-4 flex flex-col content-center items-center space-y-11 text-[white]">
        <h1 className="z-[2] text-[3rem] font-bold mt-11">Todo App</h1>
        <div className="z-[2] flex flex-row space-x-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="z-[2] p-3 border-[2px] rounded-[15px] bg-[#080F0D]" type="text" name="" id="" placeholder="What's on your mind ? "/>
          <button onClick={createTodo} className="z-[2] p-3 px-6 rounded-[10px] bg-[#40BDB2] opacity-[0.5] duration-500 hover:opacity-[1]">Submit</button>
        </div>

        {todos.map((todo, index) => (
          <Todo key={index} stuff={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
        ))}
      </div>
    </main>
  );
}

function Todo({stuff, toggleComplete, deleteTodo}: {stuff: any, toggleComplete: any, deleteTodo: any}) {
  return(
    <div className="hover:shadow-[0_0px_20px_#40BDB2] z-[4] text-xl w-[60vw] p-6 border-[2px] border-[#40BDB2] rounded-[10px] duration-700 flex flex-row justify-between items-center max-sm:w-[80vw]">
      <p className="mr-[2rem] break-all">{stuff.text}</p>
      <p onClick={() => deleteTodo(stuff.id)} className=" p-2 px-5 text-nowrap border-[#40BDB2] duration-[800ms] cursor-pointer border-[1px] rounded-[10px] hover:bg-[#40BDB2] hover:shadow-[0_5px_50px_#40BDB2]">Done !</p>
    </div>
  );
}


