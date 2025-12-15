import { makeAutoObservable } from "mobx";

class Todo {
  data = [
    { id: 1, name: "Ramziya", age: 16, status: false },
    { id: 2, name: "Saiddamir", age: 13, status: true },
    { id: 3, name: "Polina", age: 12, status: false },
    { id: 4, name: "Kurbon", age: 23, status: true },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  deleteUser(id) {
    this.data = this.data.filter((e) => e.id !== id);
  }

  addUser(user) {
    this.data.push(user);
  }

  editUser(id, updatedUser) {
    this.data = this.data.map((e) =>
      e.id === id ? { ...e, ...updatedUser } : e
    );
  }
  checkout(id) {
    this.data = this.data.map((e) =>
      e.id === id ? { ...e, status: !e.status } : e
    );
  }

}

export const todo = new Todo();
