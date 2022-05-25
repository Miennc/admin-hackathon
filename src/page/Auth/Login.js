import React from 'react'
import { useState } from 'react'
import { LoginServices } from '../../services/LoginServices'
import { useNavigate } from 'react-router';
export function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigate()
    const submit = async (e) => {

        e.preventDefault();
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

        <div className="flex min-h-screen items-center justify-center">
            <div className="min-h-1/2 bg-gray-900  border border-gray-900 rounded-2xl">
                <div className="mx-4 sm:mx-24 md:mx-34 lg:mx-56 mx-auto  flex items-center space-y-4 py-16 font-semibold text-gray-500 flex-col">
                
                    <h1 className="text-white text-2xl">Login Admin</h1>
                    <input className="w-full p-2 bg-gray-900 rounded-md  border border-gray-700 focus:border-blue-700" placeholder="Username" type="email" name="correo" id onChange={(e)=>setUsername(e.target.value)}/>
                    <input className="w-full p-2 bg-gray-900 rounded-md border border-gray-700 " placeholder="password*" type="password" name="correo" id  onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={submit} className="w-full    p-2 bg-gray-50 rounded-full font-bold text-gray-900 border border-gray-700 " type="submit" name="correo" id >submit</button>
                </div>
            </div>
        </div>
    )
}
export default Login;