// global variables

var gameOn = false;
var strictMode = false;
var buttonsEnabled = false;

var level = 1;
var maxLevel = 20;
var sequence = [];		
var playerSequence = [];
var playId = 0; // for identifying timeouts and ended sessions (so old setTimeout functions are not run)

var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var error = new Audio('http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3');
error.volume = 0.2;
var victory = new Audio('http://soundbible.com/mp3/Ta Da-SoundBible.com-1884170640.mp3');
victory.volume = 0.3;

// *******************************************

									

$(document).ready(function () {

	// ON - OFF switch
	$('#switch, #switchButton').on('click', function() {
		if (!gameOn) { // Turn on the game
			$('#switchButton').css('left', '51%');
			$('#counter').css('color', 'red');
			gameOn = true;
		} else { // Turn off the game
			$('#switchButton').css('left', '41%');
			$('#counter').css('color', '#570903');
			$('#counter').html('--');
			$('#strictDiode').css('background-color', '#222');
			gameOn = false;
			strictMode = false;
			buttonsEnabled = false;
			$('.colorButton').css('cursor', 'default');
			playId = 0;
			level = 1;
		}
	});
	
	// STRICT MODE button
	$('#strictButton').on('click', function() {
		if (gameOn) { // Turn on strict mode
			if (!strictMode) {
				$('#strictDiode').css('background-color', 'red');
				strictMode = true;
			} else { // Turn off strict mode
				$('#strictDiode').css('background-color', '#222');
				strictMode = false;
			}
		}
	});
	
	// START button
	$('#startButton').on('click', function() {
		if (gameOn) { // works only if the game is turn on
			level = 1;
			blinkCounter('--');
			generateSequence();
			playLevelSequence();
		}
	});
	
	// GREEN field
	$('#innerGreen').on('mousedown', function(){
		if (buttonsEnabled) { // works only for a while after a sequence is played
			sound1.play();
			$('#innerGreen').css('background-color', '#00E867');
			playerSequence.push(1);
			checkSequence();
			
			setTimeout(function(){
				$('#innerGreen').css('background-color', '#00A74A');
			}, 750);
		}
	});
	
	// RED field
	$('#innerRed').on('mousedown', function(){
		if (buttonsEnabled) { // works only for a while after a sequence is played
			sound2.play();
			$('#innerRed').css('background-color', '#E8131E');
			playerSequence.push(2);
			checkSequence();
			
			setTimeout(function(){
				$('#innerRed').css('background-color', '#9F0F17');
			}, 750);
		}
	});
	
	// YELLOW field
	$('#innerYellow').on('mousedown', function(){
		if (buttonsEnabled) { // works only for a while after a sequence is played
			sound3.play();
			$('#innerYellow').css('background-color', '#FFCF00');
			playerSequence.push(3);
			checkSequence();
			
			setTimeout(function(){
				$('#innerYellow').css('background-color', '#CCA707');
			}, 750);
		}
	});
	
	// BLUE field
	$('#innerBlue').on('mousedown', function(){
		if (buttonsEnabled) { // works only for a while after a sequence is played
			sound4.play();
			$('#innerBlue').css('background-color', '#0F6ED4');
			playerSequence.push(4);
			checkSequence();
			
			setTimeout(function(){
				$('#innerBlue').css('background-color', '#094A8F');
			}, 750);
		}
	});
	
	
});



// for displaying a blinking text in the counter field
function blinkCounter(counterText){
	$('#counter').html(counterText);
	$('#counter').css('color', '#570903');
	setTimeout(function(){
		$('#counter').css('color', 'red');
	}, 300);
	setTimeout(function(){
		$('#counter').css('color', '#570903');
	}, 600);
	setTimeout(function(){
		$('#counter').css('color', 'red');
	}, 900);
}



// generating new sounds sequence
function generateSequence(){
	for (i = 0; i < 20; i++) {
		sequence[i] = Math.floor(Math.random()*4 + 1);
	}
}



