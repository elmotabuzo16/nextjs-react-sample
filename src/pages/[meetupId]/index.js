import React from 'react';
import MeetupDetail from '../../../components/meetups/MeetupDetail';

const MeetupDetails = () => {
  return (
    <MeetupDetail
      title='A First Meetup'
      image='https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg'
      address='Some address 5 12345 Some City'
      description='This is a first meetup'
    />
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
};

export const getStaticProps = async (context) => {
  // fetch data from an API

  // context.params.<meetupId> because the name of the folder is [meetupId]
  const meetupId = context.params.meetupId;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        title: 'A First Meetup',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5 12345 Some City',
        description: 'This is a first meetup',
      },
    },
    revalidate: 1,
  };
};

export default MeetupDetails;
