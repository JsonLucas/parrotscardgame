
let indexImageCard = [];
let selectedIndexCard = [];
let selectedIndexImageCard = [];
let prohibitedCards = [];
let numRounds = 0;
let possibleMoves = 0;
let previousCardActive = false;

let numCards = parseInt(prompt('digite com quantas cartas deseja jogar.'));
while((numCards < 4) || (numCards > 14) || (numCards%2 !== 0)){
    numCards = parseInt(prompt('digite um numero de cartas valido.'));
}

const containerBody = document.querySelector('.container-body');
let bodyRow;
if(numCards >= 8){
    containerBody.innerHTML += `<div class='row-cards'></div>
    <div class='row-cards'></div>`;
    bodyRow = document.querySelectorAll('.row-cards');
}else{
    containerBody.innerHTML += `<div class='row-cards'></div>`;
    bodyRow = document.querySelector('.row-cards');
}

cardsGenerator(numCards);
calcMoves();

while(possibleMoves === 0){
    while(indexImageCard.length > 0){
        indexImageCard.pop();
    }
    bodyRow.innerHTML = '';
    cardsGenerator(numCards);
    calcMoves();
}

const cards = document.querySelectorAll('.cards');
const frontCard = document.querySelectorAll('.front');
const backCard = document.querySelectorAll('.back');

clickEvents();

let contTime = 0;
let gameTime = setInterval(function (){ document.querySelector('.tempo-de-jogo > span').innerHTML = contTime++ }, 1000);

function cardsGenerator(numCards){
    for(let i = 0; i < numCards; i++){
        indexImageCard.push(shuffleCards());
        if(numCards >= 8){
            if(i < numCards/2){
                bodyRow[0].innerHTML += `<div class='cards' id='card-${i}' data-identifier='card'>
                    <div class='single-card back' data-identifier='back-face'><img src='images/back.png' alt='Imagem não carregada.'></div>
                    <div class='single-card front' data-identifier='front-face'><img src='images/front-${indexImageCard[i]}.gif' alt='Imagem não carregada.'></div>
                </div>`
            }else{
                bodyRow[1].innerHTML += `<div class='cards' id='card-${i}' data-identifier='card'>
                    <div class='single-card back' data-identifier='back-face'><img src='images/back.png' alt='Imagem não carregada.'></div>
                    <div class='single-card front' data-identifier='front-face'><img src='images/front-${indexImageCard[i]}.gif' alt='Imagem não carregada.'></div>
                </div>`
            }
        }else{
            bodyRow.innerHTML += `<div class='cards' id='card-${i}' data-identifier='card'>
                <div class='single-card back' data-identifier='back-face'><img src='images/back.png' alt='Imagem não carregada.'></div>
                <div class='single-card front' data-identifier='front-face'><img src='images/front-${indexImageCard[i]}.gif' alt='Imagem não carregada.'></div>
            </div>`
        }
    }
}

function clickEvents(){
    for(let i = 0; i < numCards; i++){
        cards[i].addEventListener('click', selecionar);
    }
}

function shuffleCards(){
    return Math.floor((Math.random()*7)+1);
}

function selecionar(){
    const paramIndex = this.id.split('-');
    const indexCard = parseInt(paramIndex[paramIndex.length - 1]);
    numRounds++;
    if(!frontCard[indexCard].classList.contains('vira-carta')){
        if(!isProhibited(indexCard)){
            frontCard[indexCard].classList.add('vira-carta');
            backCard[indexCard].classList.add('desvira-carta');
            selectedCard(indexImageCard[indexCard], indexCard);
        }
    }else{
        if(!isProhibited(indexCard)){
            frontCard[indexCard].classList.remove('vira-carta');
            backCard[indexCard].classList.remove('desvira-carta');
            previousCardActive = true;
        }
    }
}

function selectedCard(indexImage, indexCard){
    if(selectedIndexCard.length !== 0){
        selectedIndexImageCard.push(indexImage);
        selectedIndexCard.push(indexCard);
        if(selectedIndexCard.length === 2){
            if(previousCardActive){
                selectedIndexCard[0] = selectedIndexCard[1];
                selectedIndexImageCard[0] = selectedIndexImageCard[1];
                selectedIndexCard.pop();
                selectedIndexImageCard.pop();
                previousCardActive = false;
            }else{
                if(selectedIndexImageCard[0] === selectedIndexImageCard[1]){
                    for(let i = 0; i < selectedIndexCard.length; i++){
                        prohibitedCards.push(selectedIndexCard[i]);
                        cards[selectedIndexCard[i]].classList.add('prohibited');
                        indexImageCard[selectedIndexCard[i]] = 0; //unset image
                    }
                    calcMoves();
                    unsetSelected();
                }else{
                    unsetSelected();
                    setTimeout(function(){
                        for(let i = 0; i < cards.length; i++){
                            if(!cards[i].classList.contains('prohibited')){
                                frontCard[i].classList.remove('vira-carta');
                                backCard[i].classList.remove('desvira-carta');
                            } 
                        }
                    }, 1000);
                }
            }
        }
    }else{
        selectedIndexImageCard.push(indexImage);
        selectedIndexCard.push(indexCard);
    }
}

function isProhibited(indexCard){
    let verificator = false;
    if(prohibitedCards.length === 0){
        return verificator;
    }else{
        for(let i = 0; i < prohibitedCards.length; i++){
            if(prohibitedCards[i] === indexCard){
                verificator = true;
            }
        }
        return verificator;
    }
}

function unsetSelected(){
    while(selectedIndexCard.length > 0){
        selectedIndexCard.pop();
        selectedIndexImageCard.pop();
    }
}

function newGame(){
    if(possibleMoves === 0){
        clearInterval(gameTime);
        const option = confirm(`===Jogo encerrado===\nVocê ganhou com ${numRounds} jogadas e ${contTime} segundos de jogo.
        \nDeseja jogar novamente?`);
        if(option){
            window.location.reload();
        }else{
            alert('obrigado por jogar!');
            for(let i = 0; i < indexImageCard.length; i++){
                if(indexImageCard[i] !== 0){
                    cards[i].removeEventListener('click', selecionar);
                    cards[i].classList.add('prohibited');
                }
            }
        }
    }
}

function calcMoves(){
    remainingMoves();
    if(possibleMoves > 0){
        if(possibleMoves%2 === 0){
            possibleMoves /= 2;
        }else{
            possibleMoves = Math.floor(possibleMoves/2);
        }
    }else{
        setTimeout(newGame, 1000);
    }
}

function remainingMoves(){
    possibleMoves = 0;
    for(let i = 0; i < indexImageCard.length; i++){
        for(let j = 0; j < indexImageCard.length; j++){
            if(i !== j){
                if(indexImageCard[i] !== 0){
                    if(indexImageCard[i] === indexImageCard[j]){
                        possibleMoves++;
                    }
                }
            }
        }
    }
}
