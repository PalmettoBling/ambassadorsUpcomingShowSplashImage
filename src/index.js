var _width = 1222;
var _height = 707;



async function drawImage() {
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

    // drawing the canvas
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        var img = new Image();
        img.src = `./img/static_background.png`;
        img.onload = async function() {
            // getting the schedule
            let response = await fetch('https://www.xboxplaydates.us/api//ambassadorssplashimage');
            let data = await response.json();
            
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
            var horizontalSpacing = Math.round(showSpacingWidth);
            var verticalSpacing = 200;

            //show 1
            // 1 - Game Name
            ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
            ctx.fillText(data[0].gameName, horizontalSpacing, verticalSpacing); // x, y
                            
            // 1 - Box Art
            var boxart = new Image();
            var boxArtURL = data[0].gameImage.replace("{width}x{height}", "200x300");
            boxart.src = boxArtURL;
            let firstHorizontalSpacing = horizontalSpacing - 100;
            let firstVerticalSpacing = verticalSpacing + 10;
            await ctx.drawImage(boxart, firstHorizontalSpacing, firstVerticalSpacing); // x-100, y+10

            // 1 - Time
            ctx.font = "bold 20px 'Segoe UI'"
            firstHorizontalSpacing = horizontalSpacing;
            firstVerticalSpacing = verticalSpacing + 340;
            ctx.fillText(data[0].showStartTime, firstHorizontalSpacing, firstVerticalSpacing) // x, y+340

            // 1 - Show name
            ctx.font = "bold 22px 'Segoe UI'"
            firstHorizontalSpacing = horizontalSpacing;
            firstVerticalSpacing = verticalSpacing + 370;
            ctx.fillText(data[0].showName, firstHorizontalSpacing, firstVerticalSpacing) //x, y+370

            //show 2
            // 2 - Game
            ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
            let secondHorizontalSpacing = (2 * horizontalSpacing);
            let secondVerticalSpacing = verticalSpacing + 30;
            ctx.fillText(data[1].gameName, secondHorizontalSpacing, secondVerticalSpacing); // 2x, y

            // 2 - box art
            var boxart2 = new Image();
            var boxArt2URL = data[1].gameImage.replace("{width}x{height}", "200x300");
            boxart2.src = boxArt2URL;
            secondHorizontalSpacing = (2 * horizontalSpacing) - 100;
            secondVerticalSpacing = verticalSpacing + 40;
            await ctx.drawImage(boxart2, secondHorizontalSpacing, secondVerticalSpacing); // 2x-100, y+10
            
            // 2 - time
            ctx.font = "bold 20px 'Segoe UI'"
            secondHorizontalSpacing = (2 * horizontalSpacing);
            secondVerticalSpacing = verticalSpacing + 370;
            ctx.fillText(data[1].showStartTime, secondHorizontalSpacing, secondVerticalSpacing) // 2x, y+340
            
            // 2 - show
            ctx.font = "bold 22px 'Segoe UI'"
            secondHorizontalSpacing = (2 * horizontalSpacing);
            secondVerticalSpacing = verticalSpacing + 400;
            ctx.fillText(data[1].showName, secondHorizontalSpacing, secondVerticalSpacing) //2x, y+370

            //show 3
            // 3 - Game
            ctx.font = "bolder italic 20px 'Segoe UI',Arial,sans-serif";
            let thirdHorizontalSpacing = (3 * horizontalSpacing);
            let thirdVerticalSpacing = verticalSpacing;
            ctx.fillText(data[2].gameName, thirdHorizontalSpacing, thirdVerticalSpacing); // 3x, y

            // 3 - box art
            var boxart3 = new Image();
            var boxArt3URL = data[2].gameImage.replace("{width}x{height}", "200x300");
            boxart3.src = boxArt3URL;
            thirdHorizontalSpacing = (3 * horizontalSpacing) - 100;
            thirdVerticalSpacing = verticalSpacing + 10;
            await ctx.drawImage(boxart3, thirdHorizontalSpacing, thirdVerticalSpacing); // 3x-100, y+10

            // 3 - Time
            ctx.font = "bold 20px 'Segoe UI'";
            thirdHorizontalSpacing = (3 * horizontalSpacing);
            thirdVerticalSpacing = verticalSpacing + 340;
            ctx.fillText(data[2].showStartTime, thirdHorizontalSpacing, thirdVerticalSpacing) // 3x, y+340
            
            // 3 -  Show Name
            ctx.font = "bold 22px 'Segoe UI'";
            thirdHorizontalSpacing = (3 * horizontalSpacing);
            thirdVerticalSpacing = verticalSpacing + 370;
            ctx.fillText(data[2].showName, thirdHorizontalSpacing, thirdVerticalSpacing) //3x, y+370
            //end of show cards

            ctx.font = "italic 38px 'Segoe UI',Arial,sans-serif"
            ctx.fillText("Twitch.TV/XboxAmbassadors", 611, 650);
        } 
    } else {
        alert("Something went wrong");
    }
}