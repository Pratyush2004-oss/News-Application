import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'

const AllNews = () => {
  const { news, error, fetchNews } = useNewsStore();
  useEffect(() => {
    
    fetchNews();
  }, [fetchNews]);
  return (
    <div>
      {
        news.length > 0 && news.map((item, idx) => (
          <div key={idx}>
            {item.title}
          </div>
        ))
      }

    </div>
  )
}

export default AllNews