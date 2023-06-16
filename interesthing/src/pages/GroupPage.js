import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { useParams } from 'react-router-dom';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';


const GroupPage = () => {
    let { groupID } = useParams();
    const [sessions, setSessions] = useState();
    const handleJoin = async(e) => {
        const response = await fetch('', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
              },
            body: JSON.stringify()
        })
        const json = await response.json()
    }
    const headers = { 'Access-Control-Allow-Origin': '*' }
    useEffect(() => {
        const fetchSessions = async () => {
            const response = await fetch('http://localhost:8080/get-all-data')
            const json = await response.json()
        
            if (response.ok) {
                console.log(json['body'])
                setSessions(json['body'])
            } else {
                console.log('failed')
            }
          }
        fetchSessions()
    }, []);

    const header = (
        <img alt="Card" src="https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080" height="300vw"/>
    );

    const itemTemplate = (session) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 shadow-2">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src="https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080" alt={session.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{session.group_name}</div>
                            <div className="text-m text-900">{session.session_info}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-user"></i>
                                    <span className="font-semibold">{session.session_max_members}</span>
                                </span>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {!session.joined ? <Button icon="pi pi-plus" className="p-button-rounded" onClick={() => {handleJoin();}} ></Button> : <Button disabled={true} icon="pi pi-check" className="p-button-rounded p-button-success"></Button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

  return (
    <div className="card">
        <div className="flex flex-row flex-wrap gap-7 align-items-center justify-content-center">
            <Card title="Valulrant" subTitle="Leaders: Michael" header={header} className="md:w-30rem mt-3 mb-2">
                <p className="m-0">
                    To unite and fight as one!
                </p>
            </Card>
        </div>
        <div className='flex justify-content-center'>
        <DataView value={sessions} itemTemplate={itemTemplate} />
        </div>
    </div>
  )
}

export default GroupPage