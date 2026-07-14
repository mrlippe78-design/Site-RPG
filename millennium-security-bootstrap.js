(function bootstrapMillenniumSecurity() {
  const firebaseConfig = {
    apiKey: "AIzaSyAyCR1Hod1kFemfLkXlPme88ihbRFlXhaM",
    authDomain: "sorteioafinidade.firebaseapp.com",
    projectId: "sorteioafinidade",
    storageBucket: "sorteioafinidade.firebasestorage.app",
    messagingSenderId: "338718810770",
    appId: "1:338718810770:web:7c0cc44fbf70df30b27c4b",
  };
  const config = window.MILLENNIUM_SECURITY_CONFIG || {};
  const state = {
    configured: Boolean(String(config.appCheckSiteKey || "").trim()),
    enabled: false,
    provider: config.appCheckProvider || "recaptcha-enterprise",
    reason: "not-initialized",
  };

  try {
    if (!window.firebase?.initializeApp) {
      state.reason = "firebase-unavailable";
      window.MILLENNIUM_APP_CHECK_STATE = Object.freeze(state);
      return;
    }

    firebase.apps?.length ? firebase.app() : firebase.initializeApp(firebaseConfig);

    if (config.appCheckEnabled !== true) {
      state.reason = "paused-for-stability";
      window.MILLENNIUM_APP_CHECK_STATE = Object.freeze(state);
      return;
    }

    const key = String(config.appCheckSiteKey || "").trim();
    if (!key) {
      state.reason = "site-key-pending";
      window.MILLENNIUM_APP_CHECK_STATE = Object.freeze(state);
      return;
    }
    if (!firebase.appCheck?.ReCaptchaEnterpriseProvider) {
      state.reason = "app-check-sdk-unavailable";
      window.MILLENNIUM_APP_CHECK_STATE = Object.freeze(state);
      return;
    }

    const appCheck = firebase.appCheck();
    appCheck.activate(
      new firebase.appCheck.ReCaptchaEnterpriseProvider(key),
      config.appCheckAutoRefresh !== false,
    );
    state.enabled = true;
    state.reason = "active";
  } catch (error) {
    state.reason = String(error?.code || error?.message || "initialization-failed").slice(0, 160);
    console.warn("Millennium App Check não foi ativado:", error);
  }

  window.MILLENNIUM_APP_CHECK_STATE = Object.freeze(state);
}());
