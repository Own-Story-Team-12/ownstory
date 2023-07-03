import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import styles from '../css/post.module.css';
import Headerjs from './header';
import Footerjs from './footer';

function Body() {
  const [selectedPostId, setSelectedPostId] = useState(null);
//   const [nextPage, setNextPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);

  const nextPageRef = useRef(1);

  const fetchPosts = async () => {
    
    const nextPage = nextPageRef.current;

    if (maxPages < nextPage) {
      return;
    } else {
      const response = await fetch(`http://127.0.0.1:8000/post/api/posts/?page=${nextPage}`);
      const data = await response.json();
      setMaxPages(data.max_pages);
      setPosts(prevPosts => [...prevPosts, ...data.results]);
      nextPageRef.current = nextPage + 1; // nextPage 값을 업데이트
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (!isScrolling && scrollTop + clientHeight >= scrollHeight - 5) {
        setIsScrolling(true); // 스크롤 이벤트 처리 중임을 표시

        console.log('스크롤 이벤트 실행');
        fetchPosts(); // 다음 페이지 데이터 가져오기
      }
    };

    const debounceHandleScroll = debounce(handleScroll, 300); // 300ms 디바운스 적용

    window.addEventListener('scroll', debounceHandleScroll);
    setIsScrolling(false);

    return () => {
      window.removeEventListener('scroll', debounceHandleScroll);
    };
  }, [isScrolling]);

  // ...

  // 디바운스 함수
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  function formatPubDate(pubDate) {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  const handlePostClick = postId => {
    setSelectedPostId(postId);
  };

  const renderImage = post => {
    if (post && post.image) {
        return <img src={post.image} alt="게시물 이미지" width="200" />;
      } else {
        return (
          <img
            src="/images/intro_1.png"
            alt="기본 이미지"
            width="200"
          />
        );
      }
};

  return (
    <div className={styles.postpage}>
      {/* 검색 요소 */}
      <div className={styles.searchdiv}>
        <input className={styles.search} placeholder="동화제목을 입력해주세요" type="text" autoComplete="off" required />
        <div className={styles.searchicon} />
      </div>
      <div className={styles.postlistContainer}>
        {posts && posts.map(post => (
          <div className={styles.postlist} key={post.id}>
            {/* 포스트 컴포넌트 */}
            <div>
              {renderImage(post)}
            </div>
            <div>
              <Link to={`/post/${post.id}`}>
                <h2 onClick={() => handlePostClick(post.id)}>{post.title}</h2>
              </Link>
              <p>작성자: {post.user}</p>
              <p>작성일: {formatPubDate(post.pub_date)}</p>
              <p>{post.content}</p>
            </div>
          </div>
        ))}
        {selectedPostId && <PostDetail id={selectedPostId} />}
      </div>
    </div>
  );
}

function PostListPage() {
  return (
    <div className="app">
      <Headerjs />
      <Body />
      <Footerjs />
    </div>
  );
}

export default PostListPage;
