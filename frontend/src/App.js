import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import AlertState from "./context/components/AlertState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {

  return (
    <>
      <AlertState>
      <NoteState>
          <Router>
            <Navbar/>
            <Alert />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home />}/>
                <Route exact path="/about" element={<About />}/>
                <Route exact path="/login" element={<Login />}/>
                <Route exact path="/signup" element={<Signup />}/>
              </Routes>
            </div>
          </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
