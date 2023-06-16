import { useEffect, useState } from "react";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "primeflex/primeflex.css";
import { DataView } from "primereact/dataview";

// const SCHEDULES = [
//   {
//     group_name: "Football",
//     session_location: "Kallang Cage Pitch 5",
//     session_info:
//       "Session for people to chill and have fun after a long day at work",
//     img_s3_url:
//       "https://corsivacdncontent.blob.core.windows.net/thecage/kallang/kl-5-a-side-2.jpg",
//     session_start_date: "17/12/2023 -- 17:00",
//     session_end_date: "17/12/2023 -- 18:00",
//   },
//   {
//     group_name: "Flower Arrangement",
//     session_location: "Orchard Convention Centre Level 7 Hall 2",
//     session_info:
//       "For like-minded individuals who are passionate in flower arrangements",
//     img_s3_url:
//       "https://www.marthastewart.com/thmb/rQl9aSHswycno7AMQOtffvt7w0I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/flower-arrangement-blue-103343804-onecms-horiz-0223-257c5c7d9536496fa4c89549808d5c56.jpg",
//     session_start_date: "17/12/2023 -- 17:00",
//     session_end_date: "17/12/2023 -- 18:00",
//   },
// ];

const Schedule = () => {
  const [hideCard, setHideCard] = useState(false);
  const [data, setData] = useState([]);
  const handleLeave = async (session_id) => {
    setHideCard(true);
    console.log("Clicked!");
    const response = await fetch("http://localhost:8080/leave-session-by-id", {
      method: "PUT",
      body: JSON.stringify({ id: session_id.S }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    window.location.reload(true);
  };

  const [sessions, setSessions] = useState();
  const headers = { "Access-Control-Allow-Origin": "*" };
  useEffect(() => {
    const fetchSessions = async () => {
      const response = await fetch(
        "http://localhost:8080/get-all-sessions-by-joined"
      );
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        setSessions(json);
      } else {
        console.log("failed");
      }
    };
    fetchSessions();
  }, []);

  const header = (
    <img
      alt="Card"
      src="https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080"
      height="300vw"
    />
  );

  const itemTemplate = (session) => {
    return (
      <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-3">
        <Card
          title={session.group_name.S}
          subTitle={session.session_location.S}
          // footer={footer}
          header=<img
            alt="Card"
            src={
              "https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080"
            }
            height="300vw"
          />
          className="md:w-30rem"
        >
          {session.session_info.S}
          <br />
          <p>{session.session_start_date.S} (17:00 to 18:00)</p>
          <p className="font-bold">
            Duration: <p>1 hour</p>{" "}
          </p>{" "}
          {session.duration}
          <div className="flex flex-wrap justify-content-center gap-2">
            <Button
              label="Cancel"
              severity="info"
              onClick={() => {
                handleLeave(session.session_id);
              }}
            />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="card">
      <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-3">
        <DataView value={sessions} itemTemplate={itemTemplate} />
      </div>
    </div>
  );
  // return (
  //   <div className="home">
  //     <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
  //       <div>

  //       </div>
  //       {SCHEDULES.map((item, index) => (
  //         <Card
  //           title={item.group_name}
  //           subTitle={item.session_location}
  //           // footer={footer}
  //           header=<img alt="Card" src={item.img_s3_url} height="300vw" />
  //           className="md:w-30rem"
  //         >
  //           {item.session_info}
  //           <br />
  //           <p>
  //             {item.session_start_date} to {item.session_end_date}
  //           </p>
  //           <p className="font-bold">
  //             Duration: <p>1 hour</p>{" "}
  //           </p>{" "}
  //           {item.duration}
  //           <div className="flex flex-wrap justify-content-center gap-2">
  //             <Button label="Cancel" severity="info" onClick={removeElement} />
  //           </div>
  //         </Card>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default Schedule;
