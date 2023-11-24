import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ imgUrl, name, age, location, bio, likes }) => (
  <View style={styles.card}>
    <Image style={styles.thumbnail} source={{ uri: imgUrl }} />
    <Text style={styles.headerText}>
      Hello, <Icon name="rocket" size={15} color="#900" /> World!
    </Text>
    <Text style={styles.mainText}>{name}, {age}</Text>
    <Text style={styles.mainText}>From {location}</Text>
    <Text style={styles.bioText}>{bio}</Text>
    <Text style={styles.footerText}>
      <Icon size={14} color={"deeppink"} name="heart" style={styles.buttonIcon} /> by {likes} people
    </Text>
    <Text style={styles.footerText}>
      <Icon color={"green"} size={14} name="map-marker" style={styles.buttonIcon} /> {`5KM`}
    </Text>
    <Icon name='' />
  </View>
);
const NoMoreCards = () => (
  <View style={styles.noMoreCards}>
    <Text>No more cards</Text>
  </View>
);

const SwipeableCard = () => {
  const [cards, setCards] = useState([]);
  const [outOfCards, setOutOfCards] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`https://dating-app-y09d.onrender.com/profiles`).then((res) => {
      setCards(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    });
  }, []);

  const handleYup = () => {
    console.log('yup');
  };

  const handleNope = () => {
    console.log('nope');
  };

  const cardRemoved = (index) => {
    console.log(`The index is ${index}`);

    const CARD_REFRESH_LIMIT = 3;

    if (cards.length - index <= CARD_REFRESH_LIMIT + 1 && !outOfCards) {
      console.log(`There are only ${cards.length - index - 1} cards left.`);
      setOutOfCards(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <SwipeCards
          cards={cards}
          loop={false}
          renderCard={(cardData) => <Card {...cardData} />}
          renderNoMoreCards={NoMoreCards}
          showYup={true}
          showNope={true}
          handleYup={handleYup}
          handleNope={handleNope}
          cardRemoved={cardRemoved}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderWidth: 1,
    elevation: 2,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  thumbnail: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  mainText: {
    fontSize: 18,
    color: '#555',
  },
  bioText: {
    padding: 10,
    fontSize: 16,
    color: 'gray',
  },
  footerText: {
    padding: 5,
    fontSize: 14,
    color: '#666',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    marginRight: 5,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeableCard;
