/* eslint-disable react/jsx-no-undef */
import Image from 'next/image';
import cycleImg from '../../public/bicycle-repair.jpeg';

const Home = () => {
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-50 flex justify-center items-center duration-200'>
          <div className="container pb-8 sm:pb-0">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {/* Left Column */}
              <div className="flex flex-col justify-center text-center sm:text-left relative z-10 gap-4 ">
                  <h2 className='text-2xl sm:text-3xl lg:text-5xl font-bold max-w-xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-transparent bg-clip-text'>
                  Revitalize <span className='bg-gradient-to-b from-[#DB6400] via-[#d86405] to-[#f7980a] text-transparent bg-clip-text p-2'> Your Bike </span>with Precision 
                </h2>
                <p className="text-[0.8rem] sm:text-sm lg:text-lg sm:max-w-lg font-mono text-slate-600">
                Experience hassle-free biking with our comprehensive maintenance and repair options. We ensure your bike is always ready for your next adventure
                </p>
                <div className="flex justify-center sm:justify-start py-4">
                  <a href="#order-now" className="bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 hover:scale-105 duration-200 text-white py-2 px-4 rounded-md">
                    Book now
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end relative z-10">
                <div className="relative">
                  <Image src={cycleImg} className='bg-cover' alt='luffy'>
                  </Image>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Home