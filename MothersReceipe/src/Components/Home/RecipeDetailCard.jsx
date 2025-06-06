import { FiClock, FiUser, FiHeart, FiBookmark, FiShare2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import "@tailwindcss/typography";
import DOMPurify from 'dompurify';

import axios from 'axios';

const RecipeDetailCard = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // temp
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);

    const  handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            const newComment = {
                comment: comment,
                userId: localStorage.getItem('ID'),
                recipeId: recipeId,
            };
            (async () => {
                const res = await axios.post(`https://motherrecipe.runasp.net/api/comment/addcomment/`, newComment)
                if (res.status == 200) {
                    setCommentsList((prev) => [
                        { comment: comment ,date: new Date().toLocaleString(), userName: localStorage.getItem('username'), profilePicture:'https://motherrecipe.runasp.net/'+localStorage.getItem('profilePic') },
                        ...prev,
                    ]);

                    setComment("");
                }
            })()

        }
    };

    // temp

    useEffect(() => {

        // fetching the Recipes 
        const fetchRecipe = async () => {
            try {
                const fd = new FormData();
                fd.append('UserId', localStorage.getItem('ID'));
                fd.append('RecipeId', recipeId);
                const response = await axios.post(`https://motherrecipe.runasp.net/api/Recipe/GetRecipesbyRecipeId`, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.status != 200) throw new Error('Recipe not found');
                const data = await response.data;
                setRecipe(data);
                setIsSaved(data.saved);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();

        // fetching the comments
        (async () => {
            const res = await axios.get(`https://motherrecipe.runasp.net/api/comment/getcomments/${recipeId}`)
            if (res.status == 200) {
                setCommentsList(res.data);
            }
        })()
    }, []);

    const handleSave = () => {
        setIsSaved(!isSaved);
        (async () => {
            const res = await axios.post(`https://motherrecipe.runasp.net/api/Recipe/saverecipe/${localStorage.getItem('ID')}?RecipeId=${recipeId}`);
            if (res.status === 200) {
                // alert(res.data);
            }
        })();
    };

    const handleLike = () => {
        setIsLiked(!isLiked);
        // Optional: Add like API logic
    };

    if (loading) return <div className="text-center py-12">Loading recipe...</div>;
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
    if (!recipe) return <div className="text-center py-12">Recipe not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Recipe Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400">{recipe.title}</h1>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleLike}
                            className={`p-2 rounded-full ${isLiked ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
                        >
                            <FiHeart className="text-xl" />
                            <span className="sr-only">Like</span>
                        </button>
                        <button
                            onClick={handleSave}
                            className={`p-2 rounded-full ${isSaved ? 'text-orange-600' : 'text-gray-400 hover:text-orange-600'}`}
                        >
                            <FiBookmark className="text-xl" />
                            <span className="sr-only">Save</span>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-orange-500 rounded-full">
                            <FiShare2 className="text-xl" />
                            <span className="sr-only">Share</span>
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center">
                        <FiUser className="mr-2" />
                        <span>{recipe.author || 'Anonymous'}</span>
                    </div>
                    <div className="flex items-center">
                        <FiClock className="mr-2" />
                        <span>{recipe.time} minutes</span>
                    </div>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {recipe.catagoryName}
                    </span>
                </div>
            </div>

            {/* Recipe Image */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
                {recipe.recipeImage ? (
                    <img
                        src={recipe.recipeImage}
                        alt={recipe.title}
                        className="w-full h-96 object-cover"
                    />
                ) : (
                    <p className="w-full h-96 flex items-center justify-center text-5xl lg:text-8xl text-center uppercase font-semibold bg-orange-50 text-orange-600">
                        {recipe.title}
                    </p>
                )}
            </div>

            {/* Description */}
            <div className="mb-8 ">
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {recipe.description}
                </p>
            </div>

            {/* Instructions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 border-2 border-orange-500 p-6">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-orange-700 dark:text-orange-400">Instructions</h2>

                    <div
                        className="prose max-w-none dark:prose-invert unreset"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(recipe.instruction) }}
                    />

                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {recipe.tags?.map((tag, index) => (
                    <span
                        key={index}
                        className="bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-white px-3 py-1 rounded-full text-sm"
                    >
                        #{tag}
                    </span>
                ))}
            </div>
            <hr className=' border-2 border-orange-400' />
            <div className="max-w mx-auto mt-10 p-4 bg-white rounded-2xl ">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Comments</h2>

                {/* Comment Form */}
                <form onSubmit={handleSubmit} className="mb-6">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                        rows={3}
                    />
                    <button

                        type="submit"
                        className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                        Post Comment
                    </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                    {commentsList.length === 0 ? (
                        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                    ) : (
                        commentsList.map((c, index) => (
                            <div
                                key={index}
                                className="bg-orange-50 border border-orange-200 p-3 rounded-lg flex gap-3 items-start"
                            >
                                {/* Profile Picture */}
                                <img
                                    src={c.profilePicture || "https://via.placeholder.com/40"}
                                    alt="User"
                                    className="w-10 h-10 rounded-full object-cover"
                                />

                                {/* Comment Content */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium text-gray-800">{c.userName || "Anonymous"}</p>
                                        <span className="text-sm text-gray-500">{c.date}</span>
                                    </div>
                                    <p className="text-gray-700 mt-1">{c.comment}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailCard;