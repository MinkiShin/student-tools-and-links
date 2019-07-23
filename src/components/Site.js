import React, { useState, useEffect } from "react";
import { auth } from "../utils/db";
import "./Site.scss";

function Site({ site, onDelete, doVote, voted }) {
  let site2 =
    site.data().url.substring(0, 4) === "http"
      ? site
      : "https://" + site.data().url;

  let alreadyVoted = voted.indexOf(site.id) >= 0;
  let data = site.data();

  return (
    <div className="Site">
      <div className="title">
        <a href={site2} target="_blank">
          {data.url.substring(0, 4) === "http"
            ? data.url.split("://")[1]
            : data.url}
        </a>
        <div className="small-font">
          (+{data.up} / -{data.down})
        </div>
        <div className="icons">
          {data.up > 10 && data.up / data.down > 2 && (
            <i className="fas fa-trophy" />
          )}
        </div>
      </div>

      <div className="right">
        <div className="posted-by">
          by{" "}
          <strong>{data.email ? data.email.split("@")[0] : "anonymous"}</strong>
        </div>

        {data.uid && data.uid === auth.currentUser.uid ? (
          <button onClick={() => onDelete(site.id)}>x</button>
        ) : (
          <React.Fragment>
            <button
              onClick={() => doVote(site.id, 1, 0)}
              disabled={alreadyVoted}
            >
              +
            </button>
            <button
              onClick={() => doVote(site.id, 0, 1)}
              disabled={alreadyVoted}
            >
              -{" "}
            </button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Site;
