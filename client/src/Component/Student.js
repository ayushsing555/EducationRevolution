import React from 'react';

const Student = () => {
    let a = [1, 2, 3, 4, 5, 6, 7, 8, 9,];
    return (
        <div>
            <div class="text-center my-4">
                <h2 class="text-2xl text-blue-600 font-semibold">Students List</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200 justify-center ">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-bold  text-left text-1xl   leading-4 font-medium  uppercase tracking-wider">
                            User Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left  leading-4 font-medium text-1xl uppercase tracking-wider">
                            Email
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left  leading-4 font-medium text-1xl uppercase tracking-wider">
                            Created Date
                        </th>
                        <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y  divide-gray-200">
                    {
                        a.map((elem) => {
                            return (
                                <>
                                    <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            John Doe
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            john@example.com
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            2023-11-01
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap">
                                            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-full">Button</button>
                                        </td>
                                    </tr>
                                </>
                            );
                        })
                    }

                    {/* <!-- Add more rows with user data and buttons as needed --> */}
                </tbody>
            </table>

        </div>
    );
};

export default Student;