import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header.js";

const LandingPage = () => {
  const scrollToFeatures = () => {
    document.getElementById("features").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-white">
      <Header />
      
      <section className="px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl">
              Welcome to DesignersHangout.ai
            </h1>
            <p className="mt-6 text-lg text-gray-700">
              Tired of staring at a blank canvas? DesignersHangout.ai is your
              AI-powered design assistant, here to spark inspiration, ignite
              creativity, and empower your design process.
            </p>
            <p className="mt-6 text-lg text-gray-700">
              Brainstorm with AI, get constructive feedback, and elevate your
              design game with our collaborative tools.
            </p>
            <div className="mt-10 flex justify-center">
              <button
                onClick={scrollToFeatures}
                className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Features
              </button>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            className="relative left-1/2 transform -translate-x-1/2 w-[36.125rem] bg-gradient-to-tr from-pink-400 to-purple-500 opacity-30 sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Brainstorming
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              Generate color palettes, find font pairings, and brainstorm your
              design ideas with flow charts and mind maps.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/brainstorming">
                <button className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  Explore
                </button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Design Critique
            </h2>
            <p className="mt-4 text-gray-600 text-center">
              Accelerate your design process with AI-driven feedback.
            </p>
            <div className="mt-6 flex justify-center">
              <Link to="/design-critique">
                <button className="rounded-md bg-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-6 bg-gray-200 text-center">
        <p className="text-gray-600">
          &copy; 2024 DesignersHangout.ai. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
