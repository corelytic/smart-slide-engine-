(function () {
  const { formatTime } = window.MediaFlowUI;

  function createPlayer(config) {
    const {
      controls,
      mediaElement,
      onCtaClick,
      onEnded,
      onLeadSubmit,
      onMainMediaError,
      onMainPlay,
      onMainProgress,
      onMetadataLoaded,
      onRuntimeChange,
      onTimeChange
    } = config;

    const {
      ctaOverlay,
      currentTimeLabel,
      durationTimeLabel,
      emptyState,
      fullscreenToggle,
      leadDismiss,
      leadEmail,
      leadForm,
      leadModalBackdrop,
      leadModalCopy,
      leadMessage,
      leadModalTitle,
      leadSubmit,
      playerBadge,
      playerNotice,
      playToggle,
      progressRange,
      skipAdButton,
      titleLabel,
      typeLabel,
      volumeRange
    } = controls;

    const mediaFrame = mediaElement.parentElement;

    let activeAd = null;
    let badgeTimer = 0;
    let currentItem = null;
    let currentMainStatus = "Main Video";
    let fallbackInProgress = false;
    let isAdPlaying = false;
    let isSeeking = false;
    let lastError = "";
    let lastMainTime = 0;
    let leadShown = false;
    let leadSubmitted = false;
    let leadSuccessTimer = 0;
    let mainAllowMutedAutoplay = false;
    let mainAutoplay = false;
    let mainPlayTracked = false;
    let mainResumeTime = 0;
    let midRollPlayed = false;
    let pendingMainResumeTime = 0;
    let preRollPlayed = false;
    let sourceLoadToken = 0;
    let suppressMidRollCheck = false;

    function clearTimer(timerId) {
      if (timerId) {
        window.clearTimeout(timerId);
      }
      return 0;
    }

    function updateRuntimeFlags(flags) {
      const root = document.body;
      if (!root) {
        return;
      }

      Object.keys(flags).forEach(function (key) {
        root.dataset[key] = String(flags[key]);
      });
    }

    function getCurrentMode() {
      if (isAdPlaying) {
        return "Ad";
      }

      if (!leadModalBackdrop.hidden) {
        return "Lead Visible";
      }

      if (!ctaOverlay.hidden) {
        return "CTA Visible";
      }

      return "Main";
    }

    function getCurrentSrc() {
      return mediaElement.currentSrc || mediaElement.src || "";
    }

    function getDiagnostics() {
      const duration = Number.isFinite(mediaElement.duration) ? mediaElement.duration : 0;
      return {
        ctaVisible: !ctaOverlay.hidden,
        currentSrc: getCurrentSrc(),
        durationLoaded: duration > 0,
        lastError,
        leadVisible: !leadModalBackdrop.hidden,
        mode: getCurrentMode(),
        notice: playerNotice.textContent || "",
        status: currentMainStatus
      };
    }

    function notifyRuntimeChange() {
      const diagnostics = getDiagnostics();
      updateRuntimeFlags({
        ctaVisible: diagnostics.ctaVisible,
        currentSrc: diagnostics.currentSrc,
        durationLoaded: diagnostics.durationLoaded,
        lastError: diagnostics.lastError || "none",
        leadVisible: diagnostics.leadVisible,
        playerStatus: diagnostics.status
      });

      if (typeof onRuntimeChange === "function") {
        onRuntimeChange(diagnostics);
      }
    }

    function hasUsableSource(url) {
      return typeof url === "string" && url.trim().length > 0;
    }

    function resetTimeline() {
      progressRange.value = "0";
      currentTimeLabel.textContent = "00:00";
      durationTimeLabel.textContent = "00:00";
      notifyRuntimeChange();
    }

    function updatePlayButton() {
      playToggle.textContent = mediaElement.paused ? "Play" : "Pause";
    }

    function setTransitioning(isTransitioning) {
      if (!mediaFrame) {
        return;
      }

      mediaFrame.classList.toggle("is-transitioning", isTransitioning);
    }

    function setStatus(status) {
      currentMainStatus = status;
      typeLabel.textContent = status;
      notifyRuntimeChange();
    }

    function setNotice(message, tone, persistAsError) {
      playerNotice.textContent = message || "";
      playerNotice.dataset.tone = tone || "default";
      if (persistAsError) {
        lastError = message || "";
      }
      notifyRuntimeChange();
    }

    function clearLastError() {
      lastError = "";
      notifyRuntimeChange();
    }

    function updateProgress() {
      if (isSeeking) {
        return;
      }

      const duration = Number.isFinite(mediaElement.duration) ? mediaElement.duration : 0;
      const currentTime = Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0;
      progressRange.value = duration > 0 ? String((currentTime / duration) * 100) : "0";
      currentTimeLabel.textContent = formatTime(currentTime);
      durationTimeLabel.textContent = formatTime(duration);
      notifyRuntimeChange();
    }

    function setLeadMessage(message, isError) {
      leadMessage.textContent = message;
      leadMessage.style.color = isError ? "#b42318" : "";
    }

    function setLeadModalCopy() {
      leadModalTitle.textContent = "Unlock Exclusive Content";
      leadModalCopy.textContent = "Enter your email to keep watching this media experience.";
    }

    function setLeadSuccessState(isSuccess) {
      leadModalBackdrop.dataset.state = isSuccess ? "success" : "default";
      leadSubmit.textContent = isSuccess ? "Access Granted" : "Submit";
      leadSubmit.disabled = isSuccess;
    }

    function showTransientBadge(message, duration) {
      badgeTimer = clearTimer(badgeTimer);
      playerBadge.hidden = false;
      playerBadge.textContent = message;
      playerBadge.dataset.mode = "feedback";
      notifyRuntimeChange();

      badgeTimer = window.setTimeout(function () {
        playerBadge.dataset.mode = "";
        if (!isAdPlaying) {
          playerBadge.hidden = true;
          updateMainIndicators(Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0);
        } else {
          updateAdUi();
        }
        notifyRuntimeChange();
      }, duration || 1400);
    }

    function hideLeadModal() {
      leadSuccessTimer = clearTimer(leadSuccessTimer);
      leadModalBackdrop.hidden = true;
      delete leadModalBackdrop.dataset.state;
      setLeadSuccessState(false);
      setLeadModalCopy();
      setLeadMessage("", false);
      leadEmail.value = "";
      notifyRuntimeChange();
    }

    function resetOverlayUi() {
      badgeTimer = clearTimer(badgeTimer);
      playerBadge.hidden = true;
      playerBadge.dataset.mode = "";
      ctaOverlay.hidden = true;
      ctaOverlay.textContent = "";
      ctaOverlay.setAttribute("aria-label", "");
      ctaOverlay.classList.remove("is-feedback");
      skipAdButton.hidden = true;
      skipAdButton.disabled = true;
      skipAdButton.textContent = "Skip Ad";
      hideLeadModal();
      notifyRuntimeChange();
    }

    function getMarketing() {
      return currentItem && currentItem.marketing ? currentItem.marketing : {
        ads: { midRoll: {}, preRoll: {} },
        cta: {},
        leadCapture: {}
      };
    }

    function updateMainIndicators(currentTime) {
      const cta = getMarketing().cta || {};
      const hasCta = hasUsableSource(cta.url) && Boolean(cta.text);
      const ctaVisible = Boolean(
        hasCta &&
        currentTime >= Number(cta.startTime || 0) &&
        currentTime <= Number(cta.endTime || 0)
      );

      ctaOverlay.hidden = !ctaVisible;
      if (ctaVisible) {
        ctaOverlay.textContent = cta.text;
        ctaOverlay.setAttribute("aria-label", `${cta.text} call to action`);
        if (playerBadge.dataset.mode !== "feedback") {
          playerBadge.hidden = false;
          playerBadge.textContent = "CTA Visible";
          playerBadge.dataset.mode = "cta";
        }
        setStatus("Main Video • CTA Visible");
      } else if (!leadModalBackdrop.hidden) {
        const leadConfig = getMarketing().leadCapture || {};
        if (playerBadge.dataset.mode !== "feedback") {
          playerBadge.hidden = true;
          playerBadge.dataset.mode = "";
        }
        setStatus(leadConfig.required ? "Lead Required" : "Lead Capture");
      } else {
        if (!isAdPlaying && playerBadge.dataset.mode !== "feedback") {
          playerBadge.hidden = true;
          playerBadge.dataset.mode = "";
        }
        setStatus("Main Video");
      }
      notifyRuntimeChange();
    }

    function updateAdUi() {
      if (!isAdPlaying || !activeAd) {
        playerBadge.hidden = true;
        playerBadge.dataset.mode = "";
        skipAdButton.hidden = true;
        notifyRuntimeChange();
        return;
      }

      const currentTime = Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0;
      const remaining = Math.max(0, Math.ceil(activeAd.skippableAfter - currentTime));

      playerBadge.hidden = false;
      playerBadge.textContent = `Ad Playing • ${activeAd.kind === "preRoll" ? "Pre-roll" : "Mid-roll"} • ${formatTime(currentTime)}`;
      playerBadge.dataset.mode = "ad";
      skipAdButton.hidden = false;
      if (remaining > 0) {
        skipAdButton.disabled = true;
        skipAdButton.textContent = `Skip Ad in ${remaining}s`;
      } else {
        skipAdButton.disabled = false;
        skipAdButton.textContent = "Skip Ad";
      }

      setStatus("Ad Playing");
      notifyRuntimeChange();
    }

    function waitForPlaybackReady(expectedToken, callback) {
      const ready = function () {
        if (expectedToken !== sourceLoadToken) {
          return;
        }

        setTransitioning(false);
        callback();
        notifyRuntimeChange();
      };

      if (mediaElement.readyState >= 2) {
        ready();
        return;
      }

      mediaElement.addEventListener("canplay", ready, { once: true });
      mediaElement.addEventListener("loadeddata", ready, { once: true });
    }

    function loadMediaSource(source, poster, onReady) {
      if (!hasUsableSource(source)) {
        return false;
      }

      sourceLoadToken += 1;
      mediaElement.pause();
      setTransitioning(true);
      mediaElement.src = source;
      mediaElement.poster = poster || "";
      waitForPlaybackReady(sourceLoadToken, onReady);
      mediaElement.load();
      notifyRuntimeChange();
      return true;
    }

    async function playWithFallback(allowMutedAutoplay) {
      try {
        mediaElement.muted = false;
        await mediaElement.play();
        return true;
      } catch {
        if (!allowMutedAutoplay) {
          updatePlayButton();
          return false;
        }

        mediaElement.muted = true;
        try {
          await mediaElement.play();
          return true;
        } catch {
          updatePlayButton();
          return false;
        }
      }
    }

    function loadMainMedia() {
      if (!currentItem || !hasUsableSource(currentItem.url)) {
        emptyState.hidden = false;
        titleLabel.textContent = "Invalid media source";
        setStatus("Main Video");
        setNotice("Media failed to load. Using bundled demo fallback.", "error", true);
        setTransitioning(false);
        if (currentItem && !fallbackInProgress) {
          fallbackInProgress = true;
          onMainMediaError(currentItem);
        }
        return;
      }

      isAdPlaying = false;
      activeAd = null;
      playerBadge.hidden = true;
      playerBadge.dataset.mode = "";
      skipAdButton.hidden = true;
      skipAdButton.disabled = true;
      resetTimeline();
      titleLabel.textContent = currentItem.title;
      setStatus("Main Video");
      emptyState.hidden = true;

      const sourceLoaded = loadMediaSource(currentItem.url, currentItem.thumbnail || "", function () {
        if (mainResumeTime > 0 && Number.isFinite(mediaElement.duration) && mainResumeTime < mediaElement.duration) {
          mediaElement.currentTime = mainResumeTime;
        }

        lastMainTime = mediaElement.currentTime || 0;
        updateProgress();
        updateMainIndicators(lastMainTime);

        if (mainAutoplay) {
          playWithFallback(mainAllowMutedAutoplay);
        } else {
          updatePlayButton();
        }
      });

      if (!sourceLoaded) {
        setTransitioning(false);
        setNotice("Media failed to load. Using bundled demo fallback.", "error", true);
        if (currentItem && !fallbackInProgress) {
          fallbackInProgress = true;
          onMainMediaError(currentItem);
        }
      }
    }

    function finishAd() {
      if (!activeAd) {
        loadMainMedia();
        return;
      }

      if (activeAd.kind === "preRoll") {
        preRollPlayed = true;
      }

      if (activeAd.kind === "midRoll") {
        midRollPlayed = true;
        suppressMidRollCheck = true;
      }

      mainResumeTime = pendingMainResumeTime;
      mainAllowMutedAutoplay = true;
      activeAd = null;
      isAdPlaying = false;
      skipAdButton.hidden = true;
      skipAdButton.disabled = true;
      playerBadge.hidden = true;
      playerBadge.dataset.mode = "";
      setStatus("Main Video");
      loadMainMedia();
    }

    function skipAdNow() {
      if (!isAdPlaying) {
        loadMainMedia();
        return;
      }

      setNotice("Ad skipped. Loading main video.", "default", false);
      finishAd();
    }

    function startAd(kind, resumeTime) {
      const marketing = getMarketing();
      const adConfig = kind === "preRoll" ? marketing.ads.preRoll : marketing.ads.midRoll;

      if (!adConfig || !hasUsableSource(adConfig.url)) {
        clearLastError();
        setNotice("Main video ready", "success", false);
        return false;
      }

      pendingMainResumeTime = Number.isFinite(resumeTime) ? resumeTime : 0;
      isAdPlaying = true;
      activeAd = {
        kind,
        skippableAfter: Number(adConfig.skippableAfter || 0),
        url: adConfig.url
      };

      ctaOverlay.hidden = true;
      hideLeadModal();
      resetTimeline();
      titleLabel.textContent = currentItem.title;
      setStatus("Ad Playing");
      emptyState.hidden = true;

      const sourceLoaded = loadMediaSource(adConfig.url, "", function () {
        updateProgress();
        updateAdUi();
        playWithFallback(true);
      });

      if (!sourceLoaded) {
        isAdPlaying = false;
        activeAd = null;
        setTransitioning(false);
        clearLastError();
        setNotice("Main video ready", "success", false);
        return false;
      }

      return true;
    }

    function maybeStartPreRoll() {
      if (!currentItem || preRollPlayed || !mainAutoplay) {
        return false;
      }

      return startAd("preRoll", mainResumeTime);
    }

    function maybeStartMidRoll() {
      const marketing = getMarketing();
      const midRoll = marketing.ads && marketing.ads.midRoll ? marketing.ads.midRoll : {};
      const currentTime = Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0;

      if (
        suppressMidRollCheck ||
        !hasUsableSource(midRoll.url) ||
        midRollPlayed ||
        isAdPlaying ||
        currentTime < Number(midRoll.triggerTime || 0)
      ) {
        return false;
      }

      return startAd("midRoll", currentTime);
    }

    function showLeadModal() {
      const leadConfig = getMarketing().leadCapture || {};
      if (!leadConfig.enabled || leadShown || leadSubmitted || isAdPlaying) {
        return;
      }

      leadShown = true;
      leadModalBackdrop.hidden = false;
      leadDismiss.hidden = Boolean(leadConfig.required);
      setLeadSuccessState(false);
      setLeadModalCopy();
      setLeadMessage("", false);
      setStatus(leadConfig.required ? "Lead Required" : "Lead Capture");
      mediaElement.pause();

      window.setTimeout(function () {
        leadEmail.focus();
      }, 0);
      notifyRuntimeChange();
    }

    function forceShowLeadModal() {
      leadShown = false;
      leadSubmitted = false;
      showLeadModal();
    }

    function forceShowCta() {
      const marketing = getMarketing();
      if (!marketing.cta || !marketing.cta.text) {
        marketing.cta = {
          endTime: 999,
          startTime: 0,
          text: "Get This System Now",
          url: "https://codecanyon.net/"
        };
      }

      ctaOverlay.hidden = false;
      ctaOverlay.textContent = marketing.cta.text;
      ctaOverlay.setAttribute("aria-label", `${marketing.cta.text} call to action`);
      ctaOverlay.classList.add("is-feedback");
      window.setTimeout(function () {
        ctaOverlay.classList.remove("is-feedback");
      }, 900);
      if (playerBadge.dataset.mode !== "feedback") {
        playerBadge.hidden = false;
        playerBadge.textContent = "CTA Visible";
        playerBadge.dataset.mode = "cta";
      }
      setStatus("Main Video • CTA Visible");
      notifyRuntimeChange();
    }

    mediaElement.addEventListener("loadedmetadata", function () {
      updateProgress();
      emptyState.hidden = true;
      setTransitioning(false);
      onMetadataLoaded({
        duration: mediaElement.duration || 0,
        src: getCurrentSrc()
      });
      notifyRuntimeChange();
    });

    mediaElement.addEventListener("durationchange", updateProgress);

    mediaElement.addEventListener("timeupdate", function () {
      updateProgress();

      if (isAdPlaying) {
        updateAdUi();
        return;
      }

      const currentTime = Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0;
      const delta = currentTime >= lastMainTime ? currentTime - lastMainTime : 0;
      lastMainTime = currentTime;
      onTimeChange(currentTime);
      onMainProgress(currentItem, delta, currentTime);
      updateMainIndicators(currentTime);

      if (!leadSubmitted) {
        const leadCapture = getMarketing().leadCapture || {};
        if (leadCapture.enabled && currentTime >= Number(leadCapture.triggerTime || 0)) {
          showLeadModal();
          return;
        }
      }

      maybeStartMidRoll();
      if (suppressMidRollCheck) {
        suppressMidRollCheck = false;
      }
    });

    mediaElement.addEventListener("play", function () {
      updatePlayButton();
      updateRuntimeFlags({
        mainPlayedAfterAd: !isAdPlaying && preRollPlayed,
        visiblyPlaying: true
      });
      if (!isAdPlaying && currentItem && !mainPlayTracked) {
        mainPlayTracked = true;
        onMainPlay(currentItem);
      }
      notifyRuntimeChange();
    });

    mediaElement.addEventListener("pause", function () {
      updatePlayButton();
      updateRuntimeFlags({ visiblyPlaying: false });
      notifyRuntimeChange();
    });

    mediaElement.addEventListener("ended", function () {
      if (isAdPlaying) {
        setNotice("Ad complete. Loading main video.", "default", false);
        finishAd();
        return;
      }

      onEnded();
    });

    mediaElement.addEventListener("error", function () {
      if (isAdPlaying) {
        clearLastError();
        setNotice("Main video ready", "success", false);
        finishAd();
        return;
      }

      if (currentItem && !fallbackInProgress) {
        fallbackInProgress = true;
        setNotice("Media failed to load. Using bundled demo fallback.", "error", true);
        setStatus("Main Video");
        setTransitioning(false);
        onMainMediaError(currentItem);
        return;
      }

      emptyState.hidden = false;
      titleLabel.textContent = currentItem ? currentItem.title : "No media selected";
      setStatus("Unable to load media");
      setNotice("Unable to load media.", "error", true);
      setTransitioning(false);
    });

    playToggle.addEventListener("click", async function () {
      if (!getCurrentSrc()) {
        return;
      }

      const leadConfig = getMarketing().leadCapture || {};
      if (!leadModalBackdrop.hidden && leadConfig.required) {
        return;
      }

      if (mediaElement.paused) {
        try {
          mediaElement.muted = false;
          await mediaElement.play();
        } catch {
          updatePlayButton();
        }
      } else {
        mediaElement.pause();
      }
    });

    progressRange.addEventListener("input", function () {
      if (isAdPlaying) {
        return;
      }

      isSeeking = true;
      const duration = Number.isFinite(mediaElement.duration) ? mediaElement.duration : 0;
      const nextTime = duration * (Number(progressRange.value) / 100);
      currentTimeLabel.textContent = formatTime(nextTime);
      notifyRuntimeChange();
    });

    progressRange.addEventListener("change", function () {
      if (isAdPlaying) {
        isSeeking = false;
        updateProgress();
        return;
      }

      const duration = Number.isFinite(mediaElement.duration) ? mediaElement.duration : 0;
      mediaElement.currentTime = duration * (Number(progressRange.value) / 100);
      lastMainTime = mediaElement.currentTime;
      isSeeking = false;
      updateProgress();
      updateMainIndicators(lastMainTime);
    });

    volumeRange.addEventListener("input", function () {
      mediaElement.volume = Number(volumeRange.value);
    });

    fullscreenToggle.addEventListener("click", async function () {
      try {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
          return;
        }

        if (mediaElement.requestFullscreen) {
          await mediaElement.requestFullscreen();
        }
      } catch {
        updatePlayButton();
      }
    });

    ctaOverlay.addEventListener("click", function () {
      const cta = getMarketing().cta || {};
      if (!hasUsableSource(cta.url)) {
        return;
      }

      onCtaClick(currentItem);
      ctaOverlay.classList.add("is-feedback");
      window.setTimeout(function () {
        ctaOverlay.classList.remove("is-feedback");
      }, 900);
      showTransientBadge("CTA Opened", 1500);
      window.open(cta.url, "_blank", "noopener,noreferrer");
    });

    skipAdButton.addEventListener("click", function () {
      if (isAdPlaying && activeAd && !skipAdButton.disabled) {
        skipAdNow();
      }
    });

    leadForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const emailValue = leadEmail.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(emailValue)) {
        setLeadMessage("Enter a valid email address.", true);
        return;
      }

      leadSubmitted = true;
      onLeadSubmit(emailValue, currentItem);
      setLeadSuccessState(true);
      setLeadMessage("Access Granted", false);
      setNotice("Access Granted", "success", false);
      showTransientBadge("Access Granted", 1500);
      leadSuccessTimer = clearTimer(leadSuccessTimer);
      leadSuccessTimer = window.setTimeout(function () {
        hideLeadModal();
        updateMainIndicators(Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0);

        if (mediaElement.paused && !isAdPlaying) {
          playWithFallback(false);
        }
      }, 950);
    });

    leadDismiss.addEventListener("click", function () {
      const leadConfig = getMarketing().leadCapture || {};
      if (leadConfig.required) {
        return;
      }

      hideLeadModal();
      updateMainIndicators(Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0);
      setNotice("Lead capture dismissed.", "default", false);
      if (mediaElement.paused && !isAdPlaying) {
        playWithFallback(false);
      }
    });

    function loadItem(item, options) {
      currentItem = item;
      activeAd = null;
      fallbackInProgress = false;
      isAdPlaying = false;
      lastMainTime = 0;
      leadShown = false;
      leadSubmitted = false;
      mainAllowMutedAutoplay = Boolean(options && options.allowMutedAutoplay);
      mainAutoplay = Boolean(options && options.autoplay);
      mainPlayTracked = false;
      mainResumeTime = options && Number.isFinite(options.resumeTime) ? options.resumeTime : 0;
      midRollPlayed = false;
      pendingMainResumeTime = mainResumeTime;
      preRollPlayed = false;
      suppressMidRollCheck = false;
      clearLastError();
      setNotice("", "default", false);
      resetOverlayUi();

      mediaElement.pause();
      emptyState.hidden = true;
      titleLabel.textContent = item.title;
      updateRuntimeFlags({
        loadedmetadataFired: false,
        mainPlayedAfterAd: false
      });

      if (maybeStartPreRoll()) {
        return;
      }

      loadMainMedia();
    }

    function setVolume(volume) {
      mediaElement.volume = volume;
      volumeRange.value = String(volume);
    }

    function clear() {
      currentItem = null;
      activeAd = null;
      isAdPlaying = false;
      mediaElement.removeAttribute("src");
      setTransitioning(false);
      mediaElement.load();
      titleLabel.textContent = "No media selected";
      setStatus("Add a media item to begin");
      setNotice("", "default", false);
      resetTimeline();
      resetOverlayUi();
      emptyState.hidden = false;
      updatePlayButton();
      notifyRuntimeChange();
    }

    updatePlayButton();
    notifyRuntimeChange();

    return {
      clear,
      forceShowCta,
      forceShowLeadModal,
      getCurrentTime: function () {
        return Number.isFinite(mediaElement.currentTime) ? mediaElement.currentTime : 0;
      },
      getDiagnostics,
      getMode: getCurrentMode,
      loadItem,
      setVolume,
      skipAdNow
    };
  }

  window.MediaFlowPlayer = {
    createPlayer
  };
})();
