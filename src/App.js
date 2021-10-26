import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {src: "./images/abbeyroad.jpg", matched: false},
  {src: "./images/hdn.jpg", matched: false},
  {src: "./images/help.jpg", matched: false},
  {src: "./images/ppm.jpg", matched: false},
  {src: "./images/revolver.jpg", matched: false},
  {src: "./images/rubbersoul.jpg", matched: false},
  {src: "./images/forsale.jpg", matched: false},
  {src: "./images/wtb.jpg", matched: false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle the cards
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // Handle a choice when a card is clicked
  const handleChoice = (card) => {
    // console.log(card)
    console.log(card.id);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    
  }

  // Comparing 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src && choiceOne.id !== choiceTwo.id){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  },[choiceOne, choiceTwo])

  console.log(cards);

  // Reset choices and add a turn 
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // Start the game automatically
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App p-10 m-auto">
      <h1 className="text-5xl font-poppins my-4 p-2">Match the pictures on the cards!</h1>
      <button className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-400" onClick={shuffleCards}>New Set of Cards</button>

      {/* Card Grid */}
      <div className="mt-10 w-4/5 md:w-1/2 m-auto grid grid-cols-4 gap-2">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            setChoiceOne={setChoiceOne}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="p-2 text-4xl">Number of moves: {turns}</p>
    </div>
  );
}

export default App;
