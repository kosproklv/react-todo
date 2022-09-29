import React, { Component } from "react";

import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import TodoList from "../todo-list/todo-list";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import ItemAddForm from "../item-add-form/item-add-form";

import "./app.css";

class App extends Component {
  newId = 1;

  state = {
    todoData: [
      // { label: "Drink Coffee", important: false, id: 1 },
      // { label: "Make Awesome App", important: true, id: 2 },
      // { label: "Have a lunch", important: false, id: 3 },
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    // коли додали метод "createTodoItem", ми можем переписати список завдань з допомогою нього
    term: '',
    filter: 'all', /* active, all, done */
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.newId++,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const updatedTodoData = [
        ...todoData.slice(0, idx),
        ...todoData.slice(idx + 1),
        // коли задаємо один аргумент, то метод бере від нього і до кінця;
      ];
      // splice використовувати не можна, бо він змінює напряму поточний стейт (масив справ)
      // тому використовуємо slice, який дозволяє копіювати частину масиву, не змінюючи його
      // а потім об'єднуємо без видаленого ітему (справи);

      return {
        todoData: updatedTodoData,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const updatedTodoData = [...todoData, newItem];

      return {
        todoData: updatedTodoData,
      };
    });
  };

  onToggleImportant = (id) => {
    this.setState( ({ todoData }) => {
      return {
        todoData: this.onToggleProperty(todoData, id, 'important')
      }
    })
  };

  onToggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ];
  }

  onToogleDone = (id) => {
    this.setState( ({ todoData }) => {
      // const idx = todoData.findIndex((el) => el.id === id);

      // const oldItem = todoData[idx];
      // const newItem = {...oldItem, done: !oldItem.done};

      // const updatedTodoData = [
      //   ...todoData.slice(0, idx),
      //   newItem,
      //   ...todoData.slice(idx + 1),
      //   // тут ми об'єднуємо  всі значення старого масиву до зміненого елемента + 
      //   // далі додаємо новий елемент(змінене значення "done") + 
      //   // далі додаємо всі інші "старі" ітеми з масиву
      // ];

      // return {
      //   todoData: updatedTodoData
      // }
      return {
        todoData: this.onToggleProperty(todoData, id, 'done')
      }
      // тепер ми рефакторим код, щоб не дублювати його, 
      // а користуватись одним методом для "done" і "important"
    })
  };

  searchItems(items, term) {
    if(term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    })
    // щоб пошук був кейсінсенсітів, можем використати "toLowerCase"
  }

  filterItems(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done)
      default :
        return items;
    }
  }

  onToggleSearch = (term) => {
    this.setState({term});
  }

  onToggleFilter = (filter) => {
    this.setState({filter});
  }

  render() {

    const {todoData, term, filter} = this.state;

    // const doneCount = this.state.todoData.filter((el) => el.done).length;
    // const todoCount = this.state.todoData.length - doneCount;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filterItems(this.searchItems(todoData, term), filter);

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex flex-wrap">
          <SearchPanel onSearchChange={this.onToggleSearch} />
          <ItemStatusFilter filter={filter} onFilterChange={this.onToggleFilter} />
        </div>
        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          // передаємо "наверх" step C
          onToggleImportant={this.onToggleImportant}
          onToogleDone={this.onToogleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}

export default App;
