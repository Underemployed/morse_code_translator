const mapping = {
  "A": ".-", "B": "-...", "C": "-.-.", "D": "-..",
  "E": ".", "F": "..-.", "G": "--.", "H": "....",
  "I": "..", "J": ".---", "K": "-.-", "L": ".-..",
  "M": "--", "N": "-.", "O": "---", "P": ".--.",
  "Q": "--.-", "R": ".-.", "S": "...", "T": "-",
  "U": "..-", "V": "...-", "W": ".--", "X": "-..-",
  "Y": "-.--", "Z": "--..",
  "0": "-----",
  "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....",
  "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..",
  "'": ".----.", "!": "-.-.--", "/": "-..-.",
  "(": "-.--.", ")": "-.--.-", "&": ".-...",
  ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-", "_": "..--.-",
  "\"": ".-..-.", "$": "...-..-", "@": ".--.-.",
  " ": "/"
};




let inputHistory = [];
let currentIndex = -1;

function convertToMorse() {
  let input = document.getElementById("input").value.trim();
  let output = textToMorse(input);

  document.getElementById("output").value = output;

  inputHistory.push({ input: input, output: output });
  currentIndex = inputHistory.length - 1;
  updateNavigationButtons();
  saveText();
}

function convertToText() {
  let input = document.getElementById("input").value.trim();

  

    let output = morseToText(input);
    document.getElementById("output").value = output;
  
  
  inputHistory.push({ input: input, output: output });
  currentIndex = inputHistory.length - 1;
  updateNavigationButtons();
  saveText();
}

  




function textToMorse(text) {
  let morse=""

  for (let i = 0; i < text.length; i++) {
    
    let char = text[i].toUpperCase();
    if (mapping[char]) {
      morse += mapping[char] + " ";
    } else if (char === "_") {
      morse += "- ";
    } else if (char === " ") {
      morse += " / ";
    }
  }
  return morse.trim();
}

function morseToText(morse) {
  let text = "";
  let morseArray = morse.split(" ");

  for (let i = 0; i < morseArray.length; i++) {
    let code = morseArray[i];
    if (code === "") {
      text += " ";
    } else {
      let char = Object.keys(mapping).find(key => mapping[key] === code);
      if (char === "/" && i > 0 && morseArray[i - 1] === "/") {
        text += " ";
      } else {
        text += char.toLowerCase();
      }
    }
  }

  return text;
}




    function copyText() {
      const output = document.getElementById('output');
      output.select();
      output.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');
    }



    function clearText() {
      const input = document.getElementById('input');
      const output = document.getElementById('output');
      saveText();
      input.value = '';
      output.value = '   ';
    }
const storedInputHistory = localStorage.getItem('inputHistory');
if (storedInputHistory) {
  inputHistory = JSON.parse(storedInputHistory);
  currentIndex = inputHistory.length - 1;
  updateNavigationButtons();
}

    function saveText() {
      const input = document.getElementById('input').value;
     const output = document.getElementById('output').value;
    
      inputHistory.push({ input: input, output: output });
      currentIndex = inputHistory.length - 1;
      updateNavigationButtons();
    
      localStorage.setItem('inputHistory', JSON.stringify(inputHistory));
    }

    function goBackward() {
      if (currentIndex > 0) {
        currentIndex--;
        updateInputOutputFields();
        updateNavigationButtons();
      }
    }

    function goForward() {
      if (currentIndex < inputHistory.length - 1) {
        currentIndex++;
        updateInputOutputFields();
        updateNavigationButtons();
      }
    }

    function updateInputOutputFields() {
      var inputElement = document.getElementById("input");
      var outputElement = document.getElementById("output");

      inputElement.value = inputHistory[currentIndex].input;
      outputElement.value = inputHistory[currentIndex].output;
    }
    document.getElementById('paste').addEventListener('click', function() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard.readText().then(function(text) {
          document.getElementById('input').value = text;
        }).catch(function(error) {
          console.log('Failed to read clipboard content: ', error);
        });
      } else {
        console.log('Clipboard API not supported');
      }
    });

    function updateNavigationButtons() {
      var backwardButton = document.getElementById("backward");
      var forwardButton = document.getElementById("forward");

      backwardButton.disabled = currentIndex === 0;
      forwardButton.disabled = currentIndex === inputHistory.length - 1;
    }
        /*play audio*/
        function playMorseCode() {
          const morseCodeInput = document.getElementById("input").value.trim();
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const dotDuration = 100; // Duration of a dot in milliseconds
          const gainNode = audioContext.createGain();
          gainNode.connect(audioContext.destination);
    
          let time = audioContext.currentTime;
    
          for (let i = 0; i < morseCodeInput.length; i++) {
              const char = morseCodeInput[i].toUpperCase();
              if (char === ".") {
                  playTone(250, dotDuration);
                  time += dotDuration / 1000;
              } else if (char === "-") {
                  playTone(250, dotDuration * 3);
                  time += (dotDuration * 3) / 1000;
              } else if (char === " ") {
                  // Pause between words
                  time += dotDuration * 4 / 1000;
              }
              // Pause between characters
              time += dotDuration / 1000;
          }
    
          function playTone(frequency, duration) {
              const oscillator = audioContext.createOscillator();
              oscillator.type = "sine";
              oscillator.frequency.setValueAtTime(frequency, time);
              oscillator.connect(gainNode);
              oscillator.start(time);
              oscillator.stop(time + (duration / 1000));
          }
      }
    const navItem =document.querySelector(".nav__items");
  const openNavBtn =document.querySelector("#open__nav-btn");
  const closeNavBtn =document.querySelector("#close__nav-btn");

  const openNav =()=>{
    navItem.style.display="flex";
    openNavBtn.style.display="none";
    closeNavBtn.style.display="inline-block";
  }
  const closeNav=()=>{
    navItem.style.display="none";
    openNavBtn.style.display="inline-block";
    closeNavBtn.style.display="none";  
    
  }
  openNavBtn.addEventListener("click", openNav)
  closeNavBtn.addEventListener("click", closeNav)
