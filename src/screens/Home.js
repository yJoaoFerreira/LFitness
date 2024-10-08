import { Image, ScrollView } from 'react-native';

const Home = () => {
  return (
    <ScrollView>
      <Image source={require('.../assets/images/logo.png')}/>
    </ScrollView>
  );
};

export default Home;