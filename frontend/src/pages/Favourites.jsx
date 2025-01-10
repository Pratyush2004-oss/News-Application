import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'
import { useAuthStore } from '../store/authStore';
import Notification from '../components/Notification';
import NewsCard from '../components/NewsCard';

const Favourites = () => {
  const { user } = useAuthStore();
  const { getLikedNews, likedNews } = useNewsStore();
  useEffect(() => {
    if (user) {
      getLikedNews();
    }
  }, [getLikedNews, user])

  if (!user) {
    return <Notification />
  }
  return likedNews && (
    <div className='h-[80vh] overflow-auto'>
      <h1 className='text-2xl font-bold'>Favourites ({likedNews.length})</h1>
      <div className=''>
        {
          likedNews.map((item) => (
            <NewsCard item={item} key={item._id} />
          ))
        }
      </div>
    </div>
  )
}

export default Favourites