import React, { useEffect } from 'react';
import styles from '../css/main.module.css';
import { Element } from 'react-scroll';
import Headerjs from './header';
import Footerjs from './footer';
import styles2 from '../css/main2.module.css';

function Body(){
  useEffect(() => {
    const fetchData = window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles2.body}>
      <div className={styles2.container}>
        <div className={styles2.section}>
          <input type="radio" name="slide" id="slide01" defaultChecked={true}></input>
          <input type="radio" name="slide" id="slide02"></input>
          <input type="radio" name="slide" id="slide03"></input>

          <div className={styles2.slidewrap}>
            <ul className={styles2.slidelist}>
              <li>
                <a>
                  <img className={styles2.mainimg} src="/images/intro_1.png"></img>
                </a>
              </li>
              <li>
                <a>
                  <img className={styles2.mainimg} src="/images/intro_2.png"></img>
                </a>
              </li>
              <li>
                <a>
                  <img className={styles2.mainimg} src="/images/intro_3.png"></img>
                </a>
              </li>
              <div className={styles2.slide_control}>
                <div className={styles2.control01}>
                  <label htmlFor="slide03" className={styles2.left}></label>
                  <label htmlFor="slide02" className={styles2.right}></label>
                </div>
                <div className={styles2.control02}>
                  <label htmlFor="slide01" className={styles2.left}></label>
                  <label htmlFor="slide03" className={styles2.right}></label>
                </div>
                <div className={styles2.control03}>
                  <label htmlFor="slide02" className={styles2.left}></label>
                  <label htmlFor="slide01" className={styles2.right}></label>
                </div>
              </div>
            </ul>
          </div>

        </div>
        <Element id="myDiv1" className={styles2.section2}>
          <img className={styles2.mainimg} src="/images/main1.png"></img>
        </Element >
        <Element  id="myDiv2" className={styles2.section3}>
            <img className={styles2.mainimg} src="/images/main2.png"></img>
        </Element >
      </div>
    </div>
  );
}


function MainPage() {
  return (
    <div className="app">
      <Headerjs ></Headerjs>
      <Body></Body>
      <Footerjs></Footerjs>
    </div>
  );
}

export default MainPage;
