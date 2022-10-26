function drawImage() {
    var canvas = document.getElementById("ambassadorsUpcoming");

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = `./img/static_background.png`;
        img.onload = function() {
            ctx.drawImage(img, 0, 0, 1222, 707);

        } 
    } else {
        alert("Something went wrong");
    }
}