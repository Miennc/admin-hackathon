import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getExam, editExam} from '../../services/examService';

const EditExam = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({
        exam_name: "",
        time_limit: 0,
        error:''
    });
    const {exam_name, time_limit,error} = data;

    useEffect(() => {
        getExamById()
    }, []);

    const getExamById = async () => {
        try {
            const rep = await getExam(id)
            setData(rep.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const editNewExam = async () => {
        if(exam_name == ''||time_limit==0){
            setData({...data,error: "Điền đầy đủ thông tin & time khác 0"});
            return
        }
        setData({...data,error: ''});
        try {
            const rep = await editExam({
                id,
                exam_name,
                time_limit
            });
            alert("Sửa thành công");
            navigate('/')
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                    <div className="mb-4">
                        <div className="text-center">
                            <h1 className="text-grey-darkest font-bold ">Edit exam</h1>
                        </div>
                        <div className=" mt-4">
                            <input
                                name="exam_name"
                                value={exam_name}
                                onChange={changeInput}
                                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                                placeholder="thêm kì thi"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="time_limit"
                            value={time_limit}
                            onChange={changeInput}
                            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                            placeholder="thêm thời gian"
                        />
                    </div>
                    <div className="text-red-500 text-center w-full font-bold text-xl">{error}</div>
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={() => editNewExam()}
                            className="text-white bg-blue-700 w-44 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none p-2 ml-3"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditExam;