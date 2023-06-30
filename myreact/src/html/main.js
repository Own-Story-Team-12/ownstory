import React from 'react';
import styles from '../main.module.css';
import Headerjs from './header';
import Footerjs from './footer';
  

function Body(){
  return (
    <div className={styles.body}>
      <div>
        사진들어갈곳
      </div>
      <div>
        소개페이지
        소개글
      </div>
      <div>
          사용방법
        </div>
    </div>
  );
}

function MainPage() {
  return (
    <div className="app">
      <Headerjs></Headerjs>
      <Body></Body>
      <Footerjs></Footerjs>
    </div>
  );
}

export default MainPage;
