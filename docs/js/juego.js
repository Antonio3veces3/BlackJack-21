//Modulo, funciones anonimas autoinvocadas!!
/* 
( ()=>{

})();
*/

const miModulo= (()=>{
    'use strict'
    let deck= [];
    const types= ['C','D','H','S'], 
     especials= ['A','J', 'Q', 'K'];
    
    /*let puntosPlayer= 0, 
    puntosComputer= 0;*/
    let puntosJugadores= []
    
    //Referencias HTML BUTTONS
    const btnGetCard= document.getElementById('btnGetCard'),
        btnStop= document.getElementById('btnStop'),        btnNewGame= document.getElementById('btnNewGame');
    
    const puntosHTML= document.querySelectorAll('small'),
        divCartasJugadores= document.querySelectorAll('.divCartas');
    

    //Funcion para inicializar juego
    const inicializarJuego = ( numJugadores = 2 ) => {
        puntosJugadores= []
        deck= crearDeck();
        for( let i=0 ; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML= '');
        btnGetCard.disabled= false;
        btnStop.disabled= false;
    }

    //Funcion para barajear las cartas
    const crearDeck= ()=>{
        deck= [];
        for (let i = 2; i<=10; i++){
            for(let tipo of types){
                deck.push(i+tipo);
            }
        }
    
        for (let tipo of types){
            for (let esp of especials){
                deck.push(esp+tipo);
            }
        }
    
        return _.shuffle(deck);
        
    }
    
    
    //Pedir carta
    const pedirCarta = () =>{
        if(deck.length === 0){
            throw 'No hay mas cartas';
        }
        return deck.pop();
    }
    
    //Obtener valor de la carta
    const valorCard= (card) => {
        const valor= card.substring(0, card.length - 1 );
        return (isNaN(valor))?
        ( valor === 'A' )? 11: 10
        : valor * 1;
    }
    
    const acumularPuntosJugador= (carta, turno) => {
        puntosJugadores[turno] += valorCard(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) =>{
        const imgCarta= document.createElement('img');
        imgCarta.src= `./cartas/${carta}.png`
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputer ] = puntosJugadores;


        setTimeout(()=>{
            (puntosComputer === puntosMinimos)? alert('EMPATE'):
            (puntosMinimos > 21)? alert('LA COMPUTADORA HA GANADO'):
            (puntosComputer > 21)? alert('HAS GANADO'):
            (puntosComputer < puntosMinimos)? alert('HAS GANADO'): alert('LA COMPUTADORA HA GANADO')
        }, 500 );
    }

    //Turno de la computadora
    const turnoCompu= ( puntosMinimos ) => {
        let puntosComputer = 0;
        do {
        const carta= pedirCarta();
        puntosComputer = acumularPuntosJugador(carta, puntosJugadores.length -1 );
        
        crearCarta(carta, puntosJugadores.length - 1 );

    } while( (puntosComputer < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
    
    }
    
    //Eventos
    btnGetCard.addEventListener('click', ()=>{
        const carta= pedirCarta();
        const puntosJugador= acumularPuntosJugador(carta, 0);
        
        crearCarta(carta, 0);
    
        if (puntosJugador > 21){
            btnGetCard.disabled= true;
            btnStop.disabled= true;
            turnoCompu(puntosJugador);
        }else if (puntosJugador === 21 ){
            btnGetCard.disabled= true;
            btnStop.disabled= true;
            turnoCompu(puntosJugador);
        }
    })
    
    btnStop.addEventListener('click', ()=> {
        btnGetCard.disabled= true;
        btnStop.disabled= true;
        turnoCompu(puntosJugadores[0]);
    })
    
    btnNewGame.addEventListener('click', ()=>{
        console.clear();
        inicializarJuego();
    });

    return{
        nuevoJuego : inicializarJuego
    };
})();
