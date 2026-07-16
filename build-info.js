(function exposeMillenniumBuild() {
  const meta = document.querySelector('meta[name="millennium-commit"]');
  window.MILLENNIUM_BUILD_INFO = Object.freeze({
    version: "3.6.4-r3.4",
    commit: meta?.content || "dev",
    cacheName: "millennium-shell-v3.6.4-r3.4-race-identity-r3-4",
  });
}());
