(function () {
  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatTime(seconds) {
    const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
    const mins = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  function getFallbackThumbnail(title, type) {
    const safeTitle = (title || (type === "audio" ? "Audio" : "Video")).slice(0, 24);
    const tint = type === "audio" ? "#dceff2" : "#d9efe8";
    const badge = type === "audio" ? "Audio" : "Video";
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
        <rect width="640" height="360" fill="${tint}"/>
        <rect x="28" y="28" width="112" height="36" rx="18" fill="#0f766e" opacity="0.18"/>
        <text x="48" y="52" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#115e59">${badge}</text>
        <text x="48" y="202" font-family="Segoe UI, Arial, sans-serif" font-size="36" fill="#1f2933">${safeTitle}</text>
      </svg>
    `.trim();
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function renderPlaylistItem(item, index, activeIndex) {
    const typeLabel = item.type === "audio" ? "Audio" : "Video";
    const isActive = index === activeIndex;
    const thumb = escapeHtml(item.thumbnail || getFallbackThumbnail(item.title, item.type));

    return `
      <li class="playlist-item${isActive ? " active" : ""}" data-index="${index}">
        <img class="playlist-thumb" src="${thumb}" alt="${escapeHtml(item.title)} thumbnail">
        <div class="playlist-meta">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${typeLabel}</p>
          <p>${escapeHtml(item.url)}</p>
        </div>
        <div class="playlist-actions">
          <button type="button" data-action="play" data-index="${index}">Play</button>
          <button type="button" class="danger" data-action="remove" data-index="${index}">Remove</button>
        </div>
      </li>
    `;
  }

  function renderPreview(item) {
    const typeLabel = item.type === "audio" ? "Audio source" : "Video source";
    const thumbnail = item.thumbnail || getFallbackThumbnail(item.title, item.type);
    const hasUrl = Boolean(item.url);
    const marketing = item.marketing || {};
    const cta = marketing.cta || {};
    const leadCapture = marketing.leadCapture || {};
    const ads = marketing.ads || {};
    const preRoll = ads.preRoll || {};
    const midRoll = ads.midRoll || {};
    const mediaPreview = !hasUrl
      ? `<img src="${escapeHtml(thumbnail)}" alt="${escapeHtml(item.title || "Media preview")} thumbnail">`
      : item.type === "audio"
        ? `<img src="${escapeHtml(thumbnail)}" alt="${escapeHtml(item.title || "Audio preview")} thumbnail">`
        : `<video muted playsinline preload="metadata" controls src="${escapeHtml(item.url)}" poster="${escapeHtml(thumbnail)}"></video>`;

    return `
      ${mediaPreview}
      <div>
        <h4>${escapeHtml(item.title || "Untitled media")}</h4>
        <p>${escapeHtml(typeLabel)}</p>
        <p>${escapeHtml(item.url || "Add a media URL to preview the item here.")}</p>
        <p>${escapeHtml(cta.text ? `CTA: ${cta.text} (${cta.startTime || 0}s-${cta.endTime || 0}s)` : "CTA: disabled")}</p>
        <p>${escapeHtml(leadCapture.enabled ? `Lead capture at ${leadCapture.triggerTime || 0}s${leadCapture.required ? " (required)" : ""}` : "Lead capture: disabled")}</p>
        <p>${escapeHtml(preRoll.url ? `Pre-roll ad enabled${preRoll.skippableAfter >= 0 ? `, skip after ${preRoll.skippableAfter}s` : ""}` : "Pre-roll ad: disabled")}</p>
        <p>${escapeHtml(midRoll.url ? `Mid-roll ad at ${midRoll.triggerTime || 0}s` : "Mid-roll ad: disabled")}</p>
      </div>
    `;
  }

  function cleanMarketing(marketing) {
    const source = marketing && typeof marketing === "object" ? marketing : {};
    const cta = source.cta && typeof source.cta === "object" ? source.cta : {};
    const lead = source.leadCapture && typeof source.leadCapture === "object" ? source.leadCapture : {};
    const ads = source.ads && typeof source.ads === "object" ? source.ads : {};
    const preRoll = ads.preRoll && typeof ads.preRoll === "object" ? ads.preRoll : {};
    const midRoll = ads.midRoll && typeof ads.midRoll === "object" ? ads.midRoll : {};

    return {
      ads: {
        midRoll: {
          skippableAfter: Number.isFinite(Number(midRoll.skippableAfter)) ? Number(midRoll.skippableAfter) : 0,
          triggerTime: Number.isFinite(Number(midRoll.triggerTime)) ? Number(midRoll.triggerTime) : 0,
          url: typeof midRoll.url === "string" ? midRoll.url : ""
        },
        preRoll: {
          skippableAfter: Number.isFinite(Number(preRoll.skippableAfter)) ? Number(preRoll.skippableAfter) : 0,
          url: typeof preRoll.url === "string" ? preRoll.url : ""
        }
      },
      cta: {
        endTime: Number.isFinite(Number(cta.endTime)) ? Number(cta.endTime) : 0,
        startTime: Number.isFinite(Number(cta.startTime)) ? Number(cta.startTime) : 0,
        text: typeof cta.text === "string" ? cta.text : "",
        url: typeof cta.url === "string" ? cta.url : ""
      },
      leadCapture: {
        enabled: Boolean(lead.enabled),
        required: Boolean(lead.required),
        triggerTime: Number.isFinite(Number(lead.triggerTime)) ? Number(lead.triggerTime) : 0
      }
    };
  }

  function buildEmbedOutputs(currentItem, playlist) {
    const safeItem = {
      id: currentItem.id || "",
      marketing: cleanMarketing(currentItem.marketing),
      thumbnail: currentItem.thumbnail || "",
      title: currentItem.title || "",
      type: currentItem.type === "audio" ? "audio" : "video",
      url: currentItem.url || ""
    };
    const config = {
      activeItem: safeItem,
      ads: safeItem.marketing.ads,
      cta: safeItem.marketing.cta,
      leadCapture: safeItem.marketing.leadCapture,
      playlist: Array.isArray(playlist)
        ? playlist.map(function (item) {
          return {
            id: item.id || "",
            marketing: cleanMarketing(item.marketing),
            thumbnail: item.thumbnail || "",
            title: item.title || "",
            type: item.type === "audio" ? "audio" : "video",
            url: item.url || ""
          };
        })
        : []
    };
    const ctaComment = JSON.stringify(config.cta);
    const leadComment = JSON.stringify(config.leadCapture);
    const adsComment = JSON.stringify(config.ads);
    const html = [
      `<div class="mediaflow-embed" data-mediaflow-id="${escapeHtml(safeItem.id)}">`,
      `  <!-- CTA config: ${escapeHtml(ctaComment)} -->`,
      `  <!-- Lead config: ${escapeHtml(leadComment)} -->`,
      `  <!-- Ad config: ${escapeHtml(adsComment)} -->`,
      `  <video src="${escapeHtml(safeItem.url)}" controls preload="metadata"${safeItem.thumbnail ? ` poster="${escapeHtml(safeItem.thumbnail)}"` : ""}></video>`,
      `</div>`
    ].join("\n");
    const json = JSON.stringify(config, null, 2);
    return { html, json };
  }

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
        return;
      } catch {
        // Fall back for restricted file:// clipboard environments.
      }
    }

    const helper = document.createElement("textarea");
    helper.value = value;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.left = "-9999px";
    document.body.appendChild(helper);
    helper.select();
    helper.setSelectionRange(0, helper.value.length);
    const copied = document.execCommand("copy");
    document.body.removeChild(helper);

    if (!copied) {
      throw new Error("Copy command was not available.");
    }
  }

  window.MediaFlowUI = {
    buildEmbedOutputs,
    cleanMarketing,
    copyText,
    formatTime,
    getFallbackThumbnail,
    renderPlaylistItem,
    renderPreview
  };
})();
