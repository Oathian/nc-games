import './App.css';
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import Main from "./components/Main"
import ReviewsByCategory from "./components/ReviewsByCategory"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/category/:category_name" element={<ReviewsByCategory />}/>
      </Routes>
    </div>
  );
}

export default App;
