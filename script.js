const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['pokemon','programming','pikachu','virus','noob']

const selectedWord = word[Math.floor(Math.random() * word.length )]

const correctLetters = []
const wrongLetters = []

function displayWord(){
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter =>`
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
                `
            ).join('')
        }
        `
        const innerWord = wordEl.innerText.replace(/\n/g,'')

        if(innerWord === selectedWord){
            finalMessage.innerHTML = 'Congratulations! you have Won!'
            popup.style.display = 'flex'
        }
    }

// Update Wrong Letters
// function updateWrongLetterEl(){

// }
// Show Notification
function showNotification(){
    notification.classList.add('show')

    setTimeout(()=>{
        notification.classList.remove('show')
    },2000)
}
// KEy Down event Listner

window.addEventListener('keydown',e =>{
    if(e.keyCode >=65 && e.keyCode <=90){
        const letter = e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                showNotification()
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLettersEl()
            }else{
                showNotification()
            }
        }
    }
})

displayWord()