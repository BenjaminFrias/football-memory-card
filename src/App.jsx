import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card';

const API_KEY = 'qCKAl9GGC4i2Q96iaXjRyuY1VdksIKy4';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cards, setCards] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  // TODO: Check for this useEffect hook to call correctly the data and call it again when new game state changes or somth like that
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=barcelona&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
    
        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`)
        // }
    
        // const data = await response.json();
        // const cardsData = [];
        // data.data.forEach((gifData) => {
        //   const card = {
        //     id: gifData.id,
        //     imageUrl: gifData.images.original.url,
        //     hasBeenClicked: false,
        //   }
        //   cardsData.push(card)
        // });

        // API MOCKING
        const apiMockCards = [];

        for (let i = 0; i < 10; i++) {
          apiMockCards.push({
            id: i,
            imageUrl: 'https://cdn.britannica.com/34/212134-050-A7289400/Lionel-Messi-2018.jpg',
            hasBeenClicked: false,
          })
        }
            
        setCards(apiMockCards);
      }
      catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  
  const checkGameOver = () => {
    if (cards) {
      const isGameOver = !Object.values(cards).some(card => !card.hasBeenClicked)

      if (isGameOver && currentPage !== 'endgame') {
        handleEndGame('You won')
      }
    }
  }
  
  const handleEndGame = (resultText) => {
    setResult(resultText);
    if (currentScore > bestScore) {
      setBestScore(currentScore);
    }
    setCurrentPage('endgame');
    setCurrentScore(0);
  }
  
  if (cards) {
    checkGameOver();
  }

  // Change hasBeenCliked property
  const handleCardClick = (cardId) => { 
    
    Object.values(cards).forEach((card, index) => {
      // Validate card
      if (card.id === cardId) {  
        if (card.hasBeenClicked) {
          handleEndGame('You lost!')
        } else {
          setCurrentScore(currentScore + 1)
          setCards((prevValues) => {
              const newCards = prevValues.map(card => ({...card}));
              newCards[index] = {...newCards[index], hasBeenClicked: true};
              const shuffledCards = shuffleArray(newCards);
              return newCards;
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
        <h1>Memory card game!</h1>
        <button onClick={() => handlePageChange('game')} className='start-game-btn'>Start game</button>
      </div>
    )
  } else if (currentPage === 'game') {
    
    if (isLoading) {
      return <div className="page loading">
        <p>Loading...</p>
      </div>
    }

    const cardsElements = cards.map(card => {      
      return <Card key={card.id} id={card.id} imageUrl={card.imageUrl} handleCardClick={handleCardClick}/>
    });
    
    return (
      <div className='page game'>
        <div className='info-container'>
          <div className='scores'>
            <p className='best-scores'>Best score: <span>{bestScore}</span></p>
            <p className='current-scores'>Current score: <span>{currentScore}</span></p>
          </div>
        </div>


        <div className='cards-container'>
          {cardsElements}
        </div>
      </div>
    )
  } else if (currentPage === 'endgame') {
    return (
      <div className="endgame">
        <h2>{result}</h2>
        <p className='best-scores'>Best score: <span>{bestScore}</span></p>
        <p className='current-scores'>Current score: <span>{currentScore}</span></p>
        <button className="play-again-btn" onClick={() => restartGame()}>Play again</button>
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
