import React, { useState } from 'react';
import axios from "axios";
import styles from '../login.module.css';
import { useRecoilState } from 'recoil';
import { NavLink } from 'react-router-dom';

function JoinPage() {
        //useState() - 값이 변화되는 것을 저장
        const [id, setId] = useState(''); //처음 기본값 비우기
        const [pw, setPw] = useState(''); //처음 기본값 비우기
        const [pw2, setPw2] = useState(''); //처음 기본값 비우기
        const [showWarning, setShowWarning] = useState(false);

        //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
        //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
        const onIdChange = (e) => {
            //e: 이벤트 객체
            setId(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
        }

        const onPwChange = (e) => {
            //e: 이벤트 객체
            setPw(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
        }

        const onPwChange2 = (e) => {
            //e: 이벤트 객체
            setPw2(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
        }
    
        const onDataPost = () => {
            if (!id || !pw) {
                setShowWarning(true); // id나 pw 값이 비어 있을 때 경고 메시지 표시
                console.log('hi');
                console.log(showWarning);
            }else{
                const api = axios.create({
                    baseURL: '/',
                });
                api.post("/", {
                    username: id,
                    password: pw,
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    return (
      <>
        <div className={styles.body}> 
        <section className={styles.login_form}>
            <h1><NavLink to="/">Own Story</NavLink></h1>
            <div className={styles.int_area}>
                <input type="text" name="id" id="id" onChange={ onIdChange } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !id ? styles.warning : ''}>USER NAME</label>
            </div>
            <div className={styles.int_area}>
                <input type="password" name="pw" id="pw" onChange={ onPwChange } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD</label>
            </div>
            <div className={styles.int_area}>
                <input type="password" name="pw2" id="pw2" onChange={ onPwChange2 } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD CHECK</label>
            </div>
            <div className={styles.btn_area}>
                <button type="submit" onClick={onDataPost}>회원가입</button>
            </div>
 
        </section>
        </div>
      </>
    );
  }
  
  export default JoinPage;