// localhost:3000/

import { MongoClient } from 'mongodb';
import MeetupList from '../../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export const getStaticProps = async () => {
  // fetch data from an API
  const client = await MongoClient.connect(
    'mongodb+srv://elmo1234:elmo1234@elmoproshop.0tpfphi.mongodb.net/meetups?retryWrites=true&w=majority'
  );

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      // meetups because the props for <MeetupList> is meetups
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
