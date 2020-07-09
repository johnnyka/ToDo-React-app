import React from 'react';
import propTypes from 'prop-types';
import TodoCard from './TodoCard';
import '../CSS/TodoList.css';

const TodoList = props => {
  const { todos, updateTodoFunc, removeTodoFunc } = props;
  const activeTasks = todos.filter(todo => !todo.done).length;
  const doneTasks = todos.length - activeTasks;

  return (
    <>
      <section className="todo__status">
        <span className="status__actives">{`Active: ${activeTasks}`}</span>
        <span className="status__dones">{`Done: ${doneTasks}`}</span>
      </section>
      <section className="todo__tasks">
        <p className="tasks__separator" />
        {
          todos.map(todo => (
            <TodoCard
              todo={todo}
              key={todo.id}
              updateTodoFunc={taskID => updateTodoFunc(taskID)}
              removeTodoFunc={taskID => removeTodoFunc(taskID)}
            />
          ))
        }
      </section>
    </>
  );
};

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired,
    task: propTypes.string.isRequired,
    done: propTypes.bool.isRequired,
  })).isRequired,
  updateTodoFunc: propTypes.func.isRequired,
  removeTodoFunc: propTypes.func.isRequired,
};

export default TodoList;
