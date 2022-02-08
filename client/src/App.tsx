import {Route, Switch} from "react-router-dom";
import Homepage from "./pages/Homepage";
import LibraryLayout from "./layout/LibraryLayout";
import DetailedBookList from "./pages/DetailedBookList";

function App() {
  return (
<div className='bg-gray-400'>
  <Switch>
    <Route path='/' exact component={Homepage} />
    <Route path='/library/:slug' component={LibraryLayout}  />
    <Route path='/test' component={DetailedBookList} />
  </Switch>
</div>
  );
}

export default App;
