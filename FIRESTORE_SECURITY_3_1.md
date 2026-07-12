# Firestore Security 3.1

## Security boundary

The browser is not trusted to award currency, affinities, pets, items, titles, pass rewards, rarity, stars, XP, or approvals. Player-owned edits are limited to identity, public profile, narrative text, media focus, selected missions, and one validated development-point operation.

Economy actions now have a protected request path:

1. The player creates an immutable `operationRequests` document with `status: pending` and an idempotency key.
2. The Oracle reviews or processes the request.
3. The Oracle writes the reward and an `auditLogs` record in the same batch.
4. A receipt prevents a second reward for the same idempotency key.

This is the safest free-tier design without a trusted server. Automatic economy processing cannot be made tamper-proof in browser JavaScript alone.

## Administrator authorization

Rules accept an administrator from one of these server-readable signals:

- private document `admins/{uid}`;
- existing locked `users/{uid}.role == admin` record for migration compatibility.

No email address is used as the only authorization barrier. Players cannot create or change their role.

## Audit contract

Sensitive administrator mutations require `lastAuditId` on the target document and an immutable `auditLogs/{lastAuditId}` created in the same batch. The log records administrator, target, field, previous value, next value, reason, and server timestamp.

## Compatibility and publication

Do not publish these rules before the 3.1 client migration is deployed. The legacy client writes economy fields directly; those writes are intentionally denied by 3.1 rules. During rollout, deploy the compatible client first, verify Demo and Emulator tests, then publish rules and indexes.

No legacy document is deleted by these rules.
