import React, { useState } from 'react';
import axios from "axios";

function JoinPage() {
        //useState() - 값이 변화되는 것을 저장
        const [id, setId] = useState(''); //처음 기본값 비우기
        const [pw, setPw] = useState(''); //처음 기본값 비우기
        const [pw2, setPw2] = useState(''); //처음 기본값 비우기

        //state값이 변화되는 함수 - input에 쓴 값으로 바뀜
        const onIdChange = (e) => {
            //e: 이벤트 객체
            setId(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            console.log(e.target.value)
        }

        const onPwChange = (e) => {
            //e: 이벤트 객체
            setPw(e.target.value); //이벤트를 받는 타겟의 value값으로 변경
            console.log(e.target.value)
        }

        const onPwChange2 = (e) => {
            //e: 이벤트 객체
            setPw2(e.target.value); //이벤트를 받는 타겟의 value값으로 변경

            if (pw === e.target.value){
                console.log(2);
            }
        }
    
        //state값을 초기화 시키는 함수 - 버튼에 적용
        const onDataReset = () => {
            // setText('');
        }
    
    return (
      <>
            <label>아이디:<input type="text" onChange={ onIdChange } size="12"></input></label>
                <label>비밀번호:<input type="password" onChange={ onPwChange } size="12" ></input></label>
                <label>비밀번호확인:<input type="password" onChange={ onPwChange2 } size="12" ></input></label>
                <button
            onClick={() => {
                axios
                .post("/page/signup/", {
                    username: id,
                    password: pw,
                })
                .then(function (response) {
                    console.log(response.data['token']);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }}
            > Login </button>
      </>
    );
  }
  
  export default JoinPage;