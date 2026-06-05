# Security Specification (`security_spec.md`)

This security specification implements attribute-based access control for the Addictive Marketing showcase project database. It enforces high-integrity zero-trust boundaries to ensure only the verified owner can alter database records, while granting public viewing rights for visitors.

## 1. Data Invariants
- **Showcase Items are Public-Read**: Any visitor can list and read the portfolio showcases.
- **Admin-Only Modification**: Only the verified owner (`vedantssane2008@gmail.com` with a verified email) can perform CRUD operations on target projects.
- **Strict Schema Enforcement**: A work item must match the 8 defined schema keys exactly. No excess or shadow keys (e.g., tags, roles) are allowed on the objects.
- **ID Safety**: Every document ID must match `^[a-zA-Z0-9_\-]+$` and be under 128 characters.
- **Immutable Timestamp**: The `createdAt` property represents server time and must be unmodifiable post-creation.

## 2. The "Dirty Dozen" Malicious Payloads
These payloads attempt to breach the laws of identity, schema integrity, and timestamps.

### Payload 1: Guest Write (Privilege Escalation)
Guest user attempts to upload a project with no auth token.
* **Result**: `PERMISSION_DENIED`

### Payload 2: Non-Admin Authenticated Write (Privilege Escalation)
An authenticated Google user with email `hacker@mischief.com` attempts to create a showcase.
* **Result**: `PERMISSION_DENIED`

### Payload 3: Spoofed Verified-Email Attack
A user attempts to write with email `vedantssane2008@gmail.com` but with `email_verified: false` token.
* **Result**: `PERMISSION_DENIED`

### Payload 4: Guest Project Delete
An anonymous user attempts to wipe an existing project.
* **Result**: `PERMISSION_DENIED`

### Payload 5: shadow Update (Ghost fields)
The owner attempts to update a document by adding an unapproved `isAdminShowcase` flag.
* **Result**: `PERMISSION_DENIED`

### Payload 6: ID Poisoning (Malicious Document Path ID)
Owner attempts to create a document with ID containing junk characters or SQL injections like `proj;DROP_TABLE`.
* **Result**: `PERMISSION_DENIED`

### Payload 7: Invalid Enum Categorization
Owner attempts to set the category to `longform` (which is not in the allowed pool: `shorts`, `reels`, `youtube`, `ads`, `campaigns`).
* **Result**: `PERMISSION_DENIED`

### Payload 8: Immutable Temporal Manipulation
Owner tries to update a project's `createdAt` to a moment in the past.
* **Result**: `PERMISSION_DENIED`

### Payload 9: Client Timestamp Spoofing (Temporal integrity)
Owner creates a design item with client-side clock time instead of strict `request.time`.
* **Result**: `PERMISSION_DENIED`

### Payload 10: Oversized Description Field (Denial-of-Wallet)
Owner tries to set the description field to a 10MB string to exhaust storage resources.
* **Result**: `PERMISSION_DENIED`

### Payload 11: Under-sized key count
Owner attempts to push a project missing the `metrics` parameter.
* **Result**: `PERMISSION_DENIED`

### Payload 12: Invalid Title Type
Owner attempts to push a project package where `title` is a Boolean (`true`) rather than a string.
* **Result**: `PERMISSION_DENIED`

---

## 3. Test Runner Specification
Here is the conceptual validation script designed for mock-testing these gates:

```typescript
// firestore.rules.test.ts
import { assertFails, assertSucceeds, initializeTestEnvironment } from "@firebase/rules-unit-testing";

describe("Addictive Agency Rules Suite", () => {
  it("prevents anonymous writes", async () => {
    const db = (await initializeTestEnvironment({ projectId: "test-app" })).unauthenticatedContext().firestore();
    await assertFails(db.collection("projects").add({ title: "Hack" }));
  });

  it("prevents unauthorized emails from writing", async () => {
    const db = (await initializeTestEnvironment({ projectId: "test-app" }))
      .authenticatedContext("user-123", { email: "fake@gmail.com", email_verified: true })
      .firestore();
    await assertFails(db.collection("projects").add({ title: "Hack" }));
  });

  it("permits verified executive owner writes", async () => {
    const db = (await initializeTestEnvironment({ projectId: "test-app" }))
      .authenticatedContext("owner-admin", { email: "vedantssane2008@gmail.com", email_verified: true })
      .firestore();
    // Valid object including strict server-time rules passed...
  });
});
```
