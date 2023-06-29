import Headerjs from './header';
import Footerjs from './footer';
import styles from '../mypage.module.css';
import React, {useState} from 'react';

import Q from '../html/static_image/question.png';
import mic from '../html/static_image/mic.png';
import pencil from '../html/static_image/pencil.png';

function KeywordInput(){
    const[showTip, setShowTip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e) =>{
        const { clientX, clientY } = e;
        setShowTip(true);
        setTooltipPosition({ x: clientX, y: clientY });
    };
    const handleMouseLeave = () =>{
        setShowTip(false);
    };
   return(
    <div className={styles.body}>
        <h2 className={styles.title}>마이페이지</h2>
        <div className={styles.voice}>
            <h2 className={styles.subtitle}> 목소리 목록 </h2>
            <div className={styles.btnarea}>
            <div className={styles.btnrow}>
            <button className={styles.voicebtn}>
                <div className={styles.btnContent}>
                <img src={mic}/>
                <span>엄마<button className={styles.pencil}><img src={pencil} /></button></span>
                </div>
            </button>
            <button className={styles.voicebtn}>
                <div className={styles.btnContent}>
                <img src={mic}/>
                <span>아빠<button className={styles.pencil}><img src={pencil}/> </button></span>
                </div>
            </button>
            </div>
            </div>

            <button onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} className={styles.question}>
                
                <img className={styles.qIcon} src={Q} alt="도움말 이미지" />

            </button>

        {showTip && (
            <div
            className={styles.tooltip} style={{ top: tooltipPosition.y -235, left: tooltipPosition.x-400 }}>
                마이크 아이콘을 클릭하면 저장된 목소리를 들어볼 수 있어요.<br/>
                아이디당 최대 2가지 음성 녹음이 가능해요.<br/>
                생성중인 음성은 조금만 기다려주세요.
            </div>)}
        </div>
        <div className={styles.mypost}>
            <h2 className={styles.subtitle}>내가 만든 동화목록</h2>
            <p className={styles.more}>더보기 →</p>
        </div>
    </div>

   ); 
}

function MyPage(){
    return (
        <div className="app">
          <Headerjs></Headerjs>
          <KeywordInput></KeywordInput>
          <Footerjs></Footerjs>
        </div>
      );
    }

export default MyPage;