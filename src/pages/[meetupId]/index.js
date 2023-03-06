import { MongoClient, ObjectId } from 'mongodb';
import React from 'react';
import MeetupDetail from '../../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://elmo1234:elmo1234@elmoproshop.0tpfphi.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  // context.params.<meetupId> because the name of the folder is [meetupId]
  // getting the Id from URL
  const meetupId = context.params.meetupId;

  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://elmo1234:elmo1234@elmoproshop.0tpfphi.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
    revalidate: 1,
  };
};

export default MeetupDetails;
