import React, { useState } from "react";
import { auth, db } from "../utils/db";

function DoSignup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [name, setName] = useState("");

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={async ev => {
          ev.preventDefault();
          let userRef = await auth.createUserWithEmailAndPassword(
            email,
            password
          );
        }}
      >
        <input
          type="text"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
          placeholder="password"
        />
        <input
          type="name"
          value={name}
          onChange={ev => setName(ev.target.value)}
          placeholder="username"
        />

        <button>Signup</button>
      </form>
    </div>
  );
}

function DoLogin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={ev => {
          ev.preventDefault();
          auth
            .signInWithEmailAndPassword(email, password)
            .catch(err => console.log(err.message));
        }}
      >
        <input
          type="text"
          value={email}
          onChange={ev => setEmail(ev.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}

function Login() {
  let [mode, setMode] = useState("login");

  return (
    <div>
      {mode === "login" && (
        <div>
          <DoLogin />
          <div className="as-a" onClick={() => setMode("signup")}>
            If you are not a member, sign up
          </div>
        </div>
      )}
      {mode !== "login" && (
        <div>
          <DoSignup />
          <div className="as-a" onClick={() => setMode("login")}>
            If you are already a member, log in
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
