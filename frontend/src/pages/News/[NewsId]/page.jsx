import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNewsStore } from '../../../store/newsStore';
import { ThumbsUp } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore';

const NewsPage = () => {
    const { id } = useParams();
    const { loading, fetchSingleNews, error, currentNews, likeNews } = useNewsStore();
    const { user } = useAuthStore();
    useEffect(() => {
        if (id) {
            fetchSingleNews(id);
        }
    }, [fetchSingleNews]);

    const handleLike = async () => {
        try {
            if (user) {
                await likeNews(id);
            }
        } catch (error) {
            console.log(error)
        }
    }
    {
        if (loading) return (
            <div className='flex flex-col items-center justify-center h-[80vh]'>
                <img className='rounded-lg size-56' src='bg.png' alt="Loading" />
                <span className='text-3xl font-bold text-blue-500 loading-infinity'></span>
            </div>
        )
    }
    if (!loading && error) return (
        <div className='flex flex-col items-center justify-center h-[80vh]'>
            <img className='rounded-lg size-56' src='bg.png' alt="Error" />
            <h1 className='font-bold text-red-500'>Error in Loading the page. Please refresh</h1>
            <h1>{error}</h1>
        </div>
    )
    return !loading && !error && currentNews && (
        <div className='h-[80vh] p-5 overflow-auto'>
            <h1 className='font-serif text-lg font-bold md:text-2xl'>{currentNews.title}</h1>
            <p className='my-2 font-bold'>Source : <a href={currentNews.link} target='_blank' className='text-blue-500 underline'>{currentNews.source}</a></p>
            <p className='my-2 font-sans text-justify'>{currentNews.description}</p>
            <div className="artboard artboard-horizontal phone-artboard">
                <img src={currentNews.image ? currentNews.image : "bg.png"} alt="News" className='my-2 rounded-lg shadow-lg ' />
            </div>
            <p className='text-sm text-right'>Published At :  {currentNews.publishedAt.split('T')[0]}</p>

            {
                user ? (
                    <div className='flex items-center my-2 '>
                        <button className='btn btn-sm' onClick={handleLike}><ThumbsUp className={`w-5 h-5 ${currentNews.likes.includes(user._id) ? 'text-blue-500 fill-blue-400' : ''}`} /><h1>{currentNews.likes.length}</h1></button>
                    </div>
                ) : (
                <div className='flex items-center justify-center my-2'>
                <h1 className='font-mono font-bold text-red-500'>Please Login to react on this news</h1>
                </div>
                    
                )
            }
        </div>
    )
}

export default NewsPage