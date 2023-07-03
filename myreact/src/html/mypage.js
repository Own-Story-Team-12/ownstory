import Headerjs from './header';
import Footerjs from './footer';
import styles from '../css/mypage.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Q from './static_image/question.png';
import mic from './static_image/mic.png';
import pencil from './static_image/pencil.png';
import { NavLink } from 'react-router-dom';

function Mypage(){
    const apiUrl = process.env.REACT_APP_API_URL;
    const[showTip, setShowTip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [posts, setPosts] = useState([]);
    const ID = localStorage.getItem('IDinfo');
    let finalID = '';

    if (ID !== null) {
      finalID = ID.slice(1, -1);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/info/', {
              params: {
                username: finalID,
              },
            });
            const data = response.data.results;
            setPosts(data);
            localStorage.setItem('posts', JSON.stringify(data));
            console.log(response.data)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
  
    const limitedPosts = posts.slice(0, 2);

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
            className={styles.tooltip} style={{ top: tooltipPosition.y -290, left: tooltipPosition.x-450 }}>
                마이크 아이콘을 클릭하면 저장된 목소리를 들어볼 수 있어요.<br/>
                아이디당 최대 2가지 음성 녹음이 가능해요.<br/>
                생성중인 음성은 조금만 기다려주세요.
            </div>)}
        </div>
        <div className={styles.mypost}>
            <div className={styles.top}>
                <h2 className={styles.subtitle}>내가 만든 동화목록</h2>
                <p className={styles.more}>더보기 →</p>
            </div>
            {limitedPosts.length > 0 ? (
                <div className={styles.postContainer}>
                    {limitedPosts.map((post) => (
                    <div className={styles.postItem} key={post.id}>
                        <button className={styles.postbtn}>
                        <div className={styles.postTitle}>
                            <img className={styles.postimg} src={'http://127.0.0.1:8000/media/'+post.img_name} />
                            <span>{post.title}({post.ko_title})</span>
                        </div>
                        </button>
                    </div>
                    ))}
                </div>
                ) : (
                <div className={styles.postContainer} style={{fontSize: '25px', display: 'inline-center', textAlign: 'center'  }}>생성한 동화가 없습니다.<br/> 동화생성 탭으로 이동하여 동화를 만들어보세요.<br/>
                    <button className={styles.btn}><NavLink to="/fairytale/keyword">동화생성하러 가기</NavLink></button>
                </div>
                )}
        </div>
    </div>

   ); 
}

function MyPage(){
    return (
        <div className="app">
          <Headerjs></Headerjs>
          <Mypage></Mypage>
          <Footerjs></Footerjs>
        </div>
      );
    }

export default MyPage;