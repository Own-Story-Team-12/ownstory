import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function formatPubDate(pubDate) {
    const date = new Date(pubDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

function AudioPlayer({ audioUrl }) {
    return (
        <audio controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
        </audio>
    );
}

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/post/api/posts/${id}/`)
            .then(response => {
                if(!response.ok) {
                    throw new Error('데이터 호출 실패');
                } 
                return response.json();
            })
            .then(data => {
                setPost(data);
                setComments(data.comments);        
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const renderImage = post => {
        if (post.image) {
            return <img src={post.image} alt="게시물 이미지" width="200" />;
        } else {
            return (
                <img
                    src="/images/intro_1.png"
                    alt="기본 이미지"
                    width="500"
                />
            );
        }
    };

    return (
        <div>
            <div>
                
            </div>
            <div>
                <h2>{post.title}</h2>
                <p>작성자: {post.user}</p>
                <p>작성일: {formatPubDate(post.pub_date)}</p>
                <p>{renderImage(post)}</p>
                <p>영어 컨텐츠: {post.content}</p><br></br>
                <p>한국어 컨텐츠: {post.ko_content}</p>
                <p>나의 음성: <AudioPlayer audioUrl={post.audio_myvoice} /></p>
                <p>표준 음성: <AudioPlayer audioUrl={post.audio_example} /></p>
                <br></br>
            </div>

            <h3>댓글</h3>
            {comments ? (
                comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{comment.user}</p>
                    </div>
                ))
            ) : (
                <p>댓글이 없습니다.</p>
            )}
        </div>
    )
}

export default PostDetail;