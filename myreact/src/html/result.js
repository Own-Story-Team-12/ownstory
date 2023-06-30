import Headerjs from './header';
import Footerjs from './footer';
import styles from '../result.module.css';
import axios from "axios";

function Body() {

  const response = JSON.parse(localStorage.getItem('response'));
  const sendData = {
    user: localStorage.getItem('IDinfo').slice(1,-1),
     ...response.data
    }

  console.log(sendData);

  const saveDB = (event) => {
    
    
    

    event.preventDefault();
    
    const api = axios.create({
      baseURL: '/',
    })


    api.post("http://127.0.0.1:8000/Ai/save/", sendData
      ,{
        headers:{
          'Content-Type':'multipart/form-data',
        },
      })
    .then(function (response) {
      console.log("good")
    })
    .catch(function (error) {
      console.log(error)
    })
    
  }

  const engArray = response.data.content.split(". ");
  
  console.log(response.data.content)

  const krArray = response.data.ko_content.split(". ");
  
  console.log(krArray)


  const handleMouseEnter = (event) => {
    const className = event.target.className; // 해당 요소의 클래스 이름 가져오기
    const elements = document.querySelectorAll(`.${className}`); // 같은 클래스를 가진 다른 요소들 선택

    elements.forEach((element) => {
      // 처리 로직을 작성하세요
      element.style.color = 'red';
      element.style.fontWeight = "bold";
    });
  };
  

  const handleMouseLeave = (event) => {
    const className = event.target.className; // 해당 요소의 클래스 이름 가져오기
    const elements = document.querySelectorAll(`.${className}`); // 같은 클래스를 가진 다른 요소들 선택

    elements.forEach((element) => {
      // 처리 로직을 작성하세요
      element.style.color = 'black';
      element.style.fontWeight = 'normal';
    });
  };
  

  return (
        <div  className={`${styles.body} ${styles.inputback}`} >
          <div className={styles.left}>
            <div className={styles.onleftbook}>
              <div className={styles.engtitle}>{response.data.title}</div>
                <br></br>
                <br></br>
                <br></br>
              <div className={styles.engcontent}>
                {engArray.map((item, index) => (
                  <div>
                  <p className={`class${index}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >{item}</p>
                  <br></br>
                  </div>
                  ))}
              </div> 
            </div>
          </div>
          <div className={styles.right}>
            
              <div className={styles.onrightbook}>
                <div className={styles.txtpart}>
                  <div className={styles.krtitle}>{response.data.ko_title}
                  </div>
                      <br></br>
                      <br></br>
                      <br></br>
                    <div className={styles.krcontent}>  
                      {krArray.map((item, index) => (
                        <div>
                        <p className={`class${index}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{item}</p>
                        <br></br>
                        </div>
                        ))} 
                    </div>
                </div>
                <div className={styles.btnpart} >
                  <label htmlFor="savebtn" className={styles.savelabel}>
                    <span className={styles.clickhear}>저장 하기</span>
                  </label> 
                  <button id='savebtn' className={styles.savebtn} onClick={saveDB}>저장하기</button>
                  
                  <label htmlFor="cancelbtn" className={styles.cancellabel} >
                    <span className={styles.clickhear}>   취소</span>
                  </label> 
                  <button id='cancelbtn' className={styles.cancelbtn} onClick={"/"}>취소</button>
                </div>
                  
              </div>

              

            

          </div>
          </div>
    )
}


function Result() {
    return (
      <div className="app">
        <Headerjs></Headerjs>
        <Body></Body>
        <Footerjs></Footerjs>
      </div>
    );
  }
  
  export default Result;