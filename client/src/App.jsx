import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/Notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {

  const [alert, setAlert] = useState(null);
  const showAlert = (massage) => {
    setAlert({
      massage: massage,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="sticky-top" style={{ height: "20px" }}>
            <Alert alert={alert} />
          </div>
          <div className='container'>
            <Routes>
              {/* Use element prop to specify the component */}
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </NoteState>
    </>
  );
}

export default App;
