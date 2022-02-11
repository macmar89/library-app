import { Route, Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { LibraryLayout } from "./components/LibraryLayout";
import AddNewLibrary from "./pages/AddNewLibrary";
import EditLibrary from "./pages/EditLibrary";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <div className="bg-gray-400">
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/kniznica/:slug" component={LibraryLayout} />
        <Route path="/pridaj-kniznicu" component={AddNewLibrary} />
        <Route path="/uprav-kniznicu/:slug" component={EditLibrary} />
        <Route path="/*" component={NoMatch} />
      </Switch>
    </div>
  );
}

export default App;
