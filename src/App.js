import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';


// Contexts
import {AuthContextProvider } from './contexts/AuthContext'

// Hooks
import { useAuthentication } from './hooks/useAuthentication';

// Pages
import Home from './pages/home/Home'
import About from './pages/about/About'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Dashboard from './pages/dashboard/Dashboard'
import CreatePost from './pages/createPost/CreatePost'
import Search from './pages/search/Search';
import Posts from './pages/posts/Posts';
import EditPost from './pages/editPost.js/EditPost';

// Components
import NavBar from './components/NavBar';
import Footer from './components/Footer';



function App() {

  const [ user, setUser ] =useState(undefined)
  const {auth} = useAuthentication()


  const loadingUser = user === undefined

  useEffect( ()=>{
    onAuthStateChanged(auth, user =>{
      setUser(user)
    })
  }, [auth]  )

  if(loadingUser) return <p> carregando ... </p>

  return (
    <div className="App">
      <AuthContextProvider value={{user}} >
      <BrowserRouter>
          <NavBar/>
          <div className="container">
            <Routes>
                {/* Public Roues  */}
              <Route path='/' element={ <Home/> } />
              <Route path='/about' element={ <About/> } />
              <Route path='/search' element={ < Search /> } />
              <Route path='/posts/:id' element={ < Posts /> } />
              <Route path='/search/posts/:id' element={ < Posts /> } />
                {/* Private Roues  */}
              <Route path='/login' element={ !user? <Login/>: <Navigate to='/'/> } />
              <Route path='/register' element={ !user? <Register/>: <Navigate to='/'/> } />
              <Route path='/posts/create' element={ user? <CreatePost/>: <Navigate to='/'/> } />
              <Route path='/posts/edit/:id' element={ user? <EditPost/>: <Navigate to='/'/> } />
              <Route path='/dashboard' element={ user? <Dashboard/>: <Navigate to='/'/> } />
            </Routes>
          </div>
          <Footer/>
        </BrowserRouter>  
      </AuthContextProvider>     
    </div>
  );
}

export default App;

