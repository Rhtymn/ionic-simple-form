import { IonButton ,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonNote } from "@ionic/react";
import React from "react";
import "../Home.css"
import { useLocation } from "react-router";
import {Link} from 'react-router-dom'

interface State {
    username: string;
    email: string;
    password: string;
    birthdate: string;
}

const Info: React.FC = () => {
    const location = useLocation<State>();
    let usernameData = '';
    let emailData = '';
    let birthdateData = '';

    if (location.state) {
        const {username, email, birthdate} = location.state;
        usernameData = username;
        emailData = email;
        birthdateData = birthdate;
    }

    return <IonPage>
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle>User Information</IonTitle>
            </IonToolbar>
      </IonHeader>
      <IonContent color="dark" className="ion-padding">
            <div className='group'>
                <IonItem color="dark">
                    <IonLabel>Username : </IonLabel>
                    <IonText>{usernameData}</IonText>
                </IonItem>
            </div>
            <div className='group'>
                <IonItem color="dark">
                    <IonLabel>Email : </IonLabel>
                    <IonText>{emailData}</IonText>
                </IonItem>
            </div>
            <div className='group'>
                <IonItem color="dark">
                    <IonLabel>Birthdate : </IonLabel>
                    <IonText>{birthdateData == 'dd/mm/yyyy' ? '-' : birthdateData}</IonText>
                </IonItem>
            </div>
            <Link to={{pathname: "/home"}} ><IonButton className="btn-send">Back</IonButton></Link>
      </IonContent>
    </IonPage>

}

export default Info;