  var config = {
    apiKey: "AIzaSyDls8u_Y46wHeDMfq3f7lGdOwT6b3xR_RE",
    authDomain: "daalab-87e19.firebaseapp.com",
    databaseURL: "https://daalab-87e19.firebaseio.com",
    projectId: "daalab-87e19",
    storageBucket: "daalab-87e19.appspot.com",
    messagingSenderId: "750262262516"
  };
  firebase.initializeApp(config);
  var dbref=firebase.database().ref('database');
  dbref.on('value', gotData, errData);
  var x,keys,mainkey,list;

  function gotData(data){
    x=data.val();
    keys=Object.keys(x);
    mainkey=keys[0];
    list=x[mainkey];
}

  function errData(err){
      console.log(err);
  }


  function view() {
    document.getElementById('maincontainer').innerHTML="";
    var p1="https://newsapi.org/v2/everything?q=";
    var p2="&from=2018-10-11&sortBy=publishedAt&apiKey=890750ce616c4a00a7a31a4cc415fa84";
    var uid = String(document.getElementById('userid').value)+"";
    var i,user;
    for(i=0;i<list.length;i++){
      user = list[i];
      var uidcheck = String(user.id)+ "";
      if(uid == uidcheck){
        break;
      }
    }
    if(i==list.length)
      alert("Incorrect username");
    var jsonresponse;
    var interest = user.interests;
    var k="Field of Interests : <br>"
    for(var j=0;j<interest.length;j++){
      k+=(j+1)+". "+String(interest[j])+"<br>";
      var query = p1+String(interest[j])+p2;
      jsonresponse = fetch(query).then(function(response){
        return response.json();
      });
      jsonresponse.then(function(result){
        var articles = result["articles"];
        // <div class="content row">
        //     <div class="container-fluid">
        //     <div class="col-md-3 newsimg">
        //       <img class="img-responsive" src = "">
        //     </div>
        //       <div class="col-md-9 newstitle">
        //       <strong> HEY YA </strong> <br>
        //       GOOD NEWS
        //       </div>
        //     </div>
        // </div>
        var line1='<div clas="content row"><div class="container-fluid"><div class="col-md-3 newsimg"><img class="img-responsive" src = "';
        var line2='">"</div><div class="col-md-9 newstitle"><strong>';
        var line3='</strong><br>';
        var line4='</div></div></div>'
        for(i=0;i<5;i++){
          var content = line1+articles[i].urlToImage+line2+articles[i].title+line3+articles[i].description+line4;
          var pc= document.getElementById('maincontainer').innerHTML+"";
          document.getElementById('maincontainer').innerHTML = pc + content;
        }
      });
    }
    document.getElementById('fields').innerHTML=k;

  }
