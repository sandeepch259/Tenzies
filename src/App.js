import "./styles.css";
import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid";
import Confetti from "react-confetti"

export default function App() {
    
    const [randomNumArray, setRandomNumArray] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = randomNumArray.every(die => die.isHeld)
        const firstValue = randomNumArray[0].value
        const allSameValue = randomNumArray.every(die => die.value === firstValue)
        if(allHeld && allSameValue) {
            setTenzies(true)
        }
    },[randomNumArray])
    
     function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const randomArray = []
        for(let i=0; i<10 ; i++) {
            randomArray.push(generateNewDie())
        }
        return randomArray
    }
    
    const diceElements = randomNumArray.map(randomNum => <Die 
        key = {randomNum.id} 
        value={randomNum.value} 
        isHeld = {randomNum.isHeld}
        handleClick = {() => holdDice(randomNum.id)}
    />)
    
    function getNewDiceArray() {
        if (!tenzies) {
        const newarr = randomNumArray.map(die => {
            return die.isHeld ? die : generateNewDie() } )
        setRandomNumArray(newarr)
        } else {
            setTenzies(false)
            setRandomNumArray(allNewDice())
        }
        
    }

    function holdDice(id) {
        
        const newarr = randomNumArray.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die } )
        setRandomNumArray(newarr)
    }

  return (
    <main>
      { tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="die-container">
          {diceElements}
      </div>
                <button className="roll-btn" onClick={ getNewDiceArray }>
                    {!tenzies ? 'Roll' : 'New Game'}
                </button>
    </main>
  );
}
