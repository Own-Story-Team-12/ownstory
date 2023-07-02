import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

    return (
        <div>
            <div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
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