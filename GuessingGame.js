

function generateWinningNumber(){
  return Math.floor(Math.random() * 100) + 1;    
}



function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }


function Game(){
  this.playersGuess = null; 
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();  
}

function newGame(){
    return new Game();
  }

 
Game.prototype.difference = function(){
    return Math.abs(this.winningNumber - this.playersGuess);
}

Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}


Game.prototype.playersGuessSubmission = function(num){
    if(num <= 0 || num > 100 || num === 'not a number'){
      throw 'That is an invalid guess.'
    }else if(this.pastGuesses.length >= 5 || this.pastGuesses.includes(this.winningNumber)){
      alert('press reset button for a new game!');  
    }else{
      this.playersGuess = num;  
      return this.checkGuess(num);
  }
}




Game.prototype.checkGuess = function(num){
  if(num === this.winningNumber){
      this.pastGuesses.push(num);
      this.hiLow(num);
      return 'You Win!';
  }else if(this.pastGuesses.includes(num)){
      return 'You have already guessed that number.';   
  }else{
      this.pastGuesses.push(num);
      if(this.pastGuesses.length === 5){
          return 'You Lose.';
      }else{
        var diff = this.difference(num);
        if(diff < 10){
          return "You're burning up!";
        }else if(diff < 25){
          return "You're lukewarm.";
        }else if(diff < 50){
          return "You're a bit chilly.";
        }else{
          return "You're ice cold!";
        }   
      }
    }
  }

Game.prototype.provideHint = function(){
    var hint = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
    return shuffle(hint);
}  

Game.prototype.hiLow =  function(num){
  var win = this.winningNumber;
  var past = this.pastGuesses;
  if(past.includes(win)){
    return 'Superstellar!';
  }else if(num > win && past.length < 5){
    return 'guess lower!';
  }else if(num < win && past.length < 5){
    return 'guess higher!';
  }else{
    return 'cosmic bummer!';
  }
};


$(document).ready(function() { 
  var game = newGame();
  var turn = function(){ 
    var len = game.pastGuesses.length; 
    var guess = +$('#player-input').val();
      $('#player-input').val('');
      $('h1').text(game.playersGuessSubmission(guess));
      $('.guess').eq(len).text(guess);
      $('#subtitle').text(game.hiLow(guess));
    };
  $('#submit').on('click', function(){
    turn();
  });
  $(document).keypress(function(e) {
    if(e.which == 13) {
     turn();    
    }
  });
  $('#hint').on('click', function(){
    $('h1').text(game.provideHint());
    $('#subtitle').text('A galaxy of guesses!  Which one is yours?')
  });
  $('#reset').on('click', function(){
    location.reload();
  });

});











 




