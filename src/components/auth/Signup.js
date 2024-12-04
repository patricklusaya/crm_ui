import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';

// action imports
import { loginUser, signupUser } from '../../actions/AppActions';

// file imports
import cover from "../../assets/signin.png"

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const [state, setState] = useState({

        email: "",
        password: "", 
        authenticating:false,
        authError:'',
        phone_number:"",
        password_confirm:'',
        name:"",
        signupLoad:false,
        signupError:''

    })
    
    const appState = useSelector((state) => state.app);

    useEffect(() => {
      try {
        setState((prevState) => ({
          ...prevState,
          authenticating:appState.authenticating,
        authError:appState.authError,
        signupError:appState.signupError,
        signupLoad:appState.signupLoad
  
        }));
      } catch (e) {
        console.log(e);
      }
    }, [appState]);

    console.log('singup load', state.signupLoad)

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
        return emailRegex.test(email);
      };


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        const currentRole = "staff";
          
        if (!validateEmail(email)) {
            message.error("Please enter a valid email address");
            return;
          }
      
    
        // Check if passwords match
        if (password !== password_confirm) {
            message.error("Passwords do not match");
            return; // Exit the function if passwords don't match
        }

    
        // Check if all required fields are filled
        if (email && password && name && phone_number) {
         
    
            // Dispatch the signup action
            dispatch(signupUser(email, password, name, phone_number, password_confirm, currentRole, navigate));
        } else {
            message.error("All fields are required");
        }
    };
    


    const { email, password, password_confirm, phone_number, name } = state;

    return (
        <div class="flex h-screen">
            {/* <!-- Left Container (Illustration) --> */}
            <div class="hidden md:flex w-1/2 bg-gradient-to-tr from-blue-600 to-purple-700 items-center justify-center">
            <img src={cover} alt="Illustration" className="h-1/2 rounded-full" />

            </div>

            {/* <!-- Right Container (Login Form) --> */}
            <div class="flex w-full md:w-1/2 items-center justify-center bg-white">
                <div class="w-full max-w-md p-8 space-y-6">
                    <h2 class="text-3xl font-bold text-center text-gray-800">Sign up As A Staff</h2>
                    <div class="text-center text-blue-300"> 

                    <NavLink  to="/employer-signup" className="  text-blue hover:text-gray-400">
                      I'm Not A Staff
                    </NavLink>
                    </div>
                    

                    <div class="space-y-4">
                        {/* <!-- Email Field --> */}

                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter full name"
                                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setState(prevState => ({ ...prevState, name: e.target.value }))}
                                required
                            />

                        </div>

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

                        <div>
                            <label for="phone_number" class="block text-sm font-medium text-gray-700">Phone number</label>
                            <input
                                type="text"
                                id="phone_number"
                                placeholder="Enter your phone_number"
                                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setState(prevState => ({ ...prevState, phone_number: e.target.value }))}
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

                        <div>
                            <label for="password_confirm" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="password_confirm"
                                placeholder="Confirm password"
                                class="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                onChange={(e) => setState(prevState => ({ ...prevState, password_confirm: e.target.value }))}
                                required
                            />
                        </div>
                       
                        {state.authError && (
                            <div className="mb-4 p-2 text-red-700 bg-red-100 border border-red-300 rounded">
                                {state.signupError } 
                            </div>
                         )}





                        {/* <!-- Sign In Button --> */}
                        <button  onClick={handleSubmit} class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          
                            {state.signupLoad ? (<span>Signing up ...</span> ):( <span>Sign Up</span> )}
                        </button>

                        <div class="text-center">
                            <p class="text-sm text-gray-600">Alredy registered ?   <NavLink  to="/login" className="  text-blue hover:text-gray-400">
                                Sign In
                            </NavLink> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
