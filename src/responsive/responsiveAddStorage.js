$(document).ready(function() {
    $(".squareBtn").each(function() { //make buttons toggle-able
        const lightPurple = "rgb(98, 93, 110)"; //buttons are light purple when not selected, dark purple when they are select
        const darkPurple = "rgb(59, 54, 70)";

        $(this).attr("selected", false);

        $(this).on("click", function() {
            const currentColor = $(this).css("background-color")
            var currName = $(this).text()

            if (currentColor === lightPurple) { //select element
                $(this).css("background-color", darkPurple);
                $(this).attr("selected", true);
                
                $(".squareBtn").each(function() { //deselect other storage buttons when another storage button is clicked
                    if ($(this).text() != currName) {
                        $(this).attr("selected", false);
                        $(this).css("background-color", lightPurple);
                    }
                })
            } else {
                $(this).css("background-color", lightPurple); //deselect element
                $(this).attr("selected", false);
            }
        });
    });
});