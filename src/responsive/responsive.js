const lightPurple = "rgb(98, 93, 110)"; //buttons are light purple when not selected, dark purple when they are select
const darkPurple = "rgb(59, 54, 70)";
var globalStorageId = null; //id of the selected storage
var globalStorageType = null; //storage type

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

async function getDirectoryInfo(currStorageId, currStorageType, currPath) { //get the files/directories that a storage has
    try {
        $("#listedFileLocation").empty()
        $("#listedFileLocation").append(`<div class="loadingBox"> <h3> Retrieving Files... </h3> <div class="loader"> </div>`)
        const response = await fetch(`http://localhost:5500/list-storages/${currStorageId}`, {
            headers: {
                storagetype: currStorageType,
                path: currPath
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

function makeFileBtnResponsive() {
    $(".fileBtn").each(function() { 
        
        const thisButton = $(this)
        thisButton.attr("selected", false);

        thisButton.on("dblclick", function() { //on double click, navigate to that directory
            populateFileBrowser(globalStorageId, globalStorageType, thisButton.attr("resourcePath"))
        })

        thisButton.on("click", function() {
            
            const currentColor = thisButton.css("background-color")

            if (currentColor === lightPurple) {
                thisButton.css("background-color", darkPurple);
                thisButton.attr("selected", true);

                deselectOtherButtons(".fileBtn", thisButton.attr("id")) //deselect other file buttons when one is clicked

            } else {
                thisButton.css("background-color", lightPurple); //deselect element
                thisButton.attr("selected", false);
            }
        })
    })
}

function populateFileBrowser(currId, currType, currPath) {
    getDirectoryInfo(currId, currType, currPath).then(fileResult => { //populate the file browser
        $("#listedFileLocation").empty()
        const directory = fileResult["directory"]
        for (let i = 0; i < directory["directories"].length; i++) {
            const friendlyName = directory["directories"][i].friendlyName
            const fullPath = directory["directories"][i].resourcePath
            $("#listedFileLocation").append
                (`<button class="fileBtn" id="file${i}" resourcePath=${fullPath}><i class="fa fa-folder"></i> ${friendlyName} </button>`)
        }
        makeFileBtnResponsive() //make the file buttons toggleable
    })
}

function deselectOtherButtons(buttonClass, id) { //deselect other buttons of the same class when another storage button is clicked
    $(buttonClass).each(function () {
        if ($(this).attr("id") != id) {
            $(this).attr("selected", false);
            $(this).css("background-color", lightPurple);
        }
    })
}


$(document).ready(function() {

    getStorages().then(result => { //populate storage menu
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
                var idOfButtonClicked = $(this).attr("id")

                if (currentColor === lightPurple) { //select element, deselect the others
                    $(this).css("background-color", darkPurple);
                    $(this).attr("selected", true);
                    
                    deselectOtherButtons(".squareBtn", idOfButtonClicked)

                } else {
                    $(this).css("background-color", lightPurple); //deselect element when clicked on again
                    $(this).attr("selected", false);
                }
            });

            $(this).on("dblclick", function() { //on double click, select other storage
                globalStorageId = $(this).attr("id");
                globalStorageType = $(this).attr("storageType");
                deselectOtherButtons(".squareBtn", globalStorageId)
                populateFileBrowser(globalStorageId, globalStorageType, "/") //populate file browser with files at root level of a storage
            })


        });
    })

});