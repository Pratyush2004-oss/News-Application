import React, { useState } from 'react'

const NewsDialog = () => {
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <div className='flex justify-end w-full p-2 mb-2 bg-red-100 rounded-lg shadow-lg'>
            <button className="btn btn-outline btn-sm" onClick={() => setOpenDialog(true)}> + Add News </button>
            <dialog className="modal" open={openDialog}>
                <div className="modal-box">
                    <h3 className="text-lg font-bold text-center border-b-4 border-black lg:text-xl ">Post News</h3>
                    <div className="flex flex-col modal-action">
                        <div className='grid grid-cols-1 gap-3 my-5 font-bold md:grid-cols-2'>
                            <fieldset className="relative w-full fieldset">
                                <legend className="fieldset-legend">Title</legend>
                                <span className="absolute top-2 right-2 badge badge-success badge-sm">Rq</span>
                                <input type="text" className="w-full input input-sm" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="relative w-full fieldset">
                                <legend className="fieldset-legend"></legend>
                                <span className="absolute top-2 right-2 badge badge-success badge-sm">Rq</span>
                                <input type="text" className="w-full input input-sm" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="relative w-full fieldset">
                                <legend className="fieldset-legend">Title</legend>
                                <span className="absolute top-2 right-2 badge badge-success badge-sm">Rq</span>
                                <input type="text" className="w-full input input-sm" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="relative w-full fieldset">
                                <legend className="fieldset-legend">Title</legend>
                                <span className="absolute top-2 right-2 badge badge-success badge-sm">Rq</span>
                                <input type="text" className="w-full input input-sm" placeholder="Type here" />
                            </fieldset>
                            <fieldset className="relative w-full fieldset">
                                <legend className="fieldset-legend">Title</legend>
                                <span className="absolute top-2 right-2 badge badge-success badge-sm">Rq</span>
                                <input type="text" className="w-full input input-sm" placeholder="Type here" />
                            </fieldset>
                        </div>
                        <div className='flex items-end justify-end gap-2'>
                            <button className='btn btn-sm btn-error' onClick={() => setOpenDialog(false)}>Close</button>
                            <button className='btn btn-sm btn-success' onClick={() => setOpenDialog(false)}>Save</button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default NewsDialog