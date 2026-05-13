(() => {
  const DEFAULT_TOPIC = "Product Launch";
  // Layout anchors are percentage-based so the same structure stays consistent
  // inside the fixed 1080 x 1080 canvas and exported previews.
  const HEADLINE_TOP_PERCENT = 25;
  const SUBHEADLINE_TOP_PERCENT = 42;
  const CTA_TOP_PERCENT = 65;
  const CENTER_X_PERCENT = 50;
  const LEFT_COLUMN_X_PERCENT = 15;
  const RIGHT_COLUMN_X_PERCENT = 85;

  // These thresholds reduce heading size before overflow becomes obvious.
  const LONG_HEADLINE_THRESHOLD = 58;
  const MEDIUM_HEADLINE_THRESHOLD = 42;
  const SHORT_HEADLINE_THRESHOLD = 28;

  // Font sizes stay in rem so the builder and exported output scale together.
  const HEADLINE_SIZE_LARGE = 3.9;
  const HEADLINE_SIZE_MEDIUM = 3.35;
  const HEADLINE_SIZE_COMPACT = 2.95;
  const HEADLINE_SIZE_TIGHT = 2.5;
  const HEADLINE_LINE_HEIGHT_LARGE = 1.07;
  const HEADLINE_LINE_HEIGHT_MEDIUM = 1.1;
  const HEADLINE_LINE_HEIGHT_COMPACT = 1.13;
  const HEADLINE_LINE_HEIGHT_TIGHT = 1.16;
  const HEADLINE_WIDTH_WIDE = 68;
  const HEADLINE_WIDTH_MEDIUM = 66;
  const HEADLINE_WIDTH_STANDARD = 64;
  const HEADLINE_WIDTH_TIGHT = 60;

  // Subheadline thresholds keep longer supporting copy readable without
  // forcing the CTA too far down the canvas.
  const LONG_SUBHEADLINE_THRESHOLD = 118;
  const MEDIUM_SUBHEADLINE_THRESHOLD = 84;
  const SUBHEADLINE_SIZE_TIGHT = 1.02;
  const SUBHEADLINE_SIZE_COMPACT = 1.12;
  const SUBHEADLINE_SIZE_STANDARD = 1.24;
  const SUBHEADLINE_LINE_HEIGHT_TIGHT = 1.68;
  const SUBHEADLINE_LINE_HEIGHT_COMPACT = 1.62;
  const SUBHEADLINE_LINE_HEIGHT_STANDARD = 1.55;
  const SUBHEADLINE_WIDTH_WIDE = 64;
  const SUBHEADLINE_WIDTH_MEDIUM = 62;
  const SUBHEADLINE_WIDTH_STANDARD = 60;

  // CTA sizing stays conservative so longer labels still fit inside smaller
  // comparison and export canvases.
  const LONG_CTA_THRESHOLD = 42;
  const MEDIUM_CTA_THRESHOLD = 24;
  const CTA_FONT_SIZE_TIGHT = 0.82;
  const CTA_FONT_SIZE_COMPACT = 0.9;
  const CTA_FONT_SIZE_STANDARD = 1;
  const CTA_WIDTH_EXPANDED = 48;
  const CTA_WIDTH_STANDARD = 42;
  const CTA_WIDTH_DEFAULT = 34;

  // These character estimates are used only as a safe heuristic for vertical
  // spacing before the browser performs real DOM measurement.
  const HEADLINE_CHARS_PER_LINE_NARROW = 16;
  const HEADLINE_CHARS_PER_LINE_MEDIUM = 18;
  const HEADLINE_CHARS_PER_LINE_WIDE = 21;
  const SUBHEADLINE_CHARS_PER_LINE_NARROW = 34;
  const SUBHEADLINE_CHARS_PER_LINE_WIDE = 38;
  const MAX_ESTIMATED_TEXT_LINES = 4;

  // Height multipliers translate typographic line-height values into percent-
  // based canvas offsets so stacked elements do not overlap.
  const HEADLINE_HEIGHT_MULTIPLIER = 5.6;
  const SUBHEADLINE_HEIGHT_MULTIPLIER = 2.4;
  const HEADLINE_TO_SUBHEADLINE_GAP = 10;
  const SUBHEADLINE_TO_CTA_GAP = 12;

  // Clamp bounds keep all content inside the visible canvas region.
  const MIN_HEADLINE_TOP = 18;
  const MAX_HEADLINE_TOP = 28;
  const MIN_SUBHEADLINE_TOP = 38;
  const MAX_SUBHEADLINE_TOP = 70;
  const MIN_CTA_TOP = 58;
  const MAX_CTA_TOP = 82;

  const LAYOUTS = {
    hero_center: {
      headline: { top: HEADLINE_TOP_PERCENT, left: CENTER_X_PERCENT, align: "center" },
      subheadline: { top: SUBHEADLINE_TOP_PERCENT, left: CENTER_X_PERCENT, align: "center" },
      cta: { top: CTA_TOP_PERCENT, left: CENTER_X_PERCENT, align: "center" }
    },
    hero_left: {
      headline: { top: HEADLINE_TOP_PERCENT, left: LEFT_COLUMN_X_PERCENT, align: "left" },
      subheadline: { top: SUBHEADLINE_TOP_PERCENT, left: LEFT_COLUMN_X_PERCENT, align: "left" },
      cta: { top: CTA_TOP_PERCENT, left: LEFT_COLUMN_X_PERCENT, align: "left" }
    }
  };

  const FIELD_ORDER = ["headline", "subheadline", "cta"];
  const FIELD_TAGS = {
    headline: "h3",
    subheadline: "p",
    cta: "button"
  };
  const DEFAULT_MAX_WIDTHS = {
    // Widths are percentages of the square canvas, tuned to keep exported
    // content readable without collapsing into narrow vertical text columns.
    headline: HEADLINE_WIDTH_WIDE,
    subheadline: SUBHEADLINE_WIDTH_WIDE,
    cta: CTA_WIDTH_DEFAULT
  };
  const ALIGNMENTS = {
    left: { left: LEFT_COLUMN_X_PERCENT, textAlign: "left" },
    center: { left: CENTER_X_PERCENT, textAlign: "center" },
    right: { left: RIGHT_COLUMN_X_PERCENT, textAlign: "right" }
  };

  const normalizeText = (value, fallback = "") => {
    if (typeof value === "string") {
      return value.trim();
    }

    return fallback;
  };

  const normalizeId = (value) => {
    const normalized = normalizeText(value);
    return normalized || `slide_${Date.now()}`;
  };

  const sentenceCase = (value) => {
    if (!value) {
      return DEFAULT_TOPIC;
    }

    return value
      .replace(/\s+/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const createElementForField = (field, text) => {
    const tagName = FIELD_TAGS[field] || "div";
    const element = document.createElement(tagName);

    element.className = `slide-text slide-${field}`;
    element.textContent = text;

    if (field === "cta") {
      element.type = "button";
      element.setAttribute("aria-label", text || "Call to action");
      element.tabIndex = -1;
    }

    return element;
  };

  const applyPosition = (element, config) => {
    element.style.top = `${config.top}%`;
    element.style.left = `${config.left}%`;
    element.style.textAlign = config.align;

    if (config.align === "left") {
      element.classList.add("align-left");
    }

    if (config.align === "right") {
      element.classList.add("align-right");
    }
  };

  const ensureLayout = (layout) => LAYOUTS[layout] || LAYOUTS.hero_left;
  const ensureAlignment = (alignment, layout) => {
    if (alignment && Object.prototype.hasOwnProperty.call(ALIGNMENTS, alignment)) {
      return alignment;
    }

    return layout === "hero_center" ? "center" : "left";
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  const getNormalizedHeadlineSize = (headline) => {
    const length = normalizeText(headline).length;

    if (length > LONG_HEADLINE_THRESHOLD) {
      return { size: HEADLINE_SIZE_TIGHT, lineHeight: HEADLINE_LINE_HEIGHT_TIGHT, maxWidth: HEADLINE_WIDTH_WIDE };
    }

    if (length > MEDIUM_HEADLINE_THRESHOLD) {
      return { size: HEADLINE_SIZE_COMPACT, lineHeight: HEADLINE_LINE_HEIGHT_COMPACT, maxWidth: HEADLINE_WIDTH_MEDIUM };
    }

    if (length > SHORT_HEADLINE_THRESHOLD) {
      return { size: HEADLINE_SIZE_MEDIUM, lineHeight: HEADLINE_LINE_HEIGHT_MEDIUM, maxWidth: HEADLINE_WIDTH_STANDARD };
    }

    return { size: HEADLINE_SIZE_LARGE, lineHeight: HEADLINE_LINE_HEIGHT_LARGE, maxWidth: HEADLINE_WIDTH_TIGHT };
  };

  const getNormalizedSubheadlineSize = (subheadline) => {
    const length = normalizeText(subheadline).length;

    if (length > LONG_SUBHEADLINE_THRESHOLD) {
      return { size: SUBHEADLINE_SIZE_TIGHT, lineHeight: SUBHEADLINE_LINE_HEIGHT_TIGHT, maxWidth: SUBHEADLINE_WIDTH_WIDE };
    }

    if (length > MEDIUM_SUBHEADLINE_THRESHOLD) {
      return { size: SUBHEADLINE_SIZE_COMPACT, lineHeight: SUBHEADLINE_LINE_HEIGHT_COMPACT, maxWidth: SUBHEADLINE_WIDTH_MEDIUM };
    }

    return { size: SUBHEADLINE_SIZE_STANDARD, lineHeight: SUBHEADLINE_LINE_HEIGHT_STANDARD, maxWidth: SUBHEADLINE_WIDTH_STANDARD };
  };

  const getNormalizedCtaMetrics = (cta) => {
    const length = normalizeText(cta).length;

    if (length > LONG_CTA_THRESHOLD) {
      return { fontSize: CTA_FONT_SIZE_TIGHT, maxWidth: CTA_WIDTH_EXPANDED };
    }

    if (length > MEDIUM_CTA_THRESHOLD) {
      return { fontSize: CTA_FONT_SIZE_COMPACT, maxWidth: CTA_WIDTH_STANDARD };
    }

    return { fontSize: CTA_FONT_SIZE_STANDARD, maxWidth: DEFAULT_MAX_WIDTHS.cta };
  };

  const estimateHeadlineLines = (headline, maxWidth) => {
    const length = normalizeText(headline).length || 1;
    const charsPerLine = maxWidth <= HEADLINE_WIDTH_TIGHT
      ? HEADLINE_CHARS_PER_LINE_NARROW
      : maxWidth <= HEADLINE_WIDTH_STANDARD
        ? HEADLINE_CHARS_PER_LINE_MEDIUM
        : HEADLINE_CHARS_PER_LINE_WIDE;
    return clamp(Math.ceil(length / charsPerLine), 1, MAX_ESTIMATED_TEXT_LINES);
  };

  const estimateSubheadlineLines = (subheadline, maxWidth) => {
    const length = normalizeText(subheadline).length || 1;
    const charsPerLine = maxWidth <= SUBHEADLINE_WIDTH_STANDARD ? SUBHEADLINE_CHARS_PER_LINE_NARROW : SUBHEADLINE_CHARS_PER_LINE_WIDE;
    return clamp(Math.ceil(length / charsPerLine), 1, MAX_ESTIMATED_TEXT_LINES);
  };

  function normalizeSlideLayout(slide) {
    const baseLayout = ensureLayout(slide && slide.layout);
    const safeSlide = {
      id: normalizeId(slide && slide.id),
      headline: normalizeText(slide && slide.headline),
      subheadline: normalizeText(slide && slide.subheadline),
      cta: normalizeText(slide && slide.cta),
      layout: Object.keys(LAYOUTS).includes(slide && slide.layout) ? slide.layout : "hero_left"
    };
    safeSlide.alignment = ensureAlignment(slide && slide.alignment, safeSlide.layout);
    const alignmentMeta = ALIGNMENTS[safeSlide.alignment];

    // Step 1: derive typography for each field from its text length.
    // These helpers intentionally shrink font size before reducing width,
    // because narrower columns are what usually create vertical word-by-word
    // stacking in square canvases. In other words, text fitting prefers
    // scaling down type first and only uses the predefined max-width tiers
    // that are already known to remain readable on the 1080 x 1080 canvas.
    const headlineMetrics = getNormalizedHeadlineSize(safeSlide.headline);
    const subheadlineMetrics = getNormalizedSubheadlineSize(safeSlide.subheadline);
    const ctaMetrics = getNormalizedCtaMetrics(safeSlide.cta);

    // Step 2: estimate how many rendered lines each text block is likely to
    // occupy. This is a lightweight pre-DOM heuristic based on character count
    // and allowed width, giving the engine enough information to reserve safe
    // vertical space before the browser does real measurement later. The line
    // estimate is clamped to a small range so unusual copy cannot explode the
    // layout math and push the following elements far outside their intended
    // reading zones.
    const headlineLines = estimateHeadlineLines(safeSlide.headline, headlineMetrics.maxWidth);
    const subheadlineLines = estimateSubheadlineLines(safeSlide.subheadline, subheadlineMetrics.maxWidth);

    // Step 3: translate typographic settings into approximate vertical height.
    // The multipliers convert rem-based line-height into percentage-based
    // canvas offsets, so stacked elements can be spaced using the same
    // coordinate system as the layout anchors. This height estimation is what
    // lets the engine reserve enough room for longer copy before placing the
    // subheadline and CTA underneath it.
    const headlineHeight = headlineLines * (headlineMetrics.lineHeight * HEADLINE_HEIGHT_MULTIPLIER);
    const subheadlineHeight = subheadlineLines * (subheadlineMetrics.lineHeight * SUBHEADLINE_HEIGHT_MULTIPLIER);

    // Keep the headline inside a proven safe band near the top of the canvas.
    // The clamp prevents aggressive layouts from drifting too high or too low,
    // which would either clip the text or leave too little room below. These
    // clamp values are guardrails for overflow prevention, not visual styling.
    const safeHeadlineTop = clamp(baseLayout.headline.top, MIN_HEADLINE_TOP, MAX_HEADLINE_TOP);

    // The subheadline is anchored below the headline using whichever is larger:
    // the layout's preferred position or the minimum safe position derived from
    // estimated headline height plus a fixed readability gap. That gap acts as
    // a spacing ratio in canvas-percent units, preserving readable hierarchy
    // between blocks instead of letting text visually merge together.
    const safeSubTop = Math.max(baseLayout.subheadline.top, safeHeadlineTop + headlineHeight + HEADLINE_TO_SUBHEADLINE_GAP);

    // The CTA follows the same pattern. It may move downward if the supporting
    // copy grows, but it never moves upward into the subheadline's space.
    // This guarantees a visible action area even when text length varies.
    const safeCtaTop = Math.max(baseLayout.cta.top, safeSubTop + subheadlineHeight + SUBHEADLINE_TO_CTA_GAP);

    return {
      ...safeSlide,
      positions: {
        headline: { ...baseLayout.headline, top: safeHeadlineTop, left: alignmentMeta.left, align: alignmentMeta.textAlign },
        // Final clamps are the overflow-prevention guardrails. Even after
        // spacing adjustments, these bounds keep the subheadline and CTA
        // inside the visible canvas region instead of letting long content
        // push them beyond the safe reading area. The browser can still do a
        // more exact fit pass later, but normalizeSlideLayout ensures the base
        // render always starts from a safe, readable configuration.
        subheadline: { ...baseLayout.subheadline, top: clamp(safeSubTop, MIN_SUBHEADLINE_TOP, MAX_SUBHEADLINE_TOP), left: alignmentMeta.left, align: alignmentMeta.textAlign },
        cta: { ...baseLayout.cta, top: clamp(safeCtaTop, MIN_CTA_TOP, MAX_CTA_TOP), left: alignmentMeta.left, align: alignmentMeta.textAlign }
      },
      layoutMeta: {
        headline: {
          fontSize: headlineMetrics.size,
          lineHeight: headlineMetrics.lineHeight,
          maxWidth: headlineMetrics.maxWidth
        },
        subheadline: {
          fontSize: subheadlineMetrics.size,
          lineHeight: subheadlineMetrics.lineHeight,
          maxWidth: subheadlineMetrics.maxWidth
        },
        cta: {
          fontSize: ctaMetrics.fontSize,
          maxWidth: ctaMetrics.maxWidth
        }
      }
    };
  }

  function generateSlide(topic) {
    const safeTopic = sentenceCase(topic || DEFAULT_TOPIC);

    return normalizeSlideLayout({
      id: `slide_${Date.now()}`,
      headline: `${safeTopic} that earns attention from the first second.`,
      subheadline: `Present ${safeTopic.toLowerCase()} with a sharper message, a cleaner value story, and a clear next step your audience can act on.`,
      cta: `Explore ${safeTopic}`,
      layout: "hero_left",
      alignment: "left"
    });
  }

  function normalizeSlide(slide) {
    return normalizeSlideLayout(slide);
  }

  function renderSlide(slide, target) {
    target.innerHTML = "";

    const safeSlide = normalizeSlideLayout(slide);
    const layer = document.createElement("div");
    layer.className = "slide-layer";
    layer.dataset.slideId = safeSlide.id;

    FIELD_ORDER.forEach((field) => {
      const element = createElementForField(field, safeSlide[field]);
      applyPosition(element, safeSlide.positions[field]);
      layer.appendChild(element);
    });

    target.appendChild(layer);
    return safeSlide;
  }

  window.SlideEngine = {
    DEFAULT_TOPIC,
    LAYOUTS,
    generateSlide,
    renderSlide,
    normalizeSlide,
    normalizeSlideLayout
  };
})();
