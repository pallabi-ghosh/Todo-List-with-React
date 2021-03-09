/**
 *
 * Welcome to the Student frontend developer challenge!
 *
 * Your task is to complete a simple Todo app in React. I've left in some partial code
 * for you to get started on.
 *
 * Once finished, users should be able to do the following:
 *
 * 1. "Add a todo". Todo is added, when the user types in a text for the todo in the form
 * and presses the "Add" button. Users should not be able to add empty todos. Text field
 * should be cleared once a todo is added. Te added todo should show up at the top of the Todo list.
 *
 * 2. "Show todos". The user should be able to see all added todos.
 *
 * 3. "Complete a todo". When user clicks a checkbox next to the todo, the "complete" state
 * of that Todo should toggle to the opposite value and that state should be reflected in the checkbox
 * i.e. if "complete" is true, checkbox is "checked", else it is "unchecked".
 *
 * 4. "Remove a todo". Once "Remove" button is clicked, the given todo should be removed
 * from the state and also disappear from the todo list.
 *
 * 5. The app should be styled, preferably using https://emotion.sh/, however, any styling
 * approach is acceptable.
 *
 * Note: As much as possible, please try to keep the given boiler plate code so that you can
 * showcase your ability to work with given parameters.
 *
 */

import React from "react";
import "./styles.css";
import styled from "@emotion/styled";
import { Form } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";

function Todo({ todo, index, onRemove, onToggleComplete }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <Button onClick={() => onToggleComplete(index)}>Complete</Button>
        <Button onClick={() => onRemove(index)}>x</Button>
      </div>
    </div>
  );
}

function CreateTodo({ onCreate }) {
  const [value, setValue] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    onCreate(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="type new todo" />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
    </form>
  );
}

function Todos() {
  const [todos, setTodos] = React.useState([
    {
      id: uuidv4(),
      text: "Complete assignment",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      text: "Learn about React",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      text: "Build really cool todo app",
      isCompleted: false,
    },
    {
      id: uuidv4(),
      text: "Meet friend for lunch",
      isCompleted: false,
    },
  ]);

  const onCreate = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const onToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const onRemove = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Container>
      <H1 color="white">Todo List</H1>
      <Wrapper>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onRemove={onRemove}
          />
        ))}
        <CreateTodo onCreate={onCreate} />
      </Wrapper>
    </Container>
  );
}
const Container = styled("div")`
  display: flex;
  overflow: hidden;
  justify-content: center;
  background: #04b38d;
  height: 100vh;
  padding: 30px;
  align-items: center;
  font-family: "Source Sans Pro", sans-serif;
  flex-direction: column;
  box-shadow: 0 0 5px rgba(25, 25, 25, 0.25);
`;
const Button = styled.button`
  padding: 3px;
  background-color: #04b38d;
  font-size: 12px;
  border-radius: 4px;
  color: black;
  font-weight: light;
  margin: 3px;
  &:hover {
    color: white;
  }
`;
const Wrapper = styled("div")`
  background: #e8e8e8;
  border-radius: 4px;
  width: 50vh;
  padding: 5px;
  margin: 60px auto;
`;
const H1 = styled.h1(
  {
    fontSize: 35
  },
  props => ({ color: props.color })
)

export default function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}
