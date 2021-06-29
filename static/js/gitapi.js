var request = new XMLHttpRequest();

var links = new XMLHttpRequest();

var zip = new XMLHttpRequest();

request.open('GET', 'https://api.github.com/users/DrainBamage33/repos', true)
links.open('GET', 'https://api.github.com/repos/DrainBamage33/11-tagged-news/contents', true)
zip.open('GET', 'https://api.github.com/repos/DrainBamage33/11-tagged-news/zipball', true)

request.onload = function(){
var data = JSON.parse(this.response);
//console.log(data);
var statusHTML = '';
$.each(data, function(i, status){
    statusHTML += '<tr>';
    statusHTML += '<td>' + status.id + '</td>';
    statusHTML += '<td>' + status.name + '</td>';
    statusHTML += '<td>' + status.html_url + '</td>';
    statusHTML += '<td>' + status.language + '</td>';
    statusHTML += '<tr>';
});
$('temp').html(statusHTML);
}

links.onload = function(){
var data = JSON.parse(this.response);
//console.log(data);
var statusHTML = '';
$.each(data, function(i, status){
    statusHTML += '<tr>';
    statusHTML += '<td>' + status.name + '</td>';
    statusHTML += '<td><a href="' + status.download_url+ '">' + status.download_url + '</a></td>';
    statusHTML += '<td>' + status.path + '</td>';
    statusHTML += '<td>' + status.type + '</td>';
    statusHTML += '<tr>';
});
$('temp2').html(statusHTML);
}

request.send();
links.send();
zip.send();
