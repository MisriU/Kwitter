var firebaseConfig = { 
      apiKey: "AIzaSyBQyjrjTsIQsGMGcgu-cr1HjszcHi5ZWMk", 
      authDomain: "testkwitter.firebaseapp.com", 
      databaseURL: "https://testkwitter.firebaseio.com", 
      projectId: "testkwitter", 
      storageBucket: "testkwitter.appspot.com", 
      messagingSenderId: "624653701634", 
      appId: "1:624653701634:web:2cb9a8bd873f17d92d8d1b" 
  }; 
  firebase.initializeApp(firebaseConfig);
  user_name = localStorage.getItem("user_name");
  room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         namewithtag = "<h4>"+name+"<img src='blue_tick.png'></h4>";
         messagewithtag = "<h4>"+message+"</h4>";
likewithtag = "<button class='btn btn=success' id="+firebase_message_id+" value="+Like+" onclick='updatelike(this.id)'>";
         spanwithtag = "<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button>";
         row = namewithtag+messagewithtag+likewithtag+spanwithtag;
         document.getElementById("output").innerHTML += row;

      } });  }); }
getData();

function send(){
      m = document.getElementById("message").value; 
      firebase.database().ref(room_name).push({
            name:user_name, 
            message:m,
            Like:0
      });
      document.getElementById("message").value = "";
}

function logout(){
      window.location = "index.html";
}

function updatelike(message_id){
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}