import React from 'react';

const NoDataFound = () => {
    return (
        <div className="flex items-center justify-center h-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-3xl font-semibold text-gray-800 mb-4">No Data Found</h3>
                <p className="text-gray-600">There is no data available at the moment.</p>
            </div>
        </div>

    );
};

export default NoDataFound;
