var _width = 1222;
var _height = 707;

function drawImage() {
    var canvas = document.getElementById("ambassadorsUpcoming");
    
    // Today's date Header
    let dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        //timeZone: 'America/Los_Angeles',
        //timeZoneName: 'short'
    };
    let today = new Date();
    let intlToday = new Intl.DateTimeFormat('en', dateOptions).format(today);

    // getting the schedule
    //let response = fetch('https://www.xboxplaydates.us/api//ambassadorssplashimage');
    //let schedule = response.text();
    //console.log(schedule);
    //console.log(JSON.stringify(schedule));

    // drawing the canvas
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = `./img/static_background.png`;
        //boxart.src = 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-200x300.jpg';
        img.onload = function() {
            fetch('https://www.xboxplaydates.us/api//ambassadorssplashimage')
            .then((response) => response.json())
            .then((data) => {
                ctx.drawImage(img, 0, 0, _width, _height);
                ctx.fillStyle = 'white';
                console.log("Data: " + JSON.stringify(data));
    
                ctx.font = "bold 54px 'Segoe UI',Arial,sans-serif"
                ctx.textAlign = 'center';
                ctx.fillText(intlToday, 711, 80);
    
                // get the number of shows for the day, divide the width by number of shows + 1, for center
                // boxart, number above offset by half the size of the image
                // time is height  + boxart size with padding
                var numberOfShows = 3;
                var showSpacingWidth = 1222 / (numberOfShows + 1);
                var x = showSpacingWidth;
                var y = 200;

                console.log("x: " + x);
                console.log("y: " + y);
                
                //show 1
                ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[0].gameName, x, y); // x, y
    
                var boxArtURL = data[0].gameImage.replace("{width}x{height}", "200x300")
                console.log("boxart: " + boxArtURL);
                var boxart = new Image();
                boxart.src = boxArtURL;
                ctx.drawImage(boxart, (x-100), (y+10), 200, 300); // x-100, y+10
    
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[0].showStartTime, x, (y + 340)) // x, y+340
    
                ctx.font = "bold 22px 'Segoe UI'"
                ctx.fillText(data[0].showName, x, (y+370)) //x, y+370
    
                //show 2
                ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[1].gameName, (2 * x), y); // 2x, y
    
                var boxart2 = new Image();
                var boxArt2URL = data[1].gameImage.replace("{width}x{height}", "200x300")
                boxart2.src = boxArt2URL;
                ctx.drawImage(boxart2, ((2* x)-100), (y+10)); // 2x-100, y+10
                
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[1].showStartTime, (2* x), (y + 340)) // 2x, y+340
                
                ctx.font = "bold 22px 'Segoe UI'"
                ctx.fillText(data[1].showName, (2* x), (y+370)) //2x, y+370
    
                //show 3
                ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[2].gameName, (3* x), y); // 3x, y
    
                var boxart3 = new Image();
                var boxArt3URL = data[2].gameImage.replace("{width}x{height}", "200x300")
                boxart3.src = boxArt3URL;
                ctx.drawImage(boxart3, ((3* x)-100), (y+10)); // 3x-100, y+10
    
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[2].showStartTime, (3* x), (y + 340)) // 3x, y+340
                
                ctx.font = "bold 22px 'Segoe UI'"
                ctx.fillText(data[2].showName, (3* x), (y+370)) //3x, y+370
                //end of show cards
    
                ctx.font = "italic 38px 'Segoe UI',Arial,sans-serif"
                ctx.fillText("Twitch.TV/XboxAmbassadors", 611, 650);
            })
            .catch(function(error) {
                console.log(error)
            });
        } 
    } else {
        alert("Something went wrong");
    }
}