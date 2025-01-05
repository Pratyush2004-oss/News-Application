import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNewsStore } from '../../../store/newsStore';

const NewsPage = () => {
    const { id } = useParams();
    const { loading, fetchSingleNews, error, currentNews } = useNewsStore();
    useEffect(() => {
        fetchSingleNews(id);
    }, [fetchSingleNews, id]);
    return currentNews && (
        <div className='h-[80vh] p-5 overflow-auto'>
            <h1 className='font-serif text-lg font-bold md:text-2xl'>{currentNews.title}</h1>
            <p className='my-2 font-bold'>Source : <a href={currentNews.link} target='_blank' className='text-blue-500 underline'>{currentNews.source}</a></p>
            <p className='my-2 font-sans text-justify'>{currentNews.description}</p>
            <div className="artboard artboard-horizontal phone-artboard">
                <img src={currentNews.image} alt="News" className='my-2 rounded-lg shadow-lg ' />
            </div>
            <p className='text-sm text-right'>Published At :  {currentNews.publishedAt.split('T')[0]}</p>

        </div>
    )
}

export default NewsPage