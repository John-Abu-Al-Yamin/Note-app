import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { toast } from "react-toastify";

const CreateNote = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#2c2c6c");
  const navigate = useNavigate();

  const { user } = useAuth();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const note = {
      title,
      description,
      color,
    };
    const res = await fetch(`https://back-end-note.onrender.com/api/v1/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();

    if (data.success) {
      setTitle("");
      setDescription("");
      setColor("#2c2c6c");
      toast.success("Note Created");
      navigate("/notes");
    }
    if (!data.success) {
      toast.error(data.error);
    }
  };

  return (
    <section>
      <div className="container">
        <form onSubmit={HandleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value={"#2c2c6c"}>Study</option>
            <option value={"#2c2c8c"}>Tasks</option>
            <option value={"#2c2c3c"}>Work</option>
            <option value={"#1c2c3c"}>Travel</option>
            <option value={"#2db5ff"}>Dates</option>
          </select>

          <button type="submit" className="btn btn-primary btn-register">
            Creat Note
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateNote;
