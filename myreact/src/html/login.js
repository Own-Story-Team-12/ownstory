import React, { useState } from 'react';
import axios from "axios";
import JoinPage from '../html/Join';
import styles from '../login.module.css';
import { useRecoilState } from 'recoil';
import { myStateAtomID, myStateAtomPW } from '../state';

function LoginPage() {
        //useState() - 값이 변화되는 것을 저장
        const [id, setId] = useRecoilState(myStateAtomID);
        const [pw, setPw] = useRecoilState(myStateAtomPW);
        const [showWarning, setShowWarning] = useState(false);

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
    
        const onDataPost = () => {
            if (!id || !pw) {
                setShowWarning(true); // id나 pw 값이 비어 있을 때 경고 메시지 표시
                console.log('hi');
                console.log(showWarning);
            }else{
                const api = axios.create({
                    baseURL: '/',
                });
                api.post("http://127.0.0.1:8000/login/", {
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
    <div className={styles.body}> 
      <section className={styles.login_form}>
        <h1>LOGIN PAGE</h1>
        <div className={styles.int_area}>
            <input type="text" name="id" id="id" onChange={ onIdChange } autoComplete="off" required></input>
            <label htmlFor="id" className={showWarning && !id ? styles.warning : ''}>USER NAME</label>
        </div>
        <div className={styles.int_area}>
            <input type="password" name="pw" id="pw" onChange={ onPwChange } autoComplete="off" required></input>
            <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD</label>
        </div>
        <div className={styles.btn_area}>
            <button type="submit" onClick={onDataPost}>LOGIN</button>
        </div>
        <div className={styles.caption}>
            <a href="/join">SIGN UP?</a>
        </div>
      </section>
      </div>
    );
  }
  
  export default LoginPage;