import { IonButton ,IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonText, IonIcon } from "@ionic/react";
import React from "react";
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
            <IonItem color="dark">
                <IonLabel slot="start" position="fixed">Username : </IonLabel>
                <IonText slot="end">{usernameData}</IonText>
            </IonItem>
            <IonItem color="dark">
                <IonLabel slot="start" position="fixed">Email : </IonLabel>
                <IonText slot="end">{emailData}</IonText>
            </IonItem>
            <IonItem color="dark">
                <IonLabel slot="start" position="fixed">Birthdate : </IonLabel>
                <IonText slot="end">{birthdateData == 'dd/mm/yyyy' ? '-' : birthdateData}</IonText>
            </IonItem>
            <Link to={{pathname: "/home"}} ><IonButton className="btn-send">Back</IonButton></Link>
      </IonContent>
    </IonPage>

}

export default Info;