import axios from "axios";
import { NavLink, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from '../input.module.css';
import Headerjs from './header';
import Footerjs from './footer';
import 보이 from './static_image/boy.png'

function SelectInput(){
  const currentURL = window.location.href;
  if (currentURL.split("/").pop() === 'imageinput');{
    
  }
}  

function Body(){

  const [selectedFile, setSelectedFile] = useState(null);
  const [FileName, setFileName] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);


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

  const PostImage = (event) => {

    event.preventDefault();

    if (selectedFile){
    

    const formData = new FormData()

    formData.append('image_file', selectedFile)

    const api = axios.create({
      baseURL: '/',
    });

    api.post("/Ai/api/", formData)
    .then(function (response) {
      console.log(response.data)

    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
  
  
  return (
    <div  className={`${styles.body} ${styles.inputback}`} >
      <div className={styles.wordimg}>
            <button className={styles.keywordbtn}><NavLink to="/fairytale/keyword"  style={{ color: '#757575' }}>내가 직접 만드는 동화</NavLink></button>
            <button className={styles.imagebtn}><NavLink to="/imageinput"  style={{ color: '#FFFFFF' }}> 내가 그린 그림으로 만드는 동화</NavLink></button>
        </div>
      <div className={styles.openbook}>
        <div className={styles.bookleft}>
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

        <div className={styles.bookright}>
          <div>
            {FileName !== null && <img className={styles.selectedimg} src={selectedFile} width="300" height="300" />}
            {FileName == null && <div className={styles.selectedimg} style={{width:"300px", height:"300px"}} ></div>}
          </div>
          <div>
            <label htmlFor="generate" className="custom-generate">
                <span className={styles.genbtn}>이 그림으로 동화를 만들어 주세요</span>
              </label>
            <button className={styles.button}id='generate' onClick={PostImage}>생성하기</button>     
          </div>
        </div>
      </div>
    </div>
    )
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