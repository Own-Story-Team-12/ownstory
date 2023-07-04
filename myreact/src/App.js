// import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './html/login';
import JoinPage from './html/Join';
import MainPage from './html/main';
import RecordPage from './html/record';
import ImageInputPage from './html/imageinput';
import KeywordInput from './html/fairytale';
import styles from './App.module.css';
import Result from './html/result';
import PostList from './html/PostList';
import PostDetail from './html/PostDetail';
import MyPage from './html/mypage';


function Pages(){
  return (
  <Routes>
    <Route path="/" element={<MainPage />}/>
    <Route path="/login" element={<LoginPage />}/>
    <Route path="/join" element={<JoinPage />}/>
    <Route path="/record" element={<RecordPage />}/>
    <Route path="/imageinput" element={<ImageInputPage />}/>
    <Route path = "/fairytale/keyword" element={<KeywordInput />}/>
    <Route path = "/result" element={<Result />}/>
    <Route path = "/postList" element={<PostList />}/>
    <Route path = "/post/:id" element={<PostDetail />} />    
    <Route path = "/mypage" element={<MyPage />}/>
  </Routes>
  );
};

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Pages></Pages>
      </BrowserRouter>
    </div>
  );
}

export default App;
