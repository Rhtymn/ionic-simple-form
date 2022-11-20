import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import './Home.css';

const Home: React.FC = () => {
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('dd/mm/yyyy');
  const history = useHistory();


  const usernameChangeHandler = (e: any) => {
    setUsername(e.target.value);
  }

  const emailChangeHandler = (e: any) => {
    setEmail(e.target.value);
  }

  const sendFormHandler = () => {
    history.push({pathname:'/info', state:{username, email, birthdate}});
    setUsername('');
    setEmail('');
    setBirthdate('dd/mm/yyyy');
  }

  const openDatePicker = (e: any) => {
    popover.current!.event = e;
    setIsOpenPopover(true);
  }

  const datePickerChangeHandler = (e: any) => {
    const date = new Date(e.target.value);
    setBirthdate(date.toLocaleDateString());
    setIsOpenPopover(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark" className="ion-padding">
          <div className='input-group'>
            <IonItem color='dark'>
              <IonLabel position='floating'>Username</IonLabel>
              <IonInput value={username} onIonChange={usernameChangeHandler} type='text' placeholder='Enter Username'/>
            </IonItem>
          </div>

          <div className='input-group'>
            <IonItem color='dark'>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput value={email} onIonChange={emailChangeHandler} type='email' placeholder='Enter Email'/>
            </IonItem>
          </div>

          <div className='input-group'>
            <IonItem color='dark'>
              <IonLabel slot='start'>Birthdate</IonLabel>
              <IonInput slot='end' onClick={openDatePicker} value={birthdate}></IonInput>
            </IonItem>
          </div>

          <IonPopover ref={popover} isOpen={isOpenPopover} onDidDismiss={() => setIsOpenPopover(false)}>
            <IonDatetime onIonChange={datePickerChangeHandler} presentation='date'></IonDatetime>
          </IonPopover>

          <IonButton onClick={sendFormHandler} className="btn-send">Send</IonButton>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
