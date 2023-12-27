window.addEventListener("load", function () {
  let startButton = document.querySelector("button");
  let buttonParent = document.querySelector("#container");
  let easyModeButton = this.document.querySelector(".easy_mode");
  let hardModeButton = this.document.querySelector(".hard_mode");

  let gameSound = this.document.querySelector("#game_play");
  let click_sound = this.document.querySelector("#click_sound");

  let nameDiv = this.document.querySelector("#username");
  nameDiv.innerHTML += localStorage.getItem("Player-Name");

  let parent = this.document.querySelector("#board");
  let my_image = createRandomImage();

  let grid = fillTheGrid(10, 10, parent);

  let isEnded = 0;
  let column = settingNewPosition(grid, my_image);
  let row = 0;
  grid[row][column].removeImage();

  //Easy mode
  easyModeButton.addEventListener("click", function () {
    hardModeButton.style.backgroundColor = "transparent";
    hardModeButton.style.color = "black";
    easyModeButton.style.backgroundColor = "green";
    easyModeButton.style.color = "white";
    //change the song source
    gameSound.src = "audio/Dancing Line - The Plains (Soundtrack).mp3";
  });

  //Hard mode
  hardModeButton.addEventListener("click", function () {
    easyModeButton.style.backgroundColor = "transparent";
    easyModeButton.style.color = "black";
    hardModeButton.style.backgroundColor = "red";
    hardModeButton.style.color = "white";

    //change the song source
    gameSound.src = "audio/Dancing Line - The Chaos (Soundtrack).mp3";
  });

  let time = 120;
  startButton.addEventListener("click", function () {
    click_sound.play();
    //after ending of the play
    click_sound.addEventListener("ended", function () {
      gameSound.play();

      buttonParent.removeChild(startButton);

      //adding timer
      var timerDiv = document.createElement("div");
      timerDiv.classList.add("timer");
      buttonParent.appendChild(timerDiv);

      //movement of the image
      document.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight") {
          console.log("right");
          // Check if moving to the right is allowed (within the grid)
          if (column < 9) {
            grid[row][column].removeImage();
            column++;
            grid[row][column].appendImage(my_image);
          }
        }
        // Keydown event to move the image to the left
        else if (event.key === "ArrowLeft") {
          // Check if moving to the left is allowed (within the grid)
          if (column > 0) {
            grid[row][column].removeImage();
            column--;
            grid[row][column].appendImage(my_image);
          }
        }

        //// -----------------------test test-----------
        else if (event.key === "ArrowDown") {
          if (row < 10 && grid[lowerBoundry(row)][column].isEmpty()) {
            grid[row][column].removeImage(); //element is removed from that parent

            grid[++row][column].appendImage(my_image);
          } else if (row >= 10 || !grid[lowerBoundry(row)][column].isEmpty()) {
            row = 0;
            //changing the image and the column values
            my_image = createRandomImage();
            column = settingNewPosition(grid, my_image);
            grid[row][column].removeImage();
            grid[row][column].appendImage(my_image);

            //   if(!grid[1][column].isEmpty())
            //    clearInterval(id);
          }
        }
      });

      let killProcess=0; //flag to the interval process  

      let processId = setInterval(function () {
        killProcess=0;
        displayTime(time, timerDiv);

        if (row < 10 && grid[lowerBoundry(row)][column].isEmpty()) {
          grid[row][column].removeImage(); //element is removed from that parent

          grid[++row][column].appendImage(my_image);
        } else if (row >= 10 || !grid[lowerBoundry(row)][column].isEmpty()) {
          checkCollisionVertical(grid, row, column);
          checkCollisionHorizontally(grid, row, column);
          row = 0;
          //changing the image and the column values
          my_image = createRandomImage();
          column = settingNewPosition(grid, my_image);
          grid[row][column].removeImage();
          grid[row][column].appendImage(my_image);

          if (!grid[1][column].isEmpty()) {
            killProcess=1;
          }
        }

        //console.log("timer is on ");
        if (time > 0) {
          time -= 1;
        } else if (time <= 0) {
            killProcess=1;
        }
        if(killProcess){  
          clearInterval(processId);
          console.log("process was killed sucessfully");  
          fireAlert("unfortunately", "you lost", "error");

        }
      }, 20);
    });
    // prettier
    // ctrl+shift+p |||| <F1>
    // > format document
  });
});
