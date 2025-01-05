import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'
import NewsCard from '../components/NewsCard';

const Featured = () => {
  const { featured, loading, fetchFeatured, error } = useNewsStore();
  return (
    <div>
      <div className='h-[80vh] p-5 overflow-auto'>
        <h1 className='text-2xl font-bold'>Top Articles</h1>
        {
          featured.length > 0 && featured.map((item, idx) => (
            <div key={idx} className=''>
              <NewsCard item={item} key={idx} />
            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Featured