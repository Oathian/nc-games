import './styles/App.css';
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ReviewsList from "./components/ReviewsList";
import SingleReview from './components/SingleReview';
import ErrorPage from "./components/ErrorPage";
import SignIn from "./components/SignIn";
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import { UserContext } from "./contexts/User";

function App() {
  const [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user }}>
    <div className="App">
      <Header setUser={setUser}/>
      <Navbar />
      <Routes>
        <Route path="/" element={<ReviewsList />}/>
        <Route path="/category/:category_name" element={<ReviewsList />}/>
        <Route path="/reviews/:review_id" element={<SingleReview />}/>
        <Route path="/sign-in" element={<SignIn setUser={setUser} />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
