import './App.css';
// import Header from './components/Header';
import Home from './components/Home';
import {Route, Routes} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Layout from './Layout';
import CreatePost from './components/CreatePost';
import { UserContextProvider } from './UserContext';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';

function App() {
  return (
    <div className="main w-screen min-h-screen my-0 mx-auto text-gray-900 bg-gradient-to-b from-zinc-50 to-sky-100">
      <UserContextProvider>

        <Routes >
          <Route path = {'/'} element = { <Layout /> }>

            <Route index element = {<Home />}/>

            <Route path = {'/login'} element = {<Login/>}/>

            <Route path = {'/register'} element = {<Register/>}/>

            <Route path = {'/create'} element = {<CreatePost/>}/>

            <Route path={'/post/:id'} element = {<PostPage/>}/>

            <Route path = {'/edit/:id'} element = {<EditPost/>}></Route>

          </Route>
        </Routes>

      </UserContextProvider>
      
    </div>
      
  );
}

export default App;
