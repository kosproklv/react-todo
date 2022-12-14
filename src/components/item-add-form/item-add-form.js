import React, { Component } from "react";

import "./item-add-form.css";

class ItemAddForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { label } = this.state;
    this.setState({ label: "" });
    const cb = this.props.onItemAdded || (() => {});
    cb(label);
  };

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          maxLength={70}
          autoComplete="off"
          className="form-control new-todo-label"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          required
          tabIndex={1}
        />
        <button type="submit" className="btn btn-secondary" tabIndex={2}>
          Add
        </button>
      </form>
    );
  }
}

export default ItemAddForm;
