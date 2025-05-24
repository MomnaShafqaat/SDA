import React from 'react'
import aboutImage from '../assets/about.png'; // adjust path as needed

function About() {
    return (
        <div className='w-full bg-[#CDEA68] p-10 md:p-20 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-3xl text-black'>

            {/* Welcome text + image in row */}
            <div className='w-full flex flex-col md:flex-row gap-10'>
                
                {/* Left: Text Section */}
                <div className='w-full md:w-1/2'>
                    <h1 className='font-semibold tracking-tight text-[6vw] md:text-[3vw] leading-tight'>
                        Welcome to Mentora
                    </h1>

                    <div className='mt-6 max-w-xl'>
                        <p className='mt-4 text-[4vw] md:text-[1.2vw] leading-relaxed font-["Neue_Montreal"]'>
                            Mentora is a dedicated platform designed to bridge the gap between classroom learning and real-world success. Our goal is to empower students by connecting them with experienced mentors who offer career guidance, personal development support, and skill-building advice.
                        </p>

                        <p className='mt-4 text-[4vw] md:text-[1.2vw] leading-relaxed font-["Neue_Montreal"]'>
                            On Mentora, students can explore mentor profiles, view their expertise, and easily book sessions. Whether it’s portfolio building, interview prep, or clarity on career paths — Mentora makes mentorship accessible and meaningful.
                        </p>

                        <p className='mt-4 text-[4vw] md:text-[1.2vw] leading-relaxed font-["Neue_Montreal"]'>
                            For mentors, it’s a chance to support eager learners and give back. Mentora builds a community where knowledge flows and professional relationships grow.
                        </p>
                    </div>
                </div>

                {/* Right: Image Section */}
                <div className='w-full md:w-1/2 h-[40vh] md:h-auto flex items-center justify-center '>
                    <div
                        className='w-full h-full bg-cover bg-center rounded-2xl'
                        style={{ backgroundImage: `url(${aboutImage})` }}
                    ></div>
                </div>
            </div>

            {/* Our Approach Section */}
            <div className='w-full flex flex-col md:flex-row gap-5 border-t-[1px] mt-4 pt-10 border-[#CDEA68]'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-[6vw] md:text-[3vw] font-semibold'>Our Approach</h1>
                    <p className='mt-4 text-[4vw] md:text-[1.2vw] leading-relaxed font-["Neue_Montreal"]'>
                        Our approach focuses on real-time interaction, personalization, and practical advice. We aim to make every student feel supported, guided, and ready to take on new challenges with confidence.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;