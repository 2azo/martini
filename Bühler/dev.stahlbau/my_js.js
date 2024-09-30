const fullScreenElement = document.querySelector("#fullscreen-div");


function fullscreenchanged(event) {
  if (document.fullscreenElement) 
    {
    log(`Element: ${document.fullscreenElement.id} entered fullscreen mode.`);
    } 
    else 
    {
    log("Leaving fullscreen mode.");
    }
}

document.addEventListener("fullscreenchange", fullscreenchanged);

// When the toggle button is clicked, enter/exit fullscreen
document.getElementById("toggle-fullscreen").addEventListener("click", () => {
  if (document.fullscreenElement) {
    // exitFullscreen is only available on the Document object.
    document.exitFullscreen();
  } else {
    fullScreenElement.requestFullscreen();
  }
});

// 

// 


// Select the button
const fullscreenButton = document.getElementById('toggle-fullscreen');

// button appear/disappear
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        fullscreenButton.style.display = 'block';
    } else {
        fullscreenButton.style.display = 'none';
    }
});

// Add event listeners for each video to toggle fullscreen
document.getElementById('video1').addEventListener('dblclick', () => {
    toggleFullScreen(document.getElementById('video1'));
});
document.getElementById('video2').addEventListener('dblclick', () => {
    toggleFullScreen(document.getElementById('video2'));
});

// Fullscreen toggle function
function toggleFullScreen(videoElement) {
    if (!document.fullscreenElement) {
        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.webkitRequestFullscreen) { // For Safari
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) { // For IE/Edge
            videoElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// JQuery

$(document).ready(function() {
    // Select the button
    var $fullscreenButton = $('#toggle-fullscreen');

    // button appear/disappear
    $(document).on('fullscreenchange', function() {
        if (document.fullscreenElement) {
            $fullscreenButton.show();
        } else {
            $fullscreenButton.hide();
        }
    });

    // Add event listeners for each video to toggle fullscreen
    $('#video1').on('dblclick', function() {
        toggleFullScreen($('#video1')[0]); // Use the DOM element
    });
    $('#video2').on('dblclick', function() {
        toggleFullScreen($('#video2')[0]); // Use the DOM element
    });

    // Fullscreen toggle function
    // function toggleFullScreen(videoElement) {
    //     if (!document.fullscreenElement) {
    //         if (videoElement.requestFullscreen) {
    //             videoElement.requestFullscreen();
    //         } else if (videoElement.webkitRequestFullscreen) { // For Safari
    //             videoElement.webkitRequestFullscreen();
    //         } else if (videoElement.msRequestFullscreen) { // For IE/Edge
    //             videoElement.msRequestFullscreen();
    //         }
    //     } else {
    //         if (document.exitFullscreen) {
    //             document.exitFullscreen();
    //         }
    //     }
    // }
});

