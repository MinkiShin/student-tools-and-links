import React, { useState } from "react";
import Login from "./pages/Login";
import { auth } from "./utils/db";
import { BrowserRouter, Route } from "react-router-dom";
import Nav from "./components/Nav";
import { SitesFromUrl2 } from "./pages/Sites";
import DashBoard from "./pages/Dashboard";

function App() {
  let [loggedIn, setLoggedin] = useState(false);

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) setLoggedin(true);
      else setLoggedin(false);
    });
  }, []);

  if (!loggedIn) return <Login />;

  console.log(auth.currentUser.uid);

  return (
    <BrowserRouter>
      <div>
        <Nav />

        <Route exact path="/" component={DashBoard} />
        <Route path="/my" component={SitesFromUrl2} />
        <Route path="/all" component={SitesFromUrl2} />
        <Route path="/popular" component={SitesFromUrl2} />
      </div>
    </BrowserRouter>
  );
}

export default App;
