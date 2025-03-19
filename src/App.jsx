import './App.css'

const API_KEY = 'qCKAl9GGC4i2Q96iaXjRyuY1VdksIKy4';

async function getCardsInfo() {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=soccer&limit=10&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json();
    const images = [];
    data.data.forEach((gifData) => {
      const image = {
        imageUrl: gifData.embed_url,
        imageId: gifData.id,
      }
      images.push(image)
    });
    
    return images;
    
  }
  catch (error) {
    console.log(error);
  }
}

const cardsData = await getCardsInfo();

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
    return (<div className='page game'>
      <div className='info-container'>
        <div className='scores'>
          <p className='best-scores'>Best score: <span>0</span></p>
          <p className='current-scores'>Current score: <span>0</span></p>
        </div>
      </div>

      <div className='cards-container'>
      </div>
    </div>)
  }
}

export default App
