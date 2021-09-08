import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/user/login";
import CreateUser from "./components/user/createUser";
import { useState } from "react";
import Assistants from "./components/assistants/assistants";
import EditAssistant from "./components/assistants/editAssistant";
import AssistantState from "./context/assistant/assistantState";
import Home from "./components/home";
import Meetings from "./components/meetings/meetings";
import EditMeeting from "./components/meetings/editMeeting";

function App() {
  const [user, setUser] = useState();
  const [auth, setAuth] = useState();
  return (
    <div className="App">
      <AssistantState>
        <Router>
          <Switch>
            <Route exact path="/">
              <Login user={user} setUser={setUser} setAuth={setAuth} />
            </Route>
            <Route exact path="/create-user">
              <CreateUser user={user} setUser={setUser} />
            </Route>
            <Route exact path="/assistants">
              <Assistants auth={auth} />
            </Route>
            <Route exact path="/editassistant">
              <EditAssistant />
            </Route>
            <Route exact path="/home" component={Home} />
            <Route exact path="/meetings" component={Meetings} />
            <Route exact path="/editmeeting" component={EditMeeting} />
          </Switch>
        </Router>
      </AssistantState>
    </div>
  );
}

export default App;

//https://github.com/SalomonSada/visitors-app
