//import ('functions.js')
let indexImageCard = [];
let selectedIndexCard = [];
let selectedIndexImageCard = [];
let prohibitedCards = [];
let numRounds = 0;

let numCards = prompt('digite com quantas cartas deseja jogar.');
while((numCards < 4) || (numCards > 14) || (numCards%2 != 0)){
    numCards = prompt('digite um numero de cartas valido.');
}

cardsGenerator(numCards);

const cards = document.querySelectorAll('div.cards');
const frontCard = document.querySelectorAll('div.front');
const backCard = document.querySelectorAll('div.back');

clickEvents();

let contTempo = 0;
setInterval(function (){ document.querySelector('.tempo-de-jogo > span').innerHTML = contTempo++ }, 1000);

function cardsGenerator(numCards){
    const bodyRow = document.querySelector('.row-cards');
    for(let i = 0; i < numCards; i++){
        indexImageCard.push(shuffle());
        bodyRow.innerHTML += `<div class='cards' id='card-${i}'>
            <div class='single-card front'><img src='images/front.png' alt='Imagem não carregada.'></div>
            <div class='single-card back'><img src='images/back-${indexImageCard[i]}.gif' alt='Imagem não carregada.'></div>
        </div>`
    }
}

function clickEvents(){
    for(let i=0; i < numCards; i++){
        cards[i].addEventListener('click', selecionar);
    }
}

function shuffle(){
    return Math.floor((Math.random()*7)+1);
}

function selecionar(){
    const indexCard = parseInt(this.id[this.id.length - 1]);
    if(!frontCard[indexCard].classList.contains('desvira-carta')){
        if(!isProhibited(indexCard)){
            frontCard[indexCard].classList.add('desvira-carta');
            backCard[indexCard].classList.add('vira-carta');
            selectedCard(indexImageCard[indexCard], indexCard);
        }
    }else{
        if(!isProhibited(indexCard)){
            frontCard[indexCard].classList.remove('desvira-carta');
            backCard[indexCard].classList.remove('vira-carta');
        }
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

function selectedCard(indexImage, indexCard){
    selectedIndexImageCard.push(indexImage);
    selectedIndexCard.push(indexCard);
    numRounds++;
    //console.log('indexCard = '+indexCard+'\nindexImage = '+indexImage);
    if(numRounds%2 === 0){
        if(selectedIndexImageCard[0] === selectedIndexImageCard[1]){
            console.log('\niguais');
            for(let i = 0; i < selectedIndexCard.length; i++){
                prohibitedCards.push(selectedIndexCard[i]);
                cards[selectedIndexCard[i]].classList.add('prohibited')
                console.log(cards[selectedIndexCard[i]]);
            }
            //console.log(prohibitedCards);
            //console.log(selectedIndexCard);
            unsetSelected();
            //console.log(selectedIndexCard);
        }else{
            console.log('\ndiferentes');
            console.log(selectedIndexCard);
            setTimeout(function(){
                for(let i = 0; i < cards.length; i++){
                    if(!cards[i].classList.contains('prohibited')){
                        frontCard[i].classList.remove('desvira-carta');
                        backCard[i].classList.remove('vira-carta');
                        console.log(cards[i]);
                    } 
                    //console.log(cards[i]);
                }
            }, 1000);
            unsetSelected();
        }
        //console.log('\ncartoes proibidos: '+prohibitedCards.length);
    }
}

function unsetSelected(){
    while(selectedIndexCard.length > 0){
        selectedIndexCard.pop();
        selectedIndexImageCard.pop();
    }
}

function newGame(){
    let verificator = 0;
    for(let i=0; i < cards.length; i++){
        if(cards[i].classList.contains('prohibited')){
            verificator++;
        }
    }
    if(verificator === cards.length){
        const option = confirm(`===Jogo encerrado===\nVocê ganhou com ${numRounds} jogadas.\nDeseja jogar novamente?`);
        if(option){
            window.location.reload;
        }else{
            alert('obrigado por jogar!');
        }
    }
}
