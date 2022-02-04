import {Route, Switch} from "react-router-dom";
import Homepage from "./pages/Homepage";
import LibraryDashboard from "./pages/LibraryDashboard";
import BookDetail from "./pages/BookDetail";
import UserDetail from "./pages/UserDetail";

function App() {
  return (
<div className='bg-gray-400'>
  <Switch>
    <Route path='/' exact component={Homepage} />
    <Route path='/:slug' component={LibraryDashboard}  />
    <Route path='/:librarySlug/:bookSlug' component={BookDetail} />
    <Route path='/:librarySlug/:userSlug' component={UserDetail} />
  </Switch>
</div>
  );
}

export default App;
