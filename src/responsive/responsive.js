$(document).ready(function() {
    $(".squareBtn, .fileBtn").each(function() {
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