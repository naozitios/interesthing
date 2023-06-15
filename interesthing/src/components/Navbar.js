import React from 'react'; 
import { useEffect,useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import {useNavigate} from "react-router-dom";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     
    
//core
import "primereact/resources/primereact.min.css";      

const Navbar = () => {
    const navigate = useNavigate();
    const items = [
        {label: 'Home', icon: 'pi pi-fw pi-home',command: () => {navigate('/')} },
        {label: 'Filter', icon: 'pi pi-fw pi-calendar',command: () => {navigate('/filter')} },
        {label: 'Schedule', icon: 'pi pi-fw pi-pencil',command: () => {navigate('/schedule')}},
        {label: 'MyGroups', icon: 'pi pi-fw pi-file',command: () => {navigate('/mygroups')}},
        {label: 'CreateGroups', icon: 'pi pi-fw pi-cog',command: () => {navigate('/creategroup')}}
    ];
  
  
    return (
        <div className="card">
            <TabMenu model={items} />
        </div>
    )
  }
  
  export default Navbar
        