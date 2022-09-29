import React, { Component } from "react";

import "./todo-list-item.css";

class TodoListItem extends Component {
  // state = {
  //   done: false,
  //   important: false,
  // };
  // // стан зберігається у полі "state";
  // // "this.state" ініціалізується в конструкторі, або тілі класу;
  // // після ініціалізації "state" міняти напряму не можна!;
  // // щоб оновити значення "state" використовуємо "setState()"!;
  // // якщо залежить від попер. стану, то в "setState()" передаєм ф-ю,
  // // з аргументом --> поточним "state"!;

  // onLableClick = () => {
  //   this.setState(({ done }) => {
  //     // деструктуризація;
  //     return {
  //       done: !done,
  //     };
  //   });
  // };
  // // constructor() {
  // //   super();
  // //   this.onLableClick = () => {
  // //     console.log(`${this.props.label}`);
  // //   };
  // // }
  // // ф-я вище працює аналогічно конструктору в класі;

  // onMarkImportant = () => {
  //   this.setState((state) => {
  //     // без деструктуризації;
  //     return {
  //       important: !state.important,
  //     };
  //   });
  // };
  // // "setState" міняє лише ту частину стейту, яка передається!;

  render() {
    const { label, onDeleted, onToggleImportant, onToogleDone, important, done} = this.props;
    // const { done, important } = this.state;

    let classNames = "todo-list-item";
    if (important) {
      classNames += " badge-warning"; /* " important" */
    }

    if (done) {
      classNames += " done";
    }


    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick={onToogleDone}>
          {label}
        </span>

        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToogleDone}
        >
          <i className="fa fa-check" />
        </button>

        <button
          type="button"
          className="btn btn-outline-warning btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}>
          {/* передаємо "наверх" step B */}
          <i className="fa fa-trash-o" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;
