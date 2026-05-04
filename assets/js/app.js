(function () {
  const Builder = window.MediaFlowBuilder;
  const Player = window.MediaFlowPlayer;
  const Playlist = window.MediaFlowPlaylist;
  const Storage = window.MediaFlowStorage;

  const state = {
    currentIndex: 0,
    lastAppError: "",
    playlist: []
  };

  function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
      throw new Error(`Missing required element: ${id}`);
    }
    return element;
  }

  const mediaElement = getElement("media-element");
  const resetButton = getElement("reset-demo-data");
  const generateEmbedButton = getElement("generate-embed");
  const controls = {
    ctaOverlay: getElement("cta-overlay"),
    currentTimeLabel: getElement("current-time"),
    durationTimeLabel: getElement("duration-time"),
    emptyState: getElement("media-empty-state"),
    fullscreenToggle: getElement("fullscreen-toggle"),
    leadDismiss: getElement("lead-dismiss"),
    leadEmail: getElement("lead-email"),
    leadForm: getElement("lead-form"),
    leadModalBackdrop: getElement("lead-modal-backdrop"),
    leadModalCopy: getElement("lead-modal-copy"),
    leadMessage: getElement("lead-message"),
    leadModalTitle: getElement("lead-modal-title"),
    leadSubmit: getElement("lead-submit"),
    playToggle: getElement("play-toggle"),
    playerBadge: getElement("player-badge"),
    playerNotice: getElement("player-notice"),
    progressRange: getElement("progress-range"),
    skipAdButton: getElement("skip-ad-button"),
    titleLabel: getElement("now-playing-title"),
    typeLabel: getElement("now-playing-type"),
    volumeRange: getElement("volume-range")
  };
  const analyticsElements = {
    ctaClicks: getElement("analytics-cta-clicks"),
    leads: getElement("analytics-leads"),
    plays: getElement("analytics-plays")
  };

  function setLastAppError(message) {
    state.lastAppError = message || "";
    document.body.dataset.lastAppError = state.lastAppError || "none";
  }

  function updatePerformanceSummary() {
    const analytics = Storage.loadAnalytics();
    analyticsElements.plays.textContent = String(analytics.totalPlays || 0);
    analyticsElements.ctaClicks.textContent = String(analytics.ctaClicks || 0);
    analyticsElements.leads.textContent = String(Storage.loadLeadEmails().length);
  }

  function getBundledFallbackItem(item) {
    return {
      id: item && item.id ? item.id : Storage.demoPlaylist[0].id,
      marketing: Storage.demoPlaylist[0].marketing,
      thumbnail: Storage.demoPlaylist[0].thumbnail,
      title: item && item.title ? item.title : Storage.demoPlaylist[0].title,
      type: "video",
      url: "demo/main-1.mp4"
    };
  }

  function getAppState() {
    return {
      analytics: Storage.loadAnalytics(),
      currentIndex: state.currentIndex,
      currentItem: state.playlist[state.currentIndex] || null,
      playlist: state.playlist
    };
  }

  function renderPlaylist() {
    playlistManager.render(state.playlist, state.currentIndex);
  }

  function loadItemAtIndex(index, options) {
    const item = state.playlist[index];
    if (!item) {
      return;
    }

    state.currentIndex = index;
    Storage.saveCurrentIndex(index);
    Storage.saveCurrentTime(options && Number.isFinite(options.resumeTime) ? options.resumeTime : 0);
    renderPlaylist();
    player.loadItem(item, options || {
      allowMutedAutoplay: false,
      autoplay: true,
      resumeTime: 0
    });
    controls.emptyState.hidden = true;
  }

  function resetToDemoState() {
    Storage.resetToDemoData();
    state.playlist = Storage.loadPlaylist();
    state.currentIndex = 0;
    renderPlaylist();
    loadItemAtIndex(0, {
      allowMutedAutoplay: true,
      autoplay: true,
      resumeTime: 0
    });
    updatePerformanceSummary();
  }

  function handlePlaybackEnded() {
    if (state.currentIndex < state.playlist.length - 1) {
      loadItemAtIndex(state.currentIndex + 1, {
        allowMutedAutoplay: false,
        autoplay: true,
        resumeTime: 0
      });
    }
  }

  const player = Player.createPlayer({
    controls,
    mediaElement,
    onCtaClick: function (item) {
      if (item) {
        Storage.trackCtaClick(item.id);
        updatePerformanceSummary();
      }
    },
    onEnded: handlePlaybackEnded,
    onLeadSubmit: function (email, item) {
      Storage.saveLeadEmail({
        email,
        mediaId: item ? item.id : "",
        submittedAt: new Date().toISOString()
      });
      updatePerformanceSummary();
    },
    onMainMediaError: function (item) {
      const fallbackItem = getBundledFallbackItem(item);
      state.playlist[state.currentIndex] = fallbackItem;
      Storage.savePlaylist(state.playlist);
      renderPlaylist();
      player.loadItem(fallbackItem, {
        allowMutedAutoplay: true,
        autoplay: true,
        resumeTime: 0
      });
    },
    onMainPlay: function (item) {
      if (item) {
        Storage.trackPlay(item.id);
        updatePerformanceSummary();
      }
    },
    onMainProgress: function (item, deltaSeconds) {
      if (item) {
        Storage.trackWatchDuration(item.id, deltaSeconds);
      }
    },
    onMetadataLoaded: function (payload) {
      document.body.dataset.loadedmetadataFired = String(Boolean(payload.duration));
      document.body.dataset.currentSrc = payload.src || "";
      document.body.dataset.durationDisplay = controls.durationTimeLabel.textContent;
    },
    onTimeChange: function (seconds) {
      Storage.saveCurrentTime(seconds);
    }
  });

  const playlistManager = Playlist.createPlaylistManager({
    countElement: getElement("playlist-count"),
    listElement: getElement("playlist-list"),
    onRemove: function (index) {
      removeItem(index);
    },
    onSelect: function (index) {
      loadItemAtIndex(index, {
        allowMutedAutoplay: false,
        autoplay: true,
        resumeTime: 0
      });
    }
  });

  Builder.createBuilder({
    copyHtmlButton: getElement("copy-html"),
    copyJsonButton: getElement("copy-json"),
    form: getElement("builder-form"),
    generateButton: generateEmbedButton,
    getAppState,
    htmlOutput: getElement("embed-html-output"),
    jsonOutput: getElement("embed-json-output"),
    messageElement: getElement("builder-message"),
    onAddMedia: function (item) {
      state.playlist = state.playlist.concat(item);
      Storage.savePlaylist(state.playlist);
      loadItemAtIndex(state.playlist.length - 1, {
        allowMutedAutoplay: false,
        autoplay: true,
        resumeTime: 0
      });
    },
    previewElement: getElement("builder-preview")
  });

  function normalizeStateFromStorage() {
    const savedPlaylist = Storage.loadPlaylist();
    const validPlaylist = Storage.validatePlaylist(savedPlaylist);

    if (!validPlaylist || validPlaylist.length === 0) {
      Storage.resetToDemoData();
      state.playlist = Storage.loadPlaylist();
    } else {
      state.playlist = validPlaylist;
      Storage.savePlaylist(validPlaylist);
    }

    state.currentIndex = Math.min(Storage.loadCurrentIndex(), state.playlist.length - 1);
    if (state.currentIndex < 0) {
      state.currentIndex = 0;
    }
  }

  function removeItem(index) {
    if (index < 0 || index >= state.playlist.length) {
      return;
    }

    const removingActive = index === state.currentIndex;
    state.playlist = state.playlist.filter(function (_, itemIndex) {
      return itemIndex !== index;
    });

    if (state.playlist.length === 0) {
      resetToDemoState();
      return;
    }

    if (index < state.currentIndex) {
      state.currentIndex -= 1;
    } else if (removingActive) {
      state.currentIndex = Math.min(index, state.playlist.length - 1);
    }

    Storage.savePlaylist(state.playlist);
    Storage.saveCurrentIndex(state.currentIndex);
    renderPlaylist();

    if (removingActive) {
      loadItemAtIndex(state.currentIndex, {
        allowMutedAutoplay: false,
        autoplay: true,
        resumeTime: 0
      });
    }
  }

  function bindPersistentEvents() {
    mediaElement.addEventListener("volumechange", function () {
      Storage.saveVolume(mediaElement.volume);
    });

    window.addEventListener("beforeunload", function () {
      Storage.saveCurrentTime(player.getCurrentTime());
    });

    window.addEventListener("error", function (event) {
      setLastAppError(event.message || "Unhandled app error");
    });

    window.addEventListener("unhandledrejection", function (event) {
      const reason = event.reason instanceof Error ? event.reason.message : String(event.reason || "Unhandled promise rejection");
      setLastAppError(reason);
    });

    resetButton.addEventListener("click", function () {
      setLastAppError("");
      resetToDemoState();
    });
  }

  function initialize() {
    normalizeStateFromStorage();
    player.setVolume(Storage.loadVolume());
    renderPlaylist();
    updatePerformanceSummary();
    loadItemAtIndex(state.currentIndex, {
      allowMutedAutoplay: true,
      autoplay: true,
      resumeTime: Storage.hasSavedPlaylist() ? Storage.loadCurrentTime() : 0
    });
    bindPersistentEvents();
    setLastAppError("");
  }

  initialize();
})();
