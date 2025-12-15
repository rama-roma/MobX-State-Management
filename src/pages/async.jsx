import { observer } from "mobx-react-lite";
import { todos } from "../store/todos";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import { Input, Modal, Checkbox } from "antd";
import { Link } from "react-router-dom";

const Async = observer(() => {
  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIsCompleted, setNewIsCompleted] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIsCompleted, setEditIsCompleted] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [addFile, setAddFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    todos.getData();
  }, []);

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);
    formData.append("isCompleted", newIsCompleted ? "true" : "false");
    if (newImage) formData.append("Images", newImage);

    await todos.addUser(formData);

    setOpenAdd(false);
    setNewName("");
    setNewDescription("");
    setNewIsCompleted(false);
    setNewImage(null);
  };

  const handleEdit = async () => {
    const updatedUser = {
      id: editId,
      name: editName,
      description: editDescription,
      isCompleted: editIsCompleted,
    };
    await todos.editData(updatedUser);

    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditDescription("");
    setEditIsCompleted(false);
  };

  const handleAddImage = () => {
    const formData = new FormData();
    for (let i = 0; i < addFile.length; i++) {
      formData.append("images", addFile[i]);
    }
    todos.addImage(formData, id);
    setOpenModal(false);
    setAddFile(null);
  };

  const toggleCompleted = async (id) => {
    await todos.toggleCompleted(id);
  };


  return (
    <>
      <main>
        <div className="flex items-center justify-center gap-[20px] mb-5">
          <button onClick={() => setOpenAdd(true)}>Add User</button>
          <input
            placeholder="Search..."
            className="border p-2 rounded-[5px] w-140"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <section className="flex flex-wrap items-center justify-center gap-[20px]">
          {todos.data.map((e) => (
            <div
              key={e.id}
              className="flex flex-col items-center justify-center gap-[10px] border p-4 w-100 h-80 rounded-2xl"
            >
              {e.images.map((img) => (
                <div key={img.id} className="flex ">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={`https://to-dos-api.softclub.tj/images/${img.imageName}`}
                  />
                  <button onClick={() => {setOpenModal(true), setId(e.id)}}>+</button>
                  <button onClick={() => todos.deleteImage(img.id)}>-</button>
                </div>
              ))}
              <h1 style={{ fontSize: "20px" }}>{e.name}</h1>
              <p>{e.description}</p>
              <p className={e.isCompleted ? "text-green-500" : "text-red-500"}>
                {e.isCompleted ? "Active" : "Inactive"}
              </p>
              <div>
                <DeleteIcon onClick={() => todos.deleteUser(e.id)} />
                <EditIcon
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditDescription(e.description);
                    setEditIsCompleted(e.isCompleted);
                  }}
                />
                <Link to={`/infoAsync/${e.id}`}>
                  <InfoIcon />
                </Link>
                <Checkbox
                  checked={e.isCompleted}
                  onChange={() => toggleCompleted(e.id)}
                />
              </div>
            </div>
          ))}
        </section>
      </main>

      <Modal
        title="Add Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openAdd}
        onOk={handleAdd}
        onCancel={() => setOpenAdd(false)}
      >
        <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
        <Input
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <Checkbox
          checked={newIsCompleted}
          onChange={(e) => setNewIsCompleted(e.target.checked)}
        />
      </Modal>

      <Modal
        title="Edit Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openEdit}
        onOk={handleEdit}
        onCancel={() => setOpenEdit(false)}
      >
        <Input
          placeholder="Name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />
        <Input
          placeholder="Description"
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
        <Checkbox
          checked={editIsCompleted}
          onChange={(e) => setEditIsCompleted(e.target.checked)}
        />
      </Modal>

      <Modal
        title="Add Image Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModal}
        onOk={handleAddImage}
        onCancel={() => setOpenModal(false)}
      >
       <input type="file" onChange={(e) => setAddFile(e.target.files)} />
      </Modal>
    </>
  );
});

export default Async;
