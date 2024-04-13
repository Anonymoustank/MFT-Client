$(document).ready(function() {
    $(".squareBtn").each(function() {
        const lightPurple = "rgb(98, 93, 110)";
        const darkPurple = "rgb(59, 54, 70)";

        $(this).on("click", function() {
            const currentColor = $(this).css("background-color")
            if (currentColor === lightPurple) {
                $(this).css("background-color", darkPurple);
            } else {
                $(this).css("background-color", lightPurple);
            }
        });
    });
});