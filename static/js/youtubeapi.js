var request = new XMLHttpRequest();

var key = "EnterYourOwnAPIKey";
try{
    key = youtubeapi.API_KEY;
}
catch(err){
console.log("set your own google api key here");
key= "YourKey?";
}
var hit = 'https://youtube.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UC1kdc0k_-3Z3VcDnTmv7T1Q&maxResults=50&&key=' + key;
request.open('GET', hit, true)


request.onload = function(){
if(request.readyState==4 && request.status==200)
{
    var data = JSON.parse(this.response);
    var statusHTML = '';
    $.each(data.items, function(i, status){
        statusHTML += '<tr>';
        statusHTML += '<td>' + status.snippet.title + '</td>';
        statusHTML += '<td><img src="' + status.snippet.thumbnails.default.url +'"></td>';
    //    statusHTML += '<td>' + status.html_url + '</td>';
    //    statusHTML += '<td>' + status.language + '</td>';
        statusHTML += '<tr>';
    });
    $('playlists').html(statusHTML);
}
else
{
    var data = JSON.parse(this.response);
    var statusHTML = '';
    $.each(data, function(i, status){
        statusHTML += '<tr>';
        statusHTML += '<td>' + data.error.code + '</td>';
        statusHTML += '<td>' + data.error.message + '</td>';
    //    statusHTML += '<td>' + status.html_url + '</td>';
    //    statusHTML += '<td>' + status.language + '</td>';
        statusHTML += '<tr>';
    });
    $('playlists').html(statusHTML);
}
}
request.send();
