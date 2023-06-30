import Headerjs from './header';
import Footerjs from './footer';
import styles from '../result.module.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

function Body() {

  const [isPopup, setPop] = useState(false);
  const [isSaveDone, setSaveDone] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    let timer;

    if (isSaveDone) {
      timer = setTimeout(() => {
        setSaveDone(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSaveDone]);

  const response = JSON.parse(localStorage.getItem('response'));
  const sendData = {
    user: localStorage.getItem('IDinfo').slice(1,-1),
     ...response.data
    }


  console.log(sendData);

  const saveDB = (event) => {
    
    
    

    event.preventDefault();
    
    const api = axios.create({
      baseURL: '/',
    })


    api.post("http://127.0.0.1:8000/save/", sendData
      ,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      })
    .then(function (response) {
      console.log("good")
      const redbtn = document.querySelectorAll('.' + styles.clickhear);
      console.log(redbtn)
      setPop(false)
      redbtn.forEach(element => {
        element.style.display = 'none';
      });

      setSaveDone(true);

      
      
      
    })
    .catch(function (error) {
      console.log(error)
      
      
    })
    
  }

  const popup = (event) => {

    setPop(true);

  }

  const goback = (event) => {
    navigate(-1);
  }

  const popupdown = (event)=>{
    setPop(false)
  }

  const engArray = response.data.content.split(". ");
  
  const krArray = response.data.ko_content.split(". ");
  
  


  const handleMouseEnter = (event) => {
    const className = event.target.className; // 해당 요소의 클래스 이름 가져오기
    const elements = document.querySelectorAll(`.${className}`); // 같은 클래스를 가진 다른 요소들 선택

    elements.forEach((element) => {
      // 처리 로직을 작성하세요
      element.style.color = 'red';
      element.style.fontWeight = "bold";
    });
  };
  

  const handleMouseLeave = (event) => {
    const className = event.target.className; // 해당 요소의 클래스 이름 가져오기
    const elements = document.querySelectorAll(`.${className}`); // 같은 클래스를 가진 다른 요소들 선택

    elements.forEach((element) => {
      // 처리 로직을 작성하세요
      element.style.color = 'black';
      element.style.fontWeight = 'normal';
    });
  };


  return (
    <>
        <div  className={`${styles.body} ${styles.inputback}`} >
          <div className={styles.left}>
            <div className={styles.onleftbook}>
              <div className={styles.engtitle}>{response.data.title}</div>
                <br></br>
                <br></br>
                <br></br>
              <div className={styles.engcontent}>
                {engArray.map((item, index) => (
                  <div>
                  <p className={`class${index}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{item}</p>
                  <br></br>
                  </div>
                  ))}
              </div> 
            </div>
          </div>
          <div className={styles.right}>
            
              <div className={styles.onrightbook}>
                <div className={styles.txtpart}>
                  <div className={styles.krtitle}>{response.data.ko_title}
                  </div>
                      <br></br>
                      <br></br>
                      <br></br>
                    <div className={styles.krcontent}>  
                      {krArray.map((item, index) => (
                        <div>
                        <p className={`class${index}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{item}</p>
                        <br></br>
                        </div>
                        ))} 
                    </div>
                </div>
                <div className={styles.btnpart} >
                  <label htmlFor="savebtn" className={styles.savelabel}>
                    <span className={styles.clickhear}>저장 하기</span>
                  </label> 
                  <button id='savebtn' className={styles.savebtn} onClick={saveDB}>저장하기</button>
                  
                  <label htmlFor="cancelbtn" className={styles.cancellabel} >
                    <span className={styles.clickhear}>   취소</span>
                  </label> 
                  <button id='cancelbtn' className={styles.cancelbtn} onClick={popup}>취소</button>
                </div>
                  
              </div>

              

            

          </div>
          </div>

          {/* 모달 창 */}
          {isPopup && (
            <Modal onClose={() => setPop(false)}>
              <h3>정말 취소하시겠어요?</h3>
              <button onClick={goback}> 네, 취소할게요</button>
              <button onClick={popupdown}> 아니요</button>
            </Modal>
          )}
          {isSaveDone && (

            <Modal id="popup" style="display: none;">
            저장이 완료 되었습니다.
            </Modal>

          )}
          
          
          </>
    )
}


function Result() {
    return (
      <div className="app">
        <Headerjs></Headerjs>
        <Body></Body>
        <Footerjs></Footerjs>
      </div>
    );
  }
  
  export default Result;