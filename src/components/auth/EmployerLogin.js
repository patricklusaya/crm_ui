import React, { useEffect, useState } from 'react'

import cover from "../../assets/signup.png"
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { loginUser } from '../../actions/AppActions';
import { NavLink, useNavigate } from 'react-router-dom';

export default function EmployerLogin() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({

        email: "",
        password: "", 
        authenticating:false,
        authError:''

    })
    
    const appState = useSelector((state) => state.app);

  
    useEffect(() => {
      try {
        setState((prevState) => ({
          ...prevState,
          authenticating:appState.authenticating,
        authError:appState.authError
  
        }));
      } catch (e) {
        console.log(e);
      }
    }, [appState]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        return emailRegex.test(email);
      };


    const handleSubmit = (e) => {

         const currentRole = "admin"

      
         if (!validateEmail(email)) {
            message.error("Please enter a valid email address");
            return;
          }
      
      

        if (email && password) {

            dispatch(loginUser(email, password, currentRole, navigate))

        } else {

            message.error("All fields are required")

        }
    }


    const { email, password } = state;

    return (
        <div class="flex h-screen">
            {/* <!-- Left Container (Illustration) --> */}
            <div class="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-600 to-purple-700 items-center justify-center">
                <img src={cover} alt="Illustration" className="h-1/2 rounded-full" />
            </div>

            {/* <!-- Right Container (Login Form) --> */}
            <div class="flex w-full md:w-1/2 items-center justify-center bg-white">
                <div class="w-full max-w-md p-8 space-y-6">
                    <h2 class="text-3xl font-bold text-center text-gray-800">Login As Admin</h2>
                    <div class="text-center text-blue-300"> 

                    <NavLink  to="/login" className="  text-blue hover:text-gray-400">
                      I'm Not An Admin
                    </NavLink>
                    </div>
                    

                    <div class="space-y-4">
                        {/* <!-- Email Field --> */}
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setState(prevState => ({ ...prevState, email: e.target.value }))}
                                required
                            />

                        </div>

                        {/* <!-- Password Field --> */}
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setState(prevState => ({ ...prevState, password: e.target.value }))}
                                required
                            />
                        </div>
                       
                        {state.authError && (
                            <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
                                {state.authError } 
                            </div>
                         )}



                        <div class="flex items-center justify-between">
                  
                        </div>

                        {/* <!-- Sign In Button --> */}
                        <button  onClick={handleSubmit} class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          
                            {state.authenticating ? (<span>Signing in ...</span> ):( <span>Sign In</span> )}
                        </button>

                        <div class="text-center">
                            <p class="text-sm text-gray-600">Don't have an account?  <NavLink  to="/signup" className="text-blue-600 hover:underline">
                                Sign Up
                            </NavLink> </p>
                        </div>

                      
                    </div>
                </div>
            </div>
        </div>

    )
}
