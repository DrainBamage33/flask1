var key = "EnterYourOwnAPIKey";
try{
    key = youtubeapi.API_KEY;
}
catch(err){
console.log("set your own google api key here");
key= "Key?";
}
var search=function(){
    var inputval = document.getElementById("search-input").value;
    var res= encodeURIComponent(inputval);
    if(key == "Key?"){
        key=document.getElementById("key-input").value;
    }
    var search_url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=" + res + "&maxResults=100&key=" + key;
    var search_req = new XMLHttpRequest();
    search_req.open("GET",search_url,true);
    search_req.onload = function(){
    if(search_req.readyState==4 && search_req.status==200)
    {
        var data = JSON.parse(this.response);
//        console.log(data);
        var statusHTML = '';
        $.each(data.items, function(i, status){
            var vid_link="https://www.youtube.com/watch?v="+status.id.videoId;
            statusHTML += '<tr>';
            statusHTML += '<td>' + status.snippet.title + '</td>';
//            <button type="button" onclick="search();">search</button>
            statusHTML += '<td><button type="button" onclick="' + 'downloadReq(' + "'" + vid_link + "'" + ')">download</button></td>';
            statusHTML += '<td><img src="' + status.snippet.thumbnails.default.url +'"></td>';
        //    statusHTML += '<td>' + status.html_url + '</td>';
        //    statusHTML += '<td>' + status.language + '</td>';
            statusHTML += '<tr>';
        });
//        console.log(statusHTML);
        $('search').html(statusHTML);
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
        $('search').html(statusHTML);
    }
}
search_req.send();
}

//var downloadReq=function(urlll){
//console.log(urlll);
//xhttp = new XMLHttpRequest();
//xhttp.open("POST", "/download_test", true);
//xhttp.setRequestHeader("Content-type", "text/plain");
//xhttp.send(urlll);
//xhttp.onload=function(){
//console.log(xhttp.status)
//location.replace("/download_test")
//}
////location.replace("/download_test")
//}

function downloadReq(url) {
    var form = document.createElement('form');
    document.body.appendChild(form);
    form.target = '_blank';
    form.method = 'post';
    form.action = '/download_test';
//    for (var name in data) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = "key";
    input.value = ur;
    form.appendChild(input);
//    }
    form.submit();
    document.body.removeChild(form);
}