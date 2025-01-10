import React, { useEffect } from 'react'
import { useNewsStore } from '../store/newsStore'
import { useAuthStore } from '../store/authStore';
import Notification from '../components/Notification';

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
    <div>
    </div>
  )
}

export default Favourites