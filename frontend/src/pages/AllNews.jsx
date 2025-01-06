import React, { useEffect, useState } from 'react'
import { useNewsStore } from '../store/newsStore'
import NewsCard from '../components/NewsCard';
import { useAuthStore } from '../store/authStore';

const AllNews = () => {
  const { news, error, count, fetchNews, loading } = useNewsStore();
  const { isAdmin } = useAuthStore();
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10)

  const lastPostIdx = currentPage * postPerPage;
  const firstPostIdx = lastPostIdx - postPerPage;

  const currentPost = news.length > 0 ? news.slice(firstPostIdx, lastPostIdx) : [];
  const maxPage = Math.ceil(news.length / postPerPage);


  return (
    <div>
      <div className='h-[75vh] p-5 overflow-auto'>
        <h1 className='text-2xl font-bold'>All News
          {
            isAdmin && <span>({count})</span>
          }
        </h1>
        {
          currentPost.length > 0 && currentPost.map((item, idx) => (
            <div key={idx} className=''>
              <NewsCard item={item} key={idx} />
            </div>
          ))
        }
      </div>
      <div className="flex items-center justify-center my-2 join">
        <button className="join-item btn btn-sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>«</button>
        <button className="join-item btn btn-sm">Page {currentPage}</button>
        <button className="join-item btn btn-sm" disabled={currentPage === maxPage} onClick={() => setCurrentPage(currentPage + 1)}>»</button>
      </div>
    </div>
  )
}

export default AllNews