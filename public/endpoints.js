$(document).ready(() =>{
    $('#sendRequest').click(() =>{
        var e = document.getElementById("projects");
        var id = e.options[e.selectedIndex].value;
        console.log(id);
       $.ajax({
        url:'project?project_id=' + id,
        type: 'POST',                  
        dataType: 'json',
        success: res => {
            console.log(res.image);
             $('#status').html('<br> Name:' + res.name +'<hr>' + 'Language: ' + res.languange 
             + '<hr>' + res.description + '<hr>' + '<video controls autoplay><source src="../' + res.image +'" type ="video/mp4"></video><hr>'
             )},
            error: res=>{
                $('#status').html('<hr>' +'Select a valid project from the dropdown'+'<hr>');
            }         
       });

       $.ajax({
           url:'getComments?project_id=' +id,
           type: 'POST',
           dataType: 'json',
           success: res => {
               if(res.length > 0){
               var elements = $();
               for(x = 0; x < res.length;x++){
                    elements = elements.add('<p>'+res[x].username+ ' said: <b>'+res[x].comment+'</b></p><br>');
               }
               console.log(res);
               $('#allComments').html("");
               $('#allComments').append(elements);
            }else{
                $('#allComments').html("No comments yet! Add one!");
            }
           }
       })
    });

    $('#addComment').click(()=>{
    console.log("Wer are in")
    var e = document.getElementById("projects");
    var id = e.options[e.selectedIndex].value;
    console.log(id);

    var comment = document.getElementById("comments").value;
    console.log(comment);

    var result = document.getElementById("user").innerText;
    var username = result.substr(result.indexOf(" ") + 1);
    console.log(username);

    $('#allComments').append('<p>'+comment+'</p><br>');

    $.ajax({
        url:'addComment?project_id='+id+'&comment='+comment+'&username='+username,
        type: 'POST',
        success :res =>{
            console.log("Comment inserted");
           
        }

        });
    });


    // $('#checkUser').click(()=>{
    //     var name = document.getElementById("name").value;
    //     var last_name = document.getElementById("last_name").value;
    //     var username = document.getElementById("username").value;
    //     var email = document.getElementById("email").value;
    //     var password = document.getElementById("password").value;

    //     console.log("Name: " + name+ "Lastname: " +last_name+ " Username: " + username + " Email: " + email + " Password: " + password);
    //     //url:'addComment?project_id='+id+'&comment='+comment,
    //     $.ajax({
    //         url:'/checkUser?name='+name+ '&last_name='+last_name+'&username='+username+'&email='+email+'&password='+password,
    //         type: 'POST',
    //         success: res=>{
    //             console.log(res);
    //             if(res.length < 1){
    //                 window.location.replace("/home");
    //             }
    //         }
    //     });
       
    // });

});