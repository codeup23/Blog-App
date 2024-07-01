import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(event){
        event.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        // console.log(files);

        const response = await fetch('https://blog-app-2-qyll.onrender.com/api/posts/post', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            body: data,
            credentials: 'include',
        })
        // .then(res => {
        //     if(res.status === 201 || res.status === 200){
        //         alert('Post created successfully');
        //     }
        //     else{
        //         alert('Bad request');
        //     }
        // });
        if(response.status === 201 || response.status === 200){
            alert('Post created successfully');
            setRedirect(true);
        }

        console.log(await response.json());
    }

    if(redirect){
        return <Navigate to='/' />
    }

  return (
    <div>
        <form className='flex flex-col mx-auto justify-center w-3/5 items-center'
        onSubmit={createNewPost}
        >
            <input type="title" placeholder={'Title'}
            className="block w-full p-2 border border-gray-300 rounded-md mb-3 hover:border-blue-400"
            value={title}
            onChange={event => {
                setTitle(event.target.value);
                }
            }
            />
            <input type="summary" placeholder={'Summary'} 
            className="block w-full p-2 border border-gray-300 rounded-md mb-3 hover:border-blue-400"
            value={summary}
            onChange={event => {
                setSummary(event.target.value);
                }
            }
            />
            <input type="file" 
            className='my-10'
            onChange={event => {
                setFiles(event.target.files);
                }
            }
            />

            <Editor
            onChange={setContent}
            value={content} 
            />

            <button className='my-10 block w-1/5 p-2 rounded mb-3 bg-gray-800 text-white 
            hover:bg-gray-700 mx-auto'>Create</button>
        </form>
    </div>
  )
}

export default CreatePost;