(function exposeMillenniumBuild() {
  const meta = document.querySelector('meta[name="millennium-commit"]');
  window.MILLENNIUM_BUILD_INFO = Object.freeze({
    version: "3.5.2",
    commit: meta?.content || "dev",
    cacheName: "millennium-shell-v3.5.2",
  });
}());
