import { useEffect, useState } from "react";
import "./header.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);


 async function gettodo() {
  const myapi = await fetch("http://localhost:3000/todos");
  const data = await myapi.json();
  setTodos(data);
}


  useEffect(() => {
    gettodo();
  }, []);

  
  async function addtodo() {
    if (title === "") return;

    const myapi = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        
      }),
    });

    const newTodo = await myapi.json();
    setTodos([...todos, newTodo]);
    setTitle("");
  };



  async function deletee(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: "DELETE",
  });


    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
}



function edit(todo) {
  setTitle(todo.title);
  setEditId(todo.id);
}

const changetitlee = (e) => {
  setTitle(e.target.value);
};



 async function change() {
    const myapi = await fetch(`http://localhost:3000/todos/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });

    const changetodo = await myapi.json();

    const changeee = todos.map((todo) =>
      todo.id === editId ? changetodo : todo
    );

    setTodos(changeee);
    setTitle("");
    setEditId(null);
  };

  return (
    <div className="box">
      <h2>Todo List</h2>

      <input
        className="inp"
        type="text"
        placeholder="Enter todo"
        value={title}
        onChange={changetitlee}
      />

      {editId ? (
        <button className="btnn" onClick={change}>
          Change
        </button>
      ) : (
        <button className="btnn" onClick={addtodo}>
          Add
        </button>
      )}

      <div className="item">
        {todos.map((todo) => (
          <div className="box-in" key={todo.id}>
            <span>{todo.title}</span>

            <div>
              <button
                className="btnn"
                onClick={() => edit(todo)}
              >
                Edit
              </button>
              <button
                className="btnn"
                onClick={() => deletee(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export {Todo};
