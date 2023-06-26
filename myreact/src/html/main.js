import logo from '../logo.svg';
import styles from '../App.module.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
  
function Header(){
  return  (<header className={styles.header}>
  <h1>
      <a href="/">AIVLE </a>
  </h1>
  <nav>
      <ul>
        <li><a href = "login/">Login</a></li>
        <li><a href = "fairytale/">동화생성</a></li>
        <li><a href = "record/">동화녹음</a></li>
      </ul>
  </nav>
</header>);
}

function Footer(){
  return  (<footer>
    © 2023 AIVLE Company, Inc. All rights reserved.
  </footer>);
}

function MainPage() {
  return (
    <div className="app">
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
