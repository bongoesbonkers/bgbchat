const chatForm = document.querySelector('.chat__form');
const newRoomForm = document.querySelector('.add__chat-room');


class Chat {

    constructor(User, room) {
        this.room = room;
        this.username = User.username;
        this.chatsDB = db.collection('chats');
        this.roomsDB = db.collection('chat-rooms');
    }


    async getRooms(callback) {
        await this.roomsDB.doc('custom').get()
            .then(doc => {
                if(doc.data().rooms.length) {
                    doc.data().rooms.forEach( room => {
                        callback(room);
                    })
                }
            })
    }

    // addRoom() {
    //     newRoomForm.addEventListener('submit', async e=>{
    //         e.preventDefault();
    //         if(user.roomCount < 5) {
    //             const value = newRoomForm.room.value.trim();
    //             await this.roomsDB.doc('default').get()
    //                 .then( async response => {
    //                     let test = response.data().rooms.find((room)=>{
    //                         return room === value;
    //                     });
    //                     if(test) {
    //                         alert('Oops! That room already exists.')
    //                     } else {
    //                         this.room = newRoomForm.room.value;
    //                         await this.roomsDB.doc('custom').update({
    //                             rooms: firebase.firestore.FieldValue.arrayUnion(this.room)
    //                         })
    //                         document.querySelector('.chat__room-buttons').innerHTML += `
    //                         <button class="chat__room-button btn btn-dark m-1" id="${this.room}" data-creator="${this.username}">
    //                             @${this.room}
    //                             <span class='delete'>x</span>
    //                         </button>
    //                         `;
    //                         newRoomForm.reset();
    //                     }
    //                 })
    //         } else {
    //             console.log('max number of rooms reached. Please close an existing room');
    //         }
    //     })
    // }

    // deleteAndUpdateRooms() {
    //     roomsContainer.addEventListener('click', async e=> {
    //         //if delete room button is pressed
    //         if(e.target.tagName === 'SPAN') {
    //             //get room id
    //             const id = e.target.parentElement.id;

    //             //await update chat-rooms array
    //             // if(test){
    //                 await this.roomsDB.doc('custom').update({
    //                     rooms: firebase.firestore.FieldValue.arrayRemove(id)
    //                 })
    //                 //remove the room in UI
    //                 e.target.parentElement.remove();
    //             // }
    //         }
    //     })
    // }

    async getChats(callback) {
        await this.chatsDB.orderBy("time").limit(50).get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if(this.room === doc.data().room){
                        // console.log(doc.data());
                        return callback(doc.data());
                    }
                })
            })
    }


    async updateChat(callback) {
        await this.chatsDB.onSnapshot(snapshot => {
            // console.log(snapshot.docChanges());
            snapshot.docChanges().forEach( change => {
                if(change.type === "added") {
                    //TEST
                    // console.log(change.doc.data());
                    //UPDATE UI
                    //log chat only if the room matches current room
                    if(this.room === change.doc.data().room){
                        return callback(change.doc.data());
                    }
                }
            })
        })
    }


    addChat(User) {
        chatForm.addEventListener('submit', async e=> {
            e.preventDefault();
            // console.log(chat);
            const time = new Date();
            const data = {
                message: chatForm.chat__message.value,
                username: User.username,
                room: this.room,
                time: firebase.firestore.Timestamp.fromDate(time)
            }
            await this.chatsDB.add(data)
                .then(()=> chatForm.reset())
                .catch((err)=> console.log(err))
        })
    }

}

