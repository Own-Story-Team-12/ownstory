import React from 'react';
import styles from '../css/record.module.css';
import Headerjs from './header';
import Footerjs from './footer';
import axios from "axios";
import { useEffect, useState, useCallback } from 'react';

function Body() {
    const [stream, setStream] = useState();
    const [media, setMedia] = useState();
    const [onRec, setOnRec] = useState(true);
    const [source, setSource] = useState();
    const [analyser, setAnalyser] = useState();
    const [audioUrl, setAudioUrl] = useState();
    const [currentIndex, setCurrentIndex] = useState(0);
    const chunks = []; // 오디오 청크 데이터를 저장할 배열

    const texts = ['The pigs and cows ran everywhere.',
                  'Float the soap on top of the bath water.',
                  'A very young boy sliding down a slide into a swimming pool, wearing blue floaties.',
                  // "I can't do that right now. Please try again later.",
                  // 'The boy was there when the sun rose.',
                  '모든 녹음이 완료 되었습니다.   보이스 추가를 눌러주세요.']

    

    useEffect(() => {
      window.scrollTo(0, 0);
      const ID = localStorage.getItem('IDinfo');

      const sendData = async () => {
        try {
          const data = {
            name: ID
          };
          console.log(ID);
          const response = await axios.post('http://127.0.0.1:8000/audio-check/', data);
          // 요청에 대한 응답 처리
          console.log(response.data.message);
          setCurrentIndex(response.data.message);
        } catch (error) {
          // 요청 중 오류 처리
          console.error('요청 중 오류 발생:', error);
        }
      };
      sendData();
    }, []);

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
      };

      const uploadFileToServer = (file) => {
        const formData = new FormData();
        formData.append('audioFile', file);
      
        axios.post('http://127.0.0.1:8000/upload-audio/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log(response.data.message);
          // 서버의 응답 처리
        })
        .catch(error => {
          console.error('파일 전송 중 오류 발생:', error);
          // 오류 처리
        });
      };

    const onSubmitAudioFile = useCallback(() => {
        if (audioUrl) {
          const audio = new Audio(URL.createObjectURL(audioUrl));
          audio.play();
        }
        
      }, [audioUrl]);

    function handleClickNext () {
      const sound = new File([audioUrl], `${currentIndex}.wav`, { lastModified: new Date().getTime(), type: "audio/wav" });
      console.log(sound);
      uploadFileToServer(sound);
        
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex >= 4) {
          return 0;
        }
        return newIndex;
      });
  
    }
    
    const buttonClassName = currentIndex >= 3 ? `${styles.finishbutton}` : ""; 
    const buttonText = currentIndex >= 3 ? "보이스 추가" : "저장 후 다음"; 
    const progressClassName = currentIndex >= 3 ? `${styles.finishprogress}` : `${styles.progress}`; 
    const progressText = currentIndex >= 3 ? "3" : `${currentIndex+1}`;
    const scriptText = currentIndex >= 3 ? "보이스 추가 중입니다." : `${texts[currentIndex]}`

    function handleVoice(){
      alert('보이스 추가에는 처리 시간이 소요될 수 있습니다. 완료 시 마이페이지에서 확인할 수 있습니다.');
      try {
          const response = axios.post('http://127.0.0.1:8000/audio-fit/');
          // 요청에 대한 응답 처리
      } catch (error) {
          // 요청 중 오류 처리
          console.error('요청 중 오류 발생:', error);
      };
    }

    return (
      <div className={styles.recordbody}>
        <div className={styles.recordcontainer}>
          <h2>스크립트를 따라 읽어주세요</h2>
          <div className={styles.script}>
            <h4 className={progressClassName}>진행상황 : {progressText} / 3</h4>
            <h3>{scriptText}</h3>
          </div>
        </div>

        <div className={styles.btn_area}>
          <div >
            <button className={onRec ? "" : styles.recordbtn} onClick={onRec ? onRecAudio : offRecAudio}>{onRec ? '녹음 시작' : '녹음 중지'}</button>
          </div>
          <div className={styles.btn_area}>
            <button onClick={onSubmitAudioFile}>결과 확인</button>
          </div>
          <div className={styles.btn_area}>
            <button className={buttonClassName} onClick={currentIndex === 3 ? handleVoice : handleClickNext}>{buttonText}</button>
          </div>
        </div>
      </div>
  );
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