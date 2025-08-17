import { animated, useSpring } from "@react-spring/web";
import React, { useState } from "react";
import styled from "styled-components";

// Styled components for the card
const CardContainer = styled(animated.div)`
  width: 300px;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  margin-bottom: 15px;
`;

const ProfileName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const ProfileBio = styled.p`
  font-size: 1rem;
  opacity: 0.8;
`;

// Animated Profile Card Component
const AnimatedProfileCard = () => {
  const [flipped, setFlipped] = useState(false);

  // React Spring animation for flipping
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <CardContainer
      onClick={() => setFlipped(!flipped)}
      style={{
        transform: transform.to((t) => `${t} rotateY(180deg)`),
      }}
    >
      {!flipped ? (
        <div>
          <ProfileImage
            src="https://via.placeholder.com/100"
            alt="Profile"
          />
          <ProfileName>John Doe</ProfileName>
          <ProfileBio>Software Developer</ProfileBio>
        </div>
      ) : (
        <animated.div
          style={{
            opacity: opacity.to((o) => 1 - o),
            transform,
          }}
        >
          <ProfileName>Contact Info</ProfileName>
          <ProfileBio>Email: john.doe@example.com</ProfileBio>
          <ProfileBio>Phone: +123 456 7890</ProfileBio>
        </animated.div>
      )}
    </CardContainer>
  );
};

export default AnimatedProfileCard;