import { useEffect, useState } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
const SCHEDULES = [
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
        height="300vw"
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
        height="300vw"
      />
    ),
  },
];
const Schedule = () => {
  const [State, setState] = useState("");

  const footer = (
    <div className="flex flex-wrap justify-content-center gap-2">
      <Button label="Cancel" severity="danger" />
    </div>
  );
  return (
    <div className="home">
      <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
        {SCHEDULES.map((item, index) => (
          <Card
            title={item.name}
            subTitle={item.where}
            footer={footer}
            header={item.image}
            className="md:w-30rem"
          >
            {item.info}
            {item.when}
            <p class="font-bold">Duration:</p> {item.duration}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
