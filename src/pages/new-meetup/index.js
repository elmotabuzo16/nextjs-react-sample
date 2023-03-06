// localhost:3000/newmeetup
import React from 'react';
import NewMeetupForm from '../../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  const addMeetupHandler = (enteredMeetupdata) => {
    console.log(enteredMeetupdata);
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
