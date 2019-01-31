import React, { Component } from 'react';
import './App.css';
import About from './component/about';
import Nav from './component/nav';
import Home from './component/home';
import Post from './component/post';
import PostList from './containers/PostsContainer';

import { BrowserRouter as Router, Route } from "react-router-dom";


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <div className="page">
            <Route exact path="/" component={Home}/>
            <Route exact path="/post" component={PostList}/>
            <Route path="/about" component={About}/>
            <Route path="/post/:postId" component={Post}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
