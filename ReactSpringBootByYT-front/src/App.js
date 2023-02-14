import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

function App() {

  const baseUrl = "http://localhost:8081"

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos() {
    await axios
    .get(baseUrl + "/todo")
    .then((response)=> {
        setTodos(response.data);
    })
    .catch((error) =>{
      console.error(error);
    })


  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  
  function insertTodo(e) {
    e.preventDefault();

    const insertTodo = async () => {
      await axios.post(baseUrl + "/todo", {
        todoName: input
      })
      .then((response) => {
        console.log(response.data)
        setInput("");
        getTodos();
      })
      .catch((error)=> {
        console.error(error);
      })
    }

    insertTodo();
    console.log("add a todolist")
    // update todo refactor 작업을 해당 함수에서도 가능함
  }

    
  function updateTodo(id) {

    const updateTodo = async () => {
      await axios.put(baseUrl + "/todo/" + id, {
        todoName: input
      })
      .then((response) => {
        console.log(response.data)
        // getTodos();
        // reduce resource by front 

        setTodos(
          todos.map((todo) => {
            let a;
            if(todo.id === id) {
              //console.log(...todo);
              a = {...todo, completed: !todo.completed}
            } else {
              a = todo;
            }
            return a;
          }
          )
          // Need to check a spread function
        )
      })
      .catch((error)=> {
        console.error(error);
      })
    }

    updateTodo();
    console.log("add a todolist")
  }

  function deleteTodo(id) {
    const deleteTodo = async () => {
      await axios.delete(baseUrl + "/todo/" + id, {
        todoName: input
      })
      .then((response) => {
        console.log(response.data)
        // getTodos();
        // reduce resource by front 

        setTodos(
          todos.filter((todo) => todo.id != id)
        ) // filter check
      })
      .catch((error)=> {
        console.error(error);
      })
    }
    deleteTodo();
  }
  
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Input handleSubmit={insertTodo} input={input} handleChange={changeText}/>

      {
        todos
        ? todos.map((todo) => {
          return (
            <Todo key={todo.id} todo={todo} handleClick={()=> updateTodo(todo.id)}
            handleDelete={() => deleteTodo(todo.id)}/>
          )
        })
        : null
      }
    </div>
  );
}

export default App;
