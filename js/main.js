/**
 * PAY TO WIN — MAIN INTERACTIVE CONTROLLER (main.js)
 * Powers the Official Trailer player, 30-Second Intermission Dilemma Simulator,
 * 7-Day Wave Escalation tabs, Screenshot Gallery Filter, <dialog> Lightbox,
 * and Editable Placeholder Highlighter.
 */

(function () {
  "use strict";

  const DATA = window.GAME_DATA || {};

  // =========================================================================
  // 1. READING PROGRESS, BACK TO TOP & MOBILE NAV
  // =========================================================================
  const progressBar = document.getElementById("read-progress");
  const backToTopBtn = document.getElementById("back-to-top");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;

    if (progressBar) {
      progressBar.style.width = pct.toFixed(1) + "%";
    }
    if (backToTopBtn) {
      backToTopBtn.classList.toggle("visible", scrollTop > 420);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", function () {
      const isOpen = navLinksContainer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
      mobileMenuBtn.textContent = isOpen ? "CLOSE ✕" : "MENU ☰";
    });

    navLinksContainer.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinksContainer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.textContent = "MENU ☰";
      });
    });
  }

  // =========================================================================
  // 2. EDITABLE PLACEHOLDER HIGHLIGHTER TOGGLE
  // =========================================================================
  const placeholderBtn = document.getElementById("toggle-placeholders-btn");
  let showPlaceholders = new URLSearchParams(window.location.search).get("debug") === "placeholders";

  function syncPlaceholderMode() {
    document.body.classList.toggle("show-placeholders", showPlaceholders);
    if (placeholderBtn) {
      placeholderBtn.textContent = showPlaceholders
        ? "Highlight Editable Placeholders: ON"
        : "Highlight Editable Placeholders: OFF";
    }
  }

  if (placeholderBtn) {
    placeholderBtn.addEventListener("click", function () {
      showPlaceholders = !showPlaceholders;
      syncPlaceholderMode();
    });
    syncPlaceholderMode();
  }

  // =========================================================================
  // 3. OFFICIAL 1080p60 TRAILER PLAYER CONTROLS
  // =========================================================================
  const video = document.getElementById("official-trailer-video");
  const playBtn = document.getElementById("trailer-play-btn");
  const muteBtn = document.getElementById("trailer-mute-btn");
  const theaterBtn = document.getElementById("trailer-theater-btn");
  const timecodeEl = document.getElementById("trailer-timecode");
  const heroGrid = document.getElementById("hero-grid");

  function formatSeconds(sec) {
    if (!Number.isFinite(sec) || sec < 0) return "00:00";
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  if (video) {
    function updateTimecode() {
      const cur = formatSeconds(video.currentTime);
      const dur = formatSeconds(video.duration || 38);
      if (timecodeEl) {
        timecodeEl.textContent = cur + " / " + dur;
      }
    }

    video.addEventListener("loadedmetadata", updateTimecode);
    video.addEventListener("timeupdate", updateTimecode);

    video.addEventListener("play", function () {
      if (playBtn) playBtn.textContent = "⏸ Pause Trailer";
    });

    video.addEventListener("pause", function () {
      if (playBtn) playBtn.textContent = "▶ Play Trailer";
    });

    video.addEventListener("ended", function () {
      if (playBtn) playBtn.textContent = "↺ Replay Trailer";
    });

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        if (video.paused || video.ended) {
          video.play();
        } else {
          video.pause();
        }
      });
    }

    if (muteBtn) {
      muteBtn.addEventListener("click", function () {
        video.muted = !video.muted;
        muteBtn.textContent = video.muted ? "🔇 Audio: MUTED" : "🔊 Audio: ON";
      });
    }

    if (theaterBtn && heroGrid) {
      let isTheater = false;
      theaterBtn.addEventListener("click", function () {
        isTheater = !isTheater;
        heroGrid.classList.toggle("hero-Grid-Expanded", isTheater);
        theaterBtn.textContent = isTheater ? "⤡ Exit Theater" : "⛶ Theater Mode";
        if (isTheater) {
          document.getElementById("trailer-player").scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
  }

  // =========================================================================
  // 3b. STORY CINEMATIC PLAYER CONTROLS (PREMISE & LORE)
  // =========================================================================
  const storyVideo = document.getElementById("story-complete-video");
  const storyPlayBtn = document.getElementById("story-play-btn");
  const storyMuteBtn = document.getElementById("story-mute-btn");
  const storyTheaterBtn = document.getElementById("story-theater-btn");
  const storyTimecodeEl = document.getElementById("story-timecode");
  const storyGrid = document.getElementById("story-cinematic-grid");

  if (storyVideo) {
    function updateStoryTimecode() {
      const cur = formatSeconds(storyVideo.currentTime);
      const dur = formatSeconds(storyVideo.duration || 53);
      if (storyTimecodeEl) {
        storyTimecodeEl.textContent = cur + " / " + dur;
      }
    }

    function syncStoryMuteBtn() {
      if (storyMuteBtn) {
        storyMuteBtn.textContent = storyVideo.muted ? "🔇 Story Audio: MUTED" : "🔊 Story Audio: ON";
      }
    }

    storyVideo.addEventListener("loadedmetadata", updateStoryTimecode);
    storyVideo.addEventListener("timeupdate", updateStoryTimecode);
    storyVideo.addEventListener("volumechange", syncStoryMuteBtn);

    storyVideo.addEventListener("play", function () {
      if (storyPlayBtn) storyPlayBtn.textContent = "⏸ Pause Story";
      if (video && !video.paused) {
        video.pause();
      }
    });

    storyVideo.addEventListener("pause", function () {
      if (storyPlayBtn) storyPlayBtn.textContent = "▶ Play Story";
    });

    storyVideo.addEventListener("ended", function () {
      if (storyPlayBtn) storyPlayBtn.textContent = "↺ Replay Story";
    });

    if (video) {
      video.addEventListener("play", function () {
        if (!storyVideo.paused) {
          storyVideo.pause();
        }
      });
    }

    if (storyPlayBtn) {
      storyPlayBtn.addEventListener("click", function () {
        if (storyVideo.paused || storyVideo.ended) {
          storyVideo.play();
        } else {
          storyVideo.pause();
        }
      });
    }

    if (storyMuteBtn) {
      storyMuteBtn.addEventListener("click", function () {
        storyVideo.muted = !storyVideo.muted;
        syncStoryMuteBtn();
      });
    }

    if (storyTheaterBtn && storyGrid) {
      let isStoryTheater = false;
      storyTheaterBtn.addEventListener("click", function () {
        isStoryTheater = !isStoryTheater;
        storyGrid.classList.toggle("story-theater-expanded", isStoryTheater);
        storyTheaterBtn.textContent = isStoryTheater ? "⤡ Exit Theater" : "⛶ Theater Mode";
        storyTheaterBtn.setAttribute("aria-expanded", String(isStoryTheater));
        if (isStoryTheater) {
          document.getElementById("story-cinematic").scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    }
  }

  // =========================================================================
  // 4. INTERACTIVE 30-SECOND INTERMISSION DILEMMA SIMULATOR
  // =========================================================================
  let simCash = 2850;
  let simIcu = 55;
  let simGun = 35;

  const cashEl = document.getElementById("sim-cash");
  const icuLabelEl = document.getElementById("sim-icu-label");
  const icuBarEl = document.getElementById("sim-icu-bar");
  const gunLabelEl = document.getElementById("sim-gun-label");
  const gunBarEl = document.getElementById("sim-gun-bar");
  const logEl = document.getElementById("sim-log");
  const resetSimBtn = document.getElementById("sim-reset-btn");

  function renderSimulation(logMessage) {
    if (cashEl) cashEl.textContent = "$" + simCash.toLocaleString();

    if (icuBarEl) {
      icuBarEl.style.width = simIcu + "%";
      icuBarEl.style.background = simIcu <= 30 ? "var(--crimson)" : "var(--emerald)";
    }
    if (icuLabelEl) {
      const status = simIcu <= 25 ? "CRITICAL / FLATLINING!" : simIcu >= 80 ? "Stabilized" : "Bills Due";
      icuLabelEl.textContent = simIcu + "% (" + status + ")";
      icuLabelEl.style.color = simIcu <= 25 ? "var(--crimson)" : "var(--emerald)";
    }

    if (gunBarEl) {
      gunBarEl.style.width = simGun + "%";
    }
    if (gunLabelEl) {
      const gunStatus = simGun >= 75 ? "Heavy Arsenal Ready" : simGun >= 55 ? "Combat Upgraded" : "Under-Equipped";
      gunLabelEl.textContent = simGun + "% (" + gunStatus + ")";
    }

    if (logEl && logMessage) {
      logEl.textContent = logMessage;
    }
  }

  document.querySelectorAll("[data-sim-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const action = btn.getAttribute("data-sim-action");
      const cost = action === "shotgun" || action === "icu-full" ? 950 : 500;

      if (simCash < cost) {
        renderSimulation("[INSUFFICIENT SALVAGE CASH]: You have $" + simCash + " remaining. Click 'Reset Intermission' to test another allocation.");
        return;
      }

      simCash -= cost;

      if (action === "shotgun") {
        simGun = Math.min(100, simGun + 30);
        simIcu = Math.max(10, simIcu - 20);
        renderSimulation("[ARMORY UNLOCKED]: Purchased Auto Shotgun 12G (-$950). Arena firepower surged, but unpaid hospital bills caused Family ICU stability to drop!");
      } else if (action === "upgrade") {
        simGun = Math.min(100, simGun + 18);
        simIcu = Math.max(10, simIcu - 12);
        renderSimulation("[GUNSMITH UPGRADE]: Installed Tier-2 Weapon Part & 500-Pt Armor Plate (-$500). You are better protected, while ICU debt mounts.");
      } else if (action === "icu-full") {
        simIcu = Math.min(100, simIcu + 28);
        simGun = Math.max(15, simGun - 10);
        renderSimulation("[ICU WIRE SENT]: Paid $950 toward Family ICU Life Support. Their vitals stabilized, but you enter the next wave with unupgraded guns.");
      } else if (action === "icu-min") {
        simIcu = Math.min(100, simIcu + 15);
        simGun = Math.max(15, simGun - 5);
        renderSimulation("[OXYGEN FEE PAID]: Wired $500 minimum payment to the ICU. Bought your family another night, leaving minimal cash for ammunition.");
      }
    });
  });

  if (resetSimBtn) {
    resetSimBtn.addEventListener("click", function () {
      simCash = 2850;
      simIcu = 55;
      simGun = 35;
      renderSimulation("[TERMINAL RESET]: Wave 3 cleared with $2,850 Salvage Cash. Make your 30-second intermission choice.");
    });
  }

  // =========================================================================
  // 5. 7-DAY WAVE PROGRESSION TABS
  // =========================================================================
  const waveTiers = DATA.waveTiers || [];
  const waveTabBtns = document.querySelectorAll("[data-wave-tab]");
  const waveBadge = document.getElementById("wave-badge");
  const waveTitle = document.getElementById("wave-title");
  const waveDesc = document.getElementById("wave-desc");
  const waveSpawns = document.getElementById("wave-spawns");
  const waveEnemies = document.getElementById("wave-enemies");
  const waveGear = document.getElementById("wave-gear");
  const waveShotImg = document.getElementById("wave-shot-img");
  const waveShotTrigger = document.getElementById("wave-shot-trigger");

  let activeWaveIdx = 0;

  function setWaveTier(index) {
    const tier = waveTiers[index];
    if (!tier) return;
    activeWaveIdx = index;

    if (waveBadge) {
      waveBadge.textContent = tier.badge;
      waveBadge.className = "pill " + (index === 0 ? "emerald" : index === 1 ? "brass" : "crimson");
    }
    if (waveTitle) waveTitle.textContent = tier.title;
    if (waveDesc) waveDesc.textContent = tier.description;
    if (waveSpawns) waveSpawns.textContent = tier.spawns;
    if (waveEnemies) waveEnemies.textContent = tier.enemies;
    if (waveGear) waveGear.textContent = tier.recommendedGear;
    if (waveShotImg) {
      waveShotImg.src = tier.screenshot;
      waveShotImg.alt = tier.title;
    }

    waveTabBtns.forEach(function (btn, idx) {
      const isSelected = idx === index;
      btn.classList.toggle("active", isSelected);
      btn.setAttribute("aria-selected", String(isSelected));
    });
  }

  waveTabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const idx = Number(btn.getAttribute("data-wave-tab"));
      setWaveTier(idx);
    });
  });

  if (waveShotTrigger) {
    waveShotTrigger.addEventListener("click", function () {
      const tier = waveTiers[activeWaveIdx];
      if (tier) {
        openLightbox(tier.screenshot, tier.title, tier.description);
      }
    });
  }

  // =========================================================================
  // 6. SCREENSHOT GALLERY FILTER & <DIALOG> LIGHTBOX
  // =========================================================================
  const filterBtns = document.querySelectorAll("#gallery-filters [data-filter]");
  const shotCards = document.querySelectorAll("#gallery-grid .shot-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.getAttribute("data-filter");
      filterBtns.forEach(function (b) {
        b.classList.toggle("active", b === btn);
      });
      shotCards.forEach(function (card) {
        const cat = card.getAttribute("data-category");
        const show = filter === "all" || cat === filter;
        card.style.display = show ? "" : "none";
      });
    });
  });

  const lightboxDialog = document.getElementById("lightbox-dialog");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  function openLightbox(src, title, caption) {
    if (!lightboxDialog || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title || "Gameplay screenshot";
    if (lightboxTitle) lightboxTitle.textContent = title || "Gameplay Capture";
    if (lightboxCaption) lightboxCaption.textContent = caption || "";
    if (typeof lightboxDialog.showModal === "function") {
      lightboxDialog.showModal();
    } else {
      lightboxDialog.setAttribute("open", "");
    }
  }

  function closeLightbox() {
    if (!lightboxDialog) return;
    if (typeof lightboxDialog.close === "function") {
      lightboxDialog.close();
    } else {
      lightboxDialog.removeAttribute("open");
    }
  }

  document.querySelectorAll("[data-lightbox-src]").forEach(function (el) {
    el.addEventListener("click", function () {
      openLightbox(
        el.getAttribute("data-lightbox-src"),
        el.getAttribute("data-lightbox-title"),
        el.getAttribute("data-lightbox-caption")
      );
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener("click", closeLightbox);
  }

  if (lightboxDialog) {
    // Light-dismiss when clicking on the dialog backdrop outside the inner container
    lightboxDialog.addEventListener("click", function (e) {
      if (e.target === lightboxDialog) {
        closeLightbox();
      }
    });
  }
})();
