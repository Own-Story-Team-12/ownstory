import { Link, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styles from '../main.module.css';
import Headerjs from './header';
import Footerjs from './footer';
  

function Body() {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
  
    const onRecAudio = () => {
        // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        
        // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
        const analyser = audioCtx.createScriptProcessor(0, 1, 1);
        setAnalyser(analyser);
    
        function makeSound(stream) {
          // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
          const source = audioCtx.createMediaStreamSource(stream);
          setSource(source);
          
          // AudioBufferSourceNode 연결
          source.connect(analyser);
          analyser.connect(audioCtx.destination);
        }
        
        // 마이크 사용 권한 획득 후 녹음 시작
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.start();
          setStream(stream);
          setMedia(mediaRecorder);
          makeSound(stream);
        // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
          analyser.onaudioprocess = function (e) {
              setOnRec(false);
          };
        });
      };
      return (
        <div className={styles.body}>
            <button onClick={onRecAudio}>녹음</button>
            <button>결과 확인</button>
        </div>
      );
  }  

function RecordPage() {
  return (
    <div className="app">
      <Headerjs></Headerjs>
      <Body></Body>
      <Footerjs></Footerjs>
    </div>
  );
}

export default RecordPage;
