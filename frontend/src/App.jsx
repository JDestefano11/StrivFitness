import React from "react";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-4xl font-semibold text-center text-blue-800 mb-4">
          Tailwind CSS Color Test
        </h1>
        <p className="text-gray-700 mb-4">
          This is a simple test to check if Tailwind CSS colors are working
          correctly in your React app. You should see different colors used for
          background, text, and buttons.
        </p>
        <button className="bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;
