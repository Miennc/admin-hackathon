import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delExam, getAllExam } from "../../services/examService";
import { useNavigate } from 'react-router';
function Home(props) {

  const [showQuestion, setShowQuestion] = useState([]);
 const [user, setUser] = useState(localStorage.getItem("user"));
 const navigate = useNavigate();
  const getExam = async () => {
    try {
      const rep = await getAllExam();
      setShowQuestion(rep.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getExam();
  }, []);

  const deleteNote = async (id, index) => {
    try {
      await delExam(id);
      getExam()
      alert("Xoá thành công");
    } catch (error) {
      console.log();
    }
  };


  const logout = ()=>{
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
      <div>

     <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 md:mx-10 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <div className="flex items-center md:order-2">
           {
             user &&   <button className="mr-2 hover:text-violet-700" onClick={logout}>Logout</button>  
           }
             <div className="mr-3">
               
             {
              user ? user   : <Link to="/login"> <button>Login</button> </Link>
            
            }  </div>     
            
            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="dropdown">
              <span className="sr-only">Open user menu</span>
              <img className="w-8 h-8 rounded-full" src="https://daotaonoibo.vn/wp-content/uploads/elementor/thumbs/icon-user-1-oyx1kegfbiykagz2yacgmv71c7xjmassz5tvm0se2e.png" alt="user photo" />
            </button>
               

            {/* Dropdown menu */}
            <div className="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
              <div className="py-3 px-4">
                <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
              </div>
              <ul className="py-1" aria-labelledby="dropdown">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
        
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
              </li>
              <li>
                <a href="#" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> 




    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4 md:flex md:justify-between text-center">
          <h1 className="text-grey-darkest font-bold  text-xl">List of exam questions</h1>
          <Link to="/add-exam">
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Exam</button>
          </Link>
        </div>
        <div>
          {(showQuestion || []).map((item, index) => {
            return (

              <div className=" md:flex mb-4 md:justify-between  flex-wrap items-center" key={index}>
                
                {/* {item.exam_name}  */}
               <div className="text-lg  font-bold flex justify-center mb-2">{item.exam_name} </div>
                
                <div className="flex justify-center"> 

                <button
                  onClick={() => deleteNote(item.id, index)}
                  class="text-white bg-red-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                  Remove
                </button>
                <Link to={`/edit-exam/${item.id}`}>
                <button
          
                  class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                  Edit
                </button>
                </Link>

                <button
                  class="text-white bg-blue-700  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                >
                    <Link to={`/question/${item.id}`}>Details</Link>
                </button>
                </div>

               </div>  

            );
          })}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Home;
