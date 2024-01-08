document.addEventListener("DOMContentLoaded", ()=>{
    // Image Upload
    const imageUpload = document.getElementById("imageUpload");
    const uploadButton = document.getElementById("uploadButton");
    uploadButton.addEventListener("click", async ()=>{
        const file = imageUpload.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            try {
                const response = await fetch("YOUR_IMAGE_UPLOAD_ENDPOINT", {
                    method: "POST",
                    body: formData
                });
                const result = await response.json();
                console.log(result);
                alert("Image uploaded successfully!");
            } catch (error) {
                console.error("Upload error:", error);
                alert("Image upload failed.");
            }
        }
    });
    // Audio Record API
    let mediaRecorder;
    let audioChunks = [];
    const startRecordButton = document.getElementById("startRecordButton");
    const stopRecordButton = document.getElementById("stopRecordButton");
    const audioPlayer = document.getElementById("audioPlayer");
    startRecordButton.addEventListener("click", async ()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable = (event)=>{
            audioChunks.push(event.data);
        };
        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
    });
    stopRecordButton.addEventListener("click", ()=>{
        mediaRecorder.stop();
        mediaRecorder.onstop = ()=>{
            const audioBlob = new Blob(audioChunks);
            audioPlayer.src = URL.createObjectURL(audioBlob);
            audioChunks = [];
            startRecordButton.disabled = false;
            stopRecordButton.disabled = true;
        };
    });
    // Location API
    const getLocationButton = document.getElementById("getLocationButton");
    const locationDisplay = document.getElementById("locationDisplay");
    getLocationButton.addEventListener("click", ()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            locationDisplay.textContent = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
        }, (error)=>{
            locationDisplay.textContent = `Error: ${error.message}`;
        });
    });
    // Clipboard API
    const clipboardInput = document.getElementById("clipboardInput");
    const copyButton = document.getElementById("copyButton");
    const pasteButton = document.getElementById("pasteButton");
    copyButton.addEventListener("click", async ()=>{
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(clipboardInput.value);
            alert("Copied to clipboard!");
        }
    });
    pasteButton.addEventListener("click", async ()=>{
        if (navigator.clipboard) {
            const text = await navigator.clipboard.readText();
            clipboardInput.value = text;
            alert("Pasted from clipboard!");
        }
    });
});
// ... rest of your JavaScript above ...
// Image Upload and Preview
const imageUpload = document.getElementById("imageUpload");
const imagePreview = document.getElementById("imagePreview");
imageUpload.addEventListener("change", ()=>{
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e)=>{
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});
// ... rest of your JavaScript below ...
// Camera API
const cameraPreview = document.getElementById("cameraPreview");
const captureButton = document.getElementById("captureButton");
const snapshotCanvas = document.getElementById("snapshotCanvas");
const snapshotContext = snapshotCanvas.getContext("2d");
function handleCameraStream(stream) {
    cameraPreview.srcObject = stream;
    cameraPreview.play();
}
function handleCameraError(error) {
    console.error("Camera error:", error);
}
navigator.mediaDevices.getUserMedia({
    video: true
}).then(handleCameraStream).catch(handleCameraError);
captureButton.addEventListener("click", ()=>{
    snapshotContext.drawImage(cameraPreview, 0, 0, snapshotCanvas.width, snapshotCanvas.height);
    const imageDataUrl = snapshotCanvas.toDataURL("image/png");
    // You can now use imageDataUrl to display the image or upload it
    // For example, to display the captured image:
    imagePreview.src = imageDataUrl;
    imagePreview.style.display = "block";
}); // ... rest of your JavaScript below ...

//# sourceMappingURL=index.3e24aa3c.js.map
