import React, { useState, useEffect } from "react";
import { db, auth, firebase } from "../utils/db";
import Site from "../components/Site";
import { withRouter } from "react-router";

function SitesFromProps({ mode }) {}

function SitesFromUrl({ location }) {
  let [sites, setSites] = useState([]);
  let [url, setUrl] = useState("");
  let [voted, setVoted] = useState([]);

  async function addSite(url) {
    let docRef = await db.collection("sites").add({
      url,
      up: 0,
      down: 0,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      created_at: new Date()
    });
    let doc = await db
      .collection("sites")
      .doc(docRef.id)
      .get();
    setSites([...sites, doc]);
  }

  async function deleteSite(id) {
    await db
      .collection("sites")
      .doc(id)
      .delete();
    setSites(sites.filter(l => l.id !== id));
  }

  async function doVote(id, up, down) {
    if (voted.indexOf(id) >= 0) {
      return;
    }

    let voted_new = [...voted, id];
    if (voted_new.length > 100) voted_new.splice(0, 1);
    setVoted(voted_new);
    localStorage.setItem("voted", JSON.stringify(voted_new));

    let doc = sites.find(l => l.id === id);
    await db
      .collection("sites")
      .doc(id)
      .update({
        up: firebase.firestore.FieldValue.increment(up),
        down: firebase.firestore.FieldValue.increment(down)
      });

    doc = await db
      .collection("sites")
      .doc(id)
      .get();

    setSites(sites.map(l => (l.id === id ? doc : l)));
  }

  useEffect(() => {
    async function loadSite() {
      let sites;
      let mode = location.pathname.split("/")[1];

      switch (mode) {
        case "my":
          sites = await db
            .collection("sites")
            .where("uid", "==", auth.currentUser.uid)
            .orderBy("created_at", "desc")
            .limit(20)
            .get();
          break;
        case "all":
          sites = await db
            .collection("sites")
            .orderBy("created_at", "desc")
            .limit(20)
            .get();
          break;
        case "popular":
          sites = await db
            .collection("sites")
            .orderBy("up", "desc")
            .limit(20)
            .get();
        default:
          break;
      }

      setSites(sites.docs);

      let voted = JSON.parse(localStorage.getItem("voted"));
      if (voted !== null) setVoted(voted);
    }
    loadSite();
  }, []);

  return (
    <div>
      <h1>Sites</h1>
      {sites.map(site => (
        <Site
          key={site.id}
          site={site}
          onDelete={deleteSite}
          doVote={doVote}
          voted={voted}
        />
      ))}

      <form
        onSubmit={ev => {
          ev.preventDefault();
          addSite(url);
          setUrl("");
        }}
      >
        <input value={url} onChange={ev => setUrl(ev.target.value)} />
        <button>Add URL</button>
      </form>
    </div>
  );
}

let SitesFromUrl2 = withRouter(SitesFromUrl);

export { SitesFromUrl2, SitesFromProps };
