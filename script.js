document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', img: 'A' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'H', img: 'H' }
    ]

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.setAttribute('data-id', i);
            card.classList.add('card');
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = cardsChosenId;
        if (cardsChosen[0] === cardsChosen[1]) {
            cardsWon.push(cardsChosen);
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
        } else {
            cards[optionOneId].classList.remove('flipped');
            cards[optionTwoId].classList.remove('flipped');
            cards[optionOneId].textContent = '';
            cards[optionTwoId].textContent = '';
        }
        cardsChosen = [];
        cardsChosenId = [];
        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found all the matches!');
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        if (cardsChosen.length < 2 && !this.classList.contains('flipped')) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.classList.add('flipped');
            this.textContent = cardArray[cardId].img;
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    createBoard();
});
