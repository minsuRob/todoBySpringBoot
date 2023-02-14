import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
// import Input from "./components/input";
// import Todo from "./components/todo";

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
          todos.map((todo) => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
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
      <form onSubmit={insertTodo}>
        <label>
          Todo &nbsp;
          <input type="text" required={true} value={input} onChange={changeText}/>
        </label>
        <input type="submit" value="Create"/>
      </form>

      {
        todos
        ? todos.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
                <h3>
                  <label className = {todo.completed ? "completed" : null}
                    onClick={()=> updateTodo(todo.id)}>
                    {todo.todoName}
                  </label>
                  <label onClick={() => deleteTodo(todo.id)}>&nbsp;&nbsp;❌</label>
                </h3>
            </div>
          )
        })
        : null
      }
    </div>
  );
}

export default App;
