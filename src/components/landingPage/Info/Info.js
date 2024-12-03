import React from 'react'

import cover1 from "../../../assets/career.png"
import cover2 from "../../../assets/resume.png"

const Info = () => {
    return (
        <div>

            <div class="box-border flex flex-col items-center content-center mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl">



                <div class="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
                    <img src={cover1} class="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 " />
                </div>

                <div class="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
                    <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Find the Right Talent Faster
                    </h2>
                    <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                        Manage applications, schedule interviews, and communicate with candidates — all from one place.
                    </p>
                    <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Post job listings with ease.
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Get instant access to a pool of qualified candidates.
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Streamline your hiring process with our intuitive dashboard.
                        </li>
                    </ul>
                </div>

            </div>
            <div class="box-border flex flex-col items-center content-center mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl">



                <div class="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
                    <h2 class="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                        Your Dream Job is Just a Click Away
                    </h2>
                    <p class="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                        Browse jobs from top companies in various industries.
                    </p>
                    <ul class="p-0 m-0 leading-6 border-0 border-gray-300">
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Filter listings by location, role, and salary.
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Apply with a few clicks, and track your applications.
                        </li>
                        <li class="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                            <span class="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-violet-300 rounded-full"><span class="text-sm font-bold">✓</span></span> Set job alerts to never miss out on new opportunities.
                        </li>
                    </ul>
                </div>

                <div class="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
                    <img src={cover2} class="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" />
                </div>
            </div>

        </div>
    )
}

export default Info;