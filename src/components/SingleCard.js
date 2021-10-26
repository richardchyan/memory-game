import React from 'react'

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {

   const handleClick = () => {
      if(!disabled){
         handleChoice(card)
      }
   }

   return (
      <div className="m-auto">
         <div className="relative">
            <img 
               src={card.src} 
               alt="card front" 
               className={flipped ? "rounded-lg border-2 border-black absolute flippedtoshow" : "rounded-lg border-2 border-black absolute flippedtohide"}
               style={{ width: '120px', height: '120px'}} 
               onClick={handleClick}
            />
            <img
               src="/images/cover.png" 
               alt="card cover"  
               className={flipped ? "rounded-lg border-2 border-black flippedtohide" : "rounded-lg border-2 border-black flippedtoshow" } style={{ width: '120px', height: '120px'}}  
               onClick={handleClick}
            />
         </div>
      </div>
   )
}

export default SingleCard
