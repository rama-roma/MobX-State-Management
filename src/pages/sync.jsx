import { observer } from 'mobx-react-lite';
import { todo } from '../store/todo';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { TextField, Modal, Button, Checkbox, Box } from '@mui/material'; // MUI Components
import { Link } from 'react-router';

const Sync = observer(() => {
  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newStatus, setNewStatus] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editStatus, setEditStatus] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAdd = () => {
    const age = parseInt(newAge);
    const newUser = {
      id: Date.now(),
      name: newName,
      age: age,
      status: newStatus
    }
    todo.addUser(newUser);
    setOpenAdd(false);
    setNewName("");
    setNewAge("");
    setNewStatus(false);
  };

  const handleEdit = () => {
    const age = parseInt(editAge);
    const updatedUser = {
      id: editId,
      name: editName,
      age: age,
      status: editStatus
    };
    todo.editUser(editId, updatedUser);
    setOpenEdit(false);
    setEditId(null);
    setEditName("");
    setEditAge("");
    setEditStatus(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const filteredUsers = todo.data.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && user.status) ||
      (filterStatus === "inactive" && !user.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <main>
        <div className="flex items-center justify-center gap-[20px] mb-5">
          <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
            Add User
          </Button>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            style={{ maxWidth: 300 }}
          />
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <section className="flex flex-wrap items-center justify-center gap-[20px]">
          {filteredUsers.map((e) => (
            <div
              key={e.id}
              className="flex flex-col items-center justify-center gap-[10px] border p-4 w-60 h-60 rounded-2xl"
            >
              <h1 style={{ fontSize: "20px" }}>{e.name}</h1>
              <p>{e.age}</p>
              <p className={e.status ? "text-green-500" : "text-red-500"}>
                {e.status ? "Active" : "Inactive"}
              </p>
              <div>
                <DeleteIcon onClick={() => todo.deleteUser(e.id)} />
                <EditIcon
                  onClick={() => {
                    setOpenEdit(true);
                    setEditId(e.id);
                    setEditName(e.name);
                    setEditAge(e.age);
                    setEditStatus(e.status);
                  }}
                />
                <Link to={`/infoSync/${e.id}`}>
                  <InfoIcon />
                </Link>
                <Checkbox checked={e.status} onClick={() => todo.checkout(e.id)} />
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Add Modal */}
      <Modal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        aria-labelledby="add-user-modal-title"
        aria-describedby="add-user-modal-description"
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <h2 id="add-user-modal-title">Add User</h2>
          <TextField
            label="Name"
            variant="outlined"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Age"
            variant="outlined"
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
            fullWidth
          />
          <div>
            <Checkbox
              checked={newStatus}
              onChange={(e) => setNewStatus(e.target.checked)}
            />
            Active
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleAdd}>
              Add
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpenAdd(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="edit-user-modal-title"
        aria-describedby="edit-user-modal-description"
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: 'white',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <h2 id="edit-user-modal-title">Edit User</h2>
          <TextField
            label="Name"
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Age"
            variant="outlined"
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
            fullWidth
          />
          <div>
            <Checkbox
              checked={editStatus}
              onChange={(e) => setEditStatus(e.target.checked)}
            />
            Active
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setOpenEdit(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
});

export default Sync;
