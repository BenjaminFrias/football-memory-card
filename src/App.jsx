import { useState } from 'react';
import './App.css'
import Card from './components/Card';

const API_KEY = 'qCKAl9GGC4i2Q96iaXjRyuY1VdksIKy4';

async function getCardsInfo() {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=barcelona&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    const cardsData = [];
    data.data.forEach((gifData) => {
      const card = {
        id: gifData.id,
        imageUrl: gifData.images.original.url,
        hasBeenClicked: false,
      }
      cardsData.push(card)
    });
        
    return cardsData;
    
  }
  catch (error) {
    console.log(error);
  }
}

const cardsData = await getCardsInfo();

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cards, setCards] = useState(cardsData);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  // Change hasBeenCliked property
  const handleCardClick = (cardId) => { 
    Object.values(cards).forEach((card, index) => {
      if (card.id === cardId) {  

        if (card.hasBeenClicked) {
          if (currentScore > bestScore) {
            setBestScore(currentScore);
          }

          setCurrentScore(0);
        } else {
          setCurrentScore(currentScore + 1)
          setCards((prevValues) => {
              const newCards = prevValues.map(card => ({...card}));
              newCards[index] = {...newCards[index], hasBeenClicked: true};
              const shuffledCards = shuffleArray(newCards);
              return shuffledCards;
            }
          );
        }
      }
    });
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  if (currentPage === 'home') {
    return (
      <div className='page home'>
        <h1>Football memory game!</h1>
        <button onClick={() => handlePageChange('game')} className='start-game-btn'>Start game</button>
      </div>
    )
  } else if (currentPage === 'game') {

    const cardsElements = cards.map(card => {      
      return <Card key={card.id} id={card.id} imageUrl={card.imageUrl} handleCardClick={handleCardClick}/>
    });

    return (
      <div className='page game'>
        <div className='info-container'>
          <div className='scores'>
            <p className='best-scores'>Best score: <span>0</span></p>
            <p className='current-scores'>Current score: <span>{currentScore}</span></p>
          </div>
        </div>


        <div className='cards-container'>
          {cardsElements}
        </div>
      </div>
    )
  }
}

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  
  return newArray;
}

export default App
