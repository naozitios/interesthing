import React from "react";
import "./Home.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const MOCK_SESSIONS = [
  {
    name: <p>Football</p>,
    where: <p>Kallang Cage</p>,
    when: <p>17/12/2023 -- 17:00 to 18:00</p>,
    duration: <p>1 hour</p>,
    info: (
      <p>Session for people to chill and have fun after a long day of work </p>
    ),
    image: (
      <img
        alt="Card"
        src="https://corsivacdncontent.blob.core.windows.net/thecage/kallang/kl-5-a-side-2.jpg"
        class="h-80"
      />
    ),
  },
  {
    name: <p>Flower Arrangement</p>,
    where: <p>Orchard Convention Centre Level 7 Hall 2</p>,
    when: <p>18/12/2023 -- 18:00 to 19:00</p>,
    duration: <p>1 hour</p>,
    info: (
      <p>
        For like-minded individuals who are passionate in flower arrangements
      </p>
    ),
    image: (
      <img
        alt="Card"
        src="https://www.marthastewart.com/thmb/rQl9aSHswycno7AMQOtffvt7w0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flower-arrangement-blue-103343804-onecms-horiz-0223-257c5c7d9536496fa4c89549808d5c56.jpg"
        class="h-80"
      />
    ),
  },
  {
    name: <p>Chess Openings 101</p>,
    where: <p>88 Market Street, #30-00 CapitaSpring</p>,
    when: <p>18/12/2023 -- 09:00 to 11:00</p>,
    duration: <p>2 hours</p>,
    info: (
      <p>
        Guide to learn about chess opening principles, theory & transpositions
      </p>
    ),
    image: (
      <img
        alt="Card"
        src="https://images.unsplash.com/photo-1610633389918-7d5b62977dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2050&q=80"
        class="h-80"
      />
    ),
  },
];

const footer = (
  <div className="flex flex-wrap justify-content-center gap-2">
    <Button label="View Details" severity="danger" />
  </div>
);

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="overlay">
          <h1 className="title">
            <span style={{ color: "rgb(232, 45, 83)" }}>Interesthing: </span>
            Explore Interest Groups in J.P. Morgan
          </h1>
          <h2 className="subtitle">
            Join a vibrant community of J.P. Morgan employees and dive into a
            world of shared interests
          </h2>
        </div>
      </div>
      <h1 className="title2">Recommended Sessions</h1>
      <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
        {MOCK_SESSIONS.map((item, index) => (
          <Card
            title={item.name}
            subTitle={item.where}
            footer={footer}
            header={item.image}
            className="md:w-25rem"
          >
            {item.info}
            {item.when}
            <p class="font-bold">Duration:</p> {item.duration}
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
