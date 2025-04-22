import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaReact, FaNode, FaPython, FaGithub, FaUsers } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const features = [
  { icon: <FaUsers />, text: "Find developers who share your passion" },
  { icon: <FaGithub />, text: "Collaborate on real projects" },
  { icon: <FaReact />, text: "Explore trending tech stacks" },
  { icon: <FaNode />, text: "Level up with meaningful connections" },
];

const LandingIntro = () => {
  return (
    <div className="relative min-h-screen bg-base-300 text-base-content flex items-center justify-center px-4 sm:px-8 py-16">
      {/* Floating background blob */}
      <motion.div
        className="absolute w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center transition-all duration-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Headline with typing effect */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
          <TypeAnimation
            sequence={[
              "Welcome to DevMate",
              1500,
              "Connect. Collaborate. Create.",
              1500,
              "Find Your Developer Tribe.",
              1500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>

        <p className="text-lg md:text-xl mb-10 text-base-content max-w-2xl">
          DevMate is your digital playground where developers come together to
          build, learn, and grow — in a space made just for them.
        </p>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 w-full max-w-3xl px-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="bg-base-200 border border-base-100 p-4 rounded-xl shadow-lg flex items-center space-x-4 text-left hover:scale-[1.02] transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-secondary text-2xl">{feature.icon}</div>
              <p className="text-base-content font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <Link
          to="/login"
          className="btn btn-primary text-white btn-lg shadow-md px-8 py-3"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
};

export default LandingIntro;
