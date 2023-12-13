import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route path="/add" component={AddBook} />
          <Route path="/update/:id" component={UpdateBook} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
