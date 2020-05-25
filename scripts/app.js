// DOM queries
const roomBtns = document.querySelector('.chat__room-buttons');

//GET USER
let user = new User('anonymous');

if(localStorage.getItem('username')) {
    user.username = localStorage.getItem('username');
}

user.displayUsername();

//LOAD FIRST CHAT IN GENERAL ROOM
let chat = new Chat(user, 'general'); 

//generate ui object
const ui = new ChatUI();

//Listener for room buttons
roomsContainer.addEventListener('click', e=> {

    if(e.target.tagName === 'BUTTON') {
        chat.room = e.target.id;
        console.log(chat.room);
        ui.clearChatWindow();
        chat.getChats(ui.logChats);
    }

})


chat.getRooms(ui.loadRoomButtons);
chat.addChat(user);
chat.updateChat(ui.logChats);
chat.addRoom();
chat.deleteAndUpdateRooms();
user.changeUsername();
