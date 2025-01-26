const imgFile = document.querySelector('#imagefile');
const topText = document.querySelector('#toptext');
const bottomText = document.querySelector('#bottomtext');
const canvas = document.querySelector('#memeCanvas');
const download = document.querySelector('#dwnld');
const ctx = canvas.getContext("2d");  

let image;
let newHeight, newWidth, offsetX, offsetY;


imgFile.addEventListener("change" , () => {
    const imgDataURL = URL.createObjectURL(imgFile.files[0]);
    
    image = new Image();
    image.src = imgDataURL;

    image.addEventListener("load" , () => {
        download.style.display = "block"; 
        updateMeme(canvas , image , topText.value , bottomText.value);
    });
});

topText.addEventListener("change" , () => {
    updateMeme(canvas , image , topText.value , bottomText.value);
});

bottomText.addEventListener("change" , () => {
    updateMeme(canvas , image , topText.value , bottomText.value);
});


function updateMeme(canvas , image , topText , bottomText) {
    //draw image to canvas
    scaleImage();
    ctx.drawImage(image, 0, 0, image.width, image.height, offsetX, offsetY, newWidth, newHeight);
    
    //prep for text
    ctx.font = "bold 30px sans-serif";
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.lineWidth = "2";
    ctx.lineJoin = "round";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.textAlign = "center";

    //add text to the image

    //for top
    ctx.textBaseLine = "top";
    const x = canvas.width / 2;
    const y1 = offsetY + 50;
    ctx.strokeText(topText , x, y1); 
    ctx.fillText(topText , x, y1)

    //for bottom
    ctx.textBaseLine = "bottom";
    const y2 = offsetY + newHeight - 30;
    ctx.strokeText(bottomText , x , y2);
    ctx.fillText(bottomText , x, y2)
}

function scaleImage(){
    // Calculate width and height scaling ratios
    var wRatio = canvas.width / image.width;
    var hRatio = canvas.height / image.height;
    
    // Use the smaller ratio to maintain the aspect ratio
    var ratio = Math.min( wRatio , hRatio);
    
    // new dimensionof the image
    newWidth = image.width * ratio ;
    newHeight = image.height * ratio ;
    
    // Center the image on the canvas
    offsetX = (canvas.width - newWidth) / 2; // Horizontal offset
    offsetY = (canvas.height - newHeight) / 2; // Vertical offset
    return { offsetX , offsetY , newHeight , newWidth };
}

//download button
download.addEventListener("click", () => {
    if (canvas.toDataURL()) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png"); // Get the image as a data URL (PNG format)
      link.download = "canvas-image.png"; // Set the filename for the download
  
      // Append the link to the body, click it, and then remove it
      document.body.appendChild(link);
      link.click(); // Trigger the download by simulating a click
      document.body.removeChild(link); // Clean up by removing the link
    } else {
      console.error("Canvas is empty, cannot download image.");
    }
  });