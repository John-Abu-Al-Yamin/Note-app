import React, { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
const UpdateNote = () => {
  const navigate = useNavigate();

  const [lodding, setLodding] = useState(true);
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#2c2c8c");

  const getNote = async () => {
    const res = await fetch(
      `https://back-end-note.onrender.com/api/v1/notes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
      }
    );
    const data = await res.json();
    setLodding(false);

    if (data.success) {
      setTitle(data.data.title);
      setDescription(data.data.description);
      setColor(data.data.color);
    }
  };

  useEffect(() => {
    getNote();
  }, []);

  const { id } = useParams();

  //  HandleSubmit
  const HandleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      title,
      description,
      color,
    };

    const res = await fetch(
      `https://back-end-note.onrender.com/api/v1/notes/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(note),
      }
    );
    const data = await res.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      setColor("");
      toast.success("Note Updated");
      navigate("/notes");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };


  if (lodding) {
    return <h1>Lodding</h1>;
  }

  return (
    <section>
      <div className="container">
        <form onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="TiTle"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >            <option value={"#2c2c6c"}>Study</option>
          <option value={"#2c2c8c"}>Tasks</option>
          <option value={"#2c2c3c"}>Work</option>
          <option value={"#1c2c3c"}>Travel</option>
          <option value={"#2db5ff"}>Date</option>
          </select>

          <button type="submit" className="btn btn-primary btn-register">
            Update Note
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateNote;
