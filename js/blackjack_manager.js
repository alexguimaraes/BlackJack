// pcm 20172018a Blackjack oop

let game = null;
let X;
let Y;
let ESTADO;
function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){
    //instancia a classe Blackjack
    game = new BlackJack();

    if(ESTADO){
        new_game2();
        ESTADO = false;
    }

    //dá duas cartas ao dealer e uma ao player
    dealer_new_card();
    X = true;
    dealer_new_card();
    X = false;
    player_new_card();
    //inicializa os butões da interface utilizador
    buttons_initialization();

    //debug(game);
}
function new_game2(){
    //document.getElementById("1").removeChild();
    //document.getElementById("2").removeChild();
    let element = document.getElementById("1");
    element.parentNode.removeChild(element);
    let element2 = document.getElementById("2");
    element2.parentNode.removeChild(element2);
    let element3 = document.createElement("section");
    element3.setAttribute("id","1");
    document.body.appendChild(element3);
    let element4 = document.createElement("section");
    element4.setAttribute("id","2");
    document.body.appendChild(element4);
}

function update_dealer(state){
    //Constrói as strings para mostrar as cartas do dealer e determinar o vencedor
    //let dealerCards = game.get_dealer_cards();
    //ALTERAR PARA AS IMGS
    //document.getElementById("dealer").innerHTML = "[" + JSON.stringify(dealerCards[0]) + ", X ]";
    if(state.gameEnded){
        ESTADO = true;
        if(!state.dealerWon){
            document.getElementById("dealer").innerHTML = " O DEALER PERDEU";
        }
        else{
            document.getElementById("dealer").innerHTML = " O DEALER VENCEU";
        }
        if(Y) {
            let z = document.getElementById("replace");
            z.setAttribute("src", "imgs/" + (deckIndice[marcadorCarta] - 1) + "_" + Math.floor(Math.random() * 3 + 1) + ".svg");
            finalize_buttons();
            Y = false;
        }
    }
}

function update_player(state){
    let playerCards = game.get_player_cards();
    //let str = JSON.stringify(playerCards);
    if(state.gameEnded){
        ESTADO = true;
        if(state.playerBusted)
            document.getElementById("player").innerHTML = " O JOGADOR REBENTOU";
            //str = str + " O JOGADOR REBENTOU";
        //retirar !state.playerBusted
        if (!state.dealerWon)
            document.getElementById("player").innerHTML =  " O JOGADOR VENCEU";
            //str = str + " O JOGADOR VENCEU";
        if(state.dealerWon && !state.playerBusted)
            document.getElementById("player").innerHTML = " O JOGADOR PERDEU";
            //str = str + " O JOGADOR PERDEU";
        //document.getElementById("player").innerHTML = str;
        update_dealer(state);
        finalize_buttons();
    }
    //document.getElementById("player").innerHTML = str;
}

function dealer_new_card(){
    //dá uma carta ao dealer, atualiza o conteúdo html e retorna o estado do jogo
    let DealerNewCard = game.dealer_move();
    update_dealer(DealerNewCard);
    return this.game.state;
}

function player_new_card(){
    //igual ao dealer
    let PlayerNewCard = game.player_move();
    update_player(PlayerNewCard);
    return this.game.state;
}

function dealer_finish(){
    //vê o estado do jogo, dá o turno ao dealer e o dealer tira cartas até ganhar ou rebentar
    game.setDealerTurn(true);
    let finish = game.get_game_state();

    //enquanto o player tiver mais pontos que o dealer
    if(game.get_cards_value(game.player_cards) > game.get_cards_value(game.dealer_cards)) {
        while(!game.state.gameEnded) {
            dealer_new_card();
            update_dealer(finish);
            //end = finish.gameEnded;
        }
    }
    else{
        update_player(finish);
        update_dealer(finish);
    }
}