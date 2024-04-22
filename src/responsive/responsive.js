const lightPurple = "rgb(98, 93, 110)"; //buttons are light purple when not selected, dark purple when they are select
const darkPurple = "rgb(59, 54, 70)";

async function getStorages() { //get names of storages from backend
    try {
        const response = await fetch('http://localhost:5500/list-storages', {
            headers: {
                'currentPath': 'list-storages',
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Couldn't fetch storage names. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching storage names:', error);
    }
}

async function getDirectoryInfo(storageId, storageType, storageName) { //get the files/directories that a storage has
    try {
        $("#listedFileLocation").empty()
        $("#listedFileLocation").append(`<div class="loadingBox"> <h3> Retrieving Files... </h3> <div class="loader"> </div>`)
        const response = await fetch(`http://localhost:5500/list-storages/${storageId}`, {
            headers: {
                storagetype: storageType,
                path: `/`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Couldn't fetch files/directories. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching files/directories:', error);
    }
}

function makeFileBtnToggleable() {
    $(".fileBtn").each(function() { 
        
        const thisButton = $(this)
        thisButton.attr("selected", false);

        thisButton.on("click", function() {
            
            const currentColor = thisButton.css("background-color")

            if (currentColor === lightPurple) {
                thisButton.css("background-color", darkPurple);
                thisButton.attr("selected", true);

                $(".fileBtn").each(function() { //deselect other storage buttons when another storage button is clicked
                    if ($(this).attr("id") != thisButton.attr("id")) {
                        $(this).attr("selected", false);
                        $(this).css("background-color", lightPurple);
                    }
                })
            } else {
                thisButton.css("background-color", lightPurple); //deselect element
                thisButton.attr("selected", false);
            }
        })
    })
}


$(document).ready(function() {

    getStorages().then(result => {
        for (let i = 0; i < result["storageList"].length; i++) {
            const storageName = result["storageList"][i].storageName
            const storageId = result["storageList"][i].storageId
            const storageType = result["storageList"][i].storageType
            $("#mainStorageLocation").append(`<button class='squareBtn' storageType=${storageType} id=${storageId}>${storageName}</button>`); //create buttons with storage names
        }

        $(".squareBtn").each(function() { //make buttons toggle-able
            $(this).attr("selected", false);

            $(this).on("click", function() {
                const currentColor = $(this).css("background-color")
                var currId = $(this).attr("id");
                var currType = $(this).attr("storageType");
                var currName = $(this).text()

                if (currentColor === lightPurple) { //select element
                    $(this).css("background-color", darkPurple);
                    $(this).attr("selected", true);
                    
                    $(".squareBtn").each(function() { //deselect other storage buttons when another storage button is clicked
                        if ($(this).attr("id") != currId) {
                            $(this).attr("selected", false);
                            $(this).css("background-color", lightPurple);
                        }
                    })

                    getDirectoryInfo(currId, currType, currName).then(fileResult => {
                        $("#listedFileLocation").empty()
                        const directory = fileResult["directory"]
                        for (let i = 0; i < directory["directories"].length; i++) {
                            const friendlyName = directory["directories"][i].friendlyName
                            $("#listedFileLocation").append(`<button class="fileBtn" id="file${i}"><i class="fa fa-folder"></i> ${friendlyName} </button>`)
                        }
                        makeFileBtnToggleable()
                    })

                } else {
                    $(this).css("background-color", lightPurple); //deselect element
                    $(this).attr("selected", false);
                }
            });
        });
    })

});