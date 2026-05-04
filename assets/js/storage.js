(function () {
  const STORAGE_KEYS = {
    analytics: "mediaflow.analytics",
    playlist: "mediaflow.playlist",
    currentIndex: "mediaflow.currentIndex",
    currentTime: "mediaflow.currentTime",
    leadEmails: "mediaflow.leadEmails",
    volume: "mediaflow.volume"
  };

  function safeParse(value, fallback) {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch {
      return fallback;
    }
  }

  function canUseStorage() {
    try {
      const testKey = "mediaflow.storage.test";
      window.localStorage.setItem(testKey, "1");
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  function getStorage() {
    return canUseStorage() ? window.localStorage : null;
  }

  const demoPlaylist = [
    {
      id: "sample-bunny",
      title: "Big Buck Bunny",
      url: "demo/main-1.mp4",
      thumbnail: "",
      type: "video",
      marketing: {
        ads: {
          midRoll: {
            skippableAfter: 4,
            triggerTime: 25,
            url: "demo/preroll.mp4"
          },
          preRoll: {
            skippableAfter: 3,
            url: "demo/preroll.mp4"
          }
        },
        cta: {
          endTime: 4,
          startTime: 1,
          text: "Get This System Now",
          url: "https://codecanyon.net/"
        },
        leadCapture: {
          enabled: true,
          required: false,
          triggerTime: 3
        }
      }
    },
    {
      id: "sample-elephants",
      title: "Elephant Dream",
      url: "demo/main-2.mp4",
      thumbnail: "",
      type: "video",
      marketing: {
        ads: {
          midRoll: {
            skippableAfter: 5,
            triggerTime: 6,
            url: "demo/preroll.mp4"
          },
          preRoll: {
            skippableAfter: 3,
            url: ""
          }
        },
        cta: {
          endTime: 8,
          startTime: 2,
          text: "Get This System Now",
          url: "https://elements.envato.com/"
        },
        leadCapture: {
          enabled: true,
          required: false,
          triggerTime: 5
        }
      }
    }
  ];

  function toBoolean(value) {
    return value === true || value === "true";
  }

  function toNumber(value, fallback) {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) && numericValue >= 0 ? numericValue : fallback;
  }

  function normalizeMarketing(marketing) {
    const source = marketing && typeof marketing === "object" ? marketing : {};
    const ctaSource = source.cta && typeof source.cta === "object" ? source.cta : {};
    const leadSource = source.leadCapture && typeof source.leadCapture === "object" ? source.leadCapture : {};
    const adsSource = source.ads && typeof source.ads === "object" ? source.ads : {};
    const preRollSource = adsSource.preRoll && typeof adsSource.preRoll === "object" ? adsSource.preRoll : {};
    const midRollSource = adsSource.midRoll && typeof adsSource.midRoll === "object" ? adsSource.midRoll : {};

    return {
      ads: {
        midRoll: {
          skippableAfter: toNumber(midRollSource.skippableAfter, 5),
          triggerTime: toNumber(midRollSource.triggerTime, 20),
          url: typeof midRollSource.url === "string" ? midRollSource.url.trim() : ""
        },
        preRoll: {
          skippableAfter: toNumber(preRollSource.skippableAfter, 5),
          url: typeof preRollSource.url === "string" ? preRollSource.url.trim() : ""
        }
      },
      cta: {
        endTime: toNumber(ctaSource.endTime, 15),
        startTime: toNumber(ctaSource.startTime, 5),
        text: typeof ctaSource.text === "string" ? ctaSource.text.trim() : "",
        url: typeof ctaSource.url === "string" ? ctaSource.url.trim() : ""
      },
      leadCapture: {
        enabled: toBoolean(leadSource.enabled),
        required: toBoolean(leadSource.required),
        triggerTime: toNumber(leadSource.triggerTime, 10)
      }
    };
  }

  function normalizeItem(item, index) {
    if (!item || typeof item !== "object") {
      return null;
    }

    const title = typeof item.title === "string" ? item.title.trim() : "";
    const url = typeof item.url === "string" ? item.url.trim() : "";
    const thumbnail = typeof item.thumbnail === "string" ? item.thumbnail.trim() : "";
    const type = item.type === "audio" ? "audio" : "video";

    if (!title || !url) {
      return null;
    }

    const normalizedItem = {
      id: typeof item.id === "string" && item.id ? item.id : `media-${index}`,
      marketing: normalizeMarketing(item.marketing),
      title,
      url,
      thumbnail,
      type
    };

    const bundledMatch = demoPlaylist.find(function (demoItem) {
      return demoItem.id === normalizedItem.id;
    });

    if (bundledMatch) {
      normalizedItem.url = bundledMatch.url;
      normalizedItem.thumbnail = bundledMatch.thumbnail;
      normalizedItem.marketing = normalizeMarketing(bundledMatch.marketing);
    }

    return normalizedItem;
  }

  function validatePlaylist(playlist) {
    if (!Array.isArray(playlist) || playlist.length === 0) {
      return null;
    }

    const normalized = playlist
      .map(normalizeItem)
      .filter(Boolean);

    return normalized.length > 0 ? normalized : null;
  }

  function loadPlaylist() {
    const storage = getStorage();
    if (!storage) {
      return demoPlaylist.slice();
    }

    const stored = safeParse(storage.getItem(STORAGE_KEYS.playlist), null);
    const validPlaylist = validatePlaylist(stored);
    return validPlaylist || demoPlaylist.slice();
  }

  function hasSavedPlaylist() {
    const storage = getStorage();
    if (!storage) {
      return false;
    }

    const stored = safeParse(storage.getItem(STORAGE_KEYS.playlist), null);
    return Boolean(validatePlaylist(stored));
  }

  function savePlaylist(playlist) {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    const validPlaylist = validatePlaylist(playlist) || demoPlaylist.slice();
    storage.setItem(STORAGE_KEYS.playlist, JSON.stringify(validPlaylist));
  }

  function loadCurrentIndex() {
    const storage = getStorage();
    if (!storage) {
      return 0;
    }

    const value = Number(storage.getItem(STORAGE_KEYS.currentIndex));
    return Number.isInteger(value) && value >= 0 ? value : 0;
  }

  function saveCurrentIndex(index) {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEYS.currentIndex, String(index));
  }

  function loadCurrentTime() {
    const storage = getStorage();
    if (!storage) {
      return 0;
    }

    const value = Number(storage.getItem(STORAGE_KEYS.currentTime));
    return Number.isFinite(value) && value >= 0 ? value : 0;
  }

  function saveCurrentTime(seconds) {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEYS.currentTime, String(seconds));
  }

  function loadVolume() {
    const storage = getStorage();
    if (!storage) {
      return 0.85;
    }

    const value = Number(storage.getItem(STORAGE_KEYS.volume));
    return Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0.85;
  }

  function saveVolume(volume) {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEYS.volume, String(volume));
  }

  function resetToDemoData() {
    const storage = getStorage();
    savePlaylist(demoPlaylist.slice());
    saveCurrentIndex(0);
    saveCurrentTime(0);
    saveAnalytics(createDefaultAnalytics());
    if (storage) {
      storage.setItem(STORAGE_KEYS.leadEmails, JSON.stringify([]));
    }
  }

  function createDefaultAnalytics() {
    return {
      ctaClicks: 0,
      media: {},
      totalPlays: 0,
      totalWatchDuration: 0
    };
  }

  function loadAnalytics() {
    const storage = getStorage();
    if (!storage) {
      return createDefaultAnalytics();
    }

    const stored = safeParse(storage.getItem(STORAGE_KEYS.analytics), null);
    if (!stored || typeof stored !== "object") {
      return createDefaultAnalytics();
    }

    return {
      ctaClicks: toNumber(stored.ctaClicks, 0),
      media: stored.media && typeof stored.media === "object" ? stored.media : {},
      totalPlays: toNumber(stored.totalPlays, 0),
      totalWatchDuration: toNumber(stored.totalWatchDuration, 0)
    };
  }

  function saveAnalytics(analytics) {
    const storage = getStorage();
    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEYS.analytics, JSON.stringify(analytics));
  }

  function updateAnalytics(updater) {
    const current = loadAnalytics();
    const updated = updater(current) || current;
    saveAnalytics(updated);
    return updated;
  }

  function trackPlay(mediaId) {
    return updateAnalytics(function (analytics) {
      analytics.totalPlays += 1;
      if (!analytics.media[mediaId]) {
        analytics.media[mediaId] = {
          ctaClicks: 0,
          plays: 0,
          watchDuration: 0
        };
      }

      analytics.media[mediaId].plays += 1;
      return analytics;
    });
  }

  function trackWatchDuration(mediaId, deltaSeconds) {
    if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) {
      return loadAnalytics();
    }

    return updateAnalytics(function (analytics) {
      analytics.totalWatchDuration += deltaSeconds;
      if (!analytics.media[mediaId]) {
        analytics.media[mediaId] = {
          ctaClicks: 0,
          plays: 0,
          watchDuration: 0
        };
      }

      analytics.media[mediaId].watchDuration += deltaSeconds;
      return analytics;
    });
  }

  function trackCtaClick(mediaId) {
    return updateAnalytics(function (analytics) {
      analytics.ctaClicks += 1;
      if (!analytics.media[mediaId]) {
        analytics.media[mediaId] = {
          ctaClicks: 0,
          plays: 0,
          watchDuration: 0
        };
      }

      analytics.media[mediaId].ctaClicks += 1;
      return analytics;
    });
  }

  function loadLeadEmails() {
    const storage = getStorage();
    if (!storage) {
      return [];
    }

    const stored = safeParse(storage.getItem(STORAGE_KEYS.leadEmails), []);
    return Array.isArray(stored) ? stored : [];
  }

  function saveLeadEmail(entry) {
    const storage = getStorage();
    if (!storage) {
      return [];
    }

    const current = loadLeadEmails();
    const next = current.concat(entry);
    storage.setItem(STORAGE_KEYS.leadEmails, JSON.stringify(next));
    return next;
  }

  window.MediaFlowStorage = {
    demoPlaylist,
    hasSavedPlaylist,
    loadAnalytics,
    loadCurrentIndex,
    loadCurrentTime,
    loadLeadEmails,
    loadPlaylist,
    loadVolume,
    normalizeMarketing,
    resetToDemoData,
    saveAnalytics,
    saveCurrentIndex,
    saveCurrentTime,
    saveLeadEmail,
    savePlaylist,
    saveVolume,
    trackCtaClick,
    trackPlay,
    trackWatchDuration,
    validatePlaylist
  };
})();
