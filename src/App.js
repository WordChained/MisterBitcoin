import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader';
import ContactPage from './pages/ContactPage';
import StatisticsPage from './pages/StatisticsPage';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import ContactEditPage from './pages/ContactEditPage'
import { SignupPage } from './pages/Signup';
import { Login } from './pages/Login';
import { connect } from 'react-redux';


import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
function _App({ loggedinUser }) {

  const PrivateRoute = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return loggedinUser ? <Route path={props.path} component={props.component} /> : <Redirect to="/login" />
  }
  const BackHome = (props) => {
    // return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />
    return !loggedinUser ? <Route path={props.path} component={props.component} /> : <Redirect to="/" />
  }

  return (
    <Router>
      <main className="App">
        <AppHeader />
        <Switch>
          <PrivateRoute path="/edit/:id?" component={ContactEditPage} />
          <PrivateRoute path="/details/:id" component={ContactDetailsPage} />
          <PrivateRoute path="/statistics" component={StatisticsPage} />
          <PrivateRoute path="/contacts" component={ContactPage} />
          <Route path="/signup" component={SignupPage} />
          <BackHome path="/login" component={Login} />
          <PrivateRoute exact path="/" component={HomePage} />
        </Switch>
      </main>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    loggedinUser: state.userModule.loggedinUser,
  }
}

export const App = connect(mapStateToProps)(_App)