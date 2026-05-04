(function () {
  const { buildEmbedOutputs, copyText, renderPreview } = window.MediaFlowUI;

  function createId() {
    return `media-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function isValidUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function isValidMediaSource(value) {
    const trimmed = String(value || "").trim();
    if (!trimmed) {
      return false;
    }

    if (
      trimmed.startsWith("./") ||
      trimmed.startsWith("../") ||
      trimmed.startsWith("demo/") ||
      trimmed.startsWith("assets/") ||
      trimmed.startsWith("PreviewAssets/")
    ) {
      return true;
    }

    return isValidUrl(trimmed);
  }

  function createBuilder(config) {
    const {
      form,
      previewElement,
      messageElement,
      generateButton,
      htmlOutput,
      jsonOutput,
      copyHtmlButton,
      copyJsonButton,
      getAppState,
      onAddMedia
    } = config;

    function getNumberField(formData, name, fallback) {
      const rawValue = String(formData.get(name) || "").trim();
      if (!rawValue) {
        return fallback;
      }

      const value = Number(rawValue);
      return Number.isFinite(value) && value >= 0 ? value : fallback;
    }

    function getDraft() {
      const formData = new FormData(form);
      return {
        id: createId(),
        marketing: {
          ads: {
            midRoll: {
              skippableAfter: getNumberField(formData, "midRollSkipAfter", 5),
              triggerTime: getNumberField(formData, "midRollTime", 20),
              url: String(formData.get("midRollUrl") || "").trim()
            },
            preRoll: {
              skippableAfter: getNumberField(formData, "preRollSkipAfter", 5),
              url: String(formData.get("preRollUrl") || "").trim()
            }
          },
          cta: {
            endTime: getNumberField(formData, "ctaEnd", 15),
            startTime: getNumberField(formData, "ctaStart", 5),
            text: String(formData.get("ctaText") || "").trim(),
            url: String(formData.get("ctaLink") || "").trim()
          },
          leadCapture: {
            enabled: String(formData.get("leadEnabled") || "false") === "true",
            required: String(formData.get("leadRequired") || "false") === "true",
            triggerTime: getNumberField(formData, "leadTrigger", 10)
          }
        },
        title: String(formData.get("title") || "").trim(),
        url: String(formData.get("url") || "").trim(),
        thumbnail: String(formData.get("thumbnail") || "").trim(),
        type: String(formData.get("type") || "video")
      };
    }

    function setMessage(message, isError) {
      messageElement.textContent = message;
      messageElement.style.color = isError ? "#b42318" : "";
    }

    function flashButtonLabel(button, label) {
      const originalLabel = button.textContent;
      button.textContent = label;
      button.disabled = true;
      window.setTimeout(function () {
        button.textContent = originalLabel;
        button.disabled = false;
      }, 1200);
    }

    function updatePreview() {
      const draft = getDraft();
      previewElement.innerHTML = renderPreview(draft);

      if (draft.url && !isValidMediaSource(draft.url)) {
        setMessage("Enter a valid media URL or relative media path.", true);
        return;
      }

      if (draft.thumbnail && !isValidUrl(draft.thumbnail)) {
        setMessage("Thumbnail URL must be a valid http or https address.", true);
        return;
      }

      if (draft.marketing.cta.url && !isValidUrl(draft.marketing.cta.url)) {
        setMessage("CTA link must be a valid http or https address.", true);
        return;
      }

      if (draft.marketing.cta.text && !draft.marketing.cta.url) {
        setMessage("CTA link is required when CTA text is provided.", true);
        return;
      }

      if (draft.marketing.cta.endTime < draft.marketing.cta.startTime) {
        setMessage("CTA end time must be greater than or equal to start time.", true);
        return;
      }

      if (draft.marketing.ads.preRoll.url && !isValidMediaSource(draft.marketing.ads.preRoll.url)) {
        setMessage("Pre-roll ad URL must be a valid media URL or relative path.", true);
        return;
      }

      if (draft.marketing.ads.midRoll.url && !isValidMediaSource(draft.marketing.ads.midRoll.url)) {
        setMessage("Mid-roll ad URL must be a valid media URL or relative path.", true);
        return;
      }

      if (messageElement.textContent && messageElement.style.color) {
        setMessage("", false);
      }
    }

    form.addEventListener("input", updatePreview);
    form.addEventListener("change", updatePreview);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const draft = getDraft();

      if (!draft.title || !draft.url) {
        setMessage("Title and media URL are required.", true);
        return;
      }

      if (!isValidMediaSource(draft.url)) {
        setMessage("Enter a valid media URL or relative media path.", true);
        return;
      }

      if (draft.thumbnail && !isValidUrl(draft.thumbnail)) {
        setMessage("Thumbnail URL must be a valid http or https address.", true);
        return;
      }

      if (draft.marketing.cta.url && !isValidUrl(draft.marketing.cta.url)) {
        setMessage("CTA link must be a valid http or https address.", true);
        return;
      }

      if (draft.marketing.cta.text && !draft.marketing.cta.url) {
        setMessage("CTA link is required when CTA text is provided.", true);
        return;
      }

      if (draft.marketing.cta.endTime < draft.marketing.cta.startTime) {
        setMessage("CTA end time must be greater than or equal to start time.", true);
        return;
      }

      if (draft.marketing.ads.preRoll.url && !isValidMediaSource(draft.marketing.ads.preRoll.url)) {
        setMessage("Pre-roll ad URL must be a valid media URL or relative path.", true);
        return;
      }

      if (draft.marketing.ads.midRoll.url && !isValidMediaSource(draft.marketing.ads.midRoll.url)) {
        setMessage("Mid-roll ad URL must be a valid media URL or relative path.", true);
        return;
      }

      onAddMedia(draft);
      form.reset();

      const typeField = form.elements.namedItem("type");
      if (typeField instanceof HTMLSelectElement) {
        typeField.value = "video";
      }

      const leadEnabledField = form.elements.namedItem("leadEnabled");
      if (leadEnabledField instanceof HTMLSelectElement) {
        leadEnabledField.value = "false";
      }

      const leadRequiredField = form.elements.namedItem("leadRequired");
      if (leadRequiredField instanceof HTMLSelectElement) {
        leadRequiredField.value = "false";
      }

      const resetDefaults = {
        ctaEnd: "15",
        ctaStart: "5",
        leadTrigger: "10",
        midRollSkipAfter: "5",
        midRollTime: "20",
        preRollSkipAfter: "5"
      };

      Object.keys(resetDefaults).forEach(function (fieldName) {
        const field = form.elements.namedItem(fieldName);
        if (field instanceof HTMLInputElement) {
          field.value = resetDefaults[fieldName];
        }
      });

      updatePreview();
      setMessage("Media item added to playlist.", false);
    });

    generateButton.addEventListener("click", function () {
      const state = getAppState();
      if (!state.currentItem) {
        setMessage("Select or add a media item before generating embed code.", true);
        return;
      }

      const outputs = buildEmbedOutputs(state.currentItem, state.playlist, state.currentIndex);
      htmlOutput.value = outputs.html;
      jsonOutput.value = outputs.json;
      setMessage("Embed output generated.", false);
      flashButtonLabel(generateButton, "Generated");
    });

    copyHtmlButton.addEventListener("click", async function () {
      if (!htmlOutput.value) {
        setMessage("Generate embed code before copying.", true);
        return;
      }

      try {
        await copyText(htmlOutput.value);
        setMessage("HTML snippet copied.", false);
        flashButtonLabel(copyHtmlButton, "Copied");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to copy HTML.", true);
      }
    });

    copyJsonButton.addEventListener("click", async function () {
      if (!jsonOutput.value) {
        setMessage("Generate embed code before copying.", true);
        return;
      }

      try {
        await copyText(jsonOutput.value);
        setMessage("JSON config copied.", false);
        flashButtonLabel(copyJsonButton, "Copied");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to copy JSON.", true);
      }
    });

    updatePreview();

    return {
      setMessage
    };
  }

  window.MediaFlowBuilder = {
    createBuilder
  };
})();
