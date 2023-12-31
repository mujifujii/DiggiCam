const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const playerDiv = document.querySelector('.playerdiv')

function getVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
    })
        .then(localMediaStream => {
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error("OH NO!!!", err);
        });
}

// ...

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    let lastTime = 0;
    let delay = 500; // Verzögerung

    function draw() {
        const now = Date.now();
        const elapsed = now - lastTime;

        if (elapsed > delay) {
            video.currentTime = video.currentTime + 0.5; // Increase the current time by 2 seconds
            ctx.drawImage(video, 0, 0, width, height);
            // take pixels out
            let pixels = ctx.getImageData(0, 0, width, height);

            // put pixels back
            ctx.putImageData(pixels, 0, 0);

            lastTime = now; // Reset timestamp
        }

        requestAnimationFrame(draw);
    }

    draw(); // Initial call to start the animation loop
}






function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt="Handsome ;) " />`;
    strip.insertBefore(link, strip.firstChild);
}


getVideo();

video.addEventListener("canplay", paintToCanvas);
