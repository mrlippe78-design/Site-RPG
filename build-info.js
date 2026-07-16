(function exposeMillenniumBuild() {
  const meta = document.querySelector('meta[name="millennium-commit"]');
  window.MILLENNIUM_BUILD_INFO = Object.freeze({
    version: "3.6.4-r3.1",
    commit: meta?.content || "dev",
    cacheName: "millennium-shell-v3.6.4-r3.1-firebase-circuit-r3-1",
  });
}());
