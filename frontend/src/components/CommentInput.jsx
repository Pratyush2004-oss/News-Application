import { Send } from 'lucide-react'
import React, { useState } from 'react'
import { useNewsStore } from '../store/newsStore'

const CommentInput = ({ id }) => {
    const { commentNews } = useNewsStore();
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        commentbody: ''
    })
    const handlecomment = () => {
        try {
            setLoading(true)
            const res = commentNews(id, input);
            if (res) {
                setInput({ commentbody: '' })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <div className='relative'>
            <input type="text" required placeholder="Type here" onChange={(e) => setInput({ commentbody: e.target.value })} value={input.commentbody} className="w-full input input-bordered max-sm:input-sm" />
            <button disabled={!input.commentbody || loading} onClick={handlecomment} className='absolute top-2.5 right-2 max-sm:size-5' ><Send /></button>
        </div>
    )
}

export default CommentInput