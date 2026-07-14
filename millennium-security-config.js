(function configureMillenniumSecurity() {
  window.MILLENNIUM_SECURITY_CONFIG = Object.freeze({
    version: "3.6.3",
    appCheckSiteKey: "6LeoW1ItAAAAAKStJ2mMm9DAPgCZLMOTiilyqXx7",
    appCheckProvider: "recaptcha-enterprise",
    appCheckAutoRefresh: true,
    economyQuarantineMinutes: 60,
    automaticSuspensionHours: 6,
    suspensionStrikeThreshold: 2,
    incidentRetentionDays: 180,
  });
}());
