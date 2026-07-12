(function exposeMillenniumStability() {
  "use strict";

  function mergeRenderRequests(previous = null, next = {}) {
    if (!previous) {
      return {
        critical: Boolean(next.critical),
        preserveFocus: next.preserveFocus !== false,
        preserveScroll: next.preserveScroll !== false,
        route: next.route || "",
        reason: next.reason || "unspecified",
        views: Array.isArray(next.views) ? [...new Set(next.views)] : null,
      };
    }

    const previousViews = Array.isArray(previous.views) ? previous.views : [];
    const nextViews = Array.isArray(next.views) ? next.views : [];
    return {
      critical: Boolean(previous.critical || next.critical),
      preserveFocus: previous.preserveFocus !== false && next.preserveFocus !== false,
      preserveScroll: previous.preserveScroll !== false && next.preserveScroll !== false,
      route: next.route || previous.route || "",
      reason: next.reason || previous.reason || "unspecified",
      views: previousViews.length || nextViews.length ? [...new Set([...previousViews, ...nextViews])] : null,
    };
  }

  function shouldDeferRender({ critical = false, activeText = false, dirtyForm = false, liveSession = false } = {}) {
    if (critical) return { defer: false, reason: "critical" };
    if (liveSession) return { defer: true, reason: "live-session" };
    if (activeText) return { defer: true, reason: "active-text" };
    if (dirtyForm) return { defer: true, reason: "dirty-form" };
    return { defer: false, reason: "ready" };
  }

  function createLatestTask(callback, delay = 160, timerApi = globalThis) {
    let timer = 0;
    let sequence = 0;
    let latestPayload;

    const cancel = () => {
      sequence += 1;
      if (timer) timerApi.clearTimeout(timer);
      timer = 0;
    };

    const run = async (runSequence, payload) => {
      timer = 0;
      if (runSequence !== sequence) return false;
      await callback(payload, runSequence);
      return runSequence === sequence;
    };

    const schedule = (payload) => {
      latestPayload = payload;
      if (timer) timerApi.clearTimeout(timer);
      const runSequence = ++sequence;
      timer = timerApi.setTimeout(() => run(runSequence, latestPayload), delay);
      return runSequence;
    };

    const flush = () => {
      if (!timer) return Promise.resolve(false);
      timerApi.clearTimeout(timer);
      timer = 0;
      const runSequence = sequence;
      return run(runSequence, latestPayload);
    };

    return Object.freeze({
      schedule,
      cancel,
      flush,
      get pending() { return Boolean(timer); },
      get sequence() { return sequence; },
    });
  }

  function replaceHtmlIfChanged(element, html) {
    if (!element || element.innerHTML === html) return false;
    element.innerHTML = html;
    return true;
  }

  function boundedHistory(history, entry, maximum = 30) {
    const next = [...(Array.isArray(history) ? history : []), entry];
    return next.slice(-Math.max(1, maximum));
  }

  window.MILLENNIUM_STABILITY_31 = Object.freeze({
    mergeRenderRequests,
    shouldDeferRender,
    createLatestTask,
    replaceHtmlIfChanged,
    boundedHistory,
  });
}());
