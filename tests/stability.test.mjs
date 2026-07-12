import assert from "node:assert/strict";
import { before, test } from "node:test";

before(async () => {
  globalThis.window = globalThis;
  await import("../millennium-stability.js");
});

test("render requests coalesce without losing a critical update", () => {
  const first = window.MILLENNIUM_STABILITY_31.mergeRenderRequests(null, {
    critical: false,
    preserveFocus: true,
    preserveScroll: true,
    route: "codex",
    reason: "snapshot",
    views: ["codex"],
  });
  const merged = window.MILLENNIUM_STABILITY_31.mergeRenderRequests(first, {
    critical: true,
    preserveFocus: false,
    route: "profile",
    reason: "permission-change",
    views: ["profile"],
  });
  assert.equal(merged.critical, true);
  assert.equal(merged.preserveFocus, false);
  assert.equal(merged.route, "profile");
  assert.deepEqual(merged.views, ["codex", "profile"]);
});

test("critical renders bypass typing and live-session deferral", () => {
  const critical = window.MILLENNIUM_STABILITY_31.shouldDeferRender({
    critical: true,
    activeText: true,
    dirtyForm: true,
    liveSession: true,
  });
  const typing = window.MILLENNIUM_STABILITY_31.shouldDeferRender({
    critical: false,
    activeText: true,
  });
  assert.equal(critical.defer, false);
  assert.equal(typing.defer, true);
  assert.equal(typing.reason, "active-text");
});

test("latest debounced task discards older queued work", async () => {
  const calls = [];
  const task = window.MILLENNIUM_STABILITY_31.createLatestTask((payload) => calls.push(payload), 5);
  task.schedule("old");
  task.schedule("new");
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(calls, ["new"]);
  assert.equal(task.pending, false);
});

test("cancelled debounced work never executes", async () => {
  const calls = [];
  const task = window.MILLENNIUM_STABILITY_31.createLatestTask((payload) => calls.push(payload), 5);
  task.schedule("cancelled");
  task.cancel();
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(calls, []);
});

test("bounded render history keeps only the newest entries", () => {
  let history = [];
  for (let index = 0; index < 5; index += 1) {
    history = window.MILLENNIUM_STABILITY_31.boundedHistory(history, index, 3);
  }
  assert.deepEqual(history, [2, 3, 4]);
});
