import { makeAutoObservable, runInAction, observable, action } from 'mobx';

class GameStore {
  word = '';
  wordStr = '';
  currPlayer = {};
  currNickname = 'Player';
  gameRunning = false;
  txtGuess = '';
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  winnerPtsRef = observable.box(0);
  winnerNameRef = observable.box('');
  players = [];

  constructor(playersLst) {
    makeAutoObservable(this, {
      word: observable,
      wordStr: observable,
      currPlayer: observable,
      currNickname: observable,
      gameRunning: observable,
      txtGuess: observable,
      alphabet: observable,
      winnerPtsRef: observable,
      winnerNameRef: observable,
      players: observable,
      randomizeWord: action,
      randomizePlayer: action.bound,
      randomizeLetter: action,
      checkGuess: action,
      checkWinner: action,
      startGame: action,
    });
    this.players=playersLst;
  }

  randomizeWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    runInAction(() => {
      this.word = randomWord;
      this.wordStr = '*'.repeat(randomWord.length);
    });
  }

  randomizePlayer() {
    const randomIndex = Math.floor(Math.random() * this.players.length);
    const newPlayer = this.players[randomIndex];

    runInAction(() => {
      if (newPlayer) {
        this.currPlayer = newPlayer;
        this.currNickname = newPlayer.nickname;
      }
    });
  }

  randomizeLetter() {
    const randomIndex = Math.floor(Math.random() * this.alphabet.length);
    const selectedLetter = this.alphabet[randomIndex];
  
    runInAction(() => {
      this.txtGuess = selectedLetter;
      this.alphabet = this.alphabet.replace(selectedLetter, '');
    });
  
    return selectedLetter; 
  }
   
  checkGuess(char) {
    if (this.word.includes(char)) {    
      console.log(this.currNickname + ": "+char);
      const updatedWord = this.wordStr
        .split('')
        .map((letter, index) => (this.word[index] === char ? char : letter))
        .join('');

      runInAction(() => {
        this.wordStr = updatedWord;
        console.log(this.wordStr);
        const occurrences = this.word.split(char).length - 1;

        this.players = this.players.map(player =>
          player.nickname === this.currNickname
            ? { ...player, points: player.points + occurrences }
            : player
        );
      });
    }
  }

  checkWinner() {
    if (!this.wordStr.includes("*")) {
      const maxPoints = Math.max(...this.players.map(player => player.points));
      const winners = this.players.filter(player => player.points === maxPoints);
  
      if (winners.length === 1) {
        const winner = winners[0];
        this.winnerPtsRef.current = maxPoints; 
        this.winnerNameRef.current = winner.nickname; 
        this.gameRunning = false;
  
        setTimeout(() => {
          const restartGame = window.confirm(`
            Player ${winner.nickname} won with ${maxPoints} points!\n
            Do you want to restart the game with the same players?`);
          
          if (restartGame) {
            this.startGame();
          } else {
            window.location.reload();
          }
        }, 1000);
      } else {
        //tie
        this.winnerPtsRef.current = maxPoints;
        this.winnerNameRef.current = winners.map(winner => winner.nickname).join(" and ");
        this.gameRunning = false;
  
        setTimeout(() => {
          const restartGame = window.confirm(`
            It's a tie between ${this.winnerNameRef.current} with ${maxPoints} points!\n
            Do you want to restart the game with the same players?`);
          
          if (restartGame) {
            this.startGame();
          } else {
            window.location.reload();
          }
        }, 700);
      }
    }
  } 

  startGame() {
    runInAction(() => {
        console.log(this.players);
        this.players = this.players.map(player => ({ ...player, points: 0 }));
        document.getElementById('btnStart').disabled = true;
        this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        this.randomizeWord();
        this.gameRunning = true;
    });
  }
}

const words = ['REACT', 'STATE', 'REDUCER', 'CONTEXT', 'REF', 'EFFECT', 'MOBX'];

export { GameStore, words };
