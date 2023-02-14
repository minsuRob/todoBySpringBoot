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
                <label onClick={null}>
                  <h3>{todo.todoName}</h3>
                </label>
            </div>
          )
        })
        : null
      }
    </div>
  );
}

export default App;
