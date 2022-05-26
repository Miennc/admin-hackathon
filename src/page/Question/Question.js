    import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getAllQuestions, deleteQuestion} from "../../services/questionService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Question(props) {
    const {id} = useParams();
    const [showQuestion, setShowQuestion] = useState([]);

    const getQuestions = async () => {
        try {
            const rep = await getAllQuestions(id);
            setShowQuestion(rep.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);


    const deleteNote = async (id) => {
        try {
        const response =  await deleteQuestion(id);
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
            toast.warn('failed delete question already done', {
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
            toast.error('delete failed',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        getQuestions();
    };

    return (
        <div className="flex items-center justify-center w-full font-sans h-100 bg-teal-lightest">
            <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
                <div className="flex items-center justify-between mb-4">
                <Link to="/" className="font-bold text-md bg-red-600 p-2 text-white rounded-lg"><button>Back to home</button></Link>

                    <h1 className="font-bold text-grey-darkest">Question list</h1>
                    
                    <Link to={`/add-question/${id}`}>
                        <button
                            className="text-white bg-blue-700 w-28 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3">
                            Add Question
                        </button>
                    </Link>
                </div>
                <div>
                    {(showQuestion || []).map((item, index) => {
                        return (
                            <div className="md:flex items-center md:justify-between mb-4" key={index}>
                               
                                <div className="flex flex-wrap justify-start items-center">
                                <div className="md:w-20 md:h-20 overflow-hidden w-44 h-20 ">
                               {item.image_url ?                      
                                <img className="w-full h-full  rounded object-cover" src={process.env.REACT_APP_BASE_API+"/images/"+item.image_url} alt="photoQuestion"/>        
                                : <img src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg" alt="" />                
                                }

                               </div>
                                  
                                   <div className=" md:ml-3 md:w-auto w-full text-center mt-2 mb-2 text-grey-darkest">
                                       {item.question_content}
                                   </div>
                                   
                                </div>

                                <div className="flex justify-center">
                                    <Link to={`/edit-question/${id}/${item.id}`}>
                                        <button
                                            className="p-1 ml-2 border-2 rounded  flex-no-shrink text-red border-red hover:text-white hover:bg-blue-500"
                                        >
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => deleteNote(item.id)}
                                        className="p-1 ml-2 border-2 rounded  flex-no-shrink text-red border-red hover:text-white hover:bg-red-500"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Question;
