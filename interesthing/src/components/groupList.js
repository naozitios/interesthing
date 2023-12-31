import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';
import {useNavigate} from "react-router-dom";
import { useState } from "react";



const GroupList = ({ group, hideButtons }) => {
// const GroupList = () => {
    const [hideCard, setHideCard] = useState(false);
    const handleLeave = async(e) => {
        setHideCard(true);
        const response = await fetch('http://localhost:8080/leave-group-by-id', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({ id: group.Group_id.S })
        })
        const json = await response.json()
    }
    const header = (
      <img
        alt="Card"
        src="https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080"
        class="h-80"
      />
    );
    const header2 = (
      <img
        alt="Card"
        src="https://cdn.shopify.com/s/files/1/0556/2053/4441/files/Image_1_-_Building_Your_First_Terrarium_700x700.png?v=1647499607"
        class="h-80"
      />
    );
    const navigate = useNavigate();
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            {!hideButtons ? <Button label="More Info" className="p-button-outlined p-button-secondary" 
            onClick={() => {
                navigate(`/group/${group.Group_id.S}`);
            }}/> : <div></div>}
            {!hideButtons ? <Button 
            label="Leave group" className="p-button-danger" 
            onClick={() => {
                handleLeave();
            }}/> : <div></div>}
        </div>
    );

    // const header = (
    //     <img alt="Card" src={ group.picUrl } />
    // );
    // const footer = (
    //     <div className="flex flex-wrap justify-content-end gap-2">
    //         <Button label="Leave group" icon="pi pi-check" className="p-button-danger" />
    //         <Button label="More info" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    //     </div>
    // );


  return (
    // <div className="card flex justify-content-center">
    //     <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center p-7">
    //         {!hideCard ? <Card title="Valulrant" subTitle="Leaders: Michael" footer={footer} header={header} className="md:w-30rem mt-3 mb-2">
    //             <p className="m-0">
    //                 To unite and fight as one!
    //             </p>
    //         </Card> : <div></div>}
    //         <Card title="Terrarium Club" subTitle="Leaders: Michelle" footer={footer} header={header2} className="md:w-30rem mt-3 mb-2">
    //             <p className="m-0">
    //                 Welcoming everybody to get into terrarium!
    //             </p>
    //         </Card>
    //     </div>
    // </div>

    <div className="card flex justify-content-center">
        <div className="flex-column">
            {!hideCard ? <Card title={group.group_name.S} subTitle={group.group_leader.S} footer={footer} header={header} className="md:w-25rem mt-3">
                <p className="m-0">
                    {group.description.S}
                </p>
            </Card>: <div></div>}
        </div>
    </div>
  )
}

export default GroupList