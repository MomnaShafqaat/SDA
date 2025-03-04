import React from 'react'

function Navbar() {
  
  return (
    <div   className=" fixed z-[999] w-full px-20 py-4 font-['Neue_Montreal']  flex justify-between iteam-center  backdrop-blur-md bg-white/1 "> 
    <div  className=" logo"> 
    <img src="/LOGO/mentora.png" alt="Mentora Logo"  className="w-32 h-auto object-contain" />
    </div>
     <div  className=" links flex gap-10"> 
      {  [ "Contact us","About Us","Categories","Login"].map((item,index)=>(

        <a key={index} className={`text-lg capitalize font-regular  ${index === 4 && "ml-32"}` }>{item}</a>
      ))}
     </div>
   
    


    </div>
  

  )
}

export default Navbar