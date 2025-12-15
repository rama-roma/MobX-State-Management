import { makeAutoObservable } from "mobx";

class Todos {
  data = [];
  API = "https://to-dos-api.softclub.tj/api/to-dos";

  constructor() {
    makeAutoObservable(this);
  }

  async getData() {
    try {
      const res = await fetch(this.API);
      const json = await res.json();
      this.data = json.data;
    } 
    catch (error) {
      console.error(error);
    }
  }

  async addUser(formData) {
    try {
      const res = await fetch(this.API, { method: "POST", body: formData });
      const newUser = await res.json();
      this.data.push(newUser.data || newUser);
    } 
    catch (error) {
      console.error(error);
    }
  }

  async editData(updatedUser) {
    try {
      await fetch(this.API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });
      await this.getData();
    } 
    catch (error) {
      console.error(error);
    }
  }

  async deleteUser(id) {
    try {
      await fetch(`${this.API}?id=${id}`, { method: "DELETE" });
      await this.getData();
    } 
    catch (error) {
      console.error(error);
    }
  }

  async toggleCompleted(id) {
    try {
      await fetch(`https://to-dos-api.softclub.tj/completed?id=${id}`, {
        method: "PUT",
      });
      this.getData();
    } 
    catch (error) {
      console.error(error);
    }
  }

  async addImage(formdata, id) {
    try {
      await fetch(`https://to-dos-api.softclub.tj/api/to-dos/${id}/images`, {
        method: "POST",
        body: formdata,
      });
      this.getData()
    } 
    catch (error) {
      console.error(error);
    }
  }

  async deleteImage(id) {
    try {
      await fetch(`${this.API}/images/${id}`, {
        method: "DELETE",
      });
      this.getData();
    } 
    catch (error) {
      console.error(error);
    }
  }
}

export const todos = new Todos();
