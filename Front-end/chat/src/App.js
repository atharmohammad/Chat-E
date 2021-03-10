import './App.css';
import Chat from './Chat'
import Messages from './Messages'
import Header from './Header'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Header>
        <Switch>
          <Route exact path='/' component={Chat} />
          <Route path='/:str' component={Messages} />
        </Switch>
        </Header>
    </div>
    </BrowserRouter>
  );
}

export default App;
