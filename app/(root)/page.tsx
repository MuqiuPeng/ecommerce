import { auth } from '@clerk/nextjs/server';
import React from 'react';
import { redirect } from 'next/navigation';

const WelcomePage: React.FC = async () => {
    const authResult = await auth();
    const { userId } = authResult;
    if (userId) {
        redirect("/profile");
    }
    return (
        <div className='flex flex-col items-center mt-5'>
            <h1>Welcome to Ecommerce Admin</h1>
            <p>Manage your ecommerce platform with ease.</p>
        </div>
    );
};

export default WelcomePage;