import { NavLink, useLocation } from 'react-router-dom';
import { React } from 'react';
import styles from '../main.module.css';
  
function Header(){
  const router = useLocation();
  const token = localStorage.getItem('token');
  const ID = localStorage.getItem('IDinfo');

  let finalID = '';

  
  if (ID !== null) {
    finalID = ID.slice(1, -1);
  }
  

  const handleLogout = () => {
        // 로그아웃 시 Local Storage에 저장된 토큰을 제거하고 로그인 상태를 초기화합니다.
    localStorage.removeItem('token');
  };

    return  (<header className={styles.header}>
  <h1>
      <NavLink to="/">Own Story</NavLink>
  </h1>
    {ID !== "" ? (
    <nav className={`${styles.menu} ${styles.modifiedMenu}`} style={{ marginRight: '100px' }}>
    <ul className={styles.firstul}>
      <li>
        <NavLink to="/" className={router.pathname === '/' && styles.active2}>서비스 소개</NavLink>
        <ul className={styles.downmenu} >
            <li><NavLink to="/">우리들의 이야기</NavLink></li>
            <li><NavLink to="/">서비스 사용법</NavLink></li>
        </ul>
      </li>
      <li><NavLink to="/">동화 게시판</NavLink></li>
      {token ? (
            // gId 값이 존재하는 경우에만 다른 li 태그를 렌더링합니다.
            <>
              <li><NavLink to="/" className={router.pathname === '/d' && styles.active2}>동화 생성</NavLink>
                <ul className={styles.downmenu}>
                    <li><NavLink to="/">단어로 쓰는 동화</NavLink></li>
                    <li><NavLink to="/imageinput">그림으로 쓰는 동화</NavLink></li>
                </ul>
              </li>
              <li><NavLink to="/record" className={router.pathname === '/record' && styles.active2}>동화 녹음</NavLink></li>
              <li className={styles.ID}><NavLink>{finalID} 님 환영합니다.</NavLink></li>
              <li style={{ width: '100px' }}><NavLink to="/" onClick={handleLogout} >로그 아웃</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className={router.pathname === '/login' && styles.active2}>로그인</NavLink></li>
              <li><NavLink to="/join">회원가입</NavLink></li>
            </>
          )}

    </ul>

  </nav>
    ) : null}
</header>);
}
export default Header;