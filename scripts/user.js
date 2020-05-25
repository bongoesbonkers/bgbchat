const usernameForm = document.querySelector('.username__form');
const chatHeading = document.querySelector('.chat__heading');
const user__info = document.querySelector('.user__info small');

class User {
    constructor(username){
        this.username = username;
    }

    changeUsername( ) {
        usernameForm.addEventListener('submit', e=> {
            e.preventDefault();
            this.username = usernameForm.username.value;
            chat.username = usernameForm.username.value;
            localStorage.setItem('username', this.username);
            usernameForm.reset();
            this.displayUsername();
        })
    }

    displayUsername() {
        user__info.innerHTML = `Chatting as ${this.username}`;
    }
}
