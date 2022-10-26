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
        var boxart = new Image();
        //boxart.src = 'https://static-cdn.jtvnw.net/ttv-boxart/Fortnite-200x300.jpg';
        img.onload = function() {
            fetch('https://www.xboxplaydates.us/api//ambassadorssplashimage')
            .then((response) => response.json())
            .then((data) => {
                ctx.drawImage(img, 0, 0, _width, _height);
                ctx.fillStyle = 'white';
    
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
                
                ctx.font = "bolder italic 34px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[0].gameName, x, y); // x, y
    
                boxArtURL = data[0].gameImage.replace("{width}x{height}", "200x300")
                boxart.src = boxArtURL;
                ctx.drawImage(boxart, (x-100), (y+10)); // x-100, y+10
    
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[0].showStartTime, x, (y + 340)) // x, y+340
    
                ctx.font = "bold 25px 'Segoe UI'"
                ctx.fillText(data[0].showName, x, (y+370)) //x, y+370
    
                //show 2
                ctx.font = "bolder italic 34px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[1].ganeName, (2 * x), y); // 2x, y
    
                boxArtURL = data[1].gameImage.replace("{width}x{height}", "200x300")
                boxart.src = boxArtURL;
                ctx.drawImage(boxart, ((2* x)-100), (y+10)); // 2x-100, y+10
                
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[1].showStartTime, (2* x), (y + 340)) // 2x, y+340
                
                ctx.font = "bold 25px 'Segoe UI'"
                ctx.fillText(data[1].showName, (2* x), (y+370)) //2x, y+370
    
                //show 3
                ctx.font = "bolder italic 34px 'Segoe UI',Arial,sans-serif";
                ctx.fillText(data[2].gameName, (3* x), y); // 3x, y
    
                boxArtURL = data[2].gameImage.replace("{width}x{height}", "200x300")
                boxart.src = boxArtURL;
                ctx.drawImage(boxart, ((3* x)-100), (y+10)); // 3x-100, y+10
    
                ctx.font = "bold 20px 'Segoe UI'"
                ctx.fillText(data[2].showStartTime, (3* x), (y + 340)) // 3x, y+340
                
                ctx.font = "bold 25px 'Segoe UI'"
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