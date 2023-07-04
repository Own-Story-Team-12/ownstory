import axios from "axios";
import React, { useState, useEffect } from 'react';
import styles from '../css/input.module.css';
import styles2 from '../css/fairytale.module.css';
import Headerjs from './header';
import Footerjs from './footer';
import Animationjs from './animation';
import { useMutation } from 'react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

function SelectInput(){
  const currentURL = window.location.href;
  if (currentURL.split("/").pop() === 'imageinput');{
    
  }
}  

function Body(){

  const [selectedFile, setSelectedFile] = useState(null);
  const [FileName, setFileName] = useState(null);
  const [File, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const usenavigate = useNavigate();


  useEffect(() => {
    // 상태 업데이트 후에 실행할 작업
    // 예: 변경된 상태 값을 사용하는 로직, 외부 API 호출 등

    // 원하는 작업을 수행하세요.

    console.log(FileName);

  }, [FileName]); // myState 값이 변경될 때만 useEffect 내의 코드가 실행됩니다.

  const ReadyImage = (event) => {

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedFile(reader.result);
      setFileName(file.name);
      setFile(file);
    };

    
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setIsModalOpen(true);
        return;
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        console.log('Only JPG and PNG files are allowed.');
        setIsModalOpen(true);
        return;
      }

      reader.readAsDataURL(file);
      setIsModalOpen(false);
    }
  }      
  

  const PostImage = async () => {
    if (selectedFile){
      const formData = new FormData()
      formData.append('img_file', File)

      // FormData 객체의 데이터 확인
      for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
        }

      const response = await axios.post("http://127.0.0.1:8000/Ai/result/", formData,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      })
    return response
    }
  }

  const { mutate, isLoading } = useMutation(PostImage, {
    onMount: false,
    onSuccess: (data) => {
        console.log('응답 데이터:', data);
        localStorage.setItem('response', JSON.stringify(data));
        usenavigate('/result');
        // 응답 데이터를 처리하는 추가 로직을 여기에 작성하세요.
    },
  });

  const handleSubmit = (e) => {
    try {
        e.preventDefault();
        mutate(); // 비동기 작업 완료 대기
        console.log('비동기 작업이 완료되었습니다.'); // 비동기 작업 완료 후 실행되는 코드
      } catch (error) {
        console.error('비동기 작업 중 오류가 발생했습니다:', error);
      }
  };

  const [isHovered, setIsHovered] = useState(false);
  const [mouseY, setMouseY] = useState(300);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (event) => {
      setMouseY(event.clientY);
    };

  const containerClasses = classNames(styles2.headerhover, {
    [styles2.lessThan15]: isHovered || mouseY < 32,
  });

  const containerClasses2 = classNames(styles2.wordimglessThanwordimg, {
      [styles2.wordimg]: !isHovered && mouseY >= 32,
    });
    
  
  return (
    <div className={isLoading ? `${styles2.body}` : `${styles2.inputback}`}  onMouseMove={handleMouseMove}>
      <div className={containerClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Headerjs></Headerjs>
      </div>
      {isLoading ? (
        <div className={styles2.animationWindow}>
            <Animationjs></Animationjs>
            <div className={styles2.loading}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> 
        ) : (
        <div className={styles2.body2}>
          <div className={containerClasses2}>
            <button className={styles.keywordbtn}><NavLink to="/fairytale/keyword"  style={{ color: '#757575'}}>단어로 쓰는 동화</NavLink></button>
            <button className={styles.imagebtn}><NavLink to="/imageinput"  style={{ color: '#FFFFFF'}}> 그림으로 쓰는 동화</NavLink></button>
          </div>
          <div className={styles2.content}>
            <div className={styles.imageinputbox}> 
                <div style={{flex:3}}>
                  {FileName !== null && <span className={styles.uploaded} >{FileName}을 선택했어요.</span>}
                  {FileName == null && <span className={`${styles.uploaded} ${styles.ex}` } >최대 5M이하, jpg, png 첨부 가능</span>}
                  <br></br>
                  {isModalOpen && <span className={styles.warn} >파일 형식이 올바르지 않거나 크기가 큽니다.</span>}
                </div>
                <div style={{flex:1, display:"grid",  placeItems: 'center'}}>
                  <label htmlFor="file-input" className="custom-file-input">  
                    <span className={styles.upload}>그림 가져오기</span>
                  </label> 
                  <input id='file-input' className={styles.imageinputbt } type='file' onChange={ReadyImage} accept=".jpg, .png" />
                </div>
            </div>
          </div>
  
          <div className={styles2.content}>
            <div>
              {FileName !== null && <img className={styles.selectedimg} src={selectedFile} width="300px" height="300px" />}
              {FileName == null && <div className={styles.selectedimg} style={{width:"300px", height:"300px"}} ></div>}
            </div>
            <div>
              <label htmlFor="generate" className={styles.custom_generate}>
                  {/* <span className={styles.genbtn}>이 그림으로 동화를 만들어 주세요</span> */}
                  <button id='generate' onClick={handleSubmit}>이 그림으로 동화를 만들어 주세요</button>   
              </label> 
              {/* <button id='generate' onClick={PostImage}>생성하기</button>      */}
            </div>
          </div>
        </div>
    )}
    </div> 
   );
  }



function MainPage() {
  return (
    <div className="app">
      <Body></Body>
      <Footerjs></Footerjs>
    </div>
  );
}

export default MainPage;