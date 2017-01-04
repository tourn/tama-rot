var display = new ROT.Display({width:20, height:5});
document.body.appendChild(display.getContainer()); /* do not forget to append to page! */

const beat = [
  {
    duration: 100,
    image: [
      "    (\\_/)",
      "(3  (oO )",
      "    (> <)"
    ]
  },
  {
    duration: 100,
    image: [
      "    (\\_/)",
      " (3 (oO )",
      "    (> <)"
    ]
  },
  {
    duration: 100,
    image: [
      "    (\\_/)",
      "  (3(oO )",
      "    (> <)"
    ]
  },
  {
    duration: 100,
    image: [
      "    (\\_/)",
      "   (3(oO )",
      "    (> <)"
    ]
  },
  {
    duration: 100,
    image: [
      "    (\\_/)",
      "   (3(-- )",
      "    (> <)"
    ]
  },
  {
    duration: 200,
    image: [
      "    (\\_/)",
      "  (3(-- )",
      "    (> <)"
    ]
  },
  {
    duration: 500,
    image: [
      "    (\\_/)",
      "    (oO )",
      "    (> <)"
    ]
  },
  {
    duration: 1000,
    image: [
      "            ",
      "      (\\_/)",
      "    (>(T-T)"
    ]
  },
]

function drawImage(image){
  display.clear();
  for(var i = 0; i < image.length; i++){
    for(var j = 0; j < image[i].length; j++){
      display.draw(j,i,image[i][j]);
    }
  }
}

function drawFrames(frames, i){
  i = i || 0;
  if(i >= frames.length) { i = 0; };
  const frame = frames[i];
  drawImage(frame.image);
  setTimeout(function(){ drawFrames(frames, i+1); }, frame.duration);
}

drawFrames(beat);
