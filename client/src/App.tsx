import {Route, Switch} from "react-router-dom";
import Homepage from "./pages/Homepage";
import BookDetail from "./pages/BookDetail";
import LibraryLayout from "./layout/LibraryLayout";

function App() {
  return (
<div className='bg-gray-400'>
  <Switch>
    <Route path='/' exact component={Homepage} />
    <Route path='/library/:slug' component={LibraryLayout}  />
    <Route path='/test' component={BookDetail} />
  </Switch>
</div>
  );
}

export default App;
