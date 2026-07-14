(function configureMillenniumSecurity() {
  window.MILLENNIUM_SECURITY_CONFIG = Object.freeze({
    version: "3.6.3.1",
    appCheckSiteKey: "6LeEalItAAAAAOGgpv7wJCA_yajxeHciF_5tIAbi",
    appCheckProvider: "recaptcha-enterprise",
    appCheckAutoRefresh: true,
    economyQuarantineMinutes: 60,
    automaticSuspensionHours: 6,
    suspensionStrikeThreshold: 2,
    incidentRetentionDays: 180,
  });
}());
