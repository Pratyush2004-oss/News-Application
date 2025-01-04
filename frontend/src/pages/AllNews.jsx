import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'

const AllNews = () => {
  const { news, error, fetchNews } = useNewsStore();
  useEffect(() => {
    fetchNews();
    console.log(news)
  }, [fetchNews]);
  return (
    <div>
      {
        news.length > 0 && news.map((item, idx) => {

          return (
            <div>
              {item.title}
            </div>
          )
        })
      }

    </div>
  )
}

export default AllNews