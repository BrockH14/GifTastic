var foodarr = ["banana", "apple", "orange", "pancake", "waffle", "coffee", "kit-kat", "turkey"];

function updateDisplay(){
    $(".btnGenLoc").empty();
    for (var i = 0; i < foodarr.length; i++){
        var btnGen = $("<button class='GifBt btn' user-imput="+ foodarr[i] +">");
        var p = $("<p>").text(foodarr[i]);
        btnGen.append(p)
        $(".btnGenLoc").append(btnGen);
    }
}
updateDisplay();

$("#userAdd").on("click", function(event) {
    event.preventDefault();
    var inFood = $("#inputFood").val().trim();
    foodarr.push(inFood);
    updateDisplay();
});

function generateGif(){
    $(".GifBt").on("click", function() {
        $("#gifs-appear-here").empty();
        var user = $(this).attr("user-imput");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            user + "&limit=10&api_key=OIbo0dMnzCFhgh4UOAzg7xCAvcqZy3Cw"
    $.ajax({
    url: queryURL,
    method: "GET"
    })
        .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var userDiv = $("<div class='float-left'>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var userImage = $("<img>");
            userImage.attr("src", results[i].images.fixed_height_still.url);
            userImage.attr("data-still", results[i].images.fixed_height_still.url);
            userImage.attr("data-animate", results[i].images.fixed_height.url);
            userImage.attr("data-state", "still");
            userImage.attr("class", "gif");
            userDiv.append(userImage);
            userDiv.append(p);
            $("#gifs-appear-here").prepend(userDiv);
            }
        });
        setTimeout(runGif, 1000)
    });
}
function runGif(){
    $(".gif").on("click", function() {
        var state = $(this).attr('data-state');
        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
        });
};
generateGif()
runGif();