// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;
let deckTipo = [];
let deckIndice = [];
let marcadorCarta;
// Classe BlackJack - construtor
class BlackJack {
    constructor() {

        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        // objeto na forma literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function new_deck(){
            const suits = 4;
            const CARDS_PER_SUIT = 13;
            let tipo;
            let deck = [];
            let k = 1;
            //suits*(CARDS_PER_SUITS) substitui a necessidade de fazer 4 fors
            for (let i = 0; i < suits * (CARDS_PER_SUIT); i++) {
                //contagem de 0 a 13 reinicia de 13 em 13
                deck[i] = (i % CARDS_PER_SUIT) + 1;
                deckIndice[i] = k;
                //adicionar imagens às cartas
                if (i < 13)
                    tipo = 1;
                if (i < 26 && i >= 13)
                    tipo = 2;
                if (i < 39 && i >= 26)
                    tipo = 3;
                if (i >= 39)
                    tipo = 4;
                if (k > 13)
                    k = 1;
                k++;
                deckTipo[i] = tipo;
            }
            return deck;
        };

        this.shuffle = function (deck) {
            let indexes = [];
            let shuffled = [];
            let index = null;

            for (let n = 0; n < deck.length; n++) {
                //coloca os nºs de 0 a 52 no array indexes
                indexes.push(n);
            }
            for (let n = 0; n < deck.length; n++) {
                //index é o maior nº inteiro(Math.floor) de um float random(Math.random) entre 0 e 52 (*indexes.length)
                index = Math.floor(Math.random() * indexes.length);
                //vai buscar ao deck(4*[1,13]) o nº que está num indíce de 0 a 52 aleatoriamente (indexes[index])
                shuffled.push(deck[indexes[index]]);
                //remove do array de indíces [0,52] o índice random para percorrer todas as posições do deck
                indexes.splice(index, 1);
            }
            return shuffled;
        };

        //this.images = function (deck)

        // baralho de cartas baralhado
        //this.deck = this.new_deck();
        this.deck = this.shuffle(this.new_deck());
    };

    // métodos

    // devolve as cartas do dealer num array copiado
    get_dealer_cards()
    {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num array copiado
    get_player_cards()
    {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn(val)
    {
        this.dealerTurn = val;
    }

    get_cards_value(cards){
        //filter cria um array com todos os elementos que passam num teste, neste caso: não ser Ás(1)
        let noAces = cards.filter(function (card) {
            return card != 1;
        });

        //map atribui valores diferentes a valores; se for figura vale 10 pontos se não vale o seu número
        let figTransform = noAces.map(function (c) {
            return c > 10 ? 10 : c;
        });

        //reduce reduz um array num unico valor, neste caso soma os pontos das cartas
        let sum = figTransform.reduce(function (sum, value) {
            return sum += value;
        }, 0);

        //vê quantos ases tem na mão(cards)
        let numberOfAces = cards.length - noAces.length;
        while (numberOfAces > 0) {
            //se a mão com ases ultrapassar 21 os ases valem 1
            if (sum + 11 + (numberOfAces - 1) > MAX_POINTS)
                return sum + numberOfAces;
            //caso contrário o ás verificado vale 11 e verifica-se se à mais ases na mão
            sum += 11;
            numberOfAces -= 1;
        }
        return sum + numberOfAces;
    };

    player_move(){
        let card = this.deck[0];
        //retira o primeiro elemento do array (card) e retorna esse elemento
        this.deck.shift();
        //adiciona essa carta na mão do player
        this.player_cards.push(card);

        let y = document.createElement("IMG");
        y.setAttribute("src", "imgs/" + (deckIndice[card] - 1) + "_" + deckTipo[card] + ".svg");
        y.setAttribute("width", "80");
        y.setAttribute("height", "110");

        //let image = document.createElement("IMG");
        //image.appendChild(y);
        //document.getElementById("player").appendChild(image);
        document.getElementById("2").appendChild(y);
        //atualiza o state
        return this.get_game_state();
    };

    dealer_move(){
        //igual a player_move mas a carta do baralho vai para a mão do dealer
        let card = this.deck.shift();
        //this.deck.splice(0,1);
        this.dealer_cards.push(card);

        let x = document.createElement("IMG");
        if (X) {
            x.setAttribute("src", "imgs/X.jpg");
            marcadorCarta = card;
            x.setAttribute("id","replace");
            Y = true;
        }
        else
            x.setAttribute("src", "imgs/" + (deckIndice[card] - 1) + "_" + deckTipo[card] + ".svg");
        x.setAttribute("width", "80");
        x.setAttribute("height", "110");

        //let image = document.createElement("IMG");
        //image.appendChild(x);
        //document.getElementById("dealer").appendChild(image);
        document.getElementById("1").appendChild(x);
        return this.get_game_state();
    };

    get_game_state(){
        //calcula os pontos das mãos do player e do dealer
        let playerPoints = this.get_cards_value(this.player_cards);
        let dealerPoints = this.get_cards_value(this.dealer_cards);
        //cria as condições de fim de jogo
        let playerBusted = playerPoints > MAX_POINTS;
        let playerWon = playerPoints === MAX_POINTS;
        let dealerBusted = this.dealerTurn && (dealerPoints > MAX_POINTS);
        let dealerWon = dealerPoints > playerPoints && dealerPoints <= MAX_POINTS && this.dealerTurn || playerBusted;

        this.state.gameEnded = playerBusted || playerWon || dealerBusted || dealerWon;
        this.state.dealerWon = dealerWon;
        this.state.playerBusted = playerBusted;

        return this.state;
    };
    /*
    myFunction(card)
    {
        //atribui às cartas a sua respectiva imagem visível no browser
        let x = document.createElement("IMG");
        x.setAttribute("src", "imgs/" + deckIndice[card] + "_" + deckTipo[card] + ".svg");
        x.setAttribute("width", "80");
        x.setAttribute("height", "110");
        document.body.appendChild(x);
    }
    */

}

