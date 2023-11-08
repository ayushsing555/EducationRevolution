import React from 'react';

const Admin = () => {
    return (
        <>
            <div class="flex justify-center items-center h-64">
                <div class="text-center">
                    <a href="/admin/student" class="bg-blue-500 hover:bg-blue-600 text-white text-3xl px-10 py-6 rounded-full mb-4 inline-block">Go to Students </a>
                    <a href="/admin/content" class="bg-green-500 hover:bg-green-600 text-white text-3xl px-10 py-6 rounded-full mb-4 inline-block">Add Content</a>
                </div>
            </div>
        </>
    );
};

export default Admin;