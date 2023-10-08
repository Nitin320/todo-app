"use client"
import React, { useState } from 'react'
import './main.css'
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './todo'

export default function Home() {

  const [todos, setTodos] = useState(['Do the Dishes', 'Eat Food'])

  return (
    <main>

      <div className="todo-main">
        <div className="todo-header">Todo-App</div>
        <div className="todo-addition">
          <input type="text" placeholder='Enter your todo...'/>
          <button><AiOutlinePlus/></button>
        </div>
      </div>

      <Todo/>
      
    </main>
  )
}
