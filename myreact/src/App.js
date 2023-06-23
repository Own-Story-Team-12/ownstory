// import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import LoginPage from './html/login';
import JoinPage from './html/Join';
import MainPage from './html/main';
import KeywordInput from './html/fairytale'


function Pages(){
  return (
  <Routes>
    <Route path="/" element={<MainPage />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/join" element={<JoinPage />}/>
    <Route path = "fairytale" element={<KeywordInput />}/>
  </Routes>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Pages></Pages>
      </BrowserRouter>
    </div>
  );
}

export default App;
