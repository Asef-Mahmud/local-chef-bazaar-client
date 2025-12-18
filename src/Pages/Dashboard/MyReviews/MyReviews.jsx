import React, { useRef, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import { useForm } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';
import { chefToast } from '../../../utils/chefToast';
import { chefAlert } from '../../../utils/chefAlert';

const MyReviews = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const updateReviewRef = useRef(null)
    const [review, setReview] = useState({})
    // Form control
    const { register, formState: { errors }, handleSubmit } = useForm()


    const { data: myReviews = [], isLoading, refetch } = useQuery({
        queryKey: ['my-reviews', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-reviews/${user.email}`)

            return res.data
        }
    })

    //delete
    const handleDeleteReview = (id) => {
        chefAlert({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
        }).then((result) => {
            if (result.isConfirmed) {

                //  data to delete
                axiosSecure.delete(`/delete-review/${id}`)
                    .then(data => {
                        if (data.data.deletedCount) {
                            chefToast.success('Review has been deleted successfully')
                        }

                        // Removal from the UI 
                        refetch()
                    })
                    .catch(error => {
                        chefToast.error('Error: Try Again Later')
                    })

            }
        });
    }


    // UPDATE

    // MOdal for Updating Review
    function handleUpdateReviewModal(review) {
        setReview(review)

        updateReviewRef.current.showModal();
    }

    const handleUpdateReview = (data) => {

        const updatedData = {
            comment: data.comment || review.comment,
            rating: data.rating || review.rating
        }

        // UPDATE INFO
        axiosSecure.patch(`/update-my-review/${review._id}`, updatedData)
            .then(data => {
                if (data.data.modifiedCount) {
                    refetch()

                    // CLosing the modal
                    updateReviewRef.current.close()

                    chefToast.success('Information Updated')
                }
            })
            .catch(error => {
                chefToast.error('Error! Try Again later!')
            })
    }


    if (isLoading) {
        return <Loader></Loader>
    }



    return (
        <div className='max-w-[1600px] mx-auto px-3 md:px-10 py-5'>
            <div className='pb-5'>
                <h1 className='text-3xl md:text-4xl font-bold text-primary text-center my-3'>Reviews You've Shared</h1>
            </div>

            {/* Info table */}
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <tbody>
                        {
                            myReviews.map((review, index) =>
                                <tr key={review._id} className='border-b border-primary'>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3 my-3">
                                            <div className="font-bold">{review.mealName}</div>
                                        </div>

                                    </td>
                                    <td className='text-wrap'>{review.comment}</td>
                                    <td><span className="whitespace-nowrap badge-warning font-bold">{new Date(review.timestamp).toLocaleDateString()}</span></td>
                                    <td>
                                        <div className="flex items-center mt-1">
                                            {Array.from({ length: review.rating }).map((_, i) => (<span key={i} className="text-xl">★</span>))}
                                        </div>
                                    </td>


                                    <td className='flex flex-col justify-center items-start gap-2'>
                                        <button onClick={() => handleDeleteReview(review._id)} className="btn btn-ghost btn-xs rounded-4xl hover:btn-primary hover:text-base-200 mt-2 border-2">Delete</button>
                                        <button onClick={() => handleUpdateReviewModal(review)} className="btn btn-ghost btn-xs rounded-4xl hover:btn-primary hover:text-base-200 border border-neutral">Update</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


    


            {/* MODAL for UPDATE */}

            <dialog ref={updateReviewRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='flex justify-between items-center mb-2'>
                        <h3 className="font-bold text-3xl">Modify Review</h3>
                        <div>
                            <form method="dialog">

                                <button className="btn bg-base-100 p-2 hover:border-primary text-primary rounded-full text-3xl"><MdCancel /></button>
                            </form>
                        </div>
                    </div>


                    {/* Form */}
                    <form onSubmit={handleSubmit(handleUpdateReview)}>
                        <fieldset className="fieldset space-y-3">

                            {/* Review Text */}
                            <label className="label">Your Review</label>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                {...register("comment")}
                                defaultValue={review.comment}
                            />
                            {errors.reviewText && (
                                <p className="text-red-500 text-sm">Review is required</p>
                            )}

                            {/* Rating */}
                            <label className="label">Rating</label>
                            <select
                                className="select select-bordered w-full"
                                {...register("rating")}
                            >
                                <option value="">Rated: {review.rating}</option>
                                <option value="5">★ ★ ★ ★ ★</option>
                                <option value="4">★ ★ ★ ★</option>
                                <option value="3">★ ★ ★</option>
                                <option value="2">★ ★</option>
                                <option value="1">★</option>
                            </select>
                            {errors.rating && (
                                <p className="text-red-500 text-sm">Rating is required</p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4">

                                <button type="submit" className="btn bg-primary text-base-100">Update Review</button>
                            </div>

                        </fieldset>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;