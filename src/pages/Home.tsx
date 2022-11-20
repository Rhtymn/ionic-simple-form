import { IonNote, IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonPopover, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router';
import './Home.css';

const Home: React.FC = () => {
  const date = new Date();
  const popover = useRef<HTMLIonPopoverElement>(null);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isChoosedBirhtdate, setIsChoosedBirthdate] = useState(true);
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [birthdate, setBirthdate] = useState('dd/mm/yyyy');
  const history = useHistory();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const usernameChangeHandler = (e: any) => {
    setUsername(e.target.value);
  }

  const emailChangeHandler = (e: any) => {
    setEmail(e.target.value);
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

  const sendFormHandler = () => {
    let isValid = true;

    // Validation
    if (username.trim().length == 0) {
      isValid = false;
      setIsValidUsername(false);
    } else {
      setIsValidUsername(true);
    }

    if (birthdate == 'dd/mm/yyyy'){
      isValid = false;
      setIsChoosedBirthdate(false);
    } else {
      setIsValidUsername(true);
    }

    if (email.trim().length == 0) {
      isValid = false;
      setIsValidEmail(false);
      setEmailErrorMessage('Please fill email field');
    } else if (!validateEmail(email)) {
      isValid = false;
      setIsValidEmail(false);
      setEmailErrorMessage('Invalid email');
    } else {
      setIsValidUsername(true);
      setEmailErrorMessage('');
    }

    if (isValid) {
      history.push({pathname:'/info', state:{username, email, birthdate}});
      setUsername('');
      setEmail('');
      setBirthdate('dd/mm/yyyy');
      setIsChoosedBirthdate(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color="dark" className="ion-padding">
          <div className='group'>
            <IonItem color='dark' className={`${!isValidUsername ? 'ion-invalid' : 'ion-valid'}`}>
              <IonLabel position='floating'>Username</IonLabel>
              <IonInput value={username} onIonChange={usernameChangeHandler} type='text' placeholder='Enter Username'/>
              <IonNote slot="error">Please fill username field</IonNote>
            </IonItem>
          </div>

          <div className='group'>
            <IonItem color='dark' className={`${!isValidEmail ? 'ion-invalid' : 'ion-valid'}`}>
              <IonLabel position='floating'>Email</IonLabel>
              <IonInput value={email} onIonChange={emailChangeHandler} type='email' placeholder='Enter Email'/>
              <IonNote slot="error">{emailErrorMessage}</IonNote>
            </IonItem>
          </div>

          <div className='group'>
            <IonItem color='dark' className={`${!isChoosedBirhtdate ? 'ion-invalid' : 'ion-valid'}`}>
              <IonLabel slot='start'>Birthdate</IonLabel>
              <IonInput slot='end' onClick={openDatePicker} value={birthdate}></IonInput>
              <IonNote slot="error">Please choose birthdate</IonNote>
            </IonItem>
          </div>

          <IonPopover ref={popover} isOpen={isOpenPopover} onDidDismiss={() => setIsOpenPopover(false)}>
            <IonDatetime onIonChange={datePickerChangeHandler} 
              presentation='date' max={new Date().toISOString()} >
              </IonDatetime>
          </IonPopover>

          <IonButton onClick={sendFormHandler} className="btn-send">Send</IonButton>
      </IonContent>
      
    </IonPage>
  );
};

export default Home;
