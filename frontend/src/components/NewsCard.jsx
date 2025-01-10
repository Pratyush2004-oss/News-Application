import React from 'react'
import { Link } from 'react-router-dom'

const NewsCard = ({ item }) => {
    const category = JSON.parse(item.category);
    return (
        <div>
            <div>
                <div className='w-full p-2 my-2 rounded-lg shadow-lg bg-red-50 sm:hidden'>
                    <div className='p-3 '>
                        <img src={item.image ? item.image : "bg.png"} alt="News" className='rounded-lg mask' />
                        <div>
                            <h1 className='font-bold md:text-lg line-clamp-2'>{item.title}</h1>
                            <p className='text-xs line-clamp-1 md:line-clamp-2'>{item.description ? item.description : item.source}</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-between my-2 '>
                        <a href={item.link} target='_blank' className='btn btn-sm btn-link'>{item.source}</a>
                        <p className='flex text-xs font-bold'>Category : {category.join(', ')}</p>
                        <Link to={"/news/" + item._id} className='w-full btn btn-sm'>Read </Link>
                    </div>
                </div>
            </div>
            <div className='hidden w-full p-2 my-2 rounded-lg shadow-lg bg-red-50 sm:block'>

                <div className='flex items-center justify-between p-3'>
                    <div>
                        <h1 className='font-bold md:text-lg line-clamp-2'>{item.title}</h1>
                        <p className='text-xs line-clamp-1 md:line-clamp-2'>{item.description ? item.description : item.source}</p>
                    </div>
                    <img src={item.image ? item.image : "bg.png"} alt="News" className='w-20 h-20 rounded-lg mask mask-square' />
                </div>
                <div className='flex items-center justify-between my-2'>
                    <a href={item.link} target='_blank' className='btn btn-sm btn-link'>{item.source}</a>
                    <p className='flex text-xs font-bold'><span className='hidden md:block'>Category : </span>{category.join(', ')}</p>
                    <Link to={"/news/" + item._id} className='btn btn-sm'>Read </Link>
                </div>
            </div>
        </div>
    )
}

export default NewsCard