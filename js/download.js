/**
 * PAY TO WIN — DOWNLOAD PORTAL & RELEASE CONTROLLER (download.js)
 * Syncs release status, package-format instructions (.exe or .zip),
 * GitHub Releases links, OS detection, accessible Copy buttons (Invoker Commands
 * + click fallback), and FAQ accordion controls across download.html and index.html.
 */

(function () {
  "use strict";

  const DATA = window.GAME_DATA || {};
  const rawRelease = DATA.release || {};

  // =========================================================================
  // 1. RESOLVE EFFECTIVE RELEASE STATE (WITH ?preview=ready QA SIMULATION)
  // =========================================================================
  const params = new URLSearchParams(window.location.search);
  const isPreviewReady = params.get("preview") === "ready";

  const packageType = rawRelease.packageType === "zip" ? "zip" : "exe";
  const packageNotesMap = rawRelease.packageNotes || {};
  const activeNotes = packageNotesMap[packageType] || {};

  const release = Object.assign(
    {
      status: "preparing",
      statusLabel: "Build Export in Progress",
      statusMessage:
        "Our development team is finalizing and packaging the Windows PC (x86_64) build from Unity 2022.3.62f3 LTS.",
      packageType: packageType,
      version: "v2.0.60",
      buildChannel: "Milestone Release",
      releaseDate: "Pending Export",
      platform: "Windows 10 / 11 (64-bit x86_64)",
      engine: "Unity 2022.3.62f3 LTS (URP 14.0.12)",
      fileName:
        packageType === "zip"
          ? "PayToWin_Windows_x86_64_v2.0.60.zip"
          : "PayToWin_Setup_v2.0.60.exe",
      executableName: "PayToWin.exe",
      fileSize: "TBD (Pending Unity Export)",
      sha256: "PENDING_EXPORT_RUN_PREPARE_RELEASE_SCRIPT",
      downloadUrl: "",
      releasesPageUrl:
        (DATA.meta && DATA.meta.githubUrl
          ? DATA.meta.githubUrl + "/releases"
          : "https://github.com/KJBGrandDev/PayToWin_Documentation/releases"),
      checksumFileUrl: ""
    },
    rawRelease
  );

  if (isPreviewReady) {
    release.status = "available";
    release.statusLabel = "Build Ready (Preview Mode)";
    release.statusMessage =
      "Preview mode (?preview=ready) is simulating a live GitHub Releases build so you can inspect the download UI before uploading the exported game.";
    release.releaseDate = "Preview Mode";
    release.fileSize = "1.84 GB (Preview)";
    release.sha256 =
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
    release.downloadUrl = "#preview-download";
  }

  function isSafeUrl(url, allowHashPreview) {
    if (typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!trimmed) return false;
    if (allowHashPreview && trimmed === "#preview-download") return true;
    if (/^(?:\.\/|\/(?!\/)|releases\/)/.test(trimmed)) return true;
    try {
      const parsed = new URL(trimmed, window.location.href);
      return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
      return false;
    }
  }

  function isPlaceholderText(val) {
    if (!val) return true;
    return /\b(?:TBD|PENDING)\b/i.test(String(val));
  }

  const hasValidDownloadUrl = isSafeUrl(release.downloadUrl, isPreviewReady);
  const isAvailable = release.status === "available" && hasValidDownloadUrl;
  const isMaintenance = release.status === "maintenance";

  // =========================================================================
  // 2. HYDRATE RELEASE STATUS, METADATA, CTA & INSTALLATION STEPS
  // =========================================================================
  const statusBadgeText = isAvailable
    ? release.statusLabel || "Build Ready for Download"
    : isMaintenance
      ? release.statusLabel || "Release Maintenance"
      : release.statusLabel || "Build Export in Progress";

  const statusModifier = isAvailable
    ? "status-available"
    : isMaintenance
      ? "status-maintenance"
      : "status-preparing";

  const pillModifier = isAvailable
    ? "emerald"
    : isMaintenance
      ? "crimson"
      : "brass";

  const formatLabel =
    activeNotes.formatBadge ||
    (packageType === "zip"
      ? "Portable Archive (.zip)"
      : "Windows Installer (.exe)");

  const liveCtaLabel =
    activeNotes.ctaLabel ||
    (packageType === "zip"
      ? "Download Portable Archive (.zip)"
      : "Download Windows Installer (.exe)");

  const pendingCtaLabel = isMaintenance
    ? "Temporarily Unavailable (Maintenance)"
    : "Export in Progress — Download Pending";

  // Show preview badge if ?preview=ready is active
  document.querySelectorAll("[data-preview-pill]").forEach(function (el) {
    el.hidden = !isPreviewReady;
  });

  // Status banners (download.html & index.html)
  function configureBanner(bannerId, pillId, msgId) {
    const banner = document.getElementById(bannerId);
    const pill = document.getElementById(pillId);
    const msg = document.getElementById(msgId);
    if (banner) {
      banner.classList.remove(
        "status-preparing",
        "status-available",
        "status-maintenance"
      );
      banner.classList.add(statusModifier);
    }
    if (pill) {
      pill.textContent = statusBadgeText;
      pill.className = "pill " + pillModifier;
    }
    if (msg) {
      msg.textContent = release.statusMessage;
    }
  }

  configureBanner(
    "release-status-banner",
    "release-status-pill",
    "release-status-message"
  );
  configureBanner(
    "index-release-banner",
    "index-release-pill",
    "index-release-message"
  );

  // Configure primary & index download buttons
  function configureDownloadButton(btnId, prefixIcon) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    if (isAvailable) {
      btn.setAttribute("href", release.downloadUrl);
      btn.setAttribute("aria-disabled", "false");
      btn.classList.remove("btn-disabled", "btn-secondary");
      btn.classList.add("btn-emerald");
      if (/^https?:\/\//i.test(release.downloadUrl)) {
        btn.setAttribute("target", "_blank");
        btn.setAttribute("rel", "noopener noreferrer");
      } else {
        btn.removeAttribute("target");
        btn.removeAttribute("rel");
      }
      btn.textContent = (prefixIcon ? "⬇ " : "") + liveCtaLabel;

      if (isPreviewReady && release.downloadUrl === "#preview-download") {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const msgEl =
            document.getElementById("release-status-message") ||
            document.getElementById("index-release-message");
          if (msgEl) {
            msgEl.textContent =
              "Preview mode simulated click: once you upload the build to GitHub Releases and set downloadUrl in js/gameData.js, this button downloads " +
              release.fileName +
              " directly.";
          }
        });
      }
    } else {
      btn.removeAttribute("href");
      btn.removeAttribute("target");
      btn.removeAttribute("rel");
      btn.setAttribute("aria-disabled", "true");
      btn.setAttribute("role", "button");
      btn.setAttribute("tabindex", "0");
      btn.classList.remove("btn-emerald", "btn-primary");
      btn.classList.add("btn-secondary", "btn-disabled");
      btn.textContent = "⏳ " + pendingCtaLabel;

      function focusBanner(e) {
        if (e.type === "keydown" && e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        const banner =
          document.getElementById("release-status-banner") ||
          document.getElementById("index-release-banner");
        if (banner) {
          banner.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      btn.addEventListener("click", focusBanner);
      btn.addEventListener("keydown", focusBanner);
    }
  }

  configureDownloadButton("primary-download-btn", true);
  configureDownloadButton("index-download-cta", true);

  // Sync metadata fields across both pages
  function setField(selectorOrId, value, markPlaceholder) {
    const els = selectorOrId.startsWith("[")
      ? document.querySelectorAll(selectorOrId)
      : [document.getElementById(selectorOrId)].filter(Boolean);

    els.forEach(function (el) {
      el.textContent = value;
      if (markPlaceholder !== undefined) {
        el.classList.toggle("placeholder-item", Boolean(markPlaceholder));
      }
    });
  }

  setField("dl-version", release.version, false);
  setField("[data-release-version]", release.version, false);
  setField("dl-format", formatLabel, false);
  setField("[data-release-format]", formatLabel, false);
  setField(
    "dl-filesize",
    release.fileSize,
    !isAvailable && isPlaceholderText(release.fileSize)
  );
  setField(
    "[data-release-filesize]",
    release.fileSize,
    !isAvailable && isPlaceholderText(release.fileSize)
  );
  setField("dl-platform", release.platform, false);
  setField(
    "dl-releasedate",
    release.releaseDate,
    !isAvailable && isPlaceholderText(release.releaseDate)
  );
  setField(
    "dl-filename",
    release.fileName,
    !isAvailable && isPlaceholderText(release.fileName)
  );
  setField(
    "[data-release-filename]",
    release.fileName,
    !isAvailable && isPlaceholderText(release.fileName)
  );
  setField(
    "dl-sha256",
    release.sha256,
    !isAvailable && isPlaceholderText(release.sha256)
  );

  const psCmdEl = document.getElementById("dl-ps-cmd");
  if (psCmdEl) {
    psCmdEl.textContent =
      'Get-FileHash ".\\' + release.fileName + '" -Algorithm SHA256';
  }

  // GitHub Releases links & optional checksum link
  document.querySelectorAll("[data-releases-link]").forEach(function (link) {
    if (isSafeUrl(release.releasesPageUrl, false)) {
      link.setAttribute("href", release.releasesPageUrl);
    }
  });

  const checksumLink = document.getElementById("dl-checksum-link");
  if (checksumLink) {
    if (isSafeUrl(release.checksumFileUrl, false)) {
      checksumLink.setAttribute("href", release.checksumFileUrl);
      checksumLink.hidden = false;
    } else {
      checksumLink.hidden = true;
    }
  }

  // Format-aware Option A installation steps (safe DOM creation, no innerHTML)
  function appendTokenizedText(parent, template) {
    const tokenMap = {
      "{fileName}": release.fileName,
      "{executableName}": release.executableName,
      "{version}": release.version
    };
    const parts = String(template).split(/(\{fileName\}|\{executableName\}|\{version\})/g);
    parts.forEach(function (part) {
      if (Object.hasOwn(tokenMap, part)) {
        const code = document.createElement("code");
        code.textContent = tokenMap[part];
        parent.appendChild(code);
      } else if (part) {
        parent.appendChild(document.createTextNode(part));
      }
    });
  }

  const steps = Array.isArray(activeNotes.installSteps)
    ? activeNotes.installSteps
    : [];

  if (steps.length > 0) {
    document.querySelectorAll("[data-release-steps]").forEach(function (list) {
      list.replaceChildren();
      steps.forEach(function (step, index) {
        const card = document.createElement("div");
        card.className = "step-card";
        if (index === 0 && !isAvailable) {
          card.classList.add("placeholder-item");
        }

        const num = document.createElement("div");
        num.className = "step-num";
        num.textContent = String(index + 1);

        const content = document.createElement("div");
        const heading = document.createElement("h4");
        heading.style.margin = "0 0 4px";
        heading.style.fontSize = "16px";
        appendTokenizedText(heading, step.title || "");

        const body = document.createElement("p");
        body.style.margin = "0";
        body.style.fontSize = "14px";
        body.style.color = "var(--text-dim)";
        appendTokenizedText(body, step.body || "");

        content.appendChild(heading);
        content.appendChild(body);
        card.appendChild(num);
        card.appendChild(content);
        list.appendChild(card);
      });
    });
  }

  // Changelog hydration on download.html
  const changelogContainer = document.getElementById("dl-changelog");
  const changelogEntries = Array.isArray(release.changelog)
    ? release.changelog
    : [];
  if (changelogContainer && changelogEntries.length > 0) {
    changelogContainer.replaceChildren();
    changelogEntries.forEach(function (entry) {
      const block = document.createElement("div");
      block.className = "changelog-entry";

      const head = document.createElement("div");
      head.className = "changelog-entry-head";

      const ver = document.createElement("strong");
      ver.textContent = (entry.version || release.version) + " — " + (entry.tag || "Release");

      const datePill = document.createElement("span");
      datePill.className = "pill " + pillModifier;
      datePill.textContent = isPreviewReady
        ? "Preview Mode"
        : entry.date || release.releaseDate;

      head.appendChild(ver);
      head.appendChild(datePill);
      block.appendChild(head);

      if (Array.isArray(entry.highlights) && entry.highlights.length > 0) {
        const ul = document.createElement("ul");
        ul.className = "changelog-list";
        entry.highlights.forEach(function (item) {
          const li = document.createElement("li");
          li.textContent = item;
          ul.appendChild(li);
        });
        block.appendChild(ul);
      }

      changelogContainer.appendChild(block);
    });
  }

  // =========================================================================
  // 3. CLIENT OS DETECTION NOTE (download.html)
  // =========================================================================
  const osNotice = document.getElementById("dl-os-notice");
  if (osNotice) {
    const platformHint =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      navigator.userAgent ||
      "";
    const isWindows = /win/i.test(platformHint);
    const isMac = /mac|iphone|ipad/i.test(platformHint);
    const isLinux = /linux|android/i.test(platformHint);

    osNotice.classList.remove("os-compatible", "os-other");
    if (isWindows) {
      osNotice.classList.add("os-compatible");
      osNotice.textContent =
        "✓ Windows PC detected — compatible target platform (Windows 10/11 64-bit x86_64).";
    } else if (isMac || isLinux) {
      const osName = isMac ? "macOS / Apple device" : "Linux / Android";
      osNotice.classList.add("os-other");
      osNotice.textContent =
        "ℹ You are browsing from " +
        osName +
        ". Pay to Win runs natively on Windows 10/11 (64-bit x86_64) — you can still download the build here to transfer to a Windows PC.";
    } else {
      osNotice.hidden = true;
    }
  }

  // =========================================================================
  // 4. COPY BUTTONS & FAQ ACCORDION (INVOKER COMMANDS + SINGLE FALLBACK PATH)
  // =========================================================================
  const copyTimers = new WeakMap();
  let lastAnnouncement = "";

  function legacyCopy(text) {
    const field = Object.assign(document.createElement("textarea"), {
      value: text
    });
    field.setAttribute("readonly", "");
    field.style.cssText = "position:fixed;inset-block-start:0;opacity:0";
    document.body.append(field);
    field.select();
    try {
      return document.execCommand("copy");
    } finally {
      field.remove();
    }
  }

  function reportCopy(button, ok) {
    const tip = button.nextElementSibling;
    clearTimeout(copyTimers.get(button));
    button.removeAttribute("data-copied");
    button.removeAttribute("data-failed");

    let message = ok ? "Copied" : "Copy failed";
    if (message === lastAnnouncement) {
      message += "\u00A0";
    }
    lastAnnouncement = message;

    if (tip) tip.textContent = "";
    void button.offsetWidth;
    button.setAttribute(ok ? "data-copied" : "data-failed", "");
    if (tip) {
      requestAnimationFrame(function () {
        tip.textContent = message;
      });
    }

    copyTimers.set(
      button,
      setTimeout(function () {
        button.removeAttribute("data-copied");
        button.removeAttribute("data-failed");
        if (tip) tip.textContent = "";
      }, 2000)
    );
  }

  async function copyFromTarget(button, target) {
    if (!button || !target) return;
    const text = target.matches("input, textarea")
      ? target.value
      : target.innerText.trim();
    if (!text) return;

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
      } else if (!legacyCopy(text)) {
        throw new Error("Copy failed");
      }
      reportCopy(button, true);
    } catch {
      try {
        if (!legacyCopy(text)) {
          throw new Error("Copy failed");
        }
        reportCopy(button, true);
      } catch {
        reportCopy(button, false);
      }
    }
  }

  function toggleAllAccordion(button, container) {
    if (!button || !container) return;
    const expand = button.getAttribute("aria-expanded") !== "true";
    container.querySelectorAll(":scope > details").forEach(function (details) {
      details.open = expand;
    });
    button.setAttribute("aria-expanded", String(expand));
  }

  const supportsInvokerCommands =
    "CommandEvent" in window &&
    Object.hasOwn(HTMLButtonElement.prototype, "commandForElement");

  if (supportsInvokerCommands) {
    document.addEventListener(
      "command",
      function (event) {
        if (!event.command) return;
        if (event.command.startsWith("--copy")) {
          copyFromTarget(event.source, event.target);
        } else if (event.command === "--toggle-all") {
          toggleAllAccordion(event.source, event.target);
        }
      },
      true
    );
  } else {
    document.addEventListener("click", function (event) {
      const targetEl = event.target instanceof Element ? event.target : null;
      if (!targetEl) return;

      const copyBtn = targetEl.closest('button[command^="--copy"]');
      if (copyBtn) {
        const target = document.getElementById(
          copyBtn.getAttribute("commandfor") || ""
        );
        if (target) copyFromTarget(copyBtn, target);
        return;
      }

      const toggleBtn = targetEl.closest('button[command="--toggle-all"]');
      if (toggleBtn) {
        const target = document.getElementById(
          toggleBtn.getAttribute("commandfor") || ""
        );
        if (target) toggleAllAccordion(toggleBtn, target);
      }
    });
  }

  // Keep Expand/Collapse All button state synced with individual <details> toggles
  document.addEventListener(
    "toggle",
    function (event) {
      const targetEl = event.target instanceof Element ? event.target : null;
      if (!targetEl || !targetEl.matches(".accordion > details")) return;

      const accordion = targetEl.parentElement;
      if (!accordion || !accordion.id) return;

      const button = document.querySelector(
        '[command="--toggle-all"][commandfor="' + CSS.escape(accordion.id) + '"]'
      );
      if (!button) return;

      const items = accordion.querySelectorAll(":scope > details");
      const allOpen = Array.prototype.every.call(items, function (details) {
        return details.open;
      });
      button.setAttribute("aria-expanded", String(allOpen));
    },
    { capture: true }
  );
})();
