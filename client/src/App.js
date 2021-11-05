import React from 'react';
import './App.css';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Navbar from './components/include/Navbar';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Footer from './components/include/footer';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import ProtectedRoute from './components/include/ProtectedRoute';
import Header from './components/include/admin/Header';
import Sidebar from './components/include/admin/sidebar';
import Content from './components/include/admin/content';
import AddBook from './components/include/admin/addBook';
import BookList from './components/include/admin/bookList';
import BookLibrary from './components/pages/BookLibrary';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DisplayBook from './components/pages/DisplayBook';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/admin">
            <Header />
            <Sidebar />
            <Content />
          </Route>
          
          <Route path="/admin_add">
            <Header />
            <Sidebar />
            <AddBook />
          </Route>

          <Route path="/admin_books">
            <Header />
            <Sidebar />
            <BookList />
          </Route>


          <>
            <Navbar />
              <ProtectedRoute path="/home" component={Home}/>

              <ProtectedRoute path="/about" component={About}/>

              <ProtectedRoute path="/profile" component={Profile}/>

              <ProtectedRoute path="/library" component={BookLibrary} />

              <ProtectedRoute path="/book" component={DisplayBook} />
            <Footer />
          </>
        </Switch>
        
      </div> 
    </Router>
    
  );
}
export default App;
