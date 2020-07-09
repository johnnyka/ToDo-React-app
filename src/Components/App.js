import React, { Component } from 'react';
import '../CSS/App.css';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.addTodo = this.addTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
  }

  componentDidMount() {
    this.fetchStoredData();
  }

  componentDidUpdate() {
    this.handleLocalStorage();
  }

  fetchStoredData() {
    let storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      storedTodos = JSON.parse(storedTodos);
      this.setState({ todos: storedTodos });
    }
  }

  handleLocalStorage() {
    const { todos } = this.state;
    if (todos.length === 0) {
      localStorage.removeItem('todos');
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  addTodo(newTodo) {
    const { todos } = this.state;
    this.setState({ todos: [...todos, newTodo] });
  }

  updateTodo(taskID) {
    const { todos } = this.state;
    const updatedTodos = todos.map(todo => {
      if (taskID === todo.id) {
        return ({
          id: todo.id,
          task: todo.task,
          done: !todo.done,
        });
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
  }

  removeTodo(taskID) {
    const { todos } = this.state;
    const updatedTodo = todos.filter(todo => taskID !== todo.id);
    this.setState({ todos: updatedTodo });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="app">
        <main className="app__todo">
          <h1 className="app__title">To do list</h1>
          <AddTodo addTodoFunc={newTodo => this.addTodo(newTodo)} />
          <TodoList
            todos={todos}
            updateTodoFunc={taskID => this.updateTodo(taskID)}
            removeTodoFunc={taskID => this.removeTodo(taskID)}
          />
        </main>
      </div>
    );
  }
}

export default App;
