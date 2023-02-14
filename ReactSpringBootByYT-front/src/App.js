import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";
// import Input from "./components/input";
// import Todo from "./components/todo";

function App() {

  const baseUrl = "http://localhost:8081"

  const [input, setInput] = useState("");

  useEffect(() => {
    getTodos();
  }, [])

  async function getTodos() {
    await axios
    .get(baseUrl + "/todo")
    .then((response)=> {
        console.log(response)
        console.log(response.data)
    })
    .catch((error) =>{
      console.error(error);
    })


  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
    
  }
  
  return (
    <div className="App">
      <h1>Todo List</h1>
      <form>
        <label>
          Todo &nbsp;
          <input type="text" required={true} value={input} onChange={changeText}/>
        </label>
        <input type="submit" value="Create"/>
      </form>
    </div>
  );
}

export default App;
