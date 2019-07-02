
document.getElementById("adminClick").onclick = function(event)
{
    loadAdminContent(event);
};


function loadAdminContent(event)
{
    let file = event.target.id;
    file +='.html';
    $("#content").load(file);
}

