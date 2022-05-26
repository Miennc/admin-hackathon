import React from 'react'
import { useState } from 'react'
import { LoginServices } from '../../services/LoginServices'
import { useNavigate } from 'react-router';
export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const navigation = useNavigate()
    const submit = async () => {
        if(username === ''){
            setErrorName('Username is required')
            return;
        }else {
            setErrorName('')
        }if (password === '') {
            setErrorPassword('Password is required')
            return;
        }else{
            setErrorPassword('')
        }
        try {
           const res =  await LoginServices.login({ username, password })
            localStorage.setItem('token', res.data.token )
            localStorage.setItem('user', res.data.username)
            navigation('/')
        } catch (error) {
            console.log(error)
        }    
    }
    return (
            <div className="py-10">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")'}} />
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Login Admin</h2>
            <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
             
            </a>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">User Name</label>
              <input onChange={(e)=>setUsername(e.target.value)}  placeholder=" Enter user name" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
              <span className="text-red-500 italic text-sm">{errorName}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              </div>
              <input  onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
              <span className="text-red-500 italic text-sm">{errorPassword}</span>
            </div>
            <div className="mt-8">
              <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" onClick={(e)=>submit(e)} >Login</button>
            </div>
          </div>
        </div>
      </div>
    )
}
export default Login;