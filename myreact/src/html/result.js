import Headerjs from './header';
import Footerjs from './footer';
import styles from '../result.module.css';
import axios from "axios";

function Body() {

  const response = JSON.parse(localStorage.getItem('response'));
  
  console.log(response)


  const saveDB = (event) => {
  
    event.preventDefault();
    
    const api = axios.create({
      baseURL: '/',
    })

    api.post("http://127.0.0.1:8000/Save/", {
      user: localStorage.getItem('IDinfo').slice(1,-1),
       ...response.data
      }
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


  return (
        <div  className={styles.body} >
            <span>{response.data.title}</span>
            <br></br>
            <span>{response.data.content}</span>
            <button onClick={saveDB}>저장하기</button>
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