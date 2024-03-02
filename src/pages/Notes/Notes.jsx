import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/auth";
import { Link } from "react-router-dom";
import "./Notes.css";
const Notes = () => {
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();
  const [lodding, setLodding] = useState(true);

  const HandleDeletNote = async (id) => {
    const res = await fetch(`https://back-end-note.onrender.com/api/v1/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const data = await res.json();

    setNotes(notes.filter((note) => note._id !== id));

    if (data.success) {
      toast.success("Note deleted");
    }
  };

  const getAllNotes = async () => {
    const res = await fetch(`https://back-end-note.onrender.com/api/v1/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user}`,
      },
    });
    const data = await res.json();
    setLodding(false);
    // console.log(data);

    if (data.success) {
      setNotes(data.data);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllNotes();
  }, []);
 
  if (lodding) {
    return <h1>Lodding Page</h1>;
  }
  return (
    <section>
      <div className="container">
        {notes.length === 0 && (
          <div className="card-note">
            <div className="cards">
              <article className="card">
                <div className="card">
                  <h1>No Note Found</h1>
                </div>
                <div className="btn-card">
                  <button className="btn-create-note">
                    <Link to="/notes/create">Create Note</Link>
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

        <div className="card-note">
          {notes.map((note) => (
            <div className="cards">
              <article className="card" style={{ background: note.color }}>
                <h2>{note.title}</h2>
                <p>{note.description}</p>

                <div className="btn-card">
                  <button
                    className="delete-note"
                    onClick={() => HandleDeletNote(note._id)}
                  >
                    Delete
                  </button>
                  <button className="update-note">
                    <Link to={`/notes/update/${note._id}`}>Update Note</Link>
                  </button>
                </div>
              </article>
            </div>
          ))}
          <button className="btn-create-note">
            <Link to="/notes/create">Create Note</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Notes;

//   <button onClick={() => HandleDeletNote(note._id)}>Delete</button>
// <button>
//   <Link to={`/notes/update/${note._id}`}>Update Note</Link>
//  </button>

// <div className="about-cards">
// <article className='about-card'>
//   <FaAward className='about-icon'/>
//   <h5>Experience</h5>
//   <small>1 Year Working</small>
// </article>
// </div>
{
  /* <button className="btn-create-note">
<Link to="/notes/create">Create Note</Link>
</button> */
}
