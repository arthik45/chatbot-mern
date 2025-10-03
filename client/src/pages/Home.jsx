import React from 'react'
import Navbar from '../components/Navbar'
import Chatbot from '../components/Chatbot'


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-white">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-green-600">HealtyfyMe</span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-gray-600 leading-relaxed">
          Your personal health and fitness companion. Track your goals, monitor your progress, 
          and stay healthy with the power of smart insights.
        </p>
        <button className="mt-8 px-6 py-3 bg-green-500 text-white text-lg rounded-xl shadow-md hover:bg-green-600 transition">
          Get Started
        </button>
      </main>

      {/* Chatbot floating at bottom-right */}
      <Chatbot />
    </div>
  );
};

export default Home;
