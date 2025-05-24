import React from 'react'
import aboutImage from '../assets/about.png'; // adjust path as needed

function About() {
    return (
        <div className='w-full  bg-[#CDEA68] p-20 rounded-tl-3xl rounded-tr-3xl text-black'>
            <h1 className=' font-["Neue_Montreal"] tracking-tight text-[3vw] leading-[3.5vw]'>
            Our goal is to connect students with mentors for guidance, career insights, and skill-building, bridging the gap between learning and real-world success.            </h1>

            <div className='w-full flex gap-5 border-t-[1px] mt-10 pt-5 border-[#CDEA68]'>

                <div className='w-1/2'>
                    <h1 className=' text-[4vw]'>Our approach</h1>
                    <button className='px-10 py-6 bg-zinc-900 text-white mt-5  gap-10 items-center rounded-full flex'>Read More
                        <div className='w-3 h-3 bg-zinc-100  rounded-full' ></div>
                    </button>
                </div>
                <div className='w-1/2 h-[70vh] bg-[#CDEA28] rounded-2xl'>
  <div
    className='h-full w-full bg-cover bg-center rounded-2xl'
    style={{ backgroundImage: `url(${aboutImage})` }}
  ></div>
</div>

            </div>

        </div>
    )
}

export default About
