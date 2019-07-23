import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/db";
import "./Dashboard.scss";

function AdminForm() {
  let [title, setTitle] = useState("");
  let [text, setText] = useState("");
  let [img, setImg] = useState("");
  let [link, setLink] = useState("");

  return (
    <div className="admin-form">
      <form
        className="form1"
        onSubmit={ev => {
          ev.preventDefault();
          db.collection("featured").add({
            title,
            text,
            img,
            created_at: new Date().getTime(),
            created_by: auth.currentUser.uid,
            link,
            up: 0,
            down: 0
          });
        }}
      >
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
        />
        <label>Link</label>
        <input
          type="text"
          value={link}
          onChange={ev => setLink(ev.target.value)}
        />
        <label>Description</label>
        <textarea value={text} onChange={ev => setText(ev.target.value)} />
        <label>Image URL</label>
        <input
          type="text"
          value={img}
          onChange={ev => setImg(ev.target.value)}
        />
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

function Entry({ data, verbose }) {
  return (
    <div className="entry">
      <div>
        <img src={data.img} className="logo" />
      </div>
      <div className="content">
        <div className="title">{data.title}</div>
        <div className="text">
          {verbose ? data.text : data.text.substring(0, 50) + "..."}
        </div>
      </div>
      <div className="up">{data.up}</div>
    </div>
  );
}

function DashBoard() {
  let [entries, setEntries] = useState([]);

  useEffect(() => {
    db.collection("featured")
      .orderBy("created_at", "desc")
      .limit(20)
      .get()
      .then(snapshot => setEntries(snapshot.docs));
  }, []);

  return (
    <div className="DashBoard">
      <div className="featured">
        {entries.length > 0 && (
          <Entry data={entries[0].data()} verbose={true} />
        )}
      </div>

      <div className="list">
        {entries
          .filter((v, i) => i !== 0)
          .map(entry => (
            <Entry key={entry.id} data={entry.data()} />
          ))}
      </div>

      {(auth.currentUser.uid === "LaURj6rZgxXOTQv01zJqWybUCMr2 " ||
        auth.currentUser.uid === "LaURj6rZgxXOTQv01zJqWybUCMr2") && (
        <AdminForm />
      )}
    </div>
  );
}

export default DashBoard;
