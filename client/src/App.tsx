import {Route, Switch} from "react-router-dom";
import Homepage from "./pages/Homepage";
import LibraryLayout from "./layout/LibraryLayout";
import DetailedBookList from "./pages/DetailedBookList";
import AddNewLibrary from "./layout/LibraryLayout/AddNewLibrary";

function App() {
  return (
<div className='bg-gray-400'>
  <Switch>
    <Route path='/' exact component={Homepage} />
    <Route path='/kniznica/:slug' component={LibraryLayout}  />
    <Route path='/pridaj-kniznicu' component={AddNewLibrary} />
    <Route path='/test' component={DetailedBookList} />
  </Switch>
</div>
  );
}

export default App;
