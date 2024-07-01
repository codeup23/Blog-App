import React from 'react';
import {Link} from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

const Posts = ({_id, title, summary, cover, content, createdAt, author}) => {
  return (
    <div className= "posts max-w-[75%] mx-auto">

          <div className="post grid grid-cols-1 md:grid-cols-[.9fr_1.1fr] gap-4 mb-12">

            <div className="image">
                <Link to={`http://localhost:3000/post/${_id}`}>
                    <img src={"https://blog-app-2-qyll.onrender.com/" + cover} alt="" className="h-48 w-80 hover:opacity-80 rounded-md min-w-80"/>
                </Link>
            </div>

            <div className="info flex flex-col">

                <Link to={`http://localhost:3000/post/${_id}`}>
                    <h2 className='font-bold text-lg hover:text-gray-600'>{title}</h2>
                </Link>
                
                <p className="info flex gap-2 my-1 mx-0 text-gray-500 font-bold text-xs">

                  <Link href="" className="author text-gray-700">{author.username}</Link>
                  <time datetime="">{formatISO9075(new Date(createdAt))}</time>

                </p>
                <p className='description my-3 mx-0 leading-6'>
                    {summary}

                </p>
            </div>
          </div>
        </div>
  )
}

export default Posts;