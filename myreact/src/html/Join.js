import React, { useState } from 'react';
import axios from "axios";
import styles from '../css/login.module.css';
import Modal from './Modal';
import { NavLink, useNavigate  } from 'react-router-dom';

function JoinPage() {
        //useState() - 값이 변화되는 것을 저장
        const [id, setId] = useState(''); //처음 기본값 비우기
        const [pw, setPw] = useState(''); //처음 기본값 비우기
        const [pw2, setPw2] = useState(''); //처음 기본값 비우기
        const [showWarning, setShowWarning] = useState(false);
        const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
        const [isFailModalOpen, setIsFailModalOpen] = useState(false);
        const [errormsg, setErrormsg] = useState('');
        const [isButtonDisabled, setIsButtonDisabled] = useState(true);
        const navigate = useNavigate ();

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
            setIsButtonDisabled(pw2 !== e.target.value);
        }

        const onPwChange2 = (e) => {
            //e: 이벤트 객체
            setPw2(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            setShowWarning(false);
            setIsButtonDisabled(pw !== e.target.value);
        }
        
        const goBack=() => {
            navigate(-1);
        }

        const clossErrorModal=() =>{
            setIsFailModalOpen(false);
        }

        const handleConfirmModal=() => {
            setIsSuccessModalOpen(false);
            navigate('/login');
        }

        const validatePassword = (password) => {
            if (password.length < 8) {
              return '비밀번호는 최소 8자 이상이어야 합니다.';
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
              return '비밀번호는 특수문자를 포함해야 합니다.';
            }
            return '';
          }
    
        const onDataPost = () => {
            if (!id || !pw) {
                setShowWarning(true); // id나 pw 값이 비어 있을 때 경고 메시지 표시
                console.log('hi');
                console.log(showWarning);
            }else{
                //
                const api = axios.create({
                    baseURL: '/',
                });
                api.post("http://127.0.0.1:8000/signup/", {
                    username: id,
                    password: pw,
                })
                .then(function (response) {
                    console.log(response.data);
                    setIsSuccessModalOpen(true);
                })
                .catch(function (error) {
                    if (error.response.status === 400) {
                        setIsFailModalOpen(true);
                        setErrormsg('이미 사용중인 ID입니다.');

                    } else {
                      console.log(error);
                      setIsFailModalOpen(true);
                      setErrormsg('오류발생! 지속적으로 나타나면 문의바랍니다.');
                    }
                  });
            }
        }
    return (
      <>
        <div className={styles.body}> 
        <section className={styles.login_form}>
            <button className={styles.back} onClick={goBack}>←</button>
            <h1><NavLink to="/">Own Story</NavLink></h1>
            <div className={styles.int_area}>
                <input type="text" name="id" id="id" onChange={ onIdChange } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !id ? styles.warning : ''}>USER NAME</label>
            </div>
            <div className={styles.int_area}>
                <input type="password" name="pw" id="pw" onChange={ onPwChange } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD</label>
            {pw && validatePassword(pw) && <p className={styles.error_message}>{validatePassword(pw)}</p>}
            </div>
            <div className={styles.int_area}>
                <input type="password" name="pw2" id="pw2" onChange={ onPwChange2 } autoComplete="off" required></input>
                <label htmlFor="id" className={showWarning && !pw ? styles.warning : ''}>PASSWORD CHECK</label>
                {pw !== pw2 && <p className={styles.error_message}>비밀번호와 비밀번호 확인이 일치하지 않습니다.</p>}
            </div>
            <div className={ styles.btn_area}>
                <button type="submit" onClick={onDataPost} disabled={isButtonDisabled}>회원가입</button>
            </div>
 
        </section>
        </div>

        {/* 회원가입 완료 모달 */}
      {isSuccessModalOpen && (
        <Modal onClose={() => setIsSuccessModalOpen(false)}>
          <h3>회원가입 완료</h3>
          <p>회원가입이 성공적으로 완료되었습니다.</p>
          <button className={styles.button} onClick={handleConfirmModal}>로그인 페이지로 이동</button>
        </Modal>
        )}

    {isFailModalOpen && (
     <Modal onClose={() => setIsFailModalOpen(false)}>
      <h3>회원가입 실패</h3>
      <p>{errormsg}</p> 

      <button className={styles.button} onClick={clossErrorModal}>닫기</button>
     </Modal>

      )}
      </>
    );
  }
  
  export default JoinPage;