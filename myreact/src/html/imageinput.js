import axios from "axios";
import React, { useState } from 'react';
import styles from '../input.module.css';
import Headerjs from './header';
import Footerjs from './footer';
import 보이 from './static_image/boy.png'

  

function Body(){

  const [selectedFile, setSelectedFile] = useState(보이);


  const ReadyImage = (event) => {

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedFile(reader.result);
    };

    
    if (file) {
      reader.readAsDataURL(file);
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
      <div className={styles.openbook}>
        <div className={styles.bookleft}>
          <div>
            <img src={selectedFile} width="300" height="300" />
          </div>
          <div> 
            <label for="file-input" class="custom-file-input">
              <span>파일을 올리자</span>
            </label> 
            <input id='file-input' className={styles.imageinput } type='file' onChange={ReadyImage} />
          </div>
        </div>
        <div className={styles.bookright}>
          <div>
            <img src={보이} width="300" height="300"/>
          </div>
          <div>
            <label for="generate" class="custom-generate">
                <span>동화를 생성하자</span>
              </label> 
            <button id='generate' onClick={PostImage}>생성하기</button>     
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
