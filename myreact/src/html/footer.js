import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import styles from '../css/main.module.css';

function Footer(){
  const router = useLocation();

  return  (<footer className={styles.footer}>
    <div className={styles.footercontainer}>
    <nav className={styles.nav1}>
      <ul>
        <li><a href = "/">홈</a></li>
        <li><a href = "/">개인정보 처리방침</a></li>
        <li className={styles.splitli}>최태양</li>
        <li>김은지</li>
        <li>김진상</li>
        <li>장성현</li>
        <li>소정현</li>
        <li>원장희</li>
        <li>이형길</li>
        <li>최재호</li>
      </ul>
    </nav>
    <p>ⓒ 2023. Own Story Project All rights reserved.</p>
    </div>
</footer>);
}
export default Footer;