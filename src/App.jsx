import { useState } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'home') {
    return (
      <div className="page">
        <h1>Football memory game!</h1>
        <button className="start-game-btn">Start game</button>
      </div>
    )
  }

}

export default App
