import './styles/App.css';
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import GamesList from "./components/GamesList"
import SingleReview from './components/SingleReview';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react"
import { UserContext } from "./contexts/User";

function App() {
  const [user] = useState("happyamy2016");

  return (
    <UserContext.Provider value={{ user }}>
    <div className="App">
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<GamesList />}/>
        <Route path="/category/:category_name" element={<GamesList />}/>
        <Route path="/reviews/:review_id" element={<SingleReview />}/>
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
