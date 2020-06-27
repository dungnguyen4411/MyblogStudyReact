import React from 'react';
import './App.css';
import { Home } from "./Home/Home"
import { Blogs } from "./Blog/Blogs"
import BlogPost from "./Blog/BlogPost"
import { User } from "./User/User"
import {
  BrowserRouter as Router, Route, Redirect, Link, NavLink
} from "react-router-dom";
const user = localStorage.getItem("user");
function App() {
  return (
    <div className="container">
      <Router>
        <header className="App-header">
          <div className="col-12 text-center">
            <Link to="/" className="blog-header-logo text-dark">My Blog</Link>
          </div>
        </header>
        <div className="nav-scroller py-1 mb-2">
          <nav className="nav d-flex justify-content">
            <NavLink  exact to="/" className="p-2 text-muted" activeClassName="active" >Home</NavLink >
            {/* <li>
            <Link to="/about">About</Link>
          </li> */}
            <NavLink  to="/user" className="p-2 text-muted" activeClassName="active" >Users</NavLink >
            <NavLink  to="/blogs" className="p-2 text-muted" activeClassName="active" >Blog</NavLink >
          </nav>
        </div>
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/blogs/:blogid" render={(blogid) => <BlogPost blogData={blogid.match.params} />} />
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
      </Router>
      <div className="card">
        <div className="card-header">
          Quote
        </div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default App;
