import React, { useEffect, useState } from 'react';
import Posts from './Posts';

const Home = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const response = fetch('https://blog-app-2-qyll.onrender.com/api/posts/post').then(res => {
            res.json().then(posts => {
                console.log(posts);
                setPosts(posts);
            }
            )
        }).catch(err => {
            console.log(err);
        });
    }, []);

  return (
    <div className='pb-6'>
        {posts.length > 0 && posts.map(post => {
            return <Posts {...post} />
        }
        )}
    </div>
  )
}

export default Home