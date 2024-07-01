import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);

  useEffect(() => {
    fetch('https://blog-app-2-qyll.onrender.com/api/posts/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  async function updatePost(ev) {

    ev.preventDefault();
    
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    const response = await fetch('https://blog-app-2-qyll.onrender.com/api/posts/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.status === 200 || response.status === 201) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost} className="flex flex-col mx-auto justify-center w-3/5 items-center">

      <input className="block w-full p-2 border border-gray-300 rounded-md mb-3 hover:border-blue-400"
             type="title"
             placeholder={'Title'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />

      <input className="block w-full p-2 border border-gray-300 rounded-md mb-3 hover:border-blue-400"
             type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />

      <input className='my-10'
             type="file"
             onChange={ev => setFiles(ev.target.files)} />

      <Editor onChange={setContent} value={content} />

      <button className='my-10 block w-1/5 p-2 rounded mb-6 bg-gray-800 text-white 
            hover:bg-gray-700 mx-auto'>Update post</button>

    </form>
  );
}