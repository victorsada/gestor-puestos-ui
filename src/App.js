import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/user/login";
import CreateUser from "./components/user/createUser";
import { useState } from "react";
import Assistants from "./components/assistants/assistants";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route exact path="/create-user">
            <CreateUser user={user} setUser={setUser} />
          </Route>
          <Route exact path="/assistants">
            <Assistants />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