// playing a sounds sequence for current level
function playLevelSequence() {
	if (gameOn) {
		
		// generating ID for this play
		playId = Math.random();
		
		// displaying level number
		setTimeout(function(){
			$('#counter').html(levelWithLedingZero(level));
		}, 1000);
		
		// playing sounds sequence (with remembered play ID)
		checkToPlaySequence(playId);
		
		// enabling buttons after a sequence is played
		setTimeout(function(){
			buttonsEnabled = true;
			$('.colorButton').css('cursor', 'pointer');
			playerSequence = [];
		}, (level+1)*1000);
		
		// starting time-up function
		setTimeout(checkForTimeUp(playId), (2*level+3)*1000);
	}
}



// playing sounds for current level sequence
function checkToPlaySequence(id) {
	var counter = 0;
	for (var i = 0; i < level; i++) {
		setTimeout(function(){
			if (gameOn && id === playId) { // play sound only if the game is turn on and it's the same sessions as the one when playing that sequence has started
			
				if (sequence[counter] === 1) { // play 1st sound and blink green field
					sound1.play();
					$('#innerGreen').css('background-color', '#00E867');
					setTimeout(function(){
						$('#innerGreen').css('background-color', '#00A74A');
					}, 750);
				} else if (sequence[counter] === 2) { // play 2nd sound and blink red field
					sound2.play();
					$('#innerRed').css('background-color', '#E8131E');
					setTimeout(function(){
						$('#innerRed').css('background-color', '#9F0F17');
					}, 750);
				} else if (sequence[counter] === 3) { // play 3rd sound and blink yellow field
					sound3.play();
					$('#innerYellow').css('background-color', '#FFCF00');
					setTimeout(function(){
						$('#innerYellow').css('background-color', '#CCA707');
					}, 750);
				} else if (sequence[counter] === 4) { // play 4th sound and blink blue field
					sound4.play();
					$('#innerBlue').css('background-color', '#0F6ED4');
					setTimeout(function(){
						$('#innerBlue').css('background-color', '#094A8F');
					}, 750);
				}
			} 
			
			counter++;
		}, (i+1)*1000);
	}
}



// checking if time for pressing buttons is up
function checkForTimeUp(id) {
	return function() {
		if (gameOn && id === playId) { // works only if the game is turn on and it's the same sessions as the one when playing a sounds sequence has started
			buttonsEnabled = false;
			$('.colorButton').css('cursor', 'default');
			playerSequence = [];
			blinkCounter('!!');
			error.play();
			
			// if the game is in the strict mode, reset level to the 1st one
			if (strictMode) {
				level = 1;
				generateSequence();
			}
			
			// replay level
			setTimeout(function(){
				playLevelSequence();
			}, 1000);
		
		}
	}
}



// checking if player presses right buttons
function checkSequence() {
	thisLevelSeqSoFar = sequence.slice(0,playerSequence.length);
	
	// comparing player's button presses to sequence generated by the game
	if (JSON.stringify(playerSequence) === JSON.stringify(thisLevelSeqSoFar)) {
		
		// if all sounds has been replayed correctly proceed to the next level
		if (playerSequence.length === level) { // level completed
			buttonsEnabled = false;
			$('.colorButton').css('cursor', 'default');
			playId = 0;
			
			level++;
			
			// if it was the last level, play a victory sound and restart the game
			if (gameOn && level > maxLevel) {
				// announce victory
				setTimeout(function(){
					blinkCounter('WIN');
					victory.play();
				}, 600);
				
				// restart game
				setTimeout(function(){
					level = 1;
					generateSequence();
					playLevelSequence();
				}, 3000);
					
			} else { // if not, just play the next level
				setTimeout(function(){
					playLevelSequence();
				}, 1500);
			}
		}
	} else { // if level failed play an error sound and replay the level
		buttonsEnabled = false;
		$('.colorButton').css('cursor', 'default');
		playId = 0;
		blinkCounter('!!');
		setTimeout(function(){
			error.play();
		}, 500);
		
		// if the game is in the strict mode, reset level to the 1st one
		if (strictMode) {
			level = 1;
			generateSequence();
		}
		
		// replay level
		setTimeout(function(){
			playLevelSequence();
		}, 1500);
		
	}
}



// adding leading zeros for level number if needed
function levelWithLedingZero(level) {
	if (level < 10) {
		return '0' + level;
	} else {
		return level;
	}
}