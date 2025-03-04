import React from 'react';

function Featured() {
  return (
    <div className='w-full py-20'>
      {/* Title Section */}
      <div className='w-full border-b-[1px] pb-10 border-zinc-600 px-20'>
        <h1 className='text-6xl font-["Neue_Montreal"] tracking-tighter'>Featured Mentors</h1>
      </div>

      {/* Cards Grid */}
      <div className='px-20 mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10'>
          
          {/* Card 1 */}
          <div className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
            <div className='w-full card bg-green-600 h-full'>
              <img className='h-full w-full object-cover' src='https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png' alt="Mentor 1" />
            </div>
          </div>

          {/* Card 2 */}
          <div className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
            <div className='w-full card bg-green-600 h-full'>
              <img className='h-full w-full object-cover' src='https://ochi.design/wp-content/uploads/2022/09/Vise_front2-663x551.jpg' alt="Mentor 2" />
            </div>
          </div>

          {/* Card 3 */}
          <div className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
            <div className='w-full card bg-green-600 h-full'>
              <img className='h-full w-full object-cover' src='https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png' alt="Mentor 3" />
            </div>
          </div>

          {/* Card 4 */}
          <div className='cardcontainer h-[60vh] w-full rounded-md overflow-hidden'>
            <div className='w-full card bg-green-600 h-full'>
              <img className='h-full w-full object-cover' src='https://ochi.design/wp-content/uploads/2022/09/Vise_front2-663x551.jpg' alt="Mentor 4" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Featured;
