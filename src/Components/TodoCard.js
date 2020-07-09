import React from 'react';
import propTypes from 'prop-types';
import '../CSS/TodoCard.css';

const TodoCard = props => {
  const handleClickTask = e => {
    if (/tasks__item/.test(e.target.className)) {
      const { updateTodoFunc, todo } = props;
      updateTodoFunc(todo.id);
    }
  };

  const handleClickTrashcan = () => {
    const { removeTodoFunc, todo } = props;
    removeTodoFunc(todo.id);
  };

  const { todo } = props;
  const taskStatus = todo.done ? 'done' : 'active';

  return (
    <>
      <section
        className={`tasks__item ${taskStatus}`}
        onClick={e => handleClickTask(e)}
        onKeyPress={e => handleClickTask(e)}
        role="button"
        tabIndex={0}
      >
        {todo.task}
        <i
          className="fas fa-trash-alt tasks__trashcan"
          onClick={() => handleClickTrashcan()}
          onKeyPress={() => handleClickTrashcan()}
          role="button"
          tabIndex={0}
          aria-label="Remove button"
        />
      </section>
    </>
  );
};

TodoCard.propTypes = {
  todo: propTypes.shape({
    id: propTypes.string.isRequired,
    task: propTypes.string.isRequired,
    done: propTypes.bool.isRequired,
  }).isRequired,
  updateTodoFunc: propTypes.func.isRequired,
  removeTodoFunc: propTypes.func.isRequired,
};

export default TodoCard;
