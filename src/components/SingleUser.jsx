import React from 'react';
import { useLoaderData } from 'react-router';

const SingleUser = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div>
            <h2 className='text-5xl font-bold mb-5'>{user.name}</h2>
            <h2 className='text-2xl font-semibold'>{user.email}</h2>
            
        </div>
    );
};

export default SingleUser;