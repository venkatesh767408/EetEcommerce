import React from "react";
import "./aboutus.css";

const teamMembers = [
  {
    name: "Suneel",
    role: "Team Lead",
    image: "https://i.postimg.cc/2yFb1pdY/2d92f739-b1cb-4ec3-8050-66ebec09ecce.jpg"
},

  {
    name: "Harika",
    role: "Team Developer",
    image: "https://i.postimg.cc/pXX3Gf9V/ac0987aa-96ff-452d-a683-2c1d0cc9e6d1.jpg",
  },
  

  {
    name: "Sujatha ",
    role: "Team Developer",
    image:" https://i.postimg.cc/SRj3sqb2/774bbdfa-97d3-4895-a247-3ac944fc72f1.jpg",
  },
  {
    name: "Bhargavi",
    role: "Team developer",
    image: "https://i.postimg.cc/Z5zsk6ny/e86e82f0-2f6f-4783-b1d3-e9055823f2e9.jpg",
  },
];

const TeamSection = () => {
  return (
    <section className="team-section">
      <h2 className="section-title">Our Team</h2>
      <div className="team-cards">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
