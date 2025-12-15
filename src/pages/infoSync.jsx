import React from "react";
import { useNavigate, useParams } from "react-router";
import { todo } from "../store/todo";

const InfoSync = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = todo.data.find(e => e.id == id);

  return (
    <>
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
      <section>
        <h1>{user.name}</h1>
        <p>{user.age}</p>
        <p className={user.status ? "text-green-500" : "text-red-500"}>{user.status ? "Active" : "Inactive"}</p>
      </section>
    </>
  );
};
export default InfoSync;
