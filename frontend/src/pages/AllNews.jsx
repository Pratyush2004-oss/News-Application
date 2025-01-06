import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'
import NewsCard from '../components/NewsCard';

const AllNews = () => {
  const { news, error, count, fetchNews, loading } = useNewsStore();
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div>
      <div className='h-[80vh] p-5 overflow-auto'>
        <h1 className='text-2xl font-bold'>All News ({count}) </h1>
        {
          news.length > 0 && news.map((item, idx) => (
            <div key={idx} className=''>
              <NewsCard item={item} key={idx} />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default AllNews