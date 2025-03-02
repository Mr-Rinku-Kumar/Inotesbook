import React from 'react';
import '../styles/About.css'; // Update the import path to reflect the new folder structure


const About = () => {
  return (
    <div className="about-container">
      <h1>About This Project</h1>
      <p>
        Welcome to the Note-Taking Application! This project is designed to help users 
        efficiently manage their notes and enhance productivity. Built using the MERN stack, 
        it combines MongoDB, Express.js, React, and Node.js to create a seamless user experience.
      </p>
      
      <h2>Project Overview</h2>
      <p>
        In today's fast-paced world, keeping track of thoughts, ideas, and tasks can be challenging. 
        This application offers a simple yet powerful interface for users to create, edit, and delete notes 
        at their convenience. Whether you are a student, professional, or anyone who needs to jot down ideas, 
        this app is designed for you.
      </p>
      
      <h2>Features</h2>
      <ul>
        <li><strong>Create Notes:</strong> Easily create new notes with titles and descriptions.</li>
        <li><strong>Edit Notes:</strong> Modify existing notes whenever needed to keep information up-to-date.</li>
        <li><strong>Delete Notes:</strong> Remove notes that are no longer necessary, ensuring your workspace is clutter-free.</li>
        <li><strong>User Authentication:</strong> Secure user accounts with JWT (JSON Web Token) authentication for added safety.</li>
        <li><strong>Responsive Design:</strong> The application is fully responsive, providing an optimal experience on both mobile and desktop devices.</li>
      </ul>
      
      <h2>Technologies Used</h2>
      <ul>
        <li><strong>React:</strong> A powerful JavaScript library for building user interfaces.</li>
        <li><strong>Node.js:</strong> A JavaScript runtime built on Chrome's V8 engine, enabling server-side programming.</li>
        <li><strong>Express.js:</strong> A web application framework for Node.js designed for building APIs.</li>
        <li><strong>MongoDB:</strong> A NoSQL database that stores data in a flexible, JSON-like format.</li>
        <li><strong>CSS:</strong> Styles and layouts are implemented using CSS for a polished look and feel.</li>
      </ul>
      
      <h2>About the Developer</h2>
      <p>
        Hello! I am Rinku Kumar, a passionate software developer with a keen interest in building applications 
        that solve real-world problems. This project showcases my skills in full-stack development and reflects 
        my journey into the world of coding. I believe in continuous learning and am always eager to explore new 
        technologies and methodologies.
      </p>
      <p>
        Thank you for visiting the Note-Taking Application. I hope you find it helpful and enjoyable to use!
      </p>
    </div>
  );
};

export default About;
