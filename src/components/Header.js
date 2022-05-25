import React from 'react';

function Header(props) {
    return (
        <div className="w-full">
        <header className="bg-teal-400">
          <nav className="flex justify-between w-full bg-purple-500 text-white p-4">
            <a href="/"><span className="font-semibold text-xl tracking-tight">Title</span></a>
            <div className="md:items-center md:w-auto flex">
              <div className="md:flex hidden">
                <a className="block md:text-white mr-4" href="/link">Link 1</a>
                <a className="block md:text-white mr-4" href="/link">Link 2</a>
                <a className="block md:text-white mr-4" href="/link">Link 3</a>
                <a className="block md:text-white mr-4" href="/link">Link 4</a>
              </div>
              <div className="flex text-sm" v-else>
                <a className="p-2 ml-2 bg-white text-teal-500 font-semibold leading-none border border-gray-100 rounded hover:border-transparent hover:bg-gray-100" href="/auth/signin">Login</a>
                <a className="p-2 ml-2 bg-teal-500 text-gray-100 font-semibold leading-none border border-teal-600 rounded hover:border-transparent hover:bg-teal-600" href="/auth/signup">Sign up</a>
              </div>
            </div>
          </nav>
        </header>   
      </div>
    );
}

export default Header;