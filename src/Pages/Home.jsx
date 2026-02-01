import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Mail,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  TYPING_SPEED,
  ERASING_SPEED,
  PAUSE_DURATION,
  WORDS,
  TITLE_WORDS,
  TECH_STACK,
  SOCIAL_LINKS,
} from "../datafiles";

// Memoized Components
const StatusBadge = memo(() => (
  <motion.div
    className="absolute top-8 left-1/2 -translate-x-1/2 -ml-12 z-20"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.5, duration: 0.5 }}
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </motion.div>
));
 
const MainTitle = memo(({ animatedTitle }) => (
  <div className="space-y-2">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block h-20">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          {animatedTitle}
        </span>
        <span className="w-[4px] h-16 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-2 animate-blink inline-block align-middle"></span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <motion.div
    className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {tech}
  </motion.div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <motion.button
      className="group relative w-[160px]"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </motion.button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <motion.button
      className="group relative p-3"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </motion.button>
  </a>
));

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [titleText, setTitleText] = useState("");
  const [isTitleTyping, setIsTitleTyping] = useState(true);
  const [titleWordIndex, setTitleWordIndex] = useState(0);
  const [titleCharIndex, setTitleCharIndex] = useState(0);

  // Typing effect for subtitle
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Typing effect for title
  const handleTitleTyping = useCallback(() => {
    const currentWord = TITLE_WORDS[titleWordIndex];
    if (isTitleTyping) {
      if (titleCharIndex < currentWord.length) {
        setTitleText((prev) => prev + currentWord[titleCharIndex]);
        setTitleCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTitleTyping(false), PAUSE_DURATION);
      }
    } else {
      if (titleCharIndex > 0) {
        setTitleText((prev) => prev.slice(0, -1));
        setTitleCharIndex((prev) => prev - 1);
      } else {
        setTitleWordIndex((prev) => (prev + 1) % TITLE_WORDS.length);
        setIsTitleTyping(true);
      }
    }
  }, [titleCharIndex, isTitleTyping, titleWordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTitleTyping,
      isTitleTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTitleTyping]);

  return (
    <motion.div
      className="min-h-screen overflow-hidden bg-[#030014] relative"
      id="Home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10">
        <StatusBadge />
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <motion.div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 mt-20 lg:mt-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-4 sm:space-y-6" variants={itemVariants}>
                <MainTitle animatedTitle={titleText} />
              </motion.div>

              {/* Typing Effect */}
              <motion.div
                className="h-8 flex items-center"
                variants={itemVariants}
              >
                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                variants={itemVariants}
              >
                A motivated, self-taught Front-End and Back-End Developer passionate about building responsive, user-friendly interfaces. Proficient in Java Springboot, MySQL, HTML, CSS, JavaScript, and React Js, Node Js, I focus on creating intuitive experiences, demonstrated in my personal projects like an website or a weather app. Eager to apply my skills and learn from experienced teams to deliver innovative web solutions.
              </motion.p>

              {/* Tech Stack */}
              <motion.div
                className="flex flex-wrap gap-3 justify-start"
                variants={itemVariants}
              >
                {TECH_STACK.map((tech, index) => (
                  <TechStack key={index} tech={tech} />
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-row gap-3 w-full justify-start"
                variants={itemVariants}
              >
                <CTAButton
                  href="#Portofolio"
                  text="Projects"
                  icon={ExternalLink}
                />
                <CTAButton href="#Contact" text="Contact" icon={Mail} />
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="hidden sm:flex gap-4 justify-start"
                variants={itemVariants}
              >
                {SOCIAL_LINKS.map((social, index) => (
                  <SocialLink key={index} {...social} />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(Home);