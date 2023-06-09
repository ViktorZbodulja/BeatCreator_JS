class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playBtn = document.querySelector(".play");
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentSnare = "./sounds/snare-acoustic01.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.currentClap = "./sounds/clap-tape.wav";
    this.kickAudio = document.querySelector(".kick_sound");
    this.snareAudio = document.querySelector(".snare_sound");
    this.hihatAudio = document.querySelector(".hihat_sound");
    this.clapAudio = document.querySelector(".clap_sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.isDarkMode = false;
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo_slider");
    //dark mode
    this.lightBtn = document.querySelector(".light");
    this.body = document.querySelector("body");
    this.h1Elements = document.querySelectorAll("h1");
    this.playButton = document.querySelector(".play");
    this.muteButtons = document.querySelectorAll(
      ".kick-volume, .snare-volume, .hihat-volume, .clap-volume"
    );
    this.title = document.querySelector(".title");
    this.tempo = document.querySelector("p");
    this.border = document.querySelectorAll(
      ".kick_track, .snare_track, .hihat_track, .clap_track"
    );
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    //Loop over the pads
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if pads are active
      if (bar.classList.contains("active")) {
        //check each sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (bar.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    //check if it's playing
    if (this.isPlaying) {
      //clear the interval
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playBtn.innerHTML = "Stop";
      this.playBtn.classList.add("active");
    } else {
      this.playBtn.innerHTML = "Play";
      this.playBtn.classList.remove("active");
    }
  }
  //Dark mode
  updateLightBtn() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.body.style.backgroundColor = "rgb(48, 62, 70)";
      this.h1Elements.forEach((h1) => {
        h1.style.color = "#CCCCCC";
      });
      this.playButton.style.background = "rgb(228, 227, 227)";
      this.playButton.style.color = "#344955";
      this.lightBtn.style.background = "rgb(228, 227, 227)";
      this.lightBtn.style.color = "#344955";
      this.title.style.color = "white";
      this.tempo.style.color = "white";
      this.muteButtons.forEach((btn) => {
        btn.style.background = "rgb(228, 227, 227)";
        btn.style.color = "#344955";
      });
      this.border.forEach((b) => {
        b.style.borderBottom = "1px solid rgba(255, 255, 255, 0.5)";
      });
      this.lightBtn.innerHTML = "Dark Mode";
    } else {
      this.body.style.backgroundColor = "";
      this.h1Elements.forEach((h1) => {
        h1.style.color = "";
      });
      this.playButton.style.background = "";
      this.playButton.style.color = "";
      this.muteButtons.forEach((btn) => {
        btn.style.background = "";
        btn.style.color = "";
      });
      this.lightBtn.style.background = "";
      this.lightBtn.style.color = "";
      this.title.style.color = "";
      this.tempo.style.color = "";
      this.border.forEach((b) => {
        b.style.borderBottom = "";
      });
      this.lightBtn.innerHTML = "Light Mode";
    }
  }
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick_select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare_select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat_select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap_select":
        this.clapAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
        case "3":
          this.clapAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
        case "3":
          this.clapAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo_number");
    this.bpm = e.target.value;
    tempoText.innerText = this.bpm;
  }
  updateTempo(e) {
    this.bpm = e.target.value;
    const tempoText = document.querySelector(".tempo_number");
    tempoText.innerText = this.bpm;

    if (this.isPlaying) {
      // If loop is playing, clear the current interval and start a new one
      clearInterval(this.isPlaying);
      const interval = (60 / this.bpm) * 1000;
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
}

const drumKit = new DrumKit();

//event listeners

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.start();
  drumKit.updateBtn();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.mute(e);
  });
});

drumKit.tempoSlider.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener("change", function (e) {
  drumKit.updateTempo(e);
});
drumKit.lightBtn.addEventListener("click", function () {
  drumKit.updateLightBtn();
});
