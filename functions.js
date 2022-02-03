function cardsGenerator(numCards){
    const bodyRow = document.querySelector('.row-cards');
    for(let i=0; i < numCards; i++){
        indexImageCard.push(embaralhar());
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

function embaralhar(){
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
    tamanho++;
    console.log('indexCard = '+indexCard+'\nindexImage = '+indexImage);
    console.log(tamanho);
    if(tamanho%2 === 0){
        if(selectedIndexImageCard[tamanho-1] === selectedIndexImageCard[tamanho-2]){
            console.log('\niguais');
            console.log(selectedIndexCard);
            for(let i = 0; i < 2; i++){
                prohibitedCards.push(selectedIndexCard[i]); //ele nao ta pegando os dois cartões e sim so o ultimo selecionado
            }
            unsetSelected();
        }else{
            console.log('\ndiferentes');
            //setTimeout(desviraCards(), 1000);
            unsetSelected();
            //console.log(frontCard[selectedIndexCard[1]].classList)
            tamanho -= 2;
        }
        console.log('\ncartoes proibidos: '+prohibitedCards.length);
    }
}

function unsetSelected(){
    while(selectedIndexCard.length > 0){
        selectedIndexCard.pop();
        selectedIndexImageCard.pop();
    }
}

function desviraCards(){
    for(let i=0; i < 2; i++){
        frontCard[selectedIndexCard[i]].classList.remove('desvira-carta');
        backCard[selectedIndexCard[i]].classList.remove('vira-carta');
        //console.log(selectedIndexCard);
    }
}


function novoJogo(){
    const option = confirm('==Jogo encerrado==\ndeseja jogar novamente?');
    if(option){
        window.location.reload;
    }else{
        alert('obrigado por jogar!');
    }
}