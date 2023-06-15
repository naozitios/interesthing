import { useEffect, useState } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
const SCHEDULES = [
  {
    group_name: "Football",
    session_location: "Kallang Cage Pitch 5",
    session_info: (
      "Session for people to chill and have fun after a long day at work" 
    ),
    img_s3_url : ("https://corsivacdncontent.blob.core.windows.net/thecage/kallang/kl-5-a-side-2.jpg"),
    session_start_date: ("17/12/2023 -- 17:00"),
    session_end_date: ("17/12/2023 -- 18:00"),
  },
  {
    group_name: "Flower Arrangement",
    session_location: "Orchard Convention Centre Level 7 Hall 2",
    session_info: (
        "For like-minded individuals who are passionate in flower arrangements"
    ),
    img_s3_url: (
      "https://www.marthastewart.com/thmb/rQl9aSHswycno7AMQOtffvt7w0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flower-arrangement-blue-103343804-onecms-horiz-0223-257c5c7d9536496fa4c89549808d5c56.jpg"
    ),
    session_start_date: ("17/12/2023 -- 17:00"),
    session_end_date: ("17/12/2023 -- 18:00"),
  },
];
const Schedule = () => {
  const [visible, setVisible] = useState(true);
  const removeElement = () => {
    setVisible((prev) => !prev);
    console.log("Clicked");
    // TODO: trigger endpoint to remove the data 
  };

  return (
    <div className="home">
      <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
        {SCHEDULES.map((item, index) => (
          <Card
            title={item.group_name}
            subTitle={item.session_location}
            // footer={footer}
            header= <img
            alt="Card"
            src= {item.img_s3_url}
            height="300vw"
          />
            className="md:w-30rem"
          >
            {item.session_info}
            <br/>
            <p>{item.session_start_date} to {item.session_end_date}</p>
            <p className="font-bold">Duration: <p>1 hour</p> </p> {item.duration}
            <div className="flex flex-wrap justify-content-center gap-2">
              <Button
                label="Cancel"
                severity="info"
                onClick={removeElement}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
