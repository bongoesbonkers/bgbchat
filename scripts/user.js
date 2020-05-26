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
            const newUsername = usernameForm.username.value;
            this.username = newUsername;
            chat.username = newUsername;
            this.addNameToLocal();
            usernameForm.reset();
            this.displayUsername();
        })
    }

    displayUsername() {
        if(this.username) {
            user__info.innerHTML = `Chatting as <span class="font-weight-bold">${this.username}</span>`;
        } else {
            user__info.innerHTML = `Chatting as <span class="font-weight-bold">anonymous</span>`;

        }
    }

    addNameToLocal( ) {
        localStorage.setItem('username', this.username);
    }
}

/*App starts fresh:

1) create a new user called anonymous
2) when he changes his username - 
    i) Store username in local storage
    ii) Create a new user document
    iii) Get the userID 
    iv) Store the userID in storage

//USER RETURNS
1) Check local storage for userID 
2) If userID exists - get user from DB


 */