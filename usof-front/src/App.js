import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import PostsPage from './pages/PostsPage'
import PostPage from './pages/PostPage'
import CategoryPostsPage from './pages/CategoryPostsPage'
import CategoriesPage from './pages/CategoriesPage'
import CategoryPage from './pages/CategoryPage'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import ProfilePage from './pages/ProfilePage'
import PasswordReset from './pages/PasswordReset'

import AppHead from './components/AppHead'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  return (
    <div>
      <Router>
        <AppHead />
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/login' exact component={LoginPage}/>
          <Route path='/registration' exact component={RegistrationPage}/>
          <Route path='/profile' exact component={ProfilePage}/>
          <Route path='/posts' exact component={PostsPage}/>
          <Route path='/post' exact component={PostPage}/>
          <Route path='/category-posts' exact component={CategoryPostsPage}/>
          <Route path='/categories' exact component={CategoriesPage}/>
          <Route path='/category' exact component={CategoryPage}/>
          <Route path='/users' exact component={UsersPage}/>
          <Route path='/user' exact component={UserPage}/>
          <Route path='/passreset' exact component={PasswordReset}/>
        </Switch>
      </Router>
    </div>
  );
}

//const styles = { }
