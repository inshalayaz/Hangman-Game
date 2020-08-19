const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['pokemon','programming','pikachu','virus','noob']

let selectedWord = word[Math.floor(Math.random() * word.length )]

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
function updateWrongLettersEl(){

    //Display Wrong Letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong Letters</p>' : ''}
        ${wrongLetters.map((letter)=> `<span>${letter}</span>` ) }

    `

    //Display Hangman
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length
        if(index < errors){
            part.style.display = 'block'
        }else {
            part.style.display = 'none'
        }
    })

    //Check if Lost
    if(figureParts.length === wrongLetters.length){
        finalMessage.innerText = 'You Lost :('
        popup.style.display = 'flex'
    }
}
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


//  Restart / Play Again Button

playAgainBtn.addEventListener('click',()=>{
    //Empty Arrays
    correctLetters.splice(0)
    wrongLetters.splice(0)

    selectedWord = word[Math.floor(Math.random()*word.length)]
    displayWord()

    updateWrongLettersEl()
    popup.style.display = 'none'
})

displayWord()
