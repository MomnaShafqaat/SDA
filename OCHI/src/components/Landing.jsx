import React from 'react'

function Landing() {
    return (
        <div className='  bg-gray-100 w-full h-screen  pt-1'>

            <div className='textstructure mt-52 px-20'>
                {["FIND THE RIGHT", "MENTOR TO GUIDE", "YOUR CAREER PATH"].map((item, index) => {
                    return <div className="master">
                        <div className='  w-fit flex  items-end overflow-hidden'>
                         {index===1 && (   <div className='mr-[0.5vw] w-[7vw]  h-[5vw] bg-red-800 mt-3 rounded-md  relative'></div>)}
                            <h1 className="upercase text-[7vw]  leading-[6vw] tracking-tighter font-bold font-['Founders Grotesk']">{item}</h1>
                        </div>
                    </div>
                })}

            </div>

            <div className='border-t-[1px] border-zinc-400 mt-20 flex justify-between items-center py-5 px-20'>
                {["Your future starts with the right guidance!", "Struggling with studies or career choices? "].map((item, index) =>
                    <p className='text-md font-light tracking-tight leading-node'>{item}</p>
                )}

                <div className='start'><div className='px-5 py-2 border-[1px] border-zinc-700  rounded-full'>FIND MENTORS</div></div>
            </div>

        </div>
    )
}

export default Landing