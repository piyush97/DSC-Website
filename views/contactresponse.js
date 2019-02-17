
  // Initialize Firebase
  //This saves the data in firebase and sends a mail to both admin and user.
  var config = {
    apiKey: "AIzaSyB8V60o3bsX0Jmul3eeTfIDnevF0ZsKiaY",
    authDomain: "dscform-response.firebaseapp.com",
    databaseURL: "https://dscform-response.firebaseio.com",
    projectId: "dscform-response",
    storageBucket: "dscform-response.appspot.com",
    messagingSenderId: "512773942179"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var ref = database.ref('contactRef');

function func(){
      var id1 = document.getElementById('form_name');
      var id2 = document.getElementById('form_lastname');
      var id3 = document.getElementById('form_email');
      var id4 = document.getElementById('form_need');
      var id5 = document.getElementById('form_message');

      var first_name = id1.value;
      var last_name = id2.value;
      var email = id3.value;
      var whoPerson = id4.value;
      var message = id5.value;
    
      var data = {
        fname: first_name,
        lname: last_name,
        email: email,
        whoPerson: whoPerson,
        message: message
    }
    ref.push(data);

      var template_params = {
        "name": first_name,
        "surname": last_name,
        "email": email,
        "need": whoPerson,
        "message": message
     }
    var service_id = "default_service";
    var template_id = "template_aKJCAqDa";
    emailjs.send(service_id, template_id, template_params);
    id1.value = " ";
    id2.value = " ";
    id3.value = " @gmail.com";
    id5.value = " ";
  }
