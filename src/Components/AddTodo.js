import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import propTypes from 'prop-types';
import '../CSS/AddTodo.css';

class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      task: '',
      done: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ task: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const inputValue = document.getElementById('inputField').value;
    if (inputValue !== '') {
      document.getElementById('inputField').value = '';

      await this.setState({ id: uuidv4() });

      const { addTodoFunc } = this.props;
      addTodoFunc(this.state);
    }
  }

  render() {
    return (
      <>
        <form className="todo__form" onSubmit={e => this.handleSubmit(e)}>
          <label className="form__label" htmlFor="inputField">
            Add a todo:
            <br />
            <input
              className="form__input"
              id="inputField"
              type="text"
              onChange={e => this.handleChange(e)}
            />
          </label>
          <input className="form__btn" type="submit" value="Add" />
        </form>
      </>
    );
  }
}

AddTodo.propTypes = {
  addTodoFunc: propTypes.func.isRequired,
};

export default AddTodo;
