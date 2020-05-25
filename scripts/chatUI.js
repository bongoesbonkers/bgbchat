const chatWindow = document.querySelector('.chat__window');
const roomsContainer = document.querySelector('.chat__room-buttons');

class ChatUI {

    loadRoomButtons(data) {

        const html = `
        <button class="chat__room-button btn btn-outline-primary m-1" id="${data}">
            @${data}
            <span class='delete'>x</span>    
        </button>`
        roomsContainer.innerHTML+=html;

    }

    logChats(data) {

        const html = `
        <li class="list-unstyled">
        <blockquote class="blockquote">
        <p>${data.message}</p>
        <footer class="blockquote-footer">${data.username}</footer>
        </blockquote>
        </li>`


        chatWindow.innerHTML+= html;

    }

    clearChatWindow() {
        chatWindow.innerHTML = '';
    }

}
