# MobX State Management (Sync & Async)

A small educational project built with React + MobX using Vite.
The goal is to clearly demonstrate the difference between synchronous and asynchronous state management.

Simple structure, clean logic, zero overengineering.

🚀 Tech Stack

React

MobX

Vite

JavaScript (ES6+)

JSON Server (for async data)


📂 Project Structure
src/
├─ pages/
│  ├─ home.jsx        # Main page
│  ├─ sync.jsx        # Sync state example
│  ├─ async.jsx       # Async state example
│  ├─ infoSync.jsx   # Sync explanation page
│  └─ infoAsync.jsx  # Async explanation page
│
├─ store/
│  ├─ todo.js        # Single todo store
│  └─ todos.js       # Todos collection store
│
├─ App.jsx
├─ layout.jsx
├─ main.jsx
└─ index.css


✨ Features
🔹 Sync State

Instant state updates

No API calls

Pure MobX reactivity

🔹 Async State

Fetching data from mock API

Async actions

Loading & data flow handling