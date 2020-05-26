// DOM queries
const roomBtns = document.querySelector('.chat__room-buttons');

//Initiate a User Object
let user = new User('anonymous');
if(localStorage.getItem('username')) {
    user.username = localStorage.getItem('username');
}
user.displayUsername();

//LOAD FIRST CHAT IN GENERAL ROOM
let chat = new Chat(user, 'general'); 

//generate UI object
const ui = new ChatUI();

//Listener for room buttons
roomsContainer.addEventListener('click', e=> {

    if(e.target.tagName === 'BUTTON') {
        chat.room = e.target.id;
        roomBtns.querySelectorAll('button').forEach(button => {
            button.classList.remove('active')
        });
        const timer = setTimeout(()=>{
            e.target.classList.add('active');
        },100);
        ui.clearChatWindow();
        chat.getChats(ui.logChats);
    }

})


chat.getRooms(ui.loadRoomButtons);
chat.addChat(user);
chat.updateChat(ui.logChats);
// chat.addRoom();
// chat.deleteAndUpdateRooms();
user.changeUsername();
