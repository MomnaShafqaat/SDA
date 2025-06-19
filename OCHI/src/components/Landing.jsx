import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Landing() {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-100 w-full h-screen pt-1'>
            <div className='textstructure mt-52 px-20'>
                {["FIND THE RIGHT", "MENTOR TO GUIDE", "YOUR CAREER PATH"].map((item, index) => {
                    return (
                        <div className="master" key={index}>
                            <div className='w-fit flex items-end overflow-hidden'>
                                {index === 1 && (
                                    <div className='mr-[0.5vw] w-[7vw] h-[5vw] bg-orange-700 mt-3 rounded-md relative'></div>
                                )}

                                <motion.h1
                                    initial={{ y: "100%", opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeOut",
                                        delay: index * 0.2,
                                    }}
                                    className="uppercase text-[7vw] leading-[6vw] tracking-tighter font-bold font-['Founders Grotesk']"
                                >
                                    {item}
                                </motion.h1>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='border-t-[1px] border-zinc-400 mt-20 flex justify-between items-center py-5 px-20'>
                {["Your future starts with the right guidance!", "Struggling with studies or career choices? "].map((item, index) =>
                    <p key={index} className='text-md font-light tracking-tight leading-node'>{item}</p>
                )}

                <div className='start'>
                   <button onClick={() => navigate("/top-mentors")}
    className="px-5 py-2 border border-zinc-700 rounded-full hover:bg-zinc-100 transition"
  >
    TOP MENTORS
  </button>
                </div>
            </div>
        </div>
    );
}

export default Landing;
