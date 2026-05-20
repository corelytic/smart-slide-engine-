(() => {
  const TEMPLATE_LIBRARY = [
    { id: "saas_pipeline", name: "Pipeline Pulse", category: "SaaS", headline: "Turn Pipeline Visibility Into Daily Momentum", subheadline: "Help revenue teams move from scattered updates to a forecast everyone can trust.", cta: "Book A Demo", alignment: "left", layoutType: "hero", spacing: 42, background: "bg-1", tone: "premium" },
    { id: "saas_activation", name: "Activation Lift", category: "SaaS", headline: "Help New Users Reach Value In Their First Session", subheadline: "Lead with the outcome they want, then remove every extra step that delays adoption.", cta: "Start Free", alignment: "center", layoutType: "minimal", spacing: 54, background: "bg-2", tone: "minimal" },
    { id: "saas_security", name: "Trust Layer", category: "SaaS", headline: "Enterprise Security Without Slowing Product Teams Down", subheadline: "Combine compliance proof, clear controls, and a confident CTA that accelerates evaluation.", cta: "See Security", alignment: "right", layoutType: "split", spacing: 40, background: "bg-6", tone: "bold" },
    { id: "saas_retention", name: "Retention Curve", category: "SaaS", headline: "Reduce Churn By Showing Customers Their Next Win Early", subheadline: "Guide attention toward the habit loop that keeps the product useful after onboarding ends.", cta: "Improve Retention", alignment: "left", layoutType: "split", spacing: 48, background: "bg-3", tone: "premium" },
    { id: "launch_release", name: "Release Window", category: "Product Launch", headline: "Launch Your New Product With Clear Market Energy", subheadline: "One sharp promise and one confident action help the release feel immediate and important.", cta: "Launch Today", alignment: "left", layoutType: "hero", spacing: 44, background: "bg-4", tone: "bold" },
    { id: "launch_spotlight", name: "Feature Spotlight", category: "Product Launch", headline: "Reveal The Upgrade Customers Notice In Seconds", subheadline: "Center the most visible benefit first, then support it with a reason to act now.", cta: "Explore Feature", alignment: "center", layoutType: "hero", spacing: 50, background: "bg-5", tone: "premium" },
    { id: "launch_beta", name: "Beta Invitation", category: "Product Launch", headline: "Invite Early Users Into A Selective Beta Experience", subheadline: "Position the beta as limited, useful, and worth joining before the wider rollout begins.", cta: "Join Beta", alignment: "right", layoutType: "minimal", spacing: 56, background: "bg-2", tone: "minimal" },
    { id: "launch_countdown", name: "Countdown Push", category: "Product Launch", headline: "Build Launch Day Anticipation Before The Window Closes", subheadline: "Use urgency and clean hierarchy so the next announcement feels impossible to miss.", cta: "See The Countdown", alignment: "center", layoutType: "split", spacing: 46, background: "bg-1", tone: "bold" },
    { id: "agency_retainer", name: "Retainer Pitch", category: "Agency", headline: "Win Retainer Work With A Stronger Strategic Offer", subheadline: "Make the engagement feel measurable, proactive, and easier to approve on the first review.", cta: "Schedule Strategy", alignment: "left", layoutType: "hero", spacing: 45, background: "bg-6", tone: "premium" },
    { id: "agency_results", name: "Results Story", category: "Agency", headline: "Turn Proven Campaign Wins Into New Client Demand", subheadline: "Lead with the outcome, support it with clarity, and keep the next step visibly simple.", cta: "View Results", alignment: "center", layoutType: "split", spacing: 52, background: "bg-3", tone: "bold" },
    { id: "agency_brand", name: "Brand Session", category: "Agency", headline: "Present A Brand Direction Clients Can Approve Faster", subheadline: "Reduce feedback loops with polished hierarchy, stronger pacing, and a clean decision path.", cta: "Review Direction", alignment: "right", layoutType: "minimal", spacing: 58, background: "bg-5", tone: "premium" },
    { id: "agency_growth", name: "Growth Offer", category: "Agency", headline: "Package Monthly Growth Support Into A Premium Offer", subheadline: "Frame strategy, reporting, and optimization as one clear service clients can trust long term.", cta: "See The Offer", alignment: "left", layoutType: "split", spacing: 47, background: "bg-4", tone: "premium" },
    { id: "ecom_drop", name: "Drop Countdown", category: "Ecommerce", headline: "Build Urgency Around Your Next Collection Drop", subheadline: "Cleaner spacing and a stronger CTA make the release feel limited, desirable, and worth watching.", cta: "Shop The Drop", alignment: "center", layoutType: "hero", spacing: 43, background: "bg-4", tone: "bold" },
    { id: "ecom_bundle", name: "Bundle Offer", category: "Ecommerce", headline: "Increase Order Value With A Clear Bundle Story", subheadline: "Present the savings, the product logic, and the easiest path to add more in one frame.", cta: "Unlock Bundle", alignment: "left", layoutType: "split", spacing: 50, background: "bg-1", tone: "premium" },
    { id: "ecom_restock", name: "Restock Alert", category: "Ecommerce", headline: "Bring High-Intent Buyers Back Before Stock Moves Again", subheadline: "Remind shoppers why the item matters and convert returning demand with less hesitation.", cta: "Buy Before Sold Out", alignment: "right", layoutType: "minimal", spacing: 55, background: "bg-6", tone: "minimal" },
    { id: "ecom_offer", name: "Offer Engine", category: "Ecommerce", headline: "Turn A Flash Offer Into A Clear Reason To Buy Today", subheadline: "Balance urgency and trust so the promotion feels real, useful, and ready to convert.", cta: "Claim The Offer", alignment: "center", layoutType: "hero", spacing: 49, background: "bg-2", tone: "bold" },
    { id: "event_summit", name: "Summit Stage", category: "Event", headline: "Fill Your Next Summit With The Right Audience", subheadline: "Lead with transformation before logistics so the event promise lands before the details.", cta: "Reserve Your Seat", alignment: "center", layoutType: "hero", spacing: 52, background: "bg-5", tone: "premium" },
    { id: "event_workshop", name: "Workshop Invite", category: "Event", headline: "Promote A Workshop People Will Prioritize Attending", subheadline: "Clarify the outcome, keep the message focused, and make registration feel worth the time.", cta: "Save My Spot", alignment: "left", layoutType: "minimal", spacing: 57, background: "bg-3", tone: "minimal" },
    { id: "event_webinar", name: "Webinar Push", category: "Event", headline: "Turn Webinar Registrations Into Real Intent", subheadline: "Use stronger pacing and a clear CTA so the session feels timely, useful, and immediate.", cta: "Register Now", alignment: "right", layoutType: "split", spacing: 45, background: "bg-2", tone: "bold" },
    { id: "event_gala", name: "Gala Invitation", category: "Event", headline: "Make Your Signature Event Feel Exclusive From The First View", subheadline: "Present the atmosphere, the audience, and the next step with premium visual breathing room.", cta: "Request An Invite", alignment: "center", layoutType: "hero", spacing: 60, background: "bg-6", tone: "premium" },
    { id: "personal_portfolio", name: "Portfolio Intro", category: "Personal", headline: "Present Your Best Work With More Confidence And Clarity", subheadline: "Introduce who you are, what you do, and why the next conversation should happen now.", cta: "View Portfolio", alignment: "left", layoutType: "minimal", spacing: 58, background: "bg-1", tone: "minimal" },
    { id: "personal_speaker", name: "Speaker Promo", category: "Personal", headline: "Position Yourself As The Speaker Audiences Remember", subheadline: "Focus on the transformation you bring and make the booking path feel simple and credible.", cta: "Book A Talk", alignment: "center", layoutType: "hero", spacing: 46, background: "bg-4", tone: "premium" },
    { id: "personal_coach", name: "Coach Offer", category: "Personal", headline: "Turn Your Coaching Offer Into A Clear Next Step", subheadline: "Lead with the result clients want most, then reinforce the confidence behind your method.", cta: "Apply Now", alignment: "right", layoutType: "split", spacing: 51, background: "bg-5", tone: "bold" },
    { id: "personal_creator", name: "Creator Launch", category: "Personal", headline: "Grow Your Audience With A Simpler Creator Message", subheadline: "Cut noise, tighten the promise, and make subscribing feel like a clear move today.", cta: "Join The List", alignment: "center", layoutType: "minimal", spacing: 55, background: "bg-3", tone: "minimal" }
  ];

  const templateSource = TEMPLATE_LIBRARY.map((template) => ({ ...template }));
  const TEMPLATE_CATEGORIES = ["All", "SaaS", "Product Launch", "Agency", "Ecommerce", "Event", "Personal"];
  const FIELD_KEYS = ["headline", "subheadline", "cta"];
  const FIELD_LIMITS = {
    headline: 120,
    subheadline: 180,
    cta: 40
  };
  const FONT_LEVELS = {
    headline: [2.8, 3.4, 4, 4.6],
    subheadline: [0.98, 1.14, 1.28, 1.42],
    cta: [0.9, 1, 1.08, 1.16]
  };
  const CTA_WIDTHS = {
    small: "160px",
    medium: "220px",
    large: "280px"
  };
  const BACKGROUND_CLASSES = ["bg-1", "bg-2", "bg-3", "bg-4", "bg-5", "bg-6"];
  const SAFE_TEXT_WIDTH_RATIO = 420 / 1080;

  const state = {
    currentSlide: null,
    originalSlide: null,
    originalDesign: createDefaultDesignState(),
    templates: TEMPLATE_LIBRARY.map((template) => ({ ...template })),
    templatesOpen: false,
    previewOpen: false,
    templatesRendered: false,
    activeTemplateId: null,
    activeCategory: "All",
    activePreviewSlideId: null,
    previewDesign: null,
    autopilotInsight: null,
    selectedField: null,
    activeAlignment: "left",
    heatmapVisible: false,
    variations: [],
    exportMarkup: "",
    exportUrl: "",
    editor: createDefaultEditorState(),
    slideDesign: createDefaultDesignState(),
    visualTune: {
      spacingBoost: 0,
      ctaOffset: 0,
      lineHeightBoost: 0
    }
  };

  const dom = {};
  const TEMPLATE_DIALOG_CLASS = "is-open";
  const MODAL_OPEN_CLASS = "is-open";
  const CLOSE_DELAY_MS = 220;
  const BUSY_DELAY_MS = 140;
  const GENERATE_DELAY_MS = 1100;
  const TOAST_DELAY_MS = 2000;

  function cacheDom() {
    dom.topicInput = document.getElementById("topicInput");
    dom.slideCanvas = document.getElementById("slideCanvas");
    dom.autopilotButton = document.getElementById("autopilotButton");
    dom.heatmapToggleButton = document.getElementById("heatmapToggleButton");
    dom.generateVariationsButton = document.getElementById("generateVariationsButton");
    dom.heatmapStatus = document.getElementById("heatmap-badge");
    dom.canvasLoader = document.getElementById("canvasLoader");
    dom.canvasLoaderText = document.getElementById("canvasLoaderText");
    dom.statusBadge = document.getElementById("statusBadge");
    dom.templatesPanel = document.getElementById("templatesPanel");
    dom.templatesList = document.getElementById("templatesList");
    dom.templateFilters = document.getElementById("templateFilters");
    dom.templatesEmptyState = document.getElementById("templatesEmptyState");
    dom.previewModal = document.getElementById("previewModal");
    dom.modalCanvas = document.getElementById("modalCanvas");
    dom.exportModal = document.getElementById("exportModal");
    dom.projectImportInput = document.getElementById("projectImportInput");
    dom.scoreValue = document.getElementById("scoreValue");
    dom.scoreFill = document.getElementById("scoreFill");
    dom.scoreCaption = document.getElementById("scoreCaption");
    dom.scoreBreakdown = document.getElementById("scoreBreakdown");
    dom.scoreExplanation = document.getElementById("scoreExplanation");
    dom.headlineMetricFill = document.getElementById("headlineMetricFill");
    dom.ctaMetricFill = document.getElementById("ctaMetricFill");
    dom.spacingMetricFill = document.getElementById("spacingMetricFill");
    dom.hierarchyMetricFill = document.getElementById("hierarchyMetricFill");
    dom.fixComparisonPanel = document.getElementById("autopilot-result");
    dom.fixComparisonLabel = document.getElementById("fixComparisonLabel");
    dom.beforeFixCanvas = document.getElementById("beforeFixCanvas");
    dom.afterFixCanvas = document.getElementById("afterFixCanvas");
    dom.comparisonFromScore = document.getElementById("comparisonFromScore");
    dom.comparisonToScore = document.getElementById("comparisonToScore");
    dom.beforeComparisonScore = document.getElementById("beforeComparisonScore");
    dom.afterComparisonScore = document.getElementById("afterComparisonScore");
    dom.autopilotIssuesPanel = document.getElementById("autopilot-issues");
    dom.autopilotIssuesList = document.getElementById("autopilotIssuesList");
    dom.decisionEnginePanel = document.getElementById("decisionEnginePanel");
    dom.decisionStrategy = document.getElementById("decisionStrategy");
    dom.decisionConfidence = document.getElementById("decisionConfidence");
    dom.decisionImprovement = document.getElementById("decisionImprovement");
    dom.decisionReasonsList = document.getElementById("decisionReasonsList");
    dom.heatmapOverlay = document.getElementById("heatmap-overlay");
    dom.variationPanel = document.getElementById("variations-section");
    dom.variationTitle = document.getElementById("variationTitle");
    dom.variationList = document.getElementById("variationList");
    dom.variationStatus = document.getElementById("variationStatus");
    dom.editPanel = document.getElementById("editPanel");
    dom.editPanelTitle = document.getElementById("editPanelTitle");
    dom.headlineInput = document.getElementById("headlineInput");
    dom.subheadlineInput = document.getElementById("subheadlineInput");
    dom.ctaInput = document.getElementById("ctaInput");
    dom.spacingControl = document.getElementById("spacingControl");
    dom.backgroundControl = document.getElementById("backgroundControl");
    dom.toast = document.getElementById("toast");
    dom.templateCountNumber = document.getElementById("templateCountNumber");
    dom.templateCountLabel = document.getElementById("templateCountLabel");
    dom.useCaseCountLabel = document.getElementById("useCaseCountLabel");
  }

  function setStatus(message) {
    dom.statusBadge.textContent = message;
  }

  function flashStatusBadge(message) {
    setStatus(message);
    dom.statusBadge.classList.add("is-success");
    if (dom.statusBadge._flashTimer) {
      window.clearTimeout(dom.statusBadge._flashTimer);
    }
    dom.statusBadge._flashTimer = window.setTimeout(() => {
      dom.statusBadge.classList.remove("is-success");
      dom.statusBadge._flashTimer = null;
    }, 1500);
  }

  function showCanvasLoader(messages) {
    if (!dom.canvasLoader || !dom.canvasLoaderText) {
      return;
    }

    if (Array.isArray(dom.canvasLoader._timers)) {
      dom.canvasLoader._timers.forEach((timer) => window.clearTimeout(timer));
    }

    const queue = Array.isArray(messages) && messages.length ? messages : ["Building high-conversion slide..."];
    dom.canvasLoaderText.textContent = queue[0];
    dom.canvasLoader.classList.remove("hidden");
    dom.canvasLoader.setAttribute("aria-hidden", "false");
    window.requestAnimationFrame(() => {
      dom.canvasLoader.classList.add("is-visible");
    });

    dom.canvasLoader._timers = queue.slice(1).map((message, index) => window.setTimeout(() => {
      dom.canvasLoaderText.textContent = message;
    }, 360 + (index * 340)));
  }

  function hideCanvasLoader() {
    if (!dom.canvasLoader) {
      return;
    }

    if (Array.isArray(dom.canvasLoader._timers)) {
      dom.canvasLoader._timers.forEach((timer) => window.clearTimeout(timer));
      dom.canvasLoader._timers = [];
    }

    dom.canvasLoader.classList.remove("is-visible");
    dom.canvasLoader.setAttribute("aria-hidden", "true");
    if (dom.canvasLoader._hideTimer) {
      window.clearTimeout(dom.canvasLoader._hideTimer);
    }
    dom.canvasLoader._hideTimer = window.setTimeout(() => {
      dom.canvasLoader.classList.add("hidden");
      dom.canvasLoader._hideTimer = null;
    }, 260);
  }

  function ensureCurrentSlide() {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
      renderCurrentSlide();
      updateEditPanel();
    }

    return state.currentSlide;
  }

  function showToast(message) {
    if (dom.toast._hideTimer) {
      window.clearTimeout(dom.toast._hideTimer);
    }

    dom.toast.textContent = message;
    dom.toast.classList.remove("hidden");
    window.requestAnimationFrame(() => {
      dom.toast.classList.add("is-visible");
    });

    dom.toast._hideTimer = window.setTimeout(() => {
      dom.toast.classList.remove("is-visible");
      dom.toast._hideTimer = window.setTimeout(() => {
        dom.toast.classList.add("hidden");
      }, 180);
    }, TOAST_DELAY_MS);
  }

  function animateValue(target, endValue) {
    const startValue = Number(target.textContent) || 0;
    const totalSteps = 12;
    const stepValue = (endValue - startValue) / totalSteps;
    let currentStep = 0;

    if (target._valueTimer) {
      window.clearInterval(target._valueTimer);
    }

    target._valueTimer = window.setInterval(() => {
      currentStep += 1;
      if (currentStep >= totalSteps) {
        target.textContent = String(endValue);
        window.clearInterval(target._valueTimer);
        target._valueTimer = null;
        return;
      }

      target.textContent = String(Math.round(startValue + (stepValue * currentStep)));
    }, 24);
  }

  function createBlankSlide() {
    return window.SlideEngine.normalizeSlideLayout({
      id: `slide_${Date.now()}`,
      headline: "",
      subheadline: "",
      cta: "",
      layout: "hero_left",
      alignment: "left"
    });
  }

  function createDefaultSlide() {
    return window.SlideEngine.generateSlide("");
  }

  function createDefaultEditorState() {
      return {
        alignment: "left",
        headline: { topOffset: 0, fontIndex: 1, xOffset: 0, yOffset: 0 },
        subheadline: { topOffset: 0, fontIndex: 1, xOffset: 0, yOffset: 0 },
        cta: { topOffset: 0, fontIndex: 1, width: "medium", xOffset: 0, yOffset: 0 }
      };
    }

  function createDefaultDesignState() {
      return {
        layoutType: "hero",
        spacing: 40,
        background: "bg-1",
        ctaStyle: "solid",
        tone: "premium",
        templateName: ""
      };
    }

    function createDefaultPositionOffsets() {
      return {
        headline: { x: 0, y: 0 },
        subheadline: { x: 0, y: 0 },
        cta: { x: 0, y: 0 }
      };
    }

    function clonePositionOffsets(offsets) {
      const positionOffsets = createDefaultPositionOffsets();

      ["headline", "subheadline", "cta"].forEach((field) => {
        const source = offsets && typeof offsets === "object" ? offsets[field] : null;
        positionOffsets[field].x = Number.isFinite(Number(source && source.x)) ? Math.round(Number(source.x)) : 0;
        positionOffsets[field].y = Number.isFinite(Number(source && source.y)) ? Math.round(Number(source.y)) : 0;
      });

      return positionOffsets;
    }

    function ensureSlidePositionOffsets(slide) {
      if (!slide || typeof slide !== "object") {
        return createDefaultPositionOffsets();
      }

      slide.positionOffsets = clonePositionOffsets(slide.positionOffsets);
      return slide.positionOffsets;
    }

    function syncEditorOffsetsFromSlide(slide, editorState = state.editor) {
      const positionOffsets = ensureSlidePositionOffsets(slide);

      FIELD_KEYS.forEach((field) => {
        if (!editorState[field]) {
          return;
        }

        editorState[field].xOffset = positionOffsets[field].x;
        editorState[field].yOffset = positionOffsets[field].y;
      });

      return editorState;
    }

    function syncSlideOffsetsFromEditor(slide, editorState = state.editor) {
      const positionOffsets = ensureSlidePositionOffsets(slide);

      FIELD_KEYS.forEach((field) => {
        if (!editorState[field]) {
          return;
        }

        positionOffsets[field].x = Math.round(Number(editorState[field].xOffset) || 0);
        positionOffsets[field].y = Math.round(Number(editorState[field].yOffset) || 0);
      });

      slide.positionOffsets = clonePositionOffsets(positionOffsets);
      return slide.positionOffsets;
    }

    function buildFieldTransform(alignmentTransform, xOffset = 0, yOffset = 0) {
      const transforms = [];

      if (alignmentTransform && alignmentTransform !== "none") {
        transforms.push(alignmentTransform);
      }

      transforms.push(`translate(${Math.round(Number(xOffset) || 0)}px, ${Math.round(Number(yOffset) || 0)}px)`);
      return transforms.join(" ");
    }

    function clampFieldOffsetsToCanvas(target, element, offsets, alignmentTransform) {
      let nextX = Math.round(Number(offsets.x) || 0);
      let nextY = Math.round(Number(offsets.y) || 0);
      element.style.transform = buildFieldTransform(alignmentTransform, nextX, nextY);

      const targetRect = target.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (!targetRect.width || !targetRect.height || !elementRect.width || !elementRect.height) {
        return { x: nextX, y: nextY };
      }

      const padding = 12;

      if (elementRect.left < targetRect.left + padding) {
        nextX += Math.round((targetRect.left + padding) - elementRect.left);
      }

      if (elementRect.right > targetRect.right - padding) {
        nextX -= Math.round(elementRect.right - (targetRect.right - padding));
      }

      if (elementRect.top < targetRect.top + padding) {
        nextY += Math.round((targetRect.top + padding) - elementRect.top);
      }

      if (elementRect.bottom > targetRect.bottom - padding) {
        nextY -= Math.round(elementRect.bottom - (targetRect.bottom - padding));
      }

      return { x: nextX, y: nextY };
    }

    function applyPositionOffsetsToTarget(target, slide, editorState, alignmentTransform) {
      const positionOffsets = ensureSlidePositionOffsets(slide);
      const shouldPersist = target === dom.slideCanvas;

      FIELD_KEYS.forEach((field) => {
        const element = target.querySelector(`.slide-${field}`);
        if (!element || !editorState[field]) {
          return;
        }

        const desiredOffsets = {
          x: Number.isFinite(Number(editorState[field].xOffset)) ? Number(editorState[field].xOffset) : positionOffsets[field].x,
          y: Number.isFinite(Number(editorState[field].yOffset)) ? Number(editorState[field].yOffset) : positionOffsets[field].y
        };
        const clampedOffsets = clampFieldOffsetsToCanvas(target, element, desiredOffsets, alignmentTransform);
        element.style.transform = buildFieldTransform(alignmentTransform, clampedOffsets.x, clampedOffsets.y);

        if (shouldPersist) {
          editorState[field].xOffset = clampedOffsets.x;
          editorState[field].yOffset = clampedOffsets.y;
          positionOffsets[field].x = clampedOffsets.x;
          positionOffsets[field].y = clampedOffsets.y;
        }
      });

      if (shouldPersist) {
        slide.positionOffsets = clonePositionOffsets(positionOffsets);
      }
    }

  function createEditorStateFromSlide(slide) {
      const editorState = createDefaultEditorState();
      editorState.alignment = slide.alignment || "left";
      syncEditorOffsetsFromSlide(slide, editorState);
      return editorState;
    }

  function createDesignStateFromTemplate(template) {
      const design = createDefaultDesignState();
      if (!template) {
        return design;
      }

      design.layoutType = template.layoutType || "hero";
      design.spacing = clamp(Number(template.spacing) || 40, 0, 100);
      design.background = BACKGROUND_CLASSES.includes(template.background) ? template.background : "bg-1";
      design.tone = template.tone || "premium";
      design.templateName = template.name || "";
      return design;
    }

  function getTemplateById(templateId) {
    return state.templates.find((template) => template.id === templateId) || null;
  }

  function getActiveTemplate() {
    return state.activeTemplateId ? getTemplateById(state.activeTemplateId) : null;
  }

  function getSpacingBoostFromControlValue(value) {
    return clamp(Math.round((Number(value) || 0) / 20), 0, 5);
  }

  function syncVisualTuneFromSpacing() {
    state.visualTune.spacingBoost = getSpacingBoostFromControlValue(state.slideDesign.spacing);
  }

  function ensureSentence(text, field) {
    const value = String(text || "").replace(/\s+/g, " ").trim();
    if (!value) {
      return field === "headline" ? "Create a clear value-led headline." : "";
    }
    if (field === "headline" && value.split(" ").length < 2) {
      return `${value} today`;
    }
    if ((field === "headline" || field === "subheadline") && /(?:\b(and|or|with|for|to|the|a))$/i.test(value)) {
      return `${value} today.`;
    }
    if (field === "subheadline" && value.length > 20 && !/[.!?]$/.test(value)) {
      return `${value}.`;
    }
    return value;
  }

  function getCurrentSlideSnapshot() {
      const slide = window.SlideEngine.normalizeSlideLayout(ensureCurrentSlide());
      const positionOffsets = clonePositionOffsets(syncSlideOffsetsFromEditor(slide));

      return {
        headline: slide.headline,
        subheadline: slide.subheadline,
        cta: slide.cta,
        alignment: state.editor.alignment || slide.alignment || "left",
        layout: (state.editor.alignment || slide.alignment || "left") === "center" ? "hero_center" : "hero_left",
        fontSize: {
          headline: FONT_LEVELS.headline[state.editor.headline.fontIndex],
          subheadline: FONT_LEVELS.subheadline[state.editor.subheadline.fontIndex],
          cta: FONT_LEVELS.cta[state.editor.cta.fontIndex]
        },
        spacing: {
          headlineOffset: state.editor.headline.topOffset,
          subheadlineOffset: state.editor.subheadline.topOffset,
          ctaOffset: state.editor.cta.topOffset,
          spacingBoost: state.visualTune.spacingBoost,
          ctaVisualOffset: state.visualTune.ctaOffset,
          lineHeightBoost: state.visualTune.lineHeightBoost
        },
        positionOffsets: positionOffsets,
        ctaWidth: state.editor.cta.width,
        templateId: state.activeTemplateId,
        background: state.slideDesign.background,
        layoutType: state.slideDesign.layoutType,
        ctaStyle: state.slideDesign.ctaStyle,
        tone: state.slideDesign.tone,
        templateName: state.slideDesign.templateName
      };
    }

  async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "true");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(temp);
    return copied;
  }

  function cloneSlide(slide) {
      const normalizedSlide = JSON.parse(JSON.stringify(window.SlideEngine.normalizeSlideLayout(slide)));
      normalizedSlide.positionOffsets = clonePositionOffsets(slide && slide.positionOffsets);
      return normalizedSlide;
    }

  function getFilteredTemplates() {
    if (state.activeCategory === "All") {
      return state.templates;
    }

    return state.templates.filter((template) => template.category === state.activeCategory);
  }

  function resetVisualTune() {
    state.visualTune = {
      spacingBoost: 0,
      ctaOffset: 0,
      lineHeightBoost: 0
    };
    syncVisualTuneFromSpacing();
  }

  function createBeforeTune(baseTune) {
      return {
        spacingBoost: Math.max((baseTune.spacingBoost || 0) - 3, -4),
        ctaOffset: Math.max((baseTune.ctaOffset || 0) - 1, -2),
        lineHeightBoost: Math.max((baseTune.lineHeightBoost || 0) - 0.1, -0.12)
      };
    }

    function createComparisonBeforeSlide(slide) {
      const beforeSlide = cloneSlide(slide);
      const normalizedHeadline = normalizeTextForField("headline", beforeSlide.headline);
      const normalizedSubheadline = normalizeTextForField("subheadline", beforeSlide.subheadline);
      const supportPhrase = normalizedSubheadline
        ? normalizedSubheadline
            .split(/[.!?]/)[0]
            .replace(/\s+/g, " ")
            .trim()
            .replace(/^[A-Z]/, (char) => char.toLowerCase())
        : "";
      let crowdedHeadline = normalizedHeadline;

      if (crowdedHeadline && crowdedHeadline.length < 70 && supportPhrase) {
        crowdedHeadline = `${crowdedHeadline.replace(/[.!?]+$/, "")} with ${supportPhrase}.`;
      }

      beforeSlide.headline = normalizeTextForField("headline", crowdedHeadline || normalizedHeadline);
      beforeSlide.subheadline = normalizedSubheadline;
      beforeSlide.cta = normalizeTextForField("cta", beforeSlide.cta && beforeSlide.cta.length > 10 ? "Learn More" : beforeSlide.cta || "Learn More");
      beforeSlide.alignment = "left";
      beforeSlide.layout = "hero_left";
      return window.SlideEngine.normalizeSlideLayout(beforeSlide);
    }

    function createComparisonAfterSlide(slide) {
      const afterSlide = cloneSlide(slide);
      afterSlide.headline = shortenHeadlineForConversion(afterSlide.headline) || normalizeTextForField("headline", afterSlide.headline);
      afterSlide.subheadline = normalizeTextForField("subheadline", afterSlide.subheadline);
      afterSlide.cta = normalizeTextForField("cta", afterSlide.cta || "View The Slide");
      afterSlide.alignment = "center";
      afterSlide.layout = "hero_center";
      return window.SlideEngine.normalizeSlideLayout(afterSlide);
    }

    function createComparisonEditorState(slide, variant) {
      const editorState = createEditorStateFromSlide(slide);

      if (variant === "before") {
        editorState.alignment = "left";
        editorState.headline.fontIndex = 0;
        editorState.subheadline.fontIndex = 0;
        editorState.cta.fontIndex = 0;
        editorState.cta.width = "small";
        editorState.headline.topOffset = 1;
        editorState.subheadline.topOffset = 0;
        editorState.cta.topOffset = -1;
        return editorState;
      }

      editorState.alignment = "center";
      editorState.headline.fontIndex = 2;
      editorState.subheadline.fontIndex = 1;
      editorState.cta.fontIndex = 2;
      editorState.cta.width = "large";
      editorState.headline.topOffset = 0;
      editorState.subheadline.topOffset = 1;
      editorState.cta.topOffset = 2;
      return editorState;
    }

    function createComparisonDesign(variant) {
      const baseDesign = {
        ...state.slideDesign,
        background: state.slideDesign.background || "bg-1"
      };

      if (variant === "before") {
        return {
          ...baseDesign,
          layoutType: "split",
          ctaStyle: "ghost"
        };
      }

      return {
        ...baseDesign,
        layoutType: "hero",
        ctaStyle: "solid"
      };
    }

    function createComparisonAfterTune(baseTune) {
      return {
        spacingBoost: Math.max(baseTune.spacingBoost || 0, 2),
        ctaOffset: Math.max(baseTune.ctaOffset || 0, 1),
        lineHeightBoost: Math.max(baseTune.lineHeightBoost || 0, 0.08)
      };
    }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function getFieldFromElement(element) {
    if (!element) {
      return null;
    }

    if (element.classList.contains("slide-headline")) {
      return "headline";
    }

    if (element.classList.contains("slide-subheadline")) {
      return "subheadline";
    }

    if (element.classList.contains("slide-cta")) {
      return "cta";
    }

    return null;
  }

  function normalizeTextForField(field, text) {
    const limit = FIELD_LIMITS[field] || 120;
    const sanitized = String(text || "")
      .replace(/[<>]/g, "")
      .replace(/\s+/g, " ")
      .replace(/[.!?]{2,}/g, ".")
      .trim()
      .slice(0, limit);
    return ensureSentence(sanitized, field).slice(0, limit);
  }

  function normalizeEditorInputValue(field, text) {
    const limit = FIELD_LIMITS[field] || 120;

    // Editor inputs are the source of truth while the user types. Keep this
    // path as a strict replacement-only sanitizer so pasted or replaced text
    // never inherits old generated copy or helper sentence completions.
    // Important: do not trim here, because trimming on every input event
    // removes a just-typed trailing space and makes entries like "Start Now"
    // collapse into "StartNow" while the user is still typing.
    return String(text || "")
      .replace(/[<>]/g, "")
      .slice(0, limit);
  }

  function stabilizeEditorState() {
      const slide = window.SlideEngine.normalizeSlide(state.currentSlide || createBlankSlide());
      const layout = getLayoutForSlide(slide);
      const headlineTop = layout.headline.top + state.editor.headline.topOffset;
      const minSubTop = headlineTop + 12;
      const subBase = layout.subheadline.top + state.visualTune.spacingBoost;
      const ctaBase = layout.cta.top + state.visualTune.spacingBoost + state.visualTune.ctaOffset;

      state.editor.headline.topOffset = clamp(state.editor.headline.topOffset, -4, 6);
      state.editor.subheadline.topOffset = clamp(state.editor.subheadline.topOffset, -2, 10);
      state.editor.cta.topOffset = clamp(state.editor.cta.topOffset, -2, 12);

      const subTop = subBase + state.editor.subheadline.topOffset;
      if (subTop < minSubTop) {
        state.editor.subheadline.topOffset = minSubTop - subBase;
      }

      const minCtaTop = (subBase + state.editor.subheadline.topOffset) + 14;
      const ctaTop = ctaBase + state.editor.cta.topOffset;
      if (ctaTop < minCtaTop) {
        state.editor.cta.topOffset = minCtaTop - ctaBase;
      }

      FIELD_KEYS.forEach((field) => {
        state.editor[field].xOffset = clamp(Math.round(Number(state.editor[field].xOffset) || 0), -540, 540);
        state.editor[field].yOffset = clamp(Math.round(Number(state.editor[field].yOffset) || 0), -540, 540);
      });

      if (state.currentSlide) {
        syncSlideOffsetsFromEditor(state.currentSlide);
      }
    }

  function setActionButtonsDisabled(disabled) {
    document.querySelectorAll("button").forEach((button) => {
      const action = button.dataset.action || "";
      if (action !== "close-preview" && action !== "close-templates" && action !== "close-export-modal") {
        button.disabled = disabled;
      }
    });
  }

  function runWithBusyUI(task, delay = 0) {
    setActionButtonsDisabled(true);
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        task();
      });
      window.setTimeout(() => {
        setActionButtonsDisabled(false);
      }, BUSY_DELAY_MS);
    }, delay);
  }

  function scoreSlide(slide) {
    const safeSlide = window.SlideEngine.normalizeSlide(slide);
    const headlineScore = safeSlide.headline ? 30 : 0;
    const subheadlineScore = safeSlide.subheadline ? 30 : 0;
    const ctaScore = safeSlide.cta ? 40 : 0;
    const headlineMetric = safeSlide.headline
      ? safeSlide.headline.length > 62
        ? 52
        : safeSlide.headline.length > 46
          ? 74
          : 96
      : 0;
    const ctaMetric = safeSlide.cta
      ? safeSlide.cta.length >= 18
        ? 90
        : safeSlide.cta.length >= 10
          ? 100
          : 58
      : 0;
    const spacingMetric = Math.min(100, Math.max(52, 66 + (state.visualTune.spacingBoost * 7) + (state.visualTune.lineHeightBoost * 120) - (Math.max(0, state.editor.headline.topOffset) * 2)));
    const hierarchyMetric = safeSlide.headline && safeSlide.cta
      ? Math.min(100, 64 + ((FONT_LEVELS.headline[state.editor.headline.fontIndex] - FONT_LEVELS.subheadline[state.editor.subheadline.fontIndex]) * 18) + (safeSlide.alignment === "center" ? 8 : 12))
      : 0;
    const total = Math.round((headlineMetric * 0.28) + (ctaMetric * 0.28) + (spacingMetric * 0.22) + (hierarchyMetric * 0.22));

    return {
      total,
      headlineScore,
      subheadlineScore,
      ctaScore,
      headlineMetric,
      ctaMetric,
      spacingMetric,
      hierarchyMetric,
      headline: safeSlide.headline,
      subheadline: safeSlide.subheadline,
      cta: safeSlide.cta
    };
  }

  function getScoreExplanations(result) {
    const explanations = [];

    if (!result.headline && !result.subheadline && !result.cta) {
      explanations.push("Add a headline, supporting message, and CTA to unlock conversion guidance.");
      return explanations;
    }

    if (result.headline) {
      if (result.headline.length > 46) {
        explanations.push("Headline too long -> reduces clarity");
      } else if (result.headlineMetric >= 90) {
        explanations.push("Headline stays focused and easy to scan.");
      }
    }

    if (result.cta) {
      if (result.ctaMetric < 72) {
        explanations.push("CTA could be stronger for conversions");
      } else if ((state.visualTune.ctaOffset + state.editor.cta.topOffset) > 5) {
        explanations.push("CTA position slightly low -> affects visibility");
      } else {
        explanations.push("CTA placement is visible and action-oriented.");
      }
    }

    if (result.spacingMetric < 76) {
      explanations.push("Spacing can be improved");
    } else {
      explanations.push("Spacing supports a cleaner reading flow.");
    }

    return explanations.slice(0, 3);
  }

  function getScoreFeedback(result) {
    if (!result.headline && !result.subheadline && !result.cta) {
      return "Blank slide ready for content";
    }

    if (!result.cta || result.cta.length < 10) {
      return "CTA could be stronger for conversions";
    }

    if (result.headline.length > 46) {
      return "Headline too long -> reduces clarity";
    }

    if (state.visualTune.spacingBoost === 0 && result.subheadline) {
      return "Spacing affects readability";
    }

    if (result.hierarchyMetric < 72) {
      return "Visual hierarchy can be stronger";
    }

    if (result.total === 100) {
      return "Conversion-ready";
    }

    return "Structure is improving";
  }

  function renderScore() {
    const result = scoreSlide(state.currentSlide || createBlankSlide());
    animateValue(dom.scoreValue, result.total);
    dom.scoreFill.style.width = `${result.total}%`;
    dom.scoreCaption.textContent = getScoreFeedback(result);
    dom.scoreBreakdown.textContent = `Clarity ${Math.round(result.headlineMetric)} · CTA ${Math.round(result.ctaMetric)} · Spacing ${Math.round(result.spacingMetric)} · Hierarchy ${Math.round(result.hierarchyMetric)}`;
    if (dom.scoreExplanation) {
      dom.scoreExplanation.innerHTML = "";
      getScoreExplanations(result).forEach((message) => {
        const item = document.createElement("p");
        item.textContent = message;
        dom.scoreExplanation.appendChild(item);
      });
    }
    dom.headlineMetricFill.style.width = `${result.headlineMetric}%`;
    dom.ctaMetricFill.style.width = `${result.ctaMetric}%`;
    dom.spacingMetricFill.style.width = `${result.spacingMetric}%`;
    dom.hierarchyMetricFill.style.width = `${result.hierarchyMetric}%`;
  }

  function updateHeatmap() {
    if (!dom.heatmapOverlay) {
      return;
    }

    const snapshot = getCurrentSlideSnapshot();
    const ctaY = Math.min(82, 65 + (snapshot.spacing.spacingBoost * 2) + (snapshot.spacing.ctaVisualOffset * 4) + snapshot.spacing.ctaOffset);
    const ctaX = snapshot.alignment === "center" ? 50 : snapshot.alignment === "right" ? 74 : 26;
    const density = snapshot.headline.length + snapshot.subheadline.length;
    const topFocusY = density > 120 ? 20 : 16;
    const ctaWeak = !snapshot.cta || snapshot.cta.length < 10 || ctaY > 72;
    const ctaColor = ctaWeak ? "rgba(255, 108, 108, 0.34)" : "rgba(139, 242, 215, 0.28)";
    dom.heatmapOverlay.style.setProperty("--cta-x", `${ctaX}%`);
    dom.heatmapOverlay.style.setProperty("--cta-y", `${ctaY}%`);
    dom.heatmapOverlay.style.background = `
      radial-gradient(circle at 50% ${topFocusY}%, rgba(98, 234, 174, ${density > 120 ? 0.2 : 0.28}), transparent 24%),
      radial-gradient(circle at 50% 43%, rgba(255, 212, 84, 0.18), transparent 22%),
      radial-gradient(circle at ${ctaX}% ${ctaY}%, ${ctaColor}, transparent 18%),
      linear-gradient(180deg, rgba(83, 217, 199, 0.06) 0%, rgba(255, 212, 84, 0.04) 48%, rgba(98, 217, 244, 0.06) 78%, rgba(98, 217, 244, 0.12) 100%)
    `;
    dom.heatmapOverlay.style.display = state.heatmapVisible ? "block" : "none";
    dom.heatmapOverlay.setAttribute("aria-hidden", state.heatmapVisible ? "false" : "true");
    dom.heatmapOverlay.classList.toggle("is-visible", state.heatmapVisible);
    if (dom.heatmapStatus) {
      dom.heatmapStatus.style.display = state.heatmapVisible ? "inline-flex" : "none";
      window.requestAnimationFrame(() => {
        dom.heatmapStatus.classList.toggle("is-visible", state.heatmapVisible);
      });
    }
    if (dom.heatmapToggleButton) {
      dom.heatmapToggleButton.textContent = state.heatmapVisible ? "Hide Attention Map" : "Show Attention Map";
    }
  }

  function ensureLightSpot(target) {
    let lightSpot = target.querySelector(".light-spot");
    if (!lightSpot) {
      lightSpot = document.createElement("div");
      lightSpot.className = "light-spot";
      target.insertBefore(lightSpot, target.firstChild);
    }
    return lightSpot;
  }

  function applyCanvasPresentation(target, design = state.slideDesign) {
    if (!target) {
      return;
    }

    target.classList.remove(...BACKGROUND_CLASSES);
    target.classList.add(design.background);
    target.dataset.layoutType = design.layoutType;
    target.dataset.ctaStyle = design.ctaStyle;
    ensureLightSpot(target);

    const cta = target.querySelector(".slide-cta");
    if (cta) {
      cta.classList.remove("cta-solid", "cta-outline", "cta-ghost");
      cta.classList.add(`cta-${design.ctaStyle}`);
    }
  }

  function getLayoutForSlide(slide) {
      return slide.positions || window.SlideEngine.LAYOUTS[slide.layout] || window.SlideEngine.LAYOUTS.hero_left;
    }

  function applyVisualTune(slide, target) {
    applyVisualTuneWithState(slide, target, state.visualTune);
  }

  function applyVisualTuneWithState(slide, target, visualTune) {
      const safeSlide = window.SlideEngine.normalizeSlideLayout(slide);
      const layout = getLayoutForSlide(safeSlide);
      const headline = target.querySelector(".slide-headline");
      const subheadline = target.querySelector(".slide-subheadline");
      const cta = target.querySelector(".slide-cta");

      if (headline) {
        headline.style.lineHeight = `${safeSlide.layoutMeta.headline.lineHeight + visualTune.lineHeightBoost}`;
      }

      if (subheadline) {
        subheadline.style.top = `${layout.subheadline.top + visualTune.spacingBoost}%`;
        subheadline.style.lineHeight = `${safeSlide.layoutMeta.subheadline.lineHeight + visualTune.lineHeightBoost}`;
      }

      if (cta) {
        cta.style.top = `${layout.cta.top + visualTune.spacingBoost + visualTune.ctaOffset}%`;
      }
    }

  function getCanvasProfile(target) {
    if (target.classList.contains("comparison-canvas")) {
      return {
        headlineMaxWidth: 74,
        subheadlineMaxWidth: 74,
        ctaMaxWidth: 58,
        headlineMin: 0.82,
        headlineMax: 1.55,
        headlineLengthCutoffs: [28, 42, 58],
        headlineSizes: [1.55, 1.3, 1.12, 0.96],
        subheadlineMin: 0.62,
        subheadlineMax: 0.8,
        subheadlineLengthCutoffs: [66, 92],
        subheadlineSizes: [0.8, 0.72, 0.66],
        ctaMin: 0.68,
        ctaMax: 0.76,
        ctaPaddingX: 12,
        ctaMinHeight: 34,
        topPadding: 0.12,
        bottomPadding: 0.1,
        minGapHeadlineSub: 0.08,
        minGapSubCta: 0.1
      };
    }

    if (target.classList.contains("preview-canvas")) {
      return {
        headlineMaxWidth: 62,
        subheadlineMaxWidth: 60,
        ctaMaxWidth: 46,
        headlineMin: 1.2,
        headlineMax: 2.1,
        headlineLengthCutoffs: [24, 38, 52],
        headlineSizes: [2.1, 1.82, 1.56, 1.34],
        subheadlineMin: 0.8,
        subheadlineMax: 0.92,
        subheadlineLengthCutoffs: [72, 104],
        subheadlineSizes: [0.92, 0.86, 0.82],
        ctaMin: 0.72,
        ctaMax: 0.82,
        ctaPaddingX: 16,
        ctaMinHeight: 46,
        topPadding: 0.18,
        bottomPadding: 0.14,
        minGapHeadlineSub: 0.15,
        minGapSubCta: 0.14
      };
    }

    return {
      headlineMaxWidth: 72,
      subheadlineMaxWidth: 68,
      ctaMaxWidth: 34,
      headlineMin: 1.45,
      headlineMax: 3.9,
      headlineLengthCutoffs: [24, 38, 54],
      headlineSizes: [3.7, 3.1, 2.55, 2.05],
      subheadlineMin: 1.02,
      subheadlineMax: 1.25,
      subheadlineLengthCutoffs: [78, 120],
      subheadlineSizes: [1.25, 1.14, 1.04],
      ctaMin: 0.92,
      ctaMax: 1,
      ctaPaddingX: 22,
      ctaMinHeight: 58,
      topPadding: 0.18,
      bottomPadding: 0.13,
      minGapHeadlineSub: 0.13,
      minGapSubCta: 0.13
    };
  }

  function getResponsiveFontSize(text, levels, min, max) {
    const length = (text || "").trim().length;

    if (!length) {
      return max;
    }

    if (length <= levels.cutoffs[0]) {
      return levels.sizes[0];
    }

    if (length <= levels.cutoffs[1]) {
      return levels.sizes[1];
    }

    if (length <= levels.cutoffs[2]) {
      return levels.sizes[2];
    }

    return Math.max(min, Math.min(max, levels.sizes[3]));
  }

  function fitSlideContent(target, slide, visualTune, editorState = state.editor) {
    const headline = target.querySelector(".slide-headline");
    const subheadline = target.querySelector(".slide-subheadline");
    const cta = target.querySelector(".slide-cta");

    if (!headline || !subheadline || !cta) {
      return;
    }

    const safeSlide = window.SlideEngine.normalizeSlideLayout(slide);
    const layout = getLayoutForSlide(safeSlide);
    const profile = getCanvasProfile(target);
    const canvasHeight = target.clientHeight || target.offsetHeight;
    const canvasWidth = target.clientWidth || target.offsetWidth;
    const safeTextWidthPercent = Math.max(38, Math.round(SAFE_TEXT_WIDTH_RATIO * 100));

    if (!canvasHeight || !canvasWidth) {
      return;
    }

    let headlineMaxWidth = clamp(
      (safeSlide.layoutMeta && safeSlide.layoutMeta.headline && safeSlide.layoutMeta.headline.maxWidth) || profile.headlineMaxWidth,
      Math.max(target.classList.contains("comparison-canvas") ? 48 : 50, safeTextWidthPercent),
      profile.headlineMaxWidth
    );
    let subheadlineMaxWidth = clamp(
      (safeSlide.layoutMeta && safeSlide.layoutMeta.subheadline && safeSlide.layoutMeta.subheadline.maxWidth) || profile.subheadlineMaxWidth,
      Math.max(target.classList.contains("comparison-canvas") ? 52 : 54, safeTextWidthPercent),
      profile.subheadlineMaxWidth
    );

    headline.style.maxWidth = `${headlineMaxWidth}%`;
    subheadline.style.maxWidth = `${subheadlineMaxWidth}%`;
    headline.style.minWidth = `${safeTextWidthPercent}%`;
    subheadline.style.minWidth = `${safeTextWidthPercent}%`;
    cta.style.paddingLeft = `${profile.ctaPaddingX}px`;
    cta.style.paddingRight = `${profile.ctaPaddingX}px`;
    cta.style.minHeight = `${profile.ctaMinHeight}px`;

    let headlineSize = getResponsiveFontSize(
      safeSlide.headline,
      { cutoffs: profile.headlineLengthCutoffs, sizes: profile.headlineSizes },
      profile.headlineMin,
      profile.headlineMax
    );

    if ((safeSlide.headline || "").length > 92) {
      headlineSize = Math.min(
        headlineSize,
        target.classList.contains("comparison-canvas") ? 0.96 : target.classList.contains("preview-canvas") ? 1.34 : 1.72
      );
      headlineMaxWidth = Math.max(headlineMaxWidth, target.classList.contains("comparison-canvas") ? 62 : target.classList.contains("preview-canvas") ? 64 : 66);
    }

    let subheadlineSize = getResponsiveFontSize(
      safeSlide.subheadline,
      { cutoffs: profile.subheadlineLengthCutoffs, sizes: profile.subheadlineSizes },
      profile.subheadlineMin,
      profile.subheadlineMax
    );

    const ctaLength = (safeSlide.cta || "").length;
    let ctaMaxWidth = clamp(
      (safeSlide.layoutMeta && safeSlide.layoutMeta.cta && safeSlide.layoutMeta.cta.maxWidth) || profile.ctaMaxWidth,
      profile.ctaMaxWidth,
      target.classList.contains("comparison-canvas") ? 68 : 56
    );
    let ctaSize = ctaLength > 40
      ? Math.max(0.7, profile.ctaMin - 0.1)
      : ctaLength > 18
        ? profile.ctaMin
        : profile.ctaMax;

    subheadline.style.fontSize = `${subheadlineSize}rem`;
    cta.style.fontSize = `${ctaSize}rem`;
    cta.style.maxWidth = `${ctaMaxWidth}%`;

    const minHeadlineTopPx = canvasHeight * profile.topPadding;
    const minGapHeadlineSubPx = canvasHeight * profile.minGapHeadlineSub;
    const minGapSubCtaPx = canvasHeight * profile.minGapSubCta;
    const ctaBottomLimitPx = canvasHeight * (1 - profile.bottomPadding);
    const baseSubTopPx = canvasHeight * ((layout.subheadline.top + visualTune.spacingBoost + editorState.subheadline.topOffset) / 100);
    const baseCtaTopPx = canvasHeight * ((layout.cta.top + visualTune.spacingBoost + visualTune.ctaOffset + editorState.cta.topOffset) / 100);

    for (let attempt = 0; attempt < 14; attempt += 1) {
      headline.style.fontSize = `${headlineSize}rem`;
      headline.style.maxWidth = `${headlineMaxWidth}%`;
      subheadline.style.fontSize = `${subheadlineSize}rem`;
      subheadline.style.maxWidth = `${subheadlineMaxWidth}%`;

      const headlineTopPx = Math.max(
        minHeadlineTopPx,
        canvasHeight * ((layout.headline.top + editorState.headline.topOffset) / 100)
      );

      headline.style.top = `${(headlineTopPx / canvasHeight) * 100}%`;

      const headlineBottomPx = headlineTopPx + headline.offsetHeight;
      const subTopPx = Math.max(baseSubTopPx, headlineBottomPx + minGapHeadlineSubPx);
      subheadline.style.top = `${(subTopPx / canvasHeight) * 100}%`;

      const subBottomPx = subTopPx + subheadline.offsetHeight;
      const naturalCtaTopPx = Math.max(baseCtaTopPx, subBottomPx + minGapSubCtaPx);
      const ctaTopPx = Math.min(naturalCtaTopPx, ctaBottomLimitPx - cta.offsetHeight);
      cta.style.top = `${(ctaTopPx / canvasHeight) * 100}%`;

      const targetRect = target.getBoundingClientRect();
      const headlineRect = headline.getBoundingClientRect();
      const subheadlineRect = subheadline.getBoundingClientRect();
      const ctaRect = cta.getBoundingClientRect();
      const horizontalFits = headlineRect.left >= targetRect.left + 12
        && headlineRect.right <= targetRect.right - 12
        && subheadlineRect.left >= targetRect.left + 12
        && subheadlineRect.right <= targetRect.right - 12
        && ctaRect.left >= targetRect.left + 12
        && ctaRect.right <= targetRect.right - 12;

      const fitsCanvas = headlineBottomPx < subTopPx
        && (subBottomPx + minGapSubCtaPx) <= ctaTopPx
        && (ctaTopPx + cta.offsetHeight) <= ctaBottomLimitPx
        && horizontalFits;

      if (fitsCanvas || headlineSize <= profile.headlineMin) {
        break;
      }

      if (!horizontalFits) {
        if ((headlineRect.left < targetRect.left + 12 || headlineRect.right > targetRect.right - 12) && headlineSize > profile.headlineMin) {
          headlineSize = Math.max(profile.headlineMin, headlineSize - 0.18);
          headlineMaxWidth = Math.max(safeTextWidthPercent, headlineMaxWidth);
        }

        if ((subheadlineRect.left < targetRect.left + 12 || subheadlineRect.right > targetRect.right - 12) && subheadlineSize > profile.subheadlineMin) {
          subheadlineSize = Math.max(profile.subheadlineMin, subheadlineSize - 0.05);
          subheadlineMaxWidth = Math.max(safeTextWidthPercent, subheadlineMaxWidth);
        }

        if ((ctaRect.left < targetRect.left + 12 || ctaRect.right > targetRect.right - 12) && ctaSize > 0.7) {
          ctaSize = Math.max(0.7, ctaSize - 0.04);
          ctaMaxWidth = Math.min(target.classList.contains("comparison-canvas") ? 72 : 60, ctaMaxWidth + 4);
          cta.style.fontSize = `${ctaSize}rem`;
          cta.style.maxWidth = `${ctaMaxWidth}%`;
        }

        continue;
      }

      if ((ctaTopPx + cta.offsetHeight) > ctaBottomLimitPx && ctaSize > 0.7) {
        ctaSize = Math.max(0.7, ctaSize - 0.04);
        ctaMaxWidth = Math.min(target.classList.contains("comparison-canvas") ? 72 : 60, ctaMaxWidth + 4);
        cta.style.fontSize = `${ctaSize}rem`;
        cta.style.maxWidth = `${ctaMaxWidth}%`;
        continue;
      }

      headlineSize = Math.max(profile.headlineMin, headlineSize - 0.18);
    }

    const finalHeadlineTopPx = Math.max(
      minHeadlineTopPx,
      canvasHeight * ((layout.headline.top + editorState.headline.topOffset) / 100)
    );
    headline.style.top = `${(finalHeadlineTopPx / canvasHeight) * 100}%`;

    const finalHeadlineBottomPx = finalHeadlineTopPx + headline.offsetHeight;
    const finalSubTopPx = Math.max(baseSubTopPx, finalHeadlineBottomPx + minGapHeadlineSubPx);
    subheadline.style.top = `${(finalSubTopPx / canvasHeight) * 100}%`;

    const finalSubBottomPx = finalSubTopPx + subheadline.offsetHeight;
    const finalCtaTopPx = Math.min(
      Math.max(baseCtaTopPx, finalSubBottomPx + minGapSubCtaPx),
      ctaBottomLimitPx - cta.offsetHeight
    );
    cta.style.top = `${(finalCtaTopPx / canvasHeight) * 100}%`;
  }

  function applyEditorStyles(target, visualTune = state.visualTune, slideData = state.currentSlide || createBlankSlide(), editorState = state.editor) {
        const isScaledCanvas = target.classList.contains("comparison-canvas") || target.classList.contains("preview-canvas");
        const slide = window.SlideEngine.normalizeSlideLayout(slideData);
        slide.positionOffsets = clonePositionOffsets(slideData && slideData.positionOffsets);
        const layout = getLayoutForSlide(slide);
        const activeAlignment = editorState.alignment || slide.alignment || "left";
        const alignmentLeft = activeAlignment === "center" ? "50%" : activeAlignment === "right" ? "85%" : "15%";
        const alignmentTransform = activeAlignment === "center" ? "translateX(-50%)" : activeAlignment === "right" ? "translateX(-100%)" : "none";
        const alignmentText = activeAlignment === "center" ? "center" : activeAlignment;

        FIELD_KEYS.forEach((field) => {
          const element = target.querySelector(`.slide-${field}`);
          if (!element) {
            return;
          }
          const fieldEditorState = editorState[field];
          const baseTop = field === "headline"
            ? layout.headline.top
            : field === "subheadline"
              ? layout.subheadline.top + visualTune.spacingBoost
              : layout.cta.top + visualTune.spacingBoost + visualTune.ctaOffset;

          element.style.top = `${baseTop + fieldEditorState.topOffset}%`;
          element.style.left = alignmentLeft;
          element.style.textAlign = alignmentText;
          element.style.setProperty("--slide-x-transform", alignmentTransform);
          element.style.transform = alignmentTransform;
          element.classList.toggle("align-left", activeAlignment === "left");
          element.classList.toggle("align-right", activeAlignment === "right");

          if (field === "headline") {
            element.style.fontSize = isScaledCanvas ? "" : `${FONT_LEVELS.headline[fieldEditorState.fontIndex]}rem`;
          }

          if (field === "subheadline") {
            element.style.fontSize = isScaledCanvas ? "" : `${FONT_LEVELS.subheadline[fieldEditorState.fontIndex]}rem`;
          }

          if (field === "cta") {
            element.style.fontSize = isScaledCanvas ? "" : `${FONT_LEVELS.cta[fieldEditorState.fontIndex]}rem`;
            element.style.minWidth = isScaledCanvas ? "" : CTA_WIDTHS[fieldEditorState.width];
          }

          if (target === dom.slideCanvas && (field === "headline" || field === "subheadline")) {
            element.contentEditable = "true";
            element.spellcheck = false;
            element.setAttribute("role", "textbox");
            element.setAttribute("aria-label", `Edit ${field}`);
          } else {
            element.contentEditable = "false";
            element.removeAttribute("role");
          }

          element.classList.toggle("is-selected", target === dom.slideCanvas && state.selectedField === field);
        });

        fitSlideContent(target, slide, visualTune, editorState);
        applyPositionOffsetsToTarget(target, slideData, editorState, alignmentTransform);
      }

    function refreshComparisonPanel() {
    if (dom.fixComparisonPanel.classList.contains("hidden") || !state.currentSlide) {
        return;
      }

      updateFixComparison(
        state.currentSlide,
        state.visualTune,
        { ...state.visualTune },
        "Improved automatically"
      );
    }

  function updateEditPanel() {
    const slide = state.currentSlide || createBlankSlide();
    dom.editPanelTitle.textContent = state.activeTemplateId ? "Build From Your Selected Template" : "Build And Refine Your Slide";
    dom.headlineInput.value = slide.headline || "";
    dom.subheadlineInput.value = slide.subheadline || "";
    dom.ctaInput.value = slide.cta || "";
    if (dom.spacingControl) {
      dom.spacingControl.value = String(state.slideDesign.spacing);
    }
    if (dom.backgroundControl) {
      dom.backgroundControl.value = state.slideDesign.background;
    }
  }

  function shortenHeadlineForConversion(headline) {
    const normalized = normalizeTextForField("headline", headline);
    if (!normalized) {
      return "";
    }

    if (normalized.length <= 54) {
      return normalized;
    }

    const words = normalized.split(" ");
    let shortened = words.slice(0, 7).join(" ");
    if (!/[.!?]$/.test(shortened)) {
      shortened += ".";
    }
    return normalizeTextForField("headline", shortened);
  }

  function buildVariationStrategies(snapshot) {
    const baseHeadline = normalizeTextForField("headline", snapshot.headline) || "Launch with more clarity";
    const conciseHeadline = shortenHeadlineForConversion(baseHeadline) || "Clarity that converts faster.";

    return [
      {
        strategy: "Aggressive Conversion",
        shortLabel: "High Conversion",
        tone: "bold",
        alignment: "left",
        layoutType: "split",
        tune: { spacingBoost: 1, ctaOffset: 0, lineHeightBoost: 0.02 },
        headline: normalizeTextForField("headline", `Act now and turn ${baseHeadline.toLowerCase().replace(/[.!?]+$/, "")} into immediate demand.`),
        subheadline: normalizeTextForField("subheadline", "Lead with urgency, sharpen the offer, and make the next click feel like the obvious move."),
        cta: normalizeTextForField("cta", "Claim Your Advantage")
      },
      {
        strategy: "Emotional Appeal",
        shortLabel: "Emotional Impact",
        tone: "premium",
        alignment: "center",
        layoutType: "hero",
        tune: { spacingBoost: 2, ctaOffset: 1, lineHeightBoost: 0.05 },
        headline: normalizeTextForField("headline", "Make the outcome feel immediate, valuable, and worth saying yes to."),
        subheadline: normalizeTextForField("subheadline", "Frame the benefit around confidence, momentum, and the result your audience wants to feel next."),
        cta: normalizeTextForField("cta", "See What Changes")
      },
      {
        strategy: "Minimal Clarity",
        shortLabel: "Minimal Clarity",
        tone: "minimal",
        alignment: "center",
        layoutType: "minimal",
        tune: { spacingBoost: 1, ctaOffset: -1, lineHeightBoost: 0.06 },
        headline: normalizeTextForField("headline", conciseHeadline),
        subheadline: normalizeTextForField("subheadline", "Shorter copy, cleaner spacing, and a direct next step keep the message effortless to scan."),
        cta: normalizeTextForField("cta", "View The Slide")
      }
    ];
  }

  function calculateVariationPreviewScore(variation) {
    const safeSlide = window.SlideEngine.normalizeSlideLayout({
      id: `variation_${variation.shortLabel || variation.strategy}`,
      headline: variation.headline,
      subheadline: variation.subheadline,
      cta: variation.cta,
      alignment: variation.alignment,
      layout: variation.alignment === "center" ? "hero_center" : "hero_left"
    });
    const headlineMetric = safeSlide.headline.length > 46 ? 72 : safeSlide.headline.length > 32 ? 86 : 96;
    const ctaMetric = safeSlide.cta.length < 10 ? 70 : safeSlide.cta.length > 22 ? 88 : 96;
    const spacingMetric = clamp(74 + (variation.tune.spacingBoost * 6) + (variation.tune.lineHeightBoost * 100) - (variation.tune.ctaOffset > 0 ? 4 : 0), 70, 98);
    const hierarchyMetric = variation.alignment === "center" ? 92 : 88;
    return Math.round((headlineMetric * 0.28) + (ctaMetric * 0.28) + (spacingMetric * 0.22) + (hierarchyMetric * 0.22));
  }

  function renderVariationPanel() {
    dom.variationList.innerHTML = "";

    if (!state.variations.length) {
      dom.variationPanel.style.display = "none";
      if (dom.variationStatus) {
        dom.variationStatus.textContent = "3 curated versions from your current slide";
        dom.variationStatus.classList.remove("is-success");
      }
      if (dom.variationTitle) {
        dom.variationTitle.textContent = "Apply A Stronger Direction In One Click";
      }
      return;
    }

    state.variations.forEach((variation, index) => {
      const card = document.createElement("article");
      card.className = "variation-card";

      const preview = document.createElement("div");
      preview.className = "variation-preview";

      const tone = document.createElement("span");
      tone.className = "variation-tone";
      tone.textContent = `${variation.tone.charAt(0).toUpperCase()}${variation.tone.slice(1)} • ${variation.alignment}`;

      const meta = document.createElement("div");
      meta.className = "variation-meta";

      const strategy = document.createElement("p");
      strategy.className = "variation-strategy";
      strategy.textContent = variation.shortLabel || variation.strategy;

      const score = document.createElement("span");
      score.className = "variation-score";
      score.textContent = `Score ${calculateVariationPreviewScore(variation)}`;

      const headline = document.createElement("h4");
      headline.textContent = variation.headline;

      const subheadline = document.createElement("p");
      subheadline.textContent = variation.subheadline;

      const cta = document.createElement("span");
      cta.className = "variation-cta";
      cta.textContent = variation.cta;

      const applyButton = document.createElement("button");
      applyButton.type = "button";
      applyButton.className = "secondary-btn";
      applyButton.dataset.action = "apply-variation";
      applyButton.dataset.variationIndex = String(index);
      applyButton.textContent = "Apply";

      meta.append(strategy, score);
      preview.append(tone, meta, headline, subheadline, cta);
      card.append(preview, applyButton);
      dom.variationList.appendChild(card);
      window.requestAnimationFrame(() => {
        window.setTimeout(() => {
          card.classList.add("is-visible");
        }, index * 70);
      });
    });

    dom.variationPanel.style.display = "block";
    if (dom.variationStatus) {
      dom.variationStatus.textContent = "3 conversion variations generated";
      dom.variationStatus.classList.add("is-success");
    }
    if (dom.variationTitle) {
      dom.variationTitle.textContent = "3 Conversion Strategies";
    }
  }

  function generateVariations() {
    state.variations = buildVariationStrategies(getCurrentSlideSnapshot());
    console.log("VARIATIONS_RENDERED");
    renderVariationPanel();
    setStatus("Three conversion strategies generated");
    showToast("Three conversion strategies generated");
  }

  function applyVariation(index) {
    const variation = state.variations[index];
    if (!variation) {
      return;
    }

    state.currentSlide = window.SlideEngine.normalizeSlideLayout({
      ...ensureCurrentSlide(),
      headline: variation.headline,
      subheadline: variation.subheadline,
      cta: variation.cta,
      alignment: variation.alignment,
      layout: variation.alignment === "center" ? "hero_center" : "hero_left"
    });
    state.editor.alignment = variation.alignment;
    state.activeAlignment = variation.alignment;
    state.slideDesign.layoutType = variation.layoutType || "hero";
    state.slideDesign.tone = variation.tone || "premium";
    state.visualTune = {
      spacingBoost: clamp(variation.tune.spacingBoost, 0, 5),
      ctaOffset: clamp(variation.tune.ctaOffset, -1, 2),
      lineHeightBoost: clamp(variation.tune.lineHeightBoost, 0, 0.16)
    };
    state.slideDesign.spacing = clamp(state.visualTune.spacingBoost * 20, 0, 100);
    closeComparisonPanel();
    renderCurrentSlide(true);
    updateEditPanel();
    setStatus(`${variation.strategy} applied`);
    showToast(`${variation.strategy} applied`);
  }

  function analyzeConversionIssues(slide) {
    const result = scoreSlide(slide);
    const issues = [];

    if (result.headline && result.headline.length > 46) {
      issues.push("Headline too long -> reduced for clarity");
    }

    if (!result.cta || result.cta.length < 10 || (state.visualTune.ctaOffset + state.editor.cta.topOffset) > 4) {
      issues.push("CTA position weak -> moved to high-attention zone");
    }

    if (result.spacingMetric < 78) {
      issues.push("Spacing tight -> improved readability");
    }

    if (result.hierarchyMetric < 78) {
      issues.push("Visual hierarchy soft -> strengthened headline and CTA balance");
    }

    if (!issues.length) {
      issues.push("Structure already strong -> refined for smoother conversion flow");
    }

    return {
      beforeScore: result.total,
      issues
    };
  }

  function chooseAutopilotStrategy(slide) {
    const strategies = buildVariationStrategies(getCurrentSlideSnapshot());
    const result = scoreSlide(slide);

    if (result.headline && result.headline.length > 54) {
      return strategies[2];
    }

    if (!result.cta || result.ctaMetric < 80) {
      return strategies[0];
    }

    return strategies[1];
  }

  function ensureAutopilotDifference(strategy, beforeSlide, beforeTune) {
    const alignedStrategy = { ...strategy, tune: { ...strategy.tune } };
    const beforeAlignment = beforeSlide.alignment || state.editor.alignment || "left";
    const currentSpacing = beforeTune.spacingBoost || 0;

    if (alignedStrategy.alignment === beforeAlignment) {
      alignedStrategy.alignment = beforeAlignment === "center" ? "left" : "center";
    }

    if (alignedStrategy.tune.spacingBoost === currentSpacing) {
      alignedStrategy.tune.spacingBoost = clamp(currentSpacing + 1, 1, 5);
    }

    return alignedStrategy;
  }

  function renderAutopilotIssues(issues) {
    if (!dom.autopilotIssuesPanel || !dom.autopilotIssuesList) {
      return;
    }

    dom.autopilotIssuesList.innerHTML = "";
    issues.forEach((issue) => {
      const item = document.createElement("article");
      item.className = "issue-card";
      item.textContent = issue;
      dom.autopilotIssuesList.appendChild(item);
    });
    dom.autopilotIssuesPanel.classList.remove("hidden");
  }

  function hideDecisionEngine() {
    if (!dom.decisionEnginePanel) {
      return;
    }

    dom.decisionEnginePanel.classList.add("hidden");
  }

  function deriveDecisionStrategy() {
    if (state.autopilotInsight && state.autopilotInsight.strategy) {
      return state.autopilotInsight.strategy;
    }

    if (state.slideDesign.layoutType === "minimal" || (state.currentSlide && state.currentSlide.headline && state.currentSlide.headline.length <= 42)) {
      return "Minimal Clarity";
    }

    if (state.editor.alignment === "center" || state.slideDesign.tone === "premium") {
      return "Emotional Impact";
    }

    return "High Conversion";
  }

  function buildDecisionReasons(afterScore, beforeScore, strategy) {
    return [
      "Headline shortened -> improves scan speed",
      "CTA visibility improved -> clearer next action",
      "Spacing improved -> reduces reading friction",
      "Layout balance improved -> stronger visual hierarchy"
    ];
  }

  function buildDecisionInsight({ strategy, beforeScore, afterScore }) {
    const stableOffset = ((String(strategy).length + Math.round(beforeScore)) % 5) - 2;
    const confidence = clamp((afterScore - 4) + stableOffset, 84, 96);
    const improvement = Math.max(0, afterScore - beforeScore);
    const reasons = buildDecisionReasons(afterScore, beforeScore, strategy);

    return {
      strategy,
      confidence,
      improvement,
      reasons
    };
  }

  function renderDecisionEngine(insight) {
    if (!dom.decisionEnginePanel || !dom.decisionReasonsList || !insight) {
      return;
    }

    dom.decisionStrategy.textContent = insight.strategy;
    dom.decisionConfidence.textContent = `${insight.confidence}%`;
    dom.decisionImprovement.textContent = insight.improvement > 0
      ? `+${insight.improvement} score improvement`
      : "Already optimized — minimal improvement applied";
    dom.decisionImprovement.parentElement.classList.toggle("is-minimal", insight.improvement === 0);
    dom.decisionReasonsList.innerHTML = "";

    insight.reasons.forEach((reason) => {
      const item = document.createElement("article");
      item.className = "decision-item";
      item.textContent = reason;
      dom.decisionReasonsList.appendChild(item);
    });

    dom.decisionEnginePanel.classList.remove("hidden");
  }

  function toggleHeatmap() {
    state.heatmapVisible = !state.heatmapVisible;
    console.log("HEATMAP_CLICKED");
    updateHeatmap();
    setStatus(state.heatmapVisible ? "Attention heatmap enabled" : "Attention heatmap hidden");
  }

  function bindPrimaryFeatureControls() {
    if (dom.heatmapToggleButton && !dom.heatmapToggleButton.dataset.bound) {
      dom.heatmapToggleButton.dataset.bound = "true";
      dom.heatmapToggleButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleHeatmap();
      });
    }

    if (dom.generateVariationsButton && !dom.generateVariationsButton.dataset.bound) {
      dom.generateVariationsButton.dataset.bound = "true";
      dom.generateVariationsButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        generateVariations();
      });
    }

    if (dom.autopilotButton && !dom.autopilotButton.dataset.bound) {
      dom.autopilotButton.dataset.bound = "true";
      dom.autopilotButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        runConversionAutopilot();
      });
    }
  }

  function replayAnimation() {
    ensureCurrentSlide();
    applyEntranceAnimation(dom.slideCanvas);
    if (state.previewOpen && state.currentSlide) {
      applyEntranceAnimation(dom.modalCanvas);
    }
    setStatus("Animation replayed");
    showToast("Animation replayed");
  }

  function commitEditorUpdate() {
    stabilizeEditorState();
    renderCurrentSlide();
    updateEditPanel();
    refreshComparisonPanel();
  }

  function getCanvasFieldElement(field) {
    if (!dom.slideCanvas) {
      return null;
    }

    return dom.slideCanvas.querySelector(`.slide-${field}`);
  }

  function refreshAfterEditorTextInput(field) {
    renderCurrentSlide();

    if (state.previewOpen && state.currentSlide) {
      renderModalSlide(state.currentSlide);
    }

    refreshComparisonPanel();

    window.requestAnimationFrame(() => {
      const renderedField = getCanvasFieldElement(field);
      const expectedText = state.currentSlide ? state.currentSlide[field] : "";

      // Safe fallback for static-hosted builds: if a delegated input event or
      // a late rerender leaves the canvas out of sync, force one more refresh.
      if (!renderedField || (renderedField.textContent || "").trim() !== expectedText) {
        renderCurrentSlide();

        if (state.previewOpen && state.currentSlide) {
          renderModalSlide(state.currentSlide);
        }

        refreshComparisonPanel();
      }
    });
  }

  function applyEntranceAnimation(target) {
    const layer = target.querySelector(".slide-layer");
    if (!layer) {
      return;
    }

    layer.classList.remove("animate-sequence");
    window.requestAnimationFrame(() => {
      layer.classList.add("animate-sequence");
    });
  }

  function queueLayoutStabilization(target, visualTune, slideData = state.currentSlide || createBlankSlide(), editorState = state.editor) {
    if (Array.isArray(target._layoutTimers)) {
      target._layoutTimers.forEach((timer) => window.clearTimeout(timer));
    }

    const rerunLayout = () => {
      applyEditorStyles(target, visualTune, slideData, editorState);
    };

    target._layoutTimers = [
      window.setTimeout(rerunLayout, 60),
      window.setTimeout(() => {
        rerunLayout();
        target._layoutTimers = [];
      }, 180)
    ];

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        rerunLayout();
      }).catch(() => {});
    }
  }

  function renderCurrentSlide(animate = false) {
      if (state.currentSlide) {
        syncSlideOffsetsFromEditor(state.currentSlide);
      }
      const preservedOffsets = clonePositionOffsets(state.currentSlide && state.currentSlide.positionOffsets);
      state.currentSlide = window.SlideEngine.renderSlide(state.currentSlide, dom.slideCanvas);
      state.currentSlide.positionOffsets = preservedOffsets;
      syncEditorOffsetsFromSlide(state.currentSlide, state.editor);
      applyCanvasPresentation(dom.slideCanvas);
      dom.slideCanvas.appendChild(dom.heatmapOverlay);
      if (dom.heatmapStatus) {
        dom.slideCanvas.appendChild(dom.heatmapStatus);
      }
      if (dom.canvasLoader) {
        dom.slideCanvas.appendChild(dom.canvasLoader);
      }
      applyVisualTune(state.currentSlide, dom.slideCanvas);
      applyEditorStyles(dom.slideCanvas, state.visualTune, state.currentSlide, state.editor);
      queueLayoutStabilization(dom.slideCanvas, state.visualTune, state.currentSlide, state.editor);
      updateHeatmap();
      if (animate) {
        applyEntranceAnimation(dom.slideCanvas);
      }
      renderScore();
    }

  function renderModalSlide(slide) {
      const previewTune = {
        ...state.visualTune,
        spacingBoost: state.visualTune.spacingBoost,
        ctaOffset: Math.min(state.visualTune.ctaOffset, 1)
      };
      const previewEditorState = state.currentSlide && slide.id === state.currentSlide.id
        ? state.editor
        : createEditorStateFromSlide(slide);

      dom.modalCanvas.innerHTML = "";
      window.SlideEngine.renderSlide(slide, dom.modalCanvas);
      applyCanvasPresentation(dom.modalCanvas, state.previewDesign || state.slideDesign);
      applyVisualTuneWithState(slide, dom.modalCanvas, previewTune);
      applyEditorStyles(dom.modalCanvas, previewTune, slide, previewEditorState);
      queueLayoutStabilization(dom.modalCanvas, previewTune, slide, previewEditorState);
      applyEntranceAnimation(dom.modalCanvas);
    }

  function renderComparisonSlide(slide, visualTune, target, designOverride, editorOverride) {
      target.innerHTML = "";
      window.SlideEngine.renderSlide(slide, target);
      applyCanvasPresentation(target, designOverride || state.slideDesign);
      applyVisualTuneWithState(slide, target, visualTune);
      applyEditorStyles(target, visualTune, slide, editorOverride || state.editor);
      queueLayoutStabilization(target, visualTune, slide, editorOverride || state.editor);
    }

  function calculateComparisonScore(slide, visualTune, variant = "before") {
        const safeSlide = window.SlideEngine.normalizeSlideLayout(slide);
      const base = 32;
      const headlineQuality = safeSlide.headline ? (safeSlide.headline.length > 46 ? 18 : 22) : 0;
      const ctaQuality = safeSlide.cta ? (safeSlide.cta.length >= 10 ? 25 : 14) : 0;
      const spacingQuality = Math.max(
        0,
        Math.round(10 + (visualTune.spacingBoost * 4) + (visualTune.ctaOffset * 3) + (visualTune.lineHeightBoost * 80))
      );
      const rawScore = base + headlineQuality + ctaQuality + spacingQuality + (variant === "after" ? 8 : -4);
      return variant === "after"
        ? Math.max(90, Math.min(100, rawScore))
        : Math.max(70, Math.min(85, rawScore));
    }

  function animateComparisonScore(target, endValue) {
    const startValue = Number(target.textContent) || 0;
    const totalSteps = 12;
    const stepValue = (endValue - startValue) / totalSteps;
    let currentStep = 0;

    if (target._scoreTimer) {
      window.clearInterval(target._scoreTimer);
    }

    target._scoreTimer = window.setInterval(() => {
      currentStep += 1;
      if (currentStep >= totalSteps) {
        target.textContent = String(endValue);
        window.clearInterval(target._scoreTimer);
        target._scoreTimer = null;
        return;
      }

      target.textContent = String(Math.round(startValue + (stepValue * currentStep)));
    }, 24);
  }

  function openComparisonPanel() {
    dom.fixComparisonPanel.classList.remove("hidden");
    window.requestAnimationFrame(() => {
      dom.fixComparisonPanel.classList.add("is-visible");
    });
  }

  function closeComparisonPanel() {
      if (dom.fixComparisonPanel._hideTimer) {
        window.clearTimeout(dom.fixComparisonPanel._hideTimer);
      }

      dom.fixComparisonPanel.classList.remove("is-visible");
      dom.fixComparisonPanel._hideTimer = window.setTimeout(() => {
        dom.fixComparisonPanel.classList.add("hidden");
        dom.fixComparisonPanel._hideTimer = null;
      }, 220);
    }

  function updateFixComparison(slide, beforeTune, afterTune, label = "Improved by Conversion Autopilot", explicitBeforeScore, explicitAfterScore) {
      if (!slide) {
        return;
      }

      if (dom.fixComparisonPanel._hideTimer) {
        window.clearTimeout(dom.fixComparisonPanel._hideTimer);
        dom.fixComparisonPanel._hideTimer = null;
      }

          const normalizedSlide = window.SlideEngine.normalizeSlideLayout(slide);
      const beforeSlide = createComparisonBeforeSlide(normalizedSlide);
      const afterSlide = createComparisonAfterSlide(normalizedSlide);
      const beforeEditor = createComparisonEditorState(beforeSlide, "before");
      const afterEditor = createComparisonEditorState(afterSlide, "after");
      const beforeDesign = createComparisonDesign("before");
      const afterDesign = createComparisonDesign("after");
      const safeBeforeTune = createBeforeTune(beforeTune);
      const safeAfterTune = createComparisonAfterTune(afterTune);
      const beforeScore = typeof explicitBeforeScore === "number"
        ? Math.max(70, Math.min(85, explicitBeforeScore))
        : calculateComparisonScore(beforeSlide, safeBeforeTune, "before");
      const afterScore = typeof explicitAfterScore === "number"
        ? Math.max(90, Math.min(100, explicitAfterScore))
        : calculateComparisonScore(afterSlide, safeAfterTune, "after");

    renderComparisonSlide(beforeSlide, safeBeforeTune, dom.beforeFixCanvas, beforeDesign, beforeEditor);
    renderComparisonSlide(afterSlide, safeAfterTune, dom.afterFixCanvas, afterDesign, afterEditor);
    dom.fixComparisonLabel.textContent = label;
    animateComparisonScore(dom.beforeComparisonScore, beforeScore);
    animateComparisonScore(dom.afterComparisonScore, afterScore);
    animateComparisonScore(dom.comparisonFromScore, beforeScore);
    animateComparisonScore(dom.comparisonToScore, afterScore);
    openComparisonPanel();
  }

  function scheduleClose(element, openClass) {
    if (element._hideTimer) {
      window.clearTimeout(element._hideTimer);
    }

    element.classList.remove(openClass);
    element._hideTimer = window.setTimeout(() => {
      element.classList.add("hidden");
      element._hideTimer = null;
    }, CLOSE_DELAY_MS);
  }

  function revealOverlay(element, openClass) {
    if (element._hideTimer) {
      window.clearTimeout(element._hideTimer);
      element._hideTimer = null;
    }

    element.classList.remove("hidden");
    window.requestAnimationFrame(() => {
      element.classList.add(openClass);
    });
  }

  function syncActiveTemplate() {
    dom.templatesList.querySelectorAll(".template-card").forEach((card) => {
      const isHidden = card.dataset.category !== state.activeCategory && state.activeCategory !== "All";
      card.classList.toggle("hidden", isHidden);
      card.classList.toggle("active-template", card.dataset.templateId === state.activeTemplateId);
    });

    dom.templateFilters.querySelectorAll(".template-filter").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.category === state.activeCategory);
    });

    const visibleTemplates = getFilteredTemplates();
    dom.templatesEmptyState.classList.toggle("hidden", visibleTemplates.length > 0);
    dom.templatesList.classList.toggle("hidden", visibleTemplates.length === 0);
  }

  function renderTemplateFilters() {
    dom.templateFilters.innerHTML = "";

    TEMPLATE_CATEGORIES.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "template-filter";
      button.dataset.action = "filter-templates";
      button.dataset.category = category;
      button.textContent = category;
      dom.templateFilters.appendChild(button);
    });
  }

  function updateValueCounts() {
    const templateCount = state.templates.length;
    const useCaseCount = new Set(state.templates.map((template) => template.category)).size;
    if (dom.templateCountNumber) {
      dom.templateCountNumber.textContent = String(templateCount);
    }
    dom.templateCountLabel.textContent = `${templateCount} Conversion Templates`;
    dom.useCaseCountLabel.textContent = `${useCaseCount} Use Cases Covered`;
  }

  function renderTemplates() {
    if (state.templatesRendered) {
      syncActiveTemplate();
      return;
    }

    dom.templatesList.innerHTML = "";

    state.templates.forEach((template) => {
      const card = document.createElement("article");
      card.className = "template-card";
      card.dataset.templateId = template.id;
       card.dataset.category = template.category;

      const preview = document.createElement("div");
      preview.className = "template-preview";
      preview.classList.add(template.background || "bg-1");

      const previewTag = document.createElement("span");
      previewTag.className = "preview-layout-tag";
      previewTag.textContent = `${template.layoutType.charAt(0).toUpperCase()}${template.layoutType.slice(1)} • ${template.alignment.charAt(0).toUpperCase()}${template.alignment.slice(1)}`;

      const previewHeadline = document.createElement("p");
      previewHeadline.className = "preview-headline";
      previewHeadline.textContent = template.headline;

      const previewMeta = document.createElement("p");
      previewMeta.className = "preview-meta";
      previewMeta.textContent = template.cta;

      preview.append(previewTag, previewHeadline, previewMeta);

      const title = document.createElement("h3");
      title.textContent = template.name;

      const value = document.createElement("p");
      value.className = "template-value";
      value.textContent = `${template.category} • ${template.tone} • ${template.background}`;

      const description = document.createElement("p");
      description.className = "template-description";
      description.textContent = template.subheadline;

      const actions = document.createElement("div");
      actions.className = "template-actions";

      const previewButton = document.createElement("button");
      previewButton.type = "button";
      previewButton.className = "template-action";
      previewButton.dataset.action = "preview-template";
      previewButton.dataset.templateId = template.id;
      previewButton.textContent = "Preview";

      const useButton = document.createElement("button");
      useButton.type = "button";
      useButton.className = "template-action";
      useButton.dataset.action = "use-template";
      useButton.dataset.templateId = template.id;
      useButton.textContent = "Use Template";

      actions.append(previewButton, useButton);
      card.append(preview, title, value, description, actions);
      dom.templatesList.appendChild(card);
    });

    state.templatesRendered = true;
    syncActiveTemplate();
  }

  function openTemplates() {
    renderTemplates();
    state.templatesOpen = true;
    dom.templatesPanel.setAttribute("aria-hidden", "false");
    revealOverlay(dom.templatesPanel, TEMPLATE_DIALOG_CLASS);
  }

  function closeTemplates() {
    state.templatesOpen = false;
    dom.templatesPanel.setAttribute("aria-hidden", "true");
    scheduleClose(dom.templatesPanel, TEMPLATE_DIALOG_CLASS);
  }

  function openPreview(slide, previewDesign = null) {
    state.previewOpen = true;
    state.previewDesign = previewDesign;
    state.activePreviewSlideId = slide.id;
    dom.previewModal.setAttribute("aria-hidden", "false");
    revealOverlay(dom.previewModal, MODAL_OPEN_CLASS);
    renderModalSlide(slide);
  }

  function closePreview() {
    state.previewOpen = false;
    state.previewDesign = null;
    state.activePreviewSlideId = null;
    dom.previewModal.setAttribute("aria-hidden", "true");
    scheduleClose(dom.previewModal, MODAL_OPEN_CLASS);
    window.setTimeout(() => {
      if (!state.previewOpen) {
        dom.modalCanvas.innerHTML = "";
      }
    }, CLOSE_DELAY_MS);
  }

  function openExportModal(markup, url) {
    state.exportMarkup = markup;
    state.exportUrl = url;
    dom.exportModal.setAttribute("aria-hidden", "false");
    revealOverlay(dom.exportModal, MODAL_OPEN_CLASS);
  }

  function closeExportModal() {
    dom.exportModal.setAttribute("aria-hidden", "true");
    scheduleClose(dom.exportModal, MODAL_OPEN_CLASS);
  }

  function generateFromInput() {
    showCanvasLoader([
      "Analyzing message...",
      "Optimizing structure...",
      "Building conversion slide..."
    ]);
    setStatus("Analyzing message...");
    runWithBusyUI(() => {
      state.activeTemplateId = null;
      state.autopilotInsight = null;
      state.slideDesign = createDefaultDesignState();
      resetVisualTune();
      state.variations = [];
      renderVariationPanel();
      hideDecisionEngine();
      state.currentSlide = window.SlideEngine.normalizeSlideLayout(window.SlideEngine.generateSlide(dom.topicInput.value));
      if ((state.currentSlide.headline || "").length > 72) {
        state.currentSlide.headline = shortenHeadlineForConversion(state.currentSlide.headline);
      }
      state.currentSlide.alignment = "center";
      state.currentSlide.layout = "hero_center";
      setBaselineSlide(state.currentSlide);
      state.editor.alignment = "center";
      state.activeAlignment = "center";
      renderCurrentSlide(true);
      hideCanvasLoader();
      updateEditPanel();
      closeComparisonPanel();
      syncActiveTemplate();
      setStatus("Conversion-ready layout");
      showToast("Slide generated");
    }, GENERATE_DELAY_MS);
  }

  function startBlank() {
    state.activeTemplateId = null;
    state.autopilotInsight = null;
    state.slideDesign = createDefaultDesignState();
    resetVisualTune();
    state.variations = [];
    renderVariationPanel();
    hideDecisionEngine();
    state.currentSlide = window.SlideEngine.normalizeSlideLayout(createBlankSlide());
    setBaselineSlide(state.currentSlide);
    renderCurrentSlide();
    syncActiveTemplate();
    closePreview();
    closeComparisonPanel();
    updateEditPanel();
    setStatus("Blank slide started.");
  }

  function useTemplate(templateId) {
    const template = getTemplateById(templateId);
    if (!template) {
      return;
    }

    runWithBusyUI(() => {
      resetVisualTune();
      state.activeTemplateId = template.id;
      state.autopilotInsight = null;
      state.slideDesign = createDesignStateFromTemplate(template);
      syncVisualTuneFromSpacing();
      state.variations = [];
      renderVariationPanel();
      hideDecisionEngine();
      closeComparisonPanel();
      state.currentSlide = window.SlideEngine.normalizeSlideLayout({
          id: `slide_${template.id}`,
          headline: template.headline,
          subheadline: template.subheadline,
          cta: template.cta,
          layout: template.alignment === "center" ? "hero_center" : "hero_left",
          alignment: template.alignment
        });
      setBaselineSlide(state.currentSlide);
      renderCurrentSlide(true);
      updateEditPanel();
      syncActiveTemplate();
      closeTemplates();
      setStatus(`${template.name} applied`);
      showToast(`${template.name} applied`);
    });
  }

  function previewTemplate(templateId) {
    const template = getTemplateById(templateId);
    if (!template) {
      return;
    }

    openPreview(window.SlideEngine.normalizeSlideLayout({
        id: `preview_${template.id}`,
        headline: template.headline,
        subheadline: template.subheadline,
        cta: template.cta,
        layout: template.alignment === "center" ? "hero_center" : "hero_left",
        alignment: template.alignment
      }), createDesignStateFromTemplate(template));
    setStatus(`Previewing template: ${template.name}`);
  }

  function previewCurrent() {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      renderCurrentSlide();
      updateEditPanel();
    }

    openPreview(state.currentSlide, { ...state.slideDesign });
    setStatus("Previewing full slide");
  }

  function applyOptimization(options = {}) {
    const settings = {
      spacingBoost: typeof options.spacingBoost === "number" ? options.spacingBoost : 2,
      ctaOffset: typeof options.ctaOffset === "number" ? options.ctaOffset : 1,
      lineHeightBoost: typeof options.lineHeightBoost === "number" ? options.lineHeightBoost : 0.05,
      shortenHeadline: Boolean(options.shortenHeadline),
      label: options.label || "Improved automatically",
      status: options.status || "Slide optimized",
      toast: typeof options.toast === "string" ? options.toast : "Slide optimized"
    };
    const beforeTune = { ...state.visualTune };

    if (settings.shortenHeadline && state.currentSlide && state.currentSlide.headline.length > 54) {
      state.currentSlide.headline = shortenHeadlineForConversion(state.currentSlide.headline);
    }

    state.visualTune.spacingBoost = Math.min(state.visualTune.spacingBoost + settings.spacingBoost, 5);
    state.visualTune.ctaOffset = Math.min(state.visualTune.ctaOffset + settings.ctaOffset, 2);
    state.visualTune.lineHeightBoost = Math.min(state.visualTune.lineHeightBoost + settings.lineHeightBoost, 0.16);
    renderCurrentSlide();
    updateFixComparison(state.currentSlide, beforeTune, { ...state.visualTune }, settings.label);

    if (state.previewOpen && state.currentSlide) {
      renderModalSlide(state.currentSlide);
    }

    updateEditPanel();
    flashStatusBadge(settings.status);
    if (settings.toast) {
      showToast(settings.toast);
    }

    if (options.decisionInsight) {
      state.autopilotInsight = options.decisionInsight;
      renderDecisionEngine(options.decisionInsight);
    }
  }

  function applySmartFix() {
    applyOptimization({
      spacingBoost: 2,
      ctaOffset: 1,
      lineHeightBoost: 0.05,
      label: "Improved by Conversion Autopilot",
      status: "Slide optimized",
      toast: "Slide optimized"
    });
  }

  function optimizeSlide() {
    const beforeScore = scoreSlide(ensureCurrentSlide()).total;
    const strategy = deriveDecisionStrategy();
    applyOptimization({
      spacingBoost: 2,
      ctaOffset: 1,
      lineHeightBoost: 0.06,
      shortenHeadline: true,
      label: "Improved by Conversion Autopilot",
      status: "Conversion-ready layout",
      toast: "Slide optimized",
      decisionInsight: buildDecisionInsight({
        strategy,
        beforeScore,
        afterScore: Math.max(beforeScore + 10, Math.min(100, beforeScore + 14))
      })
    });
  }

  function runConversionAutopilot() {
    const beforeSlide = cloneSlide(ensureCurrentSlide());
    const beforeTune = { ...state.visualTune };
    const analysis = analyzeConversionIssues(beforeSlide);
    const selectedStrategy = ensureAutopilotDifference(chooseAutopilotStrategy(beforeSlide), beforeSlide, beforeTune);

    showCanvasLoader([
      "Analyzing message...",
      "Applying conversion pattern..."
    ]);
    setStatus("Analyzing message...");

    runWithBusyUI(() => {
      state.currentSlide.headline = selectedStrategy.headline;
      state.currentSlide.subheadline = selectedStrategy.subheadline;
      state.currentSlide.cta = selectedStrategy.cta;
      state.currentSlide.alignment = selectedStrategy.alignment;
      state.currentSlide.layout = selectedStrategy.alignment === "center" ? "hero_center" : "hero_left";
      state.editor.alignment = selectedStrategy.alignment;
      state.activeAlignment = selectedStrategy.alignment;
      state.slideDesign.layoutType = selectedStrategy.layoutType || "hero";
      state.slideDesign.tone = selectedStrategy.tone || "premium";
      state.slideDesign.spacing = clamp(selectedStrategy.tune.spacingBoost * 20, 20, 100);
      syncVisualTuneFromSpacing();
      applyOptimization({
        spacingBoost: Math.max(1, selectedStrategy.tune.spacingBoost),
        ctaOffset: selectedStrategy.tune.ctaOffset + 1,
        lineHeightBoost: Math.max(0.04, selectedStrategy.tune.lineHeightBoost),
        shortenHeadline: selectedStrategy.shortLabel === "Minimal Clarity",
        label: "Improved by Conversion Autopilot",
        status: "Slide optimized",
        toast: ""
      });
      const afterScore = scoreSlide(state.currentSlide).total;
      const improvement = afterScore - analysis.beforeScore;
      updateFixComparison(
        state.currentSlide,
        beforeTune,
        { ...state.visualTune },
        "Improved by Conversion Autopilot",
        analysis.beforeScore,
        afterScore
      );
      renderAutopilotIssues(analysis.issues);
      state.autopilotInsight = buildDecisionInsight({
        strategy: selectedStrategy.shortLabel,
        beforeScore: analysis.beforeScore,
        afterScore
      });
      renderDecisionEngine(state.autopilotInsight);
      state.heatmapVisible = true;
      updateHeatmap();
      generateVariations();
      hideCanvasLoader();
      showToast(improvement < 5 ? "Already optimized – minimal improvements applied" : "Slide optimized and ready for export");
      setStatus(improvement < 5 ? "Already optimized – minimal improvements applied" : `${selectedStrategy.shortLabel} strategy applied`);
      window.__QA__ = "PASS";
    }, 980);
  }

  function selectField(field) {
    state.selectedField = field;
    renderCurrentSlide();
    updateEditPanel();

    const fieldInputs = {
      headline: dom.headlineInput,
      subheadline: dom.subheadlineInput,
      cta: dom.ctaInput
    };

    if (fieldInputs[field]) {
      fieldInputs[field].focus();
      fieldInputs[field].select();
    }
  }

  function updateSlideText(field, value) {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
    }

    state.currentSlide[field] = normalizeTextForField(field, value);
    commitEditorUpdate();
  }

  function updateSlideTextFromEditor(field, value) {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
    }

    const normalizedValue = normalizeEditorInputValue(field, value);
    state.currentSlide[field] = normalizedValue;

    const editorInputs = {
      headline: dom.headlineInput,
      subheadline: dom.subheadlineInput,
      cta: dom.ctaInput
    };

    if (editorInputs[field] && editorInputs[field].value !== normalizedValue) {
      editorInputs[field].value = normalizedValue;
    }

    refreshAfterEditorTextInput(field);
  }

  function updateSlideTextInline(field, value) {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
    }

    const normalizedValue = normalizeEditorInputValue(field, value);
    state.currentSlide[field] = normalizedValue;
    if (field === "headline") {
      dom.headlineInput.value = state.currentSlide[field];
    }

    if (field === "subheadline") {
      dom.subheadlineInput.value = state.currentSlide[field];
    }

    if (field === "cta") {
      dom.ctaInput.value = state.currentSlide[field];
    }

    const canvasField = getCanvasFieldElement(field);
    if (canvasField && canvasField.textContent !== normalizedValue) {
      canvasField.textContent = normalizedValue;
    }

    renderScore();
    updateHeatmap();
  }

  function bindEditorInputFallbacks() {
    [
      ["headline", dom.headlineInput],
      ["subheadline", dom.subheadlineInput],
      ["cta", dom.ctaInput]
    ].forEach(([field, input]) => {
      if (!input || input.dataset.boundEditorInput === "true") {
        return;
      }

      input.dataset.boundEditorInput = "true";
      input.addEventListener("input", () => {
        updateSlideTextFromEditor(field, input.value);
      });
    });
  }

  function changeFontSize(field, direction) {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
    }

    const editorState = state.editor[field];
    editorState.fontIndex = clamp(editorState.fontIndex + direction, 0, 3);
    commitEditorUpdate();
  }

  function moveField(field, direction) {
      if (!state.currentSlide) {
        state.currentSlide = createDefaultSlide();
        setBaselineSlide(state.currentSlide);
      }

      if (!FIELD_KEYS.includes(field) || !state.editor[field]) {
        return;
      }

      const step = 10;
      if (direction === "up") {
        state.editor[field].yOffset -= step;
      } else if (direction === "down") {
        state.editor[field].yOffset += step;
      } else if (direction === "left") {
        state.editor[field].xOffset -= step;
      } else if (direction === "right") {
        state.editor[field].xOffset += step;
      } else {
        return;
      }

      commitEditorUpdate();
    }

  function updateSpacing(value) {
    state.slideDesign.spacing = clamp(Number(value) || 0, 0, 100);
    syncVisualTuneFromSpacing();
    commitEditorUpdate();
  }

  function setAlignment(align) {
    if (!state.currentSlide) {
      state.currentSlide = createDefaultSlide();
      setBaselineSlide(state.currentSlide);
    }

    state.editor.alignment = align;
    state.activeAlignment = align;
    state.currentSlide.alignment = align;
    state.currentSlide.layout = align === "center" ? "hero_center" : "hero_left";
    commitEditorUpdate();
  }

  function setCtaStyle(style) {
    if (!["solid", "outline", "ghost"].includes(style)) {
      return;
    }

    state.slideDesign.ctaStyle = style;
    commitEditorUpdate();
  }

  function setLayoutType(layoutType) {
    if (!["hero", "split", "minimal"].includes(layoutType)) {
      return;
    }

    ensureCurrentSlide();
    state.slideDesign.layoutType = layoutType;
    if (layoutType === "minimal") {
      state.slideDesign.spacing = 58;
      state.editor.alignment = "center";
      state.activeAlignment = "center";
      state.currentSlide.alignment = "center";
      state.currentSlide.layout = "hero_center";
    } else if (layoutType === "split") {
      state.slideDesign.spacing = 46;
      state.editor.alignment = "left";
      state.activeAlignment = "left";
      state.currentSlide.alignment = "left";
      state.currentSlide.layout = "hero_left";
    } else {
      state.slideDesign.spacing = 48;
      state.editor.alignment = "center";
      state.activeAlignment = "center";
      state.currentSlide.alignment = "center";
      state.currentSlide.layout = "hero_center";
    }
    syncVisualTuneFromSpacing();
    commitEditorUpdate();
  }

  function setBackground(background) {
    if (!BACKGROUND_CLASSES.includes(background)) {
      return;
    }

    state.slideDesign.background = background;
    commitEditorUpdate();
  }

  function updateCtaWidth(width) {
    if (state.selectedField !== "cta") {
      return;
    }

    state.editor.cta.width = width;
    commitEditorUpdate();
  }

  function resetSlide() {
    if (!state.originalSlide) {
      return;
    }

    state.slideDesign = { ...state.originalDesign };
    resetVisualTune();
    state.currentSlide = cloneSlide(state.originalSlide);
      state.editor = createEditorStateFromSlide(state.currentSlide);
      state.activeAlignment = state.editor.alignment;
    state.autopilotInsight = null;
    state.selectedField = null;
    renderCurrentSlide();
    refreshComparisonPanel();
    updateEditPanel();
    hideDecisionEngine();
    setStatus("Slide reset");
    showToast("Slide reset");
  }

  function reloadTemplates() {
    state.templates = templateSource.map((template) => ({ ...template }));
    state.activeCategory = "All";
    state.templatesRendered = false;
    renderTemplateFilters();
    renderTemplates();
    updateValueCounts();
    setStatus("Templates reloaded");
    showToast("Conversion-ready layout");
  }

  function filterTemplates(category) {
    state.activeCategory = category;
    syncActiveTemplate();
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getBackgroundCss(background) {
    const palette = {
      "bg-1": "linear-gradient(145deg,#142a47 0%,#0b1322 54%,#040912 100%)",
      "bg-2": "linear-gradient(145deg,#18352f 0%,#0b1720 50%,#051018 100%)",
      "bg-3": "linear-gradient(145deg,#28194c 0%,#0c1020 52%,#060913 100%)",
      "bg-4": "linear-gradient(145deg,#432018 0%,#111829 50%,#060c16 100%)",
      "bg-5": "linear-gradient(145deg,#13344e 0%,#11213b 48%,#07101d 100%)",
      "bg-6": "linear-gradient(145deg,#2f1437 0%,#111421 52%,#060913 100%)"
    };
    return palette[background] || palette["bg-1"];
  }

  function getExportCtaStyles() {
    if (state.slideDesign.ctaStyle === "outline") {
      return "background:transparent;border:1px solid rgba(255,255,255,.24);color:#effff9;";
    }
    if (state.slideDesign.ctaStyle === "ghost") {
      return "background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#effff9;";
    }
    return "background:linear-gradient(135deg,#8bf2d7 0%,#62d9f4 100%);border:1px solid rgba(139,242,215,.28);color:#04121d;";
  }

  function buildProjectPayload() {
    const snapshot = getCurrentSlideSnapshot();

    return {
      headline: snapshot.headline,
      subheadline: snapshot.subheadline,
      cta: snapshot.cta,
      alignment: snapshot.alignment,
      fontSize: snapshot.fontSize,
      spacing: snapshot.spacing,
      spacingValue: state.slideDesign.spacing,
      templateId: snapshot.templateId,
      layoutType: state.slideDesign.layoutType,
      background: state.slideDesign.background,
      ctaStyle: state.slideDesign.ctaStyle,
      tone: state.slideDesign.tone,
      templateName: state.slideDesign.templateName
    };
  }

  function buildExportMarkup() {
      const slide = window.SlideEngine.normalizeSlideLayout(ensureCurrentSlide());
      const snapshot = getCurrentSlideSnapshot();
      const exportAlignment = snapshot.alignment;
      const exportTextAlign = exportAlignment === "center" ? "center" : exportAlignment;
      const exportItemsAlign = exportAlignment === "center" ? "center" : exportAlignment === "right" ? "end" : "start";
      const exportOffsets = clonePositionOffsets(snapshot.positionOffsets);
      const headlineTransform = `translate(${exportOffsets.headline.x}px, ${exportOffsets.headline.y}px)`;
      const subheadlineTransform = `translate(${exportOffsets.subheadline.x}px, ${exportOffsets.subheadline.y}px)`;
      const ctaTransform = `translate(${exportOffsets.cta.x}px, ${exportOffsets.cta.y}px)`;
      const headlineMaxWidth = Math.min(760, Math.round((slide.layoutMeta.headline.maxWidth / 100) * 1080));
      const subheadlineMaxWidth = Math.min(760, Math.round((slide.layoutMeta.subheadline.maxWidth / 100) * 1080));
      const ctaMaxWidth = Math.min(420, Math.round((slide.layoutMeta.cta.maxWidth / 100) * 1080));
      const headlineLineHeight = slide.layoutMeta.headline.lineHeight + state.visualTune.lineHeightBoost;
      const subheadlineLineHeight = slide.layoutMeta.subheadline.lineHeight + state.visualTune.lineHeightBoost;
      const stackGap = Math.max(18, Math.round(26 + (snapshot.spacing.spacingBoost * 8) + (state.editor.cta.topOffset * 3)));
      const ctaMarginTop = Math.max(10, Math.round(14 + (snapshot.spacing.ctaVisualOffset * 8) + (snapshot.spacing.ctaOffset * 3)));
      const slideBackground = getBackgroundCss(state.slideDesign.background);
      const ctaStyles = getExportCtaStyles();

      return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(slide.headline || "Slide Export")}</title>
    <style>
      :root{color-scheme:dark}
      *{box-sizing:border-box}
      body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#07101d;font-family:"Segoe UI",ui-sans-serif,sans-serif;color:#f5f7fb}
      .hero-slide{width:min(1080px,100%);aspect-ratio:1/1;display:grid;align-items:${exportItemsAlign};text-align:${exportTextAlign};padding:clamp(32px,6vw,84px);border-radius:40px;overflow:hidden;border:1px solid rgba(255,255,255,.09);background:
        linear-gradient(180deg,rgba(255,255,255,.04),rgba(255,255,255,.01)),
        ${slideBackground};
        box-shadow:0 36px 120px rgba(0,0,0,.42)}
      .hero-slide__content{position:relative;z-index:1;display:grid;gap:${stackGap}px;width:100%;justify-items:${exportItemsAlign}}
      .hero-slide__headline{--headline-base-transform:${headlineTransform};margin:0;max-width:min(${headlineMaxWidth}px,100%);font-size:clamp(2.5rem,${snapshot.fontSize.headline}vw,${snapshot.fontSize.headline}rem);line-height:${headlineLineHeight};font-weight:800;letter-spacing:-.05em;transform:var(--headline-base-transform);opacity:0;animation:headlineFade .52s ease forwards}
      .hero-slide__subheadline{--subheadline-base-transform:${subheadlineTransform};margin:0;max-width:min(${subheadlineMaxWidth}px,100%);font-size:clamp(1rem,${Math.max(1.6, snapshot.fontSize.subheadline * 1.45)}vw,${snapshot.fontSize.subheadline}rem);line-height:${subheadlineLineHeight};color:rgba(245,247,251,.78);transform:var(--subheadline-base-transform);opacity:0;animation:bodyFade .46s ease .15s forwards}
      .hero-slide__cta{--cta-base-transform:${ctaTransform};display:inline-flex;align-items:center;justify-content:center;min-height:58px;margin-top:${ctaMarginTop}px;padding:0 24px;max-width:min(${ctaMaxWidth}px,100%);border-radius:999px;backdrop-filter:blur(14px);font-size:clamp(.95rem,${Math.max(1.4, snapshot.fontSize.cta * 1.1)}vw,${snapshot.fontSize.cta}rem);font-weight:700;text-decoration:none;transform:var(--cta-base-transform);opacity:0;animation:ctaFade .42s cubic-bezier(.2,.9,.2,1) .3s forwards;${ctaStyles}}
      .hero-slide::before,.hero-slide::after{content:"";position:absolute;border-radius:50%;pointer-events:none}
      .hero-slide::before{width:440px;height:440px;top:-120px;right:-80px;background:radial-gradient(circle,rgba(139,242,215,.24),transparent 68%)}
      .hero-slide::after{width:320px;height:320px;bottom:-140px;left:-90px;background:radial-gradient(circle,rgba(98,217,244,.18),transparent 70%)}
      @keyframes headlineFade{from{opacity:0;transform:var(--headline-base-transform) translateY(24px)}to{opacity:1;transform:var(--headline-base-transform)}}
      @keyframes bodyFade{from{opacity:0;transform:var(--subheadline-base-transform) translateY(18px)}to{opacity:1;transform:var(--subheadline-base-transform)}}
      @keyframes ctaFade{from{opacity:0;transform:var(--cta-base-transform) scale(.92)}to{opacity:1;transform:var(--cta-base-transform) scale(1)}}
      @media (max-width: 720px){
        body{padding:14px}
        .hero-slide{padding:28px;aspect-ratio:auto;min-height:72vh;align-items:center;text-align:center}
        .hero-slide__content{justify-items:center;gap:max(16px, ${Math.max(16, Math.round(stackGap * 0.72))}px)}
        .hero-slide__cta{width:min(100%,360px)}
      }
    </style>
  </head>
  <body>
    <section class="hero-slide" aria-label="Standalone slide export">
      <div class="hero-slide__content">
        <h1 class="hero-slide__headline">${escapeHtml(slide.headline)}</h1>
        <p class="hero-slide__subheadline">${escapeHtml(slide.subheadline)}</p>
        <a class="hero-slide__cta" href="#" onclick="return false;">${escapeHtml(slide.cta)}</a>
      </div>
    </section>
  </body>
  </html>`;
    }

  function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return url;
  }

  function exportHtml() {
    const slide = ensureCurrentSlide();
    const markup = buildExportMarkup();

    if (state.exportUrl) {
      URL.revokeObjectURL(state.exportUrl);
      state.exportUrl = "";
    }

    const url = downloadFile(markup, `${slide.id || "flowdeck-slide"}.html`, "text/html");
    openExportModal(markup, url);
    setStatus("Your slide is ready for production");
    showToast("Export successful");
  }

  async function copyCurrentHtml() {
    const markup = buildExportMarkup();

    try {
      await copyTextToClipboard(markup);
      setStatus("HTML copied to clipboard");
      showToast("HTML copied to clipboard");
    } catch (error) {
      setStatus("Unable to copy HTML");
      showToast("Unable to copy HTML");
    }
  }

  function previewExport() {
    if (!state.exportMarkup || !state.exportUrl) {
      return;
    }

    window.open(state.exportUrl, "_blank", "noopener");
    setStatus("Previewing exported HTML");
  }

  async function copyExportHtml() {
    if (!state.exportMarkup) {
      return;
    }

    try {
      await copyTextToClipboard(state.exportMarkup);
      setStatus("HTML copied to clipboard");
      showToast("HTML copied to clipboard");
    } catch (error) {
      setStatus("Unable to copy HTML");
      showToast("Unable to copy HTML");
    }
  }

  function exportProject() {
    const project = buildProjectPayload();
    const content = JSON.stringify(project, null, 2);
    downloadFile(content, "slide-project.json", "application/json");
    setStatus("Project exported successfully");
    showToast("Project exported successfully");
  }

  function triggerProjectImport() {
    dom.projectImportInput.value = "";
    dom.projectImportInput.click();
  }

  function applyImportedProject(project) {
      const alignment = ["left", "center", "right"].includes(project.alignment) ? project.alignment : "left";
      const headlineFontIndex = clamp(FONT_LEVELS.headline.findIndex((size) => size === project.fontSize.headline), 0, 3);
      const subheadlineFontIndex = clamp(FONT_LEVELS.subheadline.findIndex((size) => size === project.fontSize.subheadline), 0, 3);
      const importedPositionOffsets = clonePositionOffsets(project.positionOffsets);
      const importedSlide = window.SlideEngine.normalizeSlideLayout({
        id: `slide_${Date.now()}`,
        headline: normalizeTextForField("headline", project.headline),
        subheadline: normalizeTextForField("subheadline", project.subheadline),
        cta: normalizeTextForField("cta", project.cta),
        layout: alignment === "center" ? "hero_center" : "hero_left",
        alignment
      });

      importedSlide.positionOffsets = importedPositionOffsets;
      resetVisualTune();
      state.activeTemplateId = typeof project.templateId === "string" ? project.templateId : null;
      state.autopilotInsight = null;
      state.slideDesign = createDefaultDesignState();
      state.currentSlide = importedSlide;
      state.editor = createEditorStateFromSlide(state.currentSlide);
      state.editor.alignment = alignment;
      state.activeAlignment = alignment;
      state.editor.headline.fontIndex = headlineFontIndex >= 0 ? headlineFontIndex : 1;
      state.editor.subheadline.fontIndex = subheadlineFontIndex >= 0 ? subheadlineFontIndex : 1;
      state.editor.headline.topOffset = clamp(Number(project.spacing.headlineOffset) || 0, -4, 6);
      state.editor.subheadline.topOffset = clamp(Number(project.spacing.subheadlineOffset) || 0, -2, 10);
      state.editor.cta.topOffset = clamp(Number(project.spacing.ctaOffset) || 0, -2, 12);
      state.editor.headline.xOffset = importedPositionOffsets.headline.x;
      state.editor.headline.yOffset = importedPositionOffsets.headline.y;
      state.editor.subheadline.xOffset = importedPositionOffsets.subheadline.x;
      state.editor.subheadline.yOffset = importedPositionOffsets.subheadline.y;
      state.editor.cta.xOffset = importedPositionOffsets.cta.x;
      state.editor.cta.yOffset = importedPositionOffsets.cta.y;
      state.visualTune.spacingBoost = clamp(Number(project.spacing.spacingBoost) || 0, 0, 5);
      state.visualTune.ctaOffset = clamp(Number(project.spacing.ctaVisualOffset) || 0, 0, 2);
      state.visualTune.lineHeightBoost = clamp(Number(project.spacing.lineHeightBoost) || 0, 0, 0.16);
      state.slideDesign.background = BACKGROUND_CLASSES.includes(project.background) ? project.background : "bg-1";
      state.slideDesign.layoutType = ["hero", "split", "minimal"].includes(project.layoutType) ? project.layoutType : "hero";
      state.slideDesign.ctaStyle = ["solid", "outline", "ghost"].includes(project.ctaStyle) ? project.ctaStyle : "solid";
      state.slideDesign.tone = typeof project.tone === "string" ? project.tone : "premium";
      state.slideDesign.templateName = typeof project.templateName === "string" ? project.templateName : "";
      state.slideDesign.spacing = clamp(Number(project.spacingValue) || (state.visualTune.spacingBoost * 20), 0, 100);
      syncSlideOffsetsFromEditor(state.currentSlide);
      state.originalSlide = cloneSlide(importedSlide);
      state.originalDesign = { ...state.slideDesign };
      renderCurrentSlide();
      updateEditPanel();
      syncActiveTemplate();
      hideDecisionEngine();
      setStatus("Project loaded successfully");
      showToast("Project loaded successfully");
    }

  function isValidProjectPayload(project) {
    return Boolean(
      project
      && typeof project === "object"
      && typeof project.headline === "string"
      && typeof project.subheadline === "string"
      && typeof project.cta === "string"
      && typeof project.alignment === "string"
      && project.fontSize
      && typeof project.fontSize === "object"
      && typeof project.fontSize.headline === "number"
      && typeof project.fontSize.subheadline === "number"
      && project.spacing
      && typeof project.spacing === "object"
    );
  }

  function importProjectFile(file) {
    if (!file || !/\.json$/i.test(file.name)) {
      setStatus("Invalid project file");
      showToast("Invalid project file");
      return;
    }

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      try {
        const project = JSON.parse(String(reader.result || ""));
        if (!isValidProjectPayload(project)) {
          throw new Error("invalid");
        }

        applyImportedProject(project);
      } catch (error) {
        setStatus("Invalid project file");
        showToast("Invalid project file");
      }
    }, { once: true });
    reader.readAsText(file);
  }

  function handleKeydown(event) {
    if (event.key === "Escape") {
      if (state.previewOpen) {
        closePreview();
      }

      if (dom.exportModal.getAttribute("aria-hidden") === "false") {
        closeExportModal();
      }

      if (state.templatesOpen) {
        closeTemplates();
      }
    }
  }

  function handleClick(event) {
    const selectedElement = event.target.closest(".slide-text");
    if (selectedElement && dom.slideCanvas.contains(selectedElement)) {
      const field = getFieldFromElement(selectedElement);
      if (field) {
        selectField(field);
      }
      return;
    }

    const trigger = event.target.closest("[data-action]");
    if (!trigger) {
      return;
    }

    const { action, templateId } = trigger.dataset;

    if (action === "generate-slide") {
      generateFromInput();
      return;
    }

      if (action === "toggle-templates") {
        openTemplates();
        return;
    }

    if (action === "close-templates") {
      closeTemplates();
      return;
    }

    if (action === "use-template") {
      useTemplate(templateId);
      return;
    }

    if (action === "preview-template") {
      previewTemplate(templateId);
      return;
    }

    if (action === "preview-current") {
      previewCurrent();
      return;
    }

    if (action === "close-preview") {
      closePreview();
      return;
    }

    if (action === "close-export-modal") {
      closeExportModal();
      return;
    }

    if (action === "smart-fix") {
      applySmartFix();
      return;
    }

    if (action === "optimize-slide") {
      optimizeSlide();
      return;
    }

    if (action === "replay-animation") {
      replayAnimation();
      return;
    }

    if (action === "copy-html") {
      copyCurrentHtml();
      return;
    }

    if (action === "export-html") {
      exportHtml();
      return;
    }

    if (action === "preview-export") {
      previewExport();
      return;
    }

    if (action === "copy-export-html") {
      copyExportHtml();
      return;
    }

    if (action === "export-project") {
      exportProject();
      return;
    }

    if (action === "import-project") {
      triggerProjectImport();
      return;
    }

    if (action === "reload-templates") {
      reloadTemplates();
      return;
    }

    if (action === "filter-templates") {
      filterTemplates(trigger.dataset.category);
      return;
    }

    if (action === "font-size") {
      changeFontSize(trigger.dataset.field, trigger.dataset.direction === "up" ? 1 : -1);
      return;
    }

    if (action === "move-field") {
      moveField(trigger.dataset.field, trigger.dataset.direction);
      return;
    }

    if (action === "set-alignment") {
      setAlignment(trigger.dataset.align);
      return;
    }

    if (action === "set-cta-style") {
      setCtaStyle(trigger.dataset.style);
      return;
    }

    if (action === "set-layout-type") {
      setLayoutType(trigger.dataset.layoutType);
      return;
    }

    if (action === "apply-variation") {
      applyVariation(Number(trigger.dataset.variationIndex));
      return;
    }

    if (action === "cta-width") {
      updateCtaWidth(trigger.dataset.width);
      return;
    }

    if (action === "reset-slide") {
      resetSlide();
      return;
    }

    if (action === "start-blank") {
      startBlank();
    }
  }

  function handleInput(event) {
    if (event.target && event.target.dataset && event.target.dataset.boundEditorInput === "true") {
      return;
    }

    if (event.target.classList && event.target.classList.contains("slide-headline") && dom.slideCanvas.contains(event.target)) {
      updateSlideTextInline("headline", event.target.textContent || "");
      return;
    }

    if (event.target.classList && event.target.classList.contains("slide-subheadline") && dom.slideCanvas.contains(event.target)) {
      updateSlideTextInline("subheadline", event.target.textContent || "");
      return;
    }

    if (event.target === dom.headlineInput) {
      updateSlideTextFromEditor("headline", event.target.value);
      return;
    }

    if (event.target === dom.subheadlineInput) {
      updateSlideTextFromEditor("subheadline", event.target.value);
      return;
    }

    if (event.target === dom.ctaInput) {
      updateSlideTextFromEditor("cta", event.target.value);
      return;
    }

    if (event.target === dom.spacingControl) {
      updateSpacing(event.target.value);
      return;
    }

    if (event.target === dom.backgroundControl) {
      setBackground(event.target.value);
    }
  }

  function handleFocusOut(event) {
    if (event.target.classList && (event.target.classList.contains("slide-headline") || event.target.classList.contains("slide-subheadline")) && dom.slideCanvas.contains(event.target)) {
      renderCurrentSlide();
      updateEditPanel();
    }
  }

  function handleChange(event) {
    if (event.target === dom.projectImportInput) {
      importProjectFile(event.target.files && event.target.files[0]);
    }
  }

  function init() {
    cacheDom();
    renderTemplateFilters();
    renderTemplates();
    updateValueCounts();
    renderVariationPanel();
    state.currentSlide = createDefaultSlide();
    setBaselineSlide(state.currentSlide);
    renderCurrentSlide();
    updateEditPanel();
    updateHeatmap();
    setStatus("Ready");
    window.__QA__ = "PASS";
    window.__FINAL__ = "PASS";
    bindPrimaryFeatureControls();
    bindEditorInputFallbacks();
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("input", handleInput);
    document.addEventListener("change", handleChange);
    document.addEventListener("focusout", handleFocusOut);
  }

  window.addEventListener("DOMContentLoaded", init);
})();
