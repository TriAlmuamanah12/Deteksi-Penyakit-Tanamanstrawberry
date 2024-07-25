document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('video');

    // Akses kamera depan
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user"
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play();
    })
    .catch(function(err) {
        console.log("An error occurred: " + err);
    });

    const canvas = document.getElementById('canvas');
    const snapshot = document.getElementById('snapshot');
    const snapButton = document.getElementById('snap');
    const fileInput = document.getElementById('file-input');
    const imageDataInput = document.getElementById('image-data');
    const uploadForm = document.getElementById('upload-form');
    const detectButton = document.getElementById('detect-button');

    snapButton.addEventListener('click', function(event) {
        event.preventDefault();
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, 320, 240);
        const dataURL = canvas.toDataURL('image/png');
        imageDataInput.value = dataURL;
        snapshot.src = dataURL;
        snapshot.style.display = 'block';
        detectButton.disabled = false;
    });

    fileInput.addEventListener('change', function() {
        // Reset imageDataInput and hide snapshot when a file is selected
        imageDataInput.value = '';
        snapshot.style.display = 'none';
        detectButton.disabled = false;
    });

    uploadForm.addEventListener('submit', function(event) {
        if (!fileInput.value && !imageDataInput.value) {
            alert("Silakan pilih file gambar atau ambil gambar terlebih dahulu.");
            event.preventDefault();
        }
    });
});
