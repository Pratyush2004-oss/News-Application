import React from 'react'
import { useNewsStore } from '../store/newsStore'
import { X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const CommentSection = ({ hideComments, setHideComments }) => {
    const { currentNews } = useNewsStore();
    const { user } = useAuthStore();
    return currentNews && !hideComments && (
        <div className='flex flex-col h-[50vh] overflow-auto border p-4 rounded-lg shadow-lg my-5'>
            <div className='flex items-center justify-between border-b-4 border-black'>
                <h1 className='text-2xl font-bold'>Comments ({currentNews.comments.length ? currentNews.comments.length : 0})</h1>
                <button onClick={() => setHideComments(true)} className='p-1 rounded-full bg-base-300 hover:scale-105'><X className='size-5' /></button>
            </div>
            {
                currentNews.comments && currentNews.comments.length > 0 ? currentNews.comments.map((item, idx) => (
                    <div key={idx}>
                        <div className='p-2 my-2 rounded-lg shadow-md center' >
                            <div className="flex items-center gap-3 avatar placeholder">

                                <div className="w-8 rounded-full md:w-10 bg-neutral text-neutral-content">
                                    <span className="text-sm">{item.userId.fullName ? item.userId.fullName[0] + item.userId.fullName.split(' ')[1][0] : user.fullName[0] + user.fullName.split(' ')[1][0]}</span>
                                </div>
                                <h1 className='font-serif font-bold'>{item.userId.fullName ? item.userId.fullName : user.fullName}</h1>
                            </div>
                            <div className='ml-14'>
                                <h1 className='text-sm '>{item.content}</h1>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div>
                        <h1>No Comments yet <span className='font-mono'>........</span></h1>
                    </div>
                )}
        </div>
    )
}

export default CommentSection