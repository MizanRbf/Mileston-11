import React from "react";
import { motion, scale } from "motion/react";
const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-row-reverse">
        <div className="flex-1">
          <motion.img
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            src="/assets/team1.jpg"
            className="max-w-sm rounded-t-[50px] shadow-2xl rounded-br-[50px] border-s-10 border-b-10 border-secondary"
          />
          <motion.img
            animate={{ x: [100, 150, 100] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            src="/assets/team2.jpg"
            className="max-w-sm  shadow-2xl rounded-t-[50px] rounded-br-[50px] border-s-10 border-b-10 border-secondary"
          />
        </div>
        <div className="flex-1">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 1 },
            }}
            className="text-5xl font-bold"
          >
            Latest{" "}
            <motion.span
              animate={{
                color: ["#0077ff", "#d800ff", "#ff8500"],
                transition: { duration: 4, repeat: Infinity },
              }}
            >
              jobs
            </motion.span>{" "}
            for you!
          </motion.h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
