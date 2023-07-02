import { useInfiniteQuery } from 'react-query';
import { useState } from 'react';

function useFetchPosts() {
  const [nextPage, setnextPage] = useState(1);
  const [maxPages, setmaxPages] = useState(1);

  const fetchPosts = async (key) => {
    console.log(nextPage);
    
    if (maxPages < nextPage) {
        return; // 더 이상 호출하지 않고 종료
    } else {
        const response = await fetch(`http://127.0.0.1:8000/post/api/posts/?page=${nextPage}`);
        const data = await response.json();
        setmaxPages(data.max_pages);
        setnextPage(nextPage + 1); // 다음 페이지로 이동
        return data;
    }
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage) => lastPage?.next ?? false,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}

export { useFetchPosts };
