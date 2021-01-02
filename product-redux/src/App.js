import React from 'react';
import './App.css';
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Home";
import EditProduct from './EditProduct';
import history from './history';

function App(props) {
       const store=props.store;
    return (
       <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <Home store={store}/>
                </Route>
                <Route path="/edit_product/" render={props => <EditProduct {...props} store={store} />} />
            </Switch>
        </Router>
    );
}

export default App;
