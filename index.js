let deckId = ""

const newDeckBtn = document.getElementById("new-deck")
const drawBtn = document.getElementById("draw")
const computerCard = document.getElementById("card-computer")
const playerCard = document.getElementById("card-player")
const results = document.getElementById("game-stat")
const remainingCards = document.getElementById("remain-cards")
const displayComputerScore = document.getElementById("computer-score")
const displayPlayerScore = document.getElementById("player-score")
let computerScore = 0
let playerScore = 0

function handleClick() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingCards.textContent = data.remaining
            deckId = data.deck_id
            if (data.remaining >= 50) {
                drawBtn.disabled = false
                drawBtn.classList.remove("disableBtn")
            }
        })
}
function handleDraw() {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
        .then(data => {
        computerCard.innerHTML = `
        <img src=${data.cards[0].image} class="card" />
        `
        playerCard.innerHTML = `       
        <img src=${data.cards[1].image} class="card"  />
        `
        remainingCards.textContent = data.remaining
        const winnerText = winnerCard(data.cards[0], data.cards[1])
        displayComputerScore.textContent = computerScore
        displayPlayerScore.textContent = playerScore
        results.textContent = winnerText

        if (data.remaining === 0) {
            drawBtn.disabled = true
            drawBtn.classList.add("disableBtn")
            if (computerScore > playerScore) {
                results.textContent = "Computer wins the game"
            } else if (playerScore > computerScore) {
                results.textContent = "Player wins the game"
            } else if (playerScore = computerScore) {
                results.textContent = "It's a tie!"
            }
        } 


})
}

function winnerCard(card1, card2) {
    const valueOptions = [
    "2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE" 
    ]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        computerScore ++
        return "1 point for Computer"
    } else if (card2ValueIndex > card1ValueIndex) {
        playerScore ++
        return "1 point for Player"
    } else {
       return "It's a tie"
    } 
}

newDeckBtn.addEventListener("click", handleClick)
drawBtn.addEventListener("click", handleDraw)