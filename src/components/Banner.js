import React from 'react';

function Banner(props) {
    return (
        <div className="mb-8">
            <div className="mx-auto w-1/3 border-t-2 border-gray-800 mb-8">
                <div className="grid grid-cols-3 text-center">
                    <div className="border-t-4 border-black mx-auto ">Cgi</div>
                    <div className="border-t-4 border-black mx-auto ">Server</div>
                    <div className="border-t-4 border-black mx-auto ">studio</div>
                </div>
            </div>
            <div className="w-full h-80 overflow-hidden mb-8">
                <img className="object-cover w-full h-full" src="https://cdn.pixabay.com/photo/2018/10/23/08/18/sexy-girl-3767276__340.jpg" alt="girl"/>
            </div>
            <div className="container mx-auto">
                <div className="text-5xl text-yellow-400">''</div>
                <div className="mx-28 text-xl font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate hic maxime, quam reprehenderit rerum unde?</div>
                <div className="text-5xl text-yellow-400 text-right">''</div>
            </div>
        </div>
    );
}

export default Banner;