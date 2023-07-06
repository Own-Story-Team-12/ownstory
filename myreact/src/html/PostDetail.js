import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../css/style.module.css';
import styles2 from '../css/result.module.css';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Link } from 'react-scroll';

function formatPubDate(pubDate) {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [audioUrl,setaudioUrl] = useState();
    const [isMouseMoving, setIsMouseMoving] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ismyvoice, setmyvoice] = useState(true);

    useEffect(() => {
        let timer;
    
        // 마우스 움직임 이벤트 핸들러
        const handleMouseMove = () => {
          setIsMouseMoving(true);
          clearTimeout(timer); // 이전에 설정된 타이머 제거
          timer = setTimeout(() => {
            setIsMouseMoving(false);
          }, 1700); // 1.7초 후에 요소 숨기기
        };
    
        // 마우스 움직임 감지
        document.addEventListener('mousemove', handleMouseMove);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
        };
      }, []);
    

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/post/api/posts/${id}/`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('데이터 호출 실패');
                } http://127.0.0.1:8000/media/media/example_voicedce76b95-6b01-449e-83bc-f1e175b326e6.wav 
                return response.json();
            })
            .then(data => {
                setPost(data);
                setComments(data.comments);      
                setaudioUrl(data.audio_example);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const engArray = post.content.split(". ");
    const krArray = post.ko_content.split(". ");

    const handlePlay = () => {
        setIsPlaying(true);
      };
    
    const handlePause = () => {
        setIsPlaying(false);
    };

    const changeVoice = (event) =>
    {
      if (ismyvoice){
        setaudioUrl(post.audio_myvoice);
        setmyvoice(false);
      }
      else{
        setaudioUrl(post.audio_example);
        setmyvoice(true);
      }
    }
   

    return (
        <>
       <div className={`${styles2.body} ${isMouseMoving ? styles2.dark : styles2.body}`}>     
            <span className={styles.spanContainer}></span>
                <span className={styles.spanContainer}></span>
                <span className={styles.spanContainer}></span>
                <span className={styles.spanContainer}></span>    
            <div className={styles2.left}>
            <div className={styles2.onleftbook}>
              <div className={styles2.engtitle}>{post.title}</div>
                <br></br>
                <br></br>
                <br></br>
              <div className={styles2.engcontent}>
                {engArray.map((item, index) => (
                  <div key={'e1'+ index} >
                  <p key={'e2'+ index} className={`class${index}`}>{item}</p>
                  <br key={'e3'+ index}></br>
                  </div>
                  ))}
              </div> 
            </div>
          </div>
          <div className={styles2.right}>
              <div className={styles2.onrightbook}>
                <div className={styles2.txtpart}>
                  <div className={styles2.krtitle}>{post.ko_title}
                  <br></br>
                <br></br>
                <br></br>
                  </div>

                    <div className={styles2.krcontent}>  
                      {krArray.map((item, index) => (
                        <div key={'k1'+ index} >
                        <p key={'k2'+ index} className={`class${index}`}>{item}</p>
                        <br key={'k3'+ index} ></br>
                        </div>
                        ))} 
                    </div>
                </div>
              </div>
          </div>
          </div>
            <div className={styles2.playerArea} style={{ opacity: isMouseMoving ? 1 : 0, transition: 'opacity 1s ease-in-out'}}>
                <div>
                    <AudioPlayer src={audioUrl} onPlay={handlePlay} onPause={handlePause}/>
                </div>
                <div className={styles2.playerbtnArea}>
                    <div className={styles2.btnarea}>
                <label htmlFor="voicebtn" className={styles2.voicelabel}>
                    {ismyvoice && <span className={styles2.myvoice}>나의 목소리</span>}
                    {!ismyvoice &&<span className={styles2.basicvoice}>기본 목소리</span>}
                </label> 
                <button id='voicebtn' className={styles2.voicebtn} onClick={changeVoice}>실행하기</button>
                <a href = '/postList'>
                <button id='cancelbtn' className={styles2.cancelbtn}>
                        <img src = "/images/backicon.png"></img>
                </button>
                </a>
              </div>
            </div>
            </div>
        </>
    )
}

export default PostDetail;