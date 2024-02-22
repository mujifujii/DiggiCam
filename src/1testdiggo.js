const canvasElement = document.querySelector('.canvas')
const videoStream = document.querySelector('.video')
const ctx = canvasElement.getContext('2d')
const FotosEinsetzen = document.querySelector('.Banana')
const FotosEinsetzenRechts = document.querySelector('.banana1')




function getVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    })
        .then(localMediaStream => {
            videoStream.srcObject = localMediaStream;
            videoStream.play();
        })
        .catch(err => {
            console.error("shiet bro hat nicht geklappt", err);
        });
}

function paintToCanvas(){
    const width = videoStream.videoWidth;
    const height = videoStream.videoHeight;

    canvasElement.width = width;
    canvasElement.height = height;

    let lastTime = 0;
    let delay = 500;

    function draw(){
        const now = Date.now();
        const elapsed = now - lastTime;

        if(elapsed > delay){
            videoStream.currentTime = videoStream.currentTime + 0.5;
            ctx.drawImage( videoStream, 0, 0, width, height);
            let pixels = ctx.getImageData(0, 0, width, height);

            ctx.putImageData(pixels, 0, 0);

            lastTime = now;
        }
        requestAnimationFrame(draw);
    }
    draw();
}



function takePhoto(){
    let divElement = document.querySelector('.banana1');
    let images = divElement.getElementsByTagName('img')
    const data = canvasElement.toDataURL("image/jpeg");
    const link = document.createElement("a");
    let FotosInDivs = document.querySelector('.Banana')
    let images2 = FotosInDivs.getElementsByTagName('img')



    if (images2.length < 4){

        link.href = data;
        link.setAttribute("download", "schönling");
        link.innerHTML = `<img src="${data}" alt="schönling ;)"/>`;
        FotosEinsetzen.insertBefore(link, FotosEinsetzen.firstChild)

    } else if (images.length < 4){
        link.href = data;
        link.setAttribute("download", "schönling");
        link.innerHTML = `<img src="${data}" alt="schönling ;)"/>`;
        FotosEinsetzenRechts.insertBefore(link, FotosEinsetzenRechts.firstChild)

    }else {
        alert("Bro du kannst leider keine bilder mehr machen, druck deine bilder aus oder lösche die Pics ;)")
    }

}


const divImages1 = document.querySelector(".Banana").getElementsByTagName("img")
const divImages2 = document.querySelector(".banana1").getElementsByTagName("img")

function FotosAnzeigen() {
    // Get the popup container element
    let popup = document.getElementById("popupContainer");
    // Show the popup by changing its display style
    popup.style.display = "block";

    let ImageCont = document.getElementById("imageContainer")
    ImageCont.innerHTML = ""
    for (let i = 0; i < divImages1.length; i++) {
        let img = document.createElement("img");
        img.src = divImages1[i].src;
        ImageCont.appendChild(img);
    }

    // Loop through images in div2 and append them to the container
    for (let i = 0; i < divImages2.length; i++) {
        let img = document.createElement("img");
        img.src = divImages2[i].src;
        ImageCont.appendChild(img);
    }

    // Set the width of the popup to match the content width
}


function FotosAusdrucken() {
    const imageContainerPopUp = document.querySelector(".imageContainer").getElementsByTagName("img")
}


function closePopup() {
    // Get the popup container element
    let popup = document.getElementById("popupContainer");
    // Hide the popup by changing its display style
    popup.style.display = "none";
}




getVideo();
videoStream.addEventListener("canplay", paintToCanvas)



