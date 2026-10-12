# Traxx Platform Workflow & Roles

To make sure the frontend we are building perfectly matches the business logic, it helps to step back and look at the whole ecosystem. Traxx is a **B2B2C (Business-to-Business-to-Consumer)** platform. 

Here is how the three main roles interact with the system.

## 1. High-Level Data Flow

```mermaid
flowchart TD
    %% Styling
    classDef admin fill:#f3f4f6,stroke:#6b7280,stroke-width:2px;
    classDef business fill:#eef2ff,stroke:#2f5cff,stroke-width:2px;
    classDef rider fill:#f0fdf4,stroke:#16a34a,stroke-width:2px;
    classDef system fill:#111827,stroke:#000,color:#fff,stroke-width:2px;

    %% Actors
    Admin["Traxx Admin\n(Superuser)"]:::admin
    Biz["Business\n(Fleet Manager)"]:::business
    Rider["Rider\n(Driver)"]:::rider

    %% Core System
    DB(("Traxx Cloud\nDatabase")):::system

    %% Admin Flow
    Admin -->|1. Creates account & sets billing| Biz
    Admin -.->|2. System Health & Support| DB

    %% Business Flow
    Biz -->|3. Adds Vehicles & Riders| DB
    Biz -->|4. Creates Delivery Task| DB
    DB -->|5. Sends Live Dashboard Data| Biz

    %% Rider Flow
    DB -->|6. Pushes Task Assignment| Rider
    Rider -->|7. Pings GPS Location| DB
    Rider -->|8. Updates Task (Picked Up/Delivered)| DB
    Rider -.->|9. Triggers Flag (Breakdown/Delay)| DB
    
    %% Alert Flow
    DB -.->|10. Notifies of Flags/Delays| Biz
```

---

## 2. Role Breakdown & Feature Matrix

### 👑 The Traxx Admin (Superuser)
* **Who they are:** You and your internal team at Traxx.ng.
* **What they use:** A secure, web-based admin panel (usually not the mobile app).
* **Their Goal:** Platform growth, billing, and global oversight.
* **Key Features:**
  - **Tenant Management:** Onboard new logistics businesses and disable accounts that don't pay their subscription.
  - **Global Analytics:** View total platform volume (e.g., "We processed 10,000 deliveries across all businesses today").
  - **Support Desk:** Resolve high-level technical tickets submitted by fleet managers.

### 🏢 The Fleet Manager
* **Who they are:** The single fleet-manager account for a logistics company (e.g., "Example Logistics Ltd") that uses your software.
* **What they use:** The main interface of the Mobile App (the Dashboard we just built) and likely a desktop web version.
* **Their Goal:** Maximize fleet efficiency, assign deliveries, and put out fires.
* **Key Features:**
  - **The Command Center:** View the dashboard metrics (Active Riders, Live Tasks, Flags, Idle).
  - **Task Creation:** Input customer drop-off details and generate Waybill Tracking Numbers.
  - **Dispatching:** Manually or auto-assign pending tasks to available (Idle) riders.
  - **Live Tracking:** Watch riders move on the GPS Map in real-time.
  - **Exception Handling:** Respond to "Flags" (e.g., a rider broke down, re-assign their package to someone else).
  - **Directory Management:** Add riders and register vehicles. Identity document collection is deferred.

### 🛵 The Rider (Driver)
* **Who they are:** The actual person on the motorcycle or in the van delivering the package.
* **What they use:** A simplified, distraction-free "Rider Mode" of the Mobile App.
* **Their Goal:** Complete assigned deliveries safely and accurately.
* **Key Features:**
  - **Duty Toggle:** Clock In / Clock Out (changes their status from Offline to Idle/Available).
  - **Task Inbox:** View their specifically assigned tasks for the day (they cannot see other riders' tasks).
  - **Delivery Execution:** Step-by-step UI to mark a task as: `Accepted` ➡️ `At Pickup` ➡️ `In Transit` ➡️ `Delivered`.
  - **Proof of Delivery:** Upload a photo of the dropped-off package or collect an e-signature.
  - **SOS / Flag Button:** Tap a quick button to alert the Business manager if they get a flat tire, have an accident, or can't find the customer.
  - **Background Tracking:** The app silently pings their GPS location every 10 seconds to the Traxx Cloud.

---

### How this impacts our Frontend App
Right now, our codebase is focused entirely on the **Fleet Manager** view.

Eventually, when you wire up Authentication, the first thing the app will do when a user logs in is check their role. If `role === 'rider'`, it will completely bypass our complex dashboard and route them to a simple map with a big "Current Task" card on the bottom of the screen.
