async function getData() { //WORK IN PROGRESS - TODO
    try {
        const response = await fetch('http://localhost:5500/list-storages'); // Replace with the actual URL
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data received:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

$(document).ready(function() {

    getData();

    var hello = "Click me!";

    // Use jQuery to append a button with the text from the "hello" variable
    $("#mainStorageLocation").append(`<button class='squareBtn'>${hello}</button>`);

    $(".squareBtn, .fileBtn").each(function() { //NEEDS TO BE AFTER BUTTONS ARE CREATED
        const lightPurple = "rgb(98, 93, 110)";
        const darkPurple = "rgb(59, 54, 70)";

        $(this).attr("selected", false);

        $(this).on("click", function() {
            const currentColor = $(this).css("background-color")
            if (currentColor === lightPurple) {
                $(this).css("background-color", darkPurple);
                $(this).attr("selected", true);
            } else {
                $(this).css("background-color", lightPurple);
                $(this).attr("selected", false);
            }
        });
    });

});