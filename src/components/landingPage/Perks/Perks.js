import React from 'react'
import cover from "../../../assets/hiring.png"
const Perks = () => {
  return (
    <div class="container items-center max-w-6xl px-4 px-10 mx-auto sm:px-20 md:px-32 lg:px-16">
    <div class="flex flex-wrap items-center -mx-3">
      <div class="order-1 w-full px-3 lg:w-1/2 lg:order-0">
        <div class="w-full lg:max-w-md">
          <h2 class="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading text-gray-600">Simplified Hiring. Seamless Applications!</h2>
          <p class="mb-4 font-medium tracking-tight text-gray-600 xl:mb-6">Whether you're looking for the perfect candidate or your next career opportunity, FourGigs makes it simple and efficient to connect with the right people.</p>
          <ul>
            <li class="flex items-center py-2 space-x-4 xl:py-3">
            <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full">
                <span className="text-sm font-bold">✓</span>
              </span>
              <span class="font-medium text-gray-500">Boost efficiency and reach the right candidates quickly</span>
            </li>
            <li class="flex items-center py-2 space-x-4 xl:py-3">
              <svg class="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
              <span class="font-medium text-gray-500">Discover and apply to jobs that match your skills and career goals</span>
            </li>
         
          </ul>
        </div>
      </div>
      <div class="w-full px-3 mb-12 lg:w-1/2 order-0 lg:order-1 lg:mb-0">
      <img class="mx-auto sm:max-w-sm lg:max-w-full" src={cover} alt="feature image"/></div>
    </div>
  </div>
  )
}

export default Perks;