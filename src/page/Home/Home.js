import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { delExam, getAllExam} from "../../services/examService";
import { useNavigate } from 'react-router';
import './dropdow.css'
import Footer from '../../components/Footer';
import {getExam, editExam} from '../../services/examService';
import { addExam } from "../../services/examService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home(props) {
  const [show, setShow] = useState(false);
  const [exams, setExams] = useState({});
  const [searchExam, setSearchExam] = useState('');
   
  const [showQuestion, setShowQuestion] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [exam, setExam] = useState("");
  const [time, setTime] = useState(null);

  const navigate = useNavigate();
  const getExam = async () => {
    try {
      const rep = await getAllExam();
      setShowQuestion(rep.data);
      localStorage.setItem("exam", JSON.stringify(rep.data));
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setExams(item);
  };

  useEffect(() => {
    getExam();

    if (!user) {
      navigate('/login');
    }
  }, []);

  const deleteNote = async (id) => {
    try {
     const response = await delExam(id);
      if(response.data ===true ){
        toast.success('delete success!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }else{
        toast.warn('failed to delete the exam that has been tested', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (error) {
      toast.error('delete failed!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    getExam()
  };
   const add = async ()=>{
      try {
        await addExam({
          exam_name: exam,
          time_limit: time,
        });
        setShow(false);
      } catch (error) {
      }
      getExam();
   }

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const search = (e)=>{
    e.preventDefault();
     try {
       const local = JSON.parse(localStorage.getItem("exam"));
       const exam = local.filter((item)=>item.exam_name.toLowerCase().includes(searchExam));
        setShowQuestion(exam);
     } catch (error) {
       alert(error);
     }
     setSearchExam('');
  }
  const notify = () => toast("Wow so easy!");
  return (
    <div >
       {
         show &&  <div className="z-30 w-96 h-96 rounded-xl  mx-auto absolute top-10 right-0 left-0 -bottom-10 shadow-2xl bg-gray-400">
         <i class="fa-solid fa-x flex justify-end cursor-pointer mr-2 text-xl text-white" onClick={handleClose}></i>
         <div className="p-10 max-w-lg">
          <div className="flex flex-col items-center space-y-4">
            <h1 className="font-bold text-2xl text-white w-4/6 text-center">
              Add exam
            </h1>
            <input type="text" placeholder="name"  name="exam_name"   onChange={(e)=>setExam(e.target.value)}  className="border-2 rounded-lg w-full h-12 px-4" />
            <input type="number" placeholder="time" name="time_limit"  onChange={(e)=>setTime(e.target.value)} className="border-2 rounded-lg w-full h-12 px-4" />
            <button onClick={()=>add()} className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full">
              Submit
            </button>

          </div>
        </div>
  
         </div>
       }
      <div class="">
        <nav className="bg-white  border-b border-gray-200 fixed z-20 w-full">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-start">
                <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded">
                  <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                  <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                  <span className="self-center whitespace-nowrap" >Admin</span>
                </a>
                <form action="#" method="" onSubmit={search} className="hidden lg:block lg:pl-32">
                  <label htmlFor="topbar-search" className="sr-only">Search Exam</label>
                  <div className="mt-1 relative lg:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="text" value={searchExam} onChange={(e)=>setSearchExam(e.target.value)}  id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search exam" />
                  </div>
                </form>
              </div>
              <div className="flex items-center">
                <div className="hidden lg:flex items-center">
                  <span className="text-base font-normal text-gray-500 mr-5">{user}❤️</span>
                </div>
                {user && <a onClick={logout} href="#" className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                  Logout
                </a>}
              </div>
            </div>
          </div>
        </nav>
        <div className="flex overflow-hidden bg-white pt-16">
          <aside id="sidebar" className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75" aria-label="Sidebar">
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                  <ul className="space-y-2 pb-2">
                    <li>
                      <form action="#" method="GET" className="lg:hidden">
                        <label htmlFor="mobile-search" className="sr-only">Search</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                          </div>
                          <input type="text" name="search" id="mobile-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                        </div>
                      </form>
                    </li>

                    <div className="dropdown">
                      <div className="dropdown__select">
                        <span className="dropdown__selected">Exam</span>
                        <i className="fa fa-caret-down dropdown__caret"></i>
                      </div>
                      <ul className="dropdown__list">
                        <li className="dropdown__item" onClick={handleShow}>
                          <span className="dropdown__text">Add exam</span>
                          <i className="fa fa-plus-circle dropdown__icon"></i>
                        </li>

                        <li className="dropdown__item" onClick={getExam} >
                          <span className="dropdown__text">List exam</span>
                          <i className="fa fa-user dropdown__icon"></i>
                        </li>

                      </ul>
                    </div>


                    

                  </ul>


                </div>
              </div>
            </div>
          </aside>
          <div className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop" />
          <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">


            

            <main className="mt-1">
              <div className="pt-6 px-4">


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3  font-bold">
                          List of exam questions
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>

                        <th scope="col" className="px-6 py-3" >
                         <span className="sr-only" >Edit</span>
                        </th>
                      </tr>

                    </thead>
                    <tbody>
                      {
                        showQuestion?.map((item) => {
                          return (
                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                <p className="font-bold text-lg"> {item.exam_name}</p>
                              </th>
                              <td className="px-6 py-4">
                                <p className="font-semibold text-md">
                                  {item.time_limit} minute

                                </p>
                              </td>


                              <td className="px-6 py-4 text-right">
                                <Link to={`/edit-exam/${item.id}`}>
                                <button href="#" className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>handleShow(item)}>Edit</button>

                                </Link>
                                <button href="#" className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>deleteNote(item.id)}>Delete</button>
                               <Link to={`/question/${item.id}`}>
                               <button href="#" className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" >Details</button></Link>
                                
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                 
                  
                  <div>


          </div>
 
         
        
            

                </div>
                <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">2,340</span>
                        <h3 className="text-base font-normal text-gray-500"> development features</h3>
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        14.6%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">5,355</span>
                        <h3 className="text-base font-normal text-gray-500">development features</h3>
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                        32.9%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">385</span>
                        <h3 className="text-base font-normal text-gray-500"> development features</h3>
                      </div>
                      <div className="ml-5 w-0 flex items-center justify-end flex-1 text-red-500 text-base font-bold">
                        -2.7%
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </main>

            <Footer></Footer>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
