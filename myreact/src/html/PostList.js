import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostDetail from './PostDetail';
import styles from '../css/post.module.css';
import Headerjs from './header';
import Footerjs from './footer';

function formatPubDate(pubDate) {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

function Body() {
    const [posts, setPosts] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/post/api/posts/')
            .then(response => response.json())
            .then(data => setPosts(data));
    }, []);

    const renderImage = post => {
        if (post.image) {
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
    const handlePostClick = postId => {
        setSelectedPostId(postId);
    };

    return (
        <div className={styles.postpage}>
            <div className={styles.searchdiv}>
                <input className={styles.search} value="    검색어를 입력해주세요"type="text" autoComplete="off" required></input>
            </div>
            <div className={styles.postlistContainer}>
            {posts.map(post => (
                <div className={styles.postlist} key={post.id}>
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
        <Headerjs></Headerjs>
        <Body></Body>
        <Footerjs></Footerjs>
      </div>
    );
  }
  
export default PostListPage;