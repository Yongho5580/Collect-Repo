import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./routes/Home";
import Collection from "./routes/Collection";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Router>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/collection" component={Collection}></Route>
          </Router>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
