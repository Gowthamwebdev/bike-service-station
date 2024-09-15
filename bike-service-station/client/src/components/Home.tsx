/* eslint-disable react/jsx-no-undef */
import Image from 'next/image';
import luffy from '../../public/luffy.png';

const Home = () => {
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-50 flex justify-center items-center duration-200'>
          <div className="container pb-8 sm:pb-0">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {/* Left Column */}
              <div className="flex flex-col justify-center text-center sm:text-left relative z-10 gap-4 before:h-[200px] before:w-[200px] before:-z-10 before:absolute before:bg-slate-400 before:top-[-20%] before:left-[-10%] before:rounded-full before:blur-[100px] before: content-none]">
                <h2 className='text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-b from-yellow-500 via-orange-400 to-yellow-600 text-transparent bg-clip-text p-2'>
                  <span className='text-white'>We</span> offers various exciting services
                </h2>
                <p className="text-[0.8rem] sm:text-sm lg:text-lg sm:max-w-lg font-mono text-slate-600">
                  Embrace timeless elegance this summer with our exquisite analog watches.
                </p>
                <div className="flex justify-center sm:justify-start py-4">
                  <a href="#order-now" className="bg-gradient-to-r from-slate-600 to-slate-900 hover:scale-105 duration-200 text-white py-2 px-4 rounded-md">
                    Book now
                  </a>
                </div>
              </div>
              
              <div className="flex justify-center lg:justify-end relative z-10">
                <div className="relative">
                  <Image src={luffy} className='bg-cover' alt='luffy'>
                  </Image>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )
}

export default Home