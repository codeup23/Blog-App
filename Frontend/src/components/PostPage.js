import React, { useEffect, useState, useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';
import Modal from './Modal';

const PostPage = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to manage modal visibility
    const { userInfo } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    // console.log(userInfo);

    useEffect(() => {
        const response = fetch(`https://blog-app-2-qyll.onrender.com/api/posts/post/${id}`).then(res => {
            res.json().then(post => {
                console.log(post);
                setPost(post);
            }
            )
        }).catch(err => {
            console.log(err);
        });
        console.log(response);
    }, []);

    if(!post){
        return <div>Loading...</div>
    }
    // console.log(userInfo?.user?._id);

    // function to delete the post entry when clicked. It also confirms once from the user
    const deletePostHandler = async () => {
        const response = await fetch(`https://blog-app-2-qyll.onrender.com/api/posts/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include',
        });
    
        if (response.status === 200 || response.status === 201) {
          console.log('Post Deleted');
          alert('Post Deleted Successfully');
          setRedirect(true);
        }
      };
    
      const openModal = () => setShowModal(true);
      const closeModal = () => setShowModal(false);

      if(redirect){
        return <Navigate to='/' />
      }

  return (
    <div className='h-full p-6'>

        <h1 className='text-4xl font-bold text-center mb-6'>{post.title}</h1>
        <time className='text-center block text-xs text-gray-400 font-bold'>
            {formatISO9075(new Date(post.createdAt))}
        </time>
        <div className='font-bold text-center text-sm text-gray-400 block mb-10'>by @{post.author.username}</div>

         {
            userInfo?.user?._id === post.author._id && (
                <div className='flex items-center justify-center mx-auto mb-10 max-w-80'>
                    <Link to={`/edit/${post._id}`} className='text-white border-2 border-black bg-black w-24 px-8 py-2.5 rounded-lg mx-auto hover:bg-white hover:text-black transition duration-300 ease-in-out shadow-md shadow-gray-400'
                    >
                        Edit
                    </Link>

                    <button className='flex items-center justify-center text-white border-2 border-black bg-black w-24 px-8 py-2.5 rounded-lg mx-auto hover:bg-white hover:text-black transition duration-300 ease-in-out shadow-md shadow-gray-400'
                    onClick={openModal}
                    >
                        Delete
                    </button>
                </div>
            )
         }

        <div className='max-h-[500px] flex overflow-hidden'>
            <img src={`https://blog-app-2-qyll.onrender.com/${post.cover}`} alt="post"
            className='w-2/3 object-cover object-center align-center mx-auto'
            />
        </div>

        <div dangerouslySetInnerHTML={{__html:post.content}}
        className='text-lg leading-10 my-8 mx-auto max-w-3xl'
        ></div>

        <Modal show={showModal} onClose={closeModal} onConfirm={deletePostHandler} />
    </div>
  )
}

export default PostPage