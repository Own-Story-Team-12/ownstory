import axios from "axios";
import React, { useState } from 'react';
import styles from '../main.module.css';
import Headerjs from './header';
import Footerjs from './footer';
  

function Body(){

  const [selectedFile, setSelectedFile] = useState(null);


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

    formData.append('image', selectedFile)

    const api = axios.create({
      baseURL: '/',
    });

    api.post("장고의 ai 모델 url", formData)
    .then(function (response) {
      console.log(response.data)

    })
    .catch(function (error) {
      console.log(error)
    })
  }
}
  
  
  return (
    <div className={styles.body}>
      <input type='file' onChange={ReadyImage}/>
      <img src={selectedFile} width="300" height="300"></img>
      <button onClick={PostImage}>생성하기</button>
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
