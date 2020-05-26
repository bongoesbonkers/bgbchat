const chatWindow = document.querySelector('.chat__window');
const roomsContainer = document.querySelector('.chat__room-buttons');

class ChatUI {

    loadRoomButtons(data) {
        const html = `
        <button class="chat__room-button btn btn-dark m-1" id="${data.room}"">
            @${data.room}
            <span class='delete'>x</span>    
        </button>`
        roomsContainer.innerHTML+=html;
    }

    logChats(data) {
        const time = moment(data.time.toDate());
        const timeOutput = moment(time).fromNow();
        let uniqueClass;
        if(data.username === localStorage.getItem('username')){
            uniqueClass = "unique";
        } 
        const html = `
        <li class="list-unstyled ${uniqueClass}">
        <blockquote class="blockquote">
        <p>${data.message}</p>
        <footer class="blockquote-footer"><span class="font-weight-bold">${data.username}</span> (${timeOutput})</footer>
        </blockquote>
        </li>`
        chatWindow.innerHTML+= html;
        chatWindow.scrollBy(0, chatWindow.scrollHeight);
    }

    clearChatWindow() {
        chatWindow.innerHTML = '';
    }

}
