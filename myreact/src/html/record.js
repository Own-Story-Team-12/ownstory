import { Link, NavLink } from 'react-router-dom';
import React, { useState, useCallback } from 'react';
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
    const chunks = []; // 오디오 청크 데이터를 저장할 배열
    const audioUrls = JSON.parse(localStorage.getItem('audioUrls')) || [];
    // audioUrls = []
    // localStorage.setItem('audioUrls', JSON.stringify(audioUrls));
    // console.log(audioUrls[0]);

  
    const onRecAudio = () => {
      console.log(audioUrls.length);
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
        

        // dataavailable 이벤트 핸들러 등록
        mediaRecorder.addEventListener('dataavailable', (e) => {
            chunks.push(e.data); // 청크 데이터를 배열에 추가
        });

        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);
      // 음성 녹음이 시작됐을 때 onRec state값을 false로 변경
        analyser.onaudioprocess = function (e) {
            setOnRec(false);
        };
      }) .catch((error) => {
        // 마이크 사용 권한을 받지 못했을 때 처리
        alert('마이크 사용 권한을 허용해야 녹음을 진행할 수 있습니다.');
      });

      
    };

    const offRecAudio = () => {
        // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
        media.ondataavailable = function (e) {
          chunks.push(e.data);
          setAudioUrl(e.data);
          setOnRec(true);
        };
    
        // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
        stream.getAudioTracks().forEach(function (track) {
          track.stop();
        });
    
        // 미디어 캡처 중지
        media.stop();
        
        // 메서드가 호출 된 노드 연결 해제
        analyser.disconnect();
        source.disconnect();

        
        if (audioUrl) {
            const blob = new Blob(chunks, { type: 'audio/wav' });
            audioUrls.push(blob);
            localStorage.setItem('audioUrls', JSON.stringify(audioUrls));
          }
      };

    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
          const audio = new Audio(URL.createObjectURL(audioUrl));
          audio.play();
        }
        // File 생성자를 사용해 파일로 변환
        const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
        console.log(sound); // File 정보 출력
      }, [audioUrl]);

      function test() {
        if (audioUrls.length > 0) {
            // 첫 번째 오디오 URL을 가져옴 (인덱스 0)
            console.log(2);
            console.log(audioUrls[0]);
            const blobUrl = URL.createObjectURL(audioUrls[0]);
            const firstAudioUrl = blobUrl;
            
          
            // 오디오 요소 생성
            const audio = new Audio(firstAudioUrl);
          
            // 오디오 재생
            audio.play();
          }

      }
    

    return (
      <div className={styles.body}>
        <div>
            <button onClick={onRec ? onRecAudio : offRecAudio}>녹음</button>
            <button onClick={onSubmitAudioFile}>결과 확인</button>
            <button onClick={test}>저장 후 다음</button>
        </div>
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
