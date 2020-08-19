import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import VideoCollection from "./Components/VideoCollection";

import "materialize-css/dist/css/materialize.min.css";
import Homepage from "./Components/Homepage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/meet/:roomId" component={VideoCollection} />
      </Switch>
    </Router>
  );
};

export default App;
