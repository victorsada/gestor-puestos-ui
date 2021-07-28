import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/user/login";
import CreateUser from "./components/user/createUser";
import { useState } from "react";
function App() {
  const [user, setUserMain] = useState(); //
  const [createUser, setCreateUser] = useState();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setUserMain={setUserMain} />
          </Route>
          <Route exact path="/create-user">
            <CreateUser setCreateUser={setCreateUser} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
