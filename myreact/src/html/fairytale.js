import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/fairytale.module.css'
import Headerjs from './header';
import Footerjs from './footer';
import Animationjs from './animation';
import { useMutation } from 'react-query';
import classNames from 'classnames';

function KeywordInput(){
    const [name, setName] = useState('');
    const [personality, setPersonality] = useState('');
    const [background, setBackground] = useState('');
    const [content, setContent] = useState('');

    const usenavigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePersonalityChange = (e) => {
        setPersonality(e.target.value);
    };
    const handleBackgroundChange = (e) => {
        setBackground(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const createFairytale = async () => {
        const data = {
          name: name,
          personality: personality,
          background: background,
          content: content,
        };
    
        const response = await axios.post('http://127.0.0.1:8000/Ai/result/', data); // Modify the URL according to your DRF endpoint
        return response;
    };

    const { mutate, isLoading } = useMutation(createFairytale, {
        onMount: false,
        onSuccess: (data) => {
            console.log('응답 데이터:', data);
            // 응답 데이터를 처리하는 추가 로직을 여기에 작성하세요.
            localStorage.setItem('response', JSON.stringify(data));
            usenavigate('/result');
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.5) !important';
        try {
            mutate(); // 비동기 작업 완료 대기
            console.log('비동기 작업이 완료되었습니다.'); // 비동기 작업 완료 후 실행되는 코드
          } catch (error) {
            console.error('비동기 작업 중 오류가 발생했습니다:', error);
          }
    };


    function getRandomElement(arr){
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }
    function randomJson(){
        const names = ['영수', '민수', '영희', '철수'];
        const personalities = ['용감한 사자', '노래를 잘하는 공주', '잘 웃는 거북이', '말을 잘하는 인형'];
        const backgrounds = ['숲', '바다', '마을', '책상'];
        const contents = ['많은 동물들을 만나는 이야기', '왕자와 만나는 이야기', '여행하는 이야기', '비행기를 타는 이야기'];


        const r_name = getRandomElement(names);
        const r_personality = getRandomElement(personalities);
        const r_background = getRandomElement(backgrounds);
        const r_content = getRandomElement(contents);

        const jsonData = {
            name: r_name,
            personality: r_personality,
            background: r_background,
            content: r_content,
        }
        return jsonData;
    }

    const handelSetInput = (e) => { // random input
        const jsonData = randomJson();
        
        setName(jsonData.name);
        setPersonality(jsonData.personality);
        setBackground(jsonData.background);
        setContent(jsonData.content);
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
  
    const containerClasses = classNames(styles.headerhover, {
      [styles.lessThan15]: isHovered || mouseY < 32,
    });

    const containerClasses2 = classNames(styles.wordimglessThanwordimg, {
        [styles.wordimg]: !isHovered && mouseY >= 32,
      });

   return(
    <div className={isLoading ? `${styles.body}` : `${styles.inputback}`}  onMouseMove={handleMouseMove}>
        <div className={containerClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Headerjs></Headerjs>
        </div>

        {isLoading ? (
        <div className={styles.animationWindow}>
            <Animationjs></Animationjs>
            <div className={styles.loading}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div> 
        ) : (
          
        <div className={styles.body2}>
                  <div className={containerClasses2}>
                <button className={styles.keywordbtn}><NavLink to="/fairytale/keyword"  style={{ color: '#FFFFFF' }}>단어로 쓰는 동화</NavLink></button>
                <button className={styles.imagebtn}><NavLink to="/imageinput"  style={{ color: '#757575' }}> 그림으로 쓰는 동화</NavLink></button>
          </div>
            <div className={styles.content}>
                <p>주인공의 이름은 뭐야?</p>
                <input type = "text" value = {name} onChange={handleNameChange}></input>
                <p>주인공에 대해서 설명해줘</p>
                <input type = "text" value = {personality} onChange={handlePersonalityChange}></input>
                <p>배경은 어디야?</p>
                <input type = "text" value = {background} onChange={handleBackgroundChange}></input>
                <p>어떤 내용으로 동화를 만들어줄까?</p>
                <input type = "text" value = {content} onChange={handleContentChange}></input>
            </div>
            <div className={styles.content}>
                <div className={styles.icon}></div>
                <div className={styles.btndiv}>
                    <button onClick={handelSetInput}>아무거나 넣어볼래요</button>
                    <button onClick={handleSubmit }>동화 만들어 주세요</button>
                </div>
            </div>
        </div>
        
      )}
    </div>
   ); 
}

function FairytalePage(){

    
    return (
        <div className="app">
          <KeywordInput></KeywordInput>
          <Footerjs></Footerjs>
        </div>
      );
    }

export default FairytalePage;