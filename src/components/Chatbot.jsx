import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; 
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ isVisible, toggleChatbot }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isVisible) {
        setMessages([{ text: "Hello! I'm Alex, a friendly chatbot here to help you. What's your name?", sender: 'bot' }]);
    }
  }, [isVisible]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setConversationHistory([...conversationHistory, { text: input, sender: 'user' }]);
      setInput('');
      getBotResponse(input);
    }
  };

  const intents = {
    greeting: { keywords: ["hello", "hi", "hey"], score: 1 },
    who_are_you: { keywords: ["who are you", "what are you"], score: 1 },
    what_can_you_do: { keywords: ["what can you do", "help"], score: 1 },
    projects: { keywords: ["project", "work", "portfolio"], score: 1 },
    portfolio_details: { keywords: ["portfolio", "detail"], score: 2 },
    weather_app_details: { keywords: ["weather", "app", "detail"], score: 2 },
    ecommerce_details: { keywords: ["ecommerce", "store", "detail"], score: 2 },
    skills: { keywords: ["skill", "proficient", "good at"], score: 1 },
    experience: { keywords: ["experience", "work history"], score: 1 },
    education: { keywords: ["education", "degree", "school"], score: 1 },
    hobbies: { keywords: ["hobbies", "hobby", "interest"], score: 1 },
    contact: { keywords: ["contact", "email", "phone"], score: 1 },
    linkedin: { keywords: ["linkedin", "profile"], score: 1 },
    about_ajith: { keywords: ["tell me about ajith", "about ajith"], score: 1 },
    more: { keywords: ["more", "continue", "go on"], score: 1 },
  };

  const getIntent = (userInput, context) => {
    let bestIntent = { intent: "default", score: 0 };
    const lowerUserInput = userInput.toLowerCase();

    for (const intent in intents) {
      let score = 0;
      for (const keyword of intents[intent].keywords) {
        if (lowerUserInput.includes(keyword)) {
          score += intents[intent].score;
        }
      }
      if (score > bestIntent.score) {
        bestIntent = { intent, score };
      }
    }
    
    if (context && bestIntent.intent === 'more') {
      return `more_${context}`;
    }

    return bestIntent.intent;
  }

  const getBotResponse = (userInput) => {
    setIsTyping(true);
    let botResponse = { text: "", sender: 'bot', intent: null };
    const lastBotMessage = conversationHistory.filter(m => m.sender === 'bot').pop();
    const context = lastBotMessage ? lastBotMessage.intent : null;

    if (!user) {
        setUser({ name: userInput });
        botResponse.text = `Nice to meet you, ${userInput}! How can I help you today? You can ask me about Ajith's skills, projects, experience, education or hobbies.`;
    } else {
        const intent = getIntent(userInput, context);
        botResponse.intent = intent;
        const responses = {
            "greeting": [
                `Hi ${user.name}! How can I assist you today?`,
                `Hello ${user.name}! What can I do for you?`,
                `Hey ${user.name}! How's it going?`,
            ],
            "who_are_you": [
                "I am Alex, a chatbot created to assist you with information about Ajith's portfolio.",
                "You can call me Alex. I'm here to help you learn more about Ajith.",
            ],
            "what_can_you_do": [
                "I can answer questions about Ajith's skills, projects, experience, education and hobbies. What would you like to know?",
                "My purpose is to provide you with information about Ajith. Feel free to ask me anything!",
            ],
            "projects": [
                "Ajith has worked on several projects, including this portfolio website, a weather app, and an e-commerce site. Would you like to hear more about a specific project? For example, you can ask 'tell me more about the portfolio website'.",
                "Ajith's projects showcase his skills in web development. He has built a personal portfolio, a weather application, and an online store. Which one interests you the most?",
            ],
            "portfolio_details": [
                "This portfolio website is a showcase of Ajith's skills and projects. It is built with React, a popular JavaScript library for building user interfaces, and styled with Tailwind CSS, a utility-first CSS framework. The website is designed to be fully responsive and user-friendly.",
            ],
            "weather_app_details": [
                "The weather app is a simple yet elegant application that allows users to check the weather of any city in the world. It is built with HTML, CSS, and vanilla JavaScript, and it uses the OpenWeatherMap API to fetch weather data. The app features a clean and intuitive interface, and it displays the current temperature, weather conditions, and a 5-day forecast.",
            ],
            "ecommerce_details": [
                "The e-commerce site is a full-stack application that simulates a real-world online store. The front-end is built with React and Redux for state management, while the back-end is built with Node.js, Express, and MongoDB. The application includes features like user authentication, product catalog, shopping cart, and checkout.",
            ],
            "more_projects": [
                "The portfolio website is the one you are currently on. It is built with React and Tailwind CSS. The weather app uses a public API to fetch weather data and displays it in a user-friendly interface. The e-commerce site is a full-stack application with a React front-end and a Node.js back-end.",
                "Let me tell you more. The portfolio you're seeing now is a React and Tailwind CSS creation. There's also a weather app that pulls data from an API, and a full-stack e-commerce site using React and Node.js.",
            ],
            "skills": [
                "Ajith is proficient in a variety of technologies, including React, JavaScript, HTML, CSS, Tailwind CSS, Java, and MySQL. He is always eager to learn new things and expand his skillset. Are you interested in a particular skill?",
                "Ajith has a strong command of front-end technologies like React, JavaScript, HTML, and CSS, as well as back-end technologies like Java and MySQL. Is there a specific skill you'd like to know more about?",
            ],
            "more_skills": [
                "Ajith has extensive experience with React, using it to build dynamic, responsive, and component-based user interfaces. He is adept at using modern JavaScript features (ES6+) and has a deep understanding of its ecosystem, including tools like Webpack and Babel. On the back-end, he is proficient in Java and has experience building and querying databases with MySQL.",
                "Certainly. Ajith leverages React for building dynamic UIs, possesses a deep understanding of the JavaScript ecosystem, and is skilled in MySQL database management.",
            ],
            "experience": [
                "Ajith is currently seeking new opportunities to apply his skills and contribute to a challenging and rewarding project. He has previously worked on several personal projects that have allowed him to hone his skills in web development.",
                "Ajith is a self-taught developer who has gained valuable experience by working on a variety of personal projects. He is passionate about building high-quality software and is eager to take on new challenges.",
            ],
            "education": [
                "Ajith is a dedicated and curious learner. He holds a Bachelor's degree in Computer Science and is constantly expanding his knowledge through online courses and personal projects. He believes that learning is a lifelong journey, especially in the ever-evolving field of technology.",
            ],
            "hobbies": [
                "When he's not coding, Ajith enjoys a variety of activities. He is an avid reader and loves to explore new genres of music. He is also a keen photographer and enjoys capturing beautiful moments in nature. He believes that having a creative outlet outside of work is essential for maintaining a healthy work-life balance.",
            ],
            "contact": [
                "You can contact Ajith via the contact form on this website or through his LinkedIn profile. Would you like me to provide the link?",
                "To get in touch with Ajith, you can use the contact form on this site or connect with him on LinkedIn. I can share the link if you want.",
            ],
            "linkedin": [
                "Here is the link to Ajith's LinkedIn profile: https://www.linkedin.com/in/ajithkumar-v-1318441aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
            ],
            "about_ajith": [
                "Ajith is a passionate and creative developer with a strong background in web development. He loves to learn new technologies and build amazing things. What else would you like to know?",
                "Ajith is a self-motivated developer who enjoys tackling challenges and creating innovative solutions. His passion for technology drives him to constantly learn and grow. Anything else you are curious about?",
            ],
            "default": [
                "I'm not sure how to answer that. Could you please rephrase your question? You can ask me about Ajith's skills, projects, or how to contact him.",
                "I'm sorry, I don't have the answer to that. I can tell you about Ajith's portfolio, skills, and projects. What would you like to know?",
                "My apologies, but I am not programmed to answer that question. I can assist you with information about Ajith's work.",
            ]
        };
        const intentResponses = responses[intent] || responses["default"];
        botResponse.text = intentResponses[Math.floor(Math.random() * intentResponses.length)];
    }

    setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        setConversationHistory([...conversationHistory, { text: botResponse.text, sender: 'bot', intent: botResponse.intent }]);
    }, 1500);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="chatbot-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="chatbot-header">
            <span>AI Chatbot</span>
            <button className="close-button" onClick={toggleChatbot}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`message ${msg.sender}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.text}
              </motion.div>
            ))}
            {isTyping && (
                <div className="message bot">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="typing-indicator"
                    >
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        >.</motion.span>
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        >.</motion.span>
                        <motion.span
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        >.</motion.span>
                    </motion.div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;