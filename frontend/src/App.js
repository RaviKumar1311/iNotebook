import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import AlertState from "./context/components/AlertState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";

function App() {

  return (
    <>
      <AlertState>
      <NoteState>
          <Router>
            <Navbar/>
            <Profile/>
            <Alert />
           
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<Signup />}/>
                <Route exact path='/profile' element={<Profile/>}/>
              </Routes>
      
          
          </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
