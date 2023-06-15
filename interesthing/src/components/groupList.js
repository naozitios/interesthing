import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

// const GroupList = ({ group }) => {
const GroupList = () => {
    const header = (
        <img alt="Card" src="https://image.cnbcfm.com/api/v1/image/106560246-1591029813185copy-of-v_brand_promo_horizontal_offwhite.jpg?v=1672280691&w=1920&h=1080" height="300vw"/>
    );
    const header2 = (
        <img alt="Card" src="https://www.shutterstock.com/image-photo/small-decoration-plants-glass-bottle-260nw-1776910616.jpg" height="300vw"/>
    );
    const footer = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button label="Leave group" icon="pi pi-check" className="p-button-danger" />
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
    <div className="card flex justify-content-center">
        <div className="flex-column">
            <Card title="Valulrant" subTitle="Leaders: Michael" footer={footer} header={header} className="md:w-30rem mt-3 mb-2">
                <p className="m-0">
                    To unite and fight as one!
                </p>
            </Card>
            <Card title="Terrarium Club" subTitle="Leaders: Michelle" footer={footer} header={header2} className="md:w-30rem mt-3 mb-2">
                <p className="m-0">
                    Welcoming everybody to get into terrarium!
                </p>
            </Card>
        </div>
    </div>

    // <div className="card flex justify-content-center">
    //     <div className="flex-column">
    //         <Card title={group.group_name} subTitle={group.group_leader} footer={footer} header={header} className="md:w-25rem mt-3">
    //             <p className="m-0">
    //                 {group.about}
    //             </p>
    //         </Card>
    //     </div>
    // </div>
  )
}

export default GroupList