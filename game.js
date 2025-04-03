window.onload = function () {
  let pumpHandle = document.getElementById("pump-handle");
  let balloonContainers = document.querySelectorAll(".balloon-container");
  let balloons = document.querySelectorAll("img[id^='balloon']");
  let pumpCount = 0;
  let balloonInflated = false;
  let currentBalloonContainer = null;
  let currentBalloon = null;

  // Select a random balloon
  function selectRandomBalloon() {
    console.log("Selecting a random balloon...");
    console.log("Total balloons:", balloonContainers.length); // Should be 9

    balloonContainers.forEach((container) => {
      container.style.transition = "none";
      container.style.width = "40px";
      container.style.height = "40px";
      container.style.bottom = "110px"; // Match the CSS starting position
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      container.querySelector("img[id^='balloon']").style.width = "40px";
      container.querySelector("img[id^='balloon']").style.height = "40px";
    });

    let randomIndex = Math.floor(Math.random() * balloonContainers.length);
    currentBalloonContainer = balloonContainers[randomIndex];
    currentBalloon = currentBalloonContainer.querySelector("img[id^='balloon']");
    balloonInflated = false;
    console.log("Selected balloon:", currentBalloon.id);
  }

  // Handle pump click
  pumpHandle.addEventListener("click", function () {
    if (!balloonInflated && currentBalloon) {
      pumpBalloon();
    } else {
      console.log("Cannot pump: balloonInflated =", balloonInflated, "currentBalloon =", currentBalloon);
    }
  });

  // Inflate the balloon
  function pumpBalloon() {
    pumpCount++;
    console.log("Pump count:", pumpCount);
    let balloonSize = 40 + pumpCount * 5;

    if (currentBalloonContainer && currentBalloon) {
      currentBalloonContainer.style.width = balloonSize + "px";
      currentBalloonContainer.style.height = balloonSize + "px";
      currentBalloon.style.width = balloonSize + "px";
      currentBalloon.style.height = balloonSize + "px";
    }

    if (pumpCount >= 10) {
      console.log("Starting balloon flight...");
      startBalloonFlight();
    }
  }

  // Make the balloon fly off
  function startBalloonFlight() {
    balloonInflated = true;
    if (currentBalloonContainer) {
      console.log("Balloon flying:", currentBalloon.id);
      currentBalloonContainer.style.transition = "all 3s linear"; // Ensure transition is applied
      currentBalloonContainer.style.bottom = "600px";
      currentBalloonContainer.style.left = Math.random() * 300 + "px";
      currentBalloonContainer.style.transform = "none"; // Remove transform during flight

      setTimeout(() => {
        console.log("Resetting game after flight...");
        resetGame();
      }, 3000);
    } else {
      console.log("Error: currentBalloonContainer is not set!");
    }
  }

  // Burst the balloon
  balloons.forEach((balloon) => {
    balloon.addEventListener("click", function () {
      if (balloonInflated && currentBalloon === balloon) {
        console.log("Bursting balloon:", balloon.id);
        burstBalloon(balloon);
      } else {
        console.log("Cannot burst: balloonInflated =", balloonInflated, "currentBalloon =", currentBalloon?.id, "clicked balloon =", balloon.id);
      }
    });
  });

  function burstBalloon(balloon) {
    balloon.style.transition = "none";
    balloon.style.width = "0px";
    balloon.style.height = "0px";
    currentBalloonContainer.style.width = "0px";
    currentBalloonContainer.style.height = "0px";
    alert("Boom! Balloon burst! 🎈💥");
    resetGame();
  }

  function resetGame() {
    pumpCount = 0;
    balloonInflated = false;
    selectRandomBalloon();
  }

  // Initialize the game by selecting the first balloon
  selectRandomBalloon();
};
