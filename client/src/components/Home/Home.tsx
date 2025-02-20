import Link from 'next/link'

const Home = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="max-w-600px flex flex-col items-center">
        <h1 className="text-primary lg:text-7xl text-4xl font-semibold">Bike<span className="text-gray-900"> Station</span></h1>
        <p className="pt-2">Welcome To BikeStation !</p>
        <div className="flex justify-center pt-3">
            <Link href={"/auth/login"} className="px-4 py-0.5 text-white bg-gradient-to-r from-black to-gray-600  rounded-tr-xl rounded-bl-xl hover:rounded-xl  bg-black hover:scale-105 duration-200">Get Started</Link>
        </div>
      </div>
    </div>
  )
} 

export default Home
