import { NavLink, useLocation } from 'react-router-dom';
import { React, useRef, useEffect } from 'react';
import { debounce } from 'lodash';
import { Link, scroller } from 'react-scroll';
import styles from '../css/main.module.css';
  
function Header(props, ref){
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
    localStorage.removeItem('posts');
  };
  

  const scrollToSection = (sectionId, event) => {
    
    if (event) {
      event.preventDefault(); // 기본 동작 취소
    }
    
    scroller.scrollTo(sectionId, {
      smooth: true,
      offset: -50,
    });
  };

  const debouncedScrollToSection = debounce(scrollToSection, 0);

  const handleLinkClick = (sectionId, event) => {
    event.preventDefault(); // 기본 동작 취소
    debouncedScrollToSection(sectionId);
  };

    return  (
  <header className={styles.header}>
  <h1>
      <NavLink key="1" to="/" className={styles.navLink}>
        <div className={styles.logo}></div>
        <span className={styles.title}>Own Story</span>
      </NavLink>
  </h1>
    {ID !== "" ? (
    <nav className={`${styles.menu} ${styles.modifiedMenu}`} style={{ marginRight: '140px' }}>
    <ul className={styles.firstul}>
      <li>
        <NavLink to="/" className={router.pathname === '/' && styles.active2}>서비스 소개</NavLink>
        <ul className={styles.downmenu} >
            <li>    
              <Link
                to="myDiv1"
                className={styles.navLink}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                onClick={(event) => handleLinkClick('myDiv1', event)}
              >
                우리들의 이야기
              </Link>
            </li>
            <li>    
              <Link
                to="myDiv2"
                className={styles.navLink}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                onClick={(event) => handleLinkClick('myDiv2', event)}>
                서비스 사용법
              </Link>
            </li>
        </ul>
      </li>
      <li><NavLink to="/postList" className={router.pathname === '/postList' && styles.active2}>동화 게시판</NavLink></li>
      {token ? (
            // gId 값이 존재하는 경우에만 다른 li 태그를 렌더링합니다.
            <>
              <li><NavLink to="/fairytale/keyword" className={router.pathname === '/d' && styles.active2}>동화 생성</NavLink>
                <ul className={styles.downmenu}>
                    <li><NavLink to="/fairytale/keyword" className={router.pathname === '/fairytale/keyword' && styles.active2}>
                      단어로 쓰는 동화</NavLink>
                    </li>
                    <li><NavLink to="/imageinput" className={router.pathname === '/imageinput' && styles.active2}>
                      그림으로 쓰는 동화</NavLink>
                    </li>
                </ul>
              </li>
              <li><NavLink to="/record" className={router.pathname === '/record' && styles.active2}>동화 녹음</NavLink></li>
              <li className={styles.ID}><NavLink>{finalID} 님 환영합니다.</NavLink></li>
              <li style={{ width: '100px' }}><NavLink to="/mypage"  >마이페이지</NavLink></li>
              <li style={{ width: '100px' }}><NavLink to="/" onClick={handleLogout} >로그아웃</NavLink></li>
              
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