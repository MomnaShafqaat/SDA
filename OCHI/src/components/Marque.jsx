import React from 'react';
import { motion } from 'framer-motion';

function Marque() {
  return (
    <div className='w-full py-14 bg-[#004D43] rounded-tl-3xl rounded-tr-3xl'>
      <div className='text border-t-2 border-b-2 border-white text-white flex whitespace-nowrap gap-10 overflow-hidden'>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 5 }}
          className='text-[25vw] tracking-tighter leading-none font-bold font-["Founders Grotesk"] uppercase mb-[3vw]'
        >
          GET A MENTOR
        </motion.h1>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 5 }}
          className='text-[25vw] leading-none tracking-tighter font-bold font-["Founders Grotesk"]uppercase mb-[3vw]'
        >
          GET A MENTOR
        </motion.h1>
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", repeat: Infinity, duration: 5 }}
          className='text-[25vw] leading-none tracking-tighter font-bold font-["Founders Grotesk"] uppercase mb-[3vw]'
        >
         GET A MENTOR
        </motion.h1>
      </div>
    </div>
  );
}

export default Marque;
