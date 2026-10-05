## Traxx Platform Feature Documentation

This document outlines the complete feature set, page structures, and data points for the Traxx dashboard based on the platform review.

### 1. Workspace

* **Overview (Dashboard):**
* **Quick Metrics:** Counters for Active Riders, Live Assignments, Flagged Events, and Idle Riders.
* **Onboarding/Setup:** Prominent "Add First Rider" banner emphasizing mandatory NIN verification before tracking begins.
* **Widgets:** Layouts for Fleet Map, Recent Alerts, Fleet Status, and Today's Assignments.
* **Quick Actions:** AI Search bar and a quick-copy link for the shareable booking page.


* **Live Map:**
* **Interactive Interface:** GPS map (centered on Lagos area) with a "Reset View" control.
* **Status Filters:** Quick toggles for All, On Trip, Idle, Flagged, and Offline.
* **Fleet Summary:** Floating legend overlay showing color codes (🟢 On Trip, 🟡 Idle, 🔴 Flagged, ⚪ Offline) and current vehicle counts.
* **Live Indicator:** Bottom-right badge displaying the last refresh time (e.g., "Updated 3s ago").


* **Assignments:**
* **Task Ledger:** Comprehensive table tracking ID, Rider, Type, Pickup, Delivery, Status, ETA, Priority, and Actions.
* **Filters & Search:** Search bar (by ID or Rider) and status/type pills (All, In Transit, Pending, Overdue, Deliveries, Pickups).
* **Actions:** "New Assignment" creation button.


* **Requests:**
* **Inbound Management:** Hub for customer delivery requests generated from the public booking page.
* **Filters & Search:** Search bar (by name, phone, address, or tracking code) and status pills (All, Pending, Accepted, Declined).


* **Notifications:**
* **Alert Center:** System notifications and operational warnings grouped by day.
* **Actions:** "Resolve all" button to clear active alerts.



### 2. People

* **Riders:**
* **Directory:** Table displaying Rider, Vehicle/Plate, KYC Status, Trips (Month), On Time Rate, Flags, and Status.
* **Actions:** Search by name/plate, Export to CSV, and "+ Add Rider".


* **Shifts:**
* **Pending Sign Off Requests:** Queue for manual approval/declining of rider sign-offs (no auto-approvals).
* **Sign Off History:** Log of approved/declined requests showing Rider, Requested Time, Reason, Decision, and Decided Timestamp.
* **Shift Log:** Daily attendance record tracking Rider, Clock In, Clock Out, Hours, Trips, and Status, with CSV export capabilities.


* **Vendors:**
* **Partner Management:** Directory for third-party partners and suppliers. Linking vendors to assignments enables automatic notifications.
* **Actions:** Search by name, Export to CSV, and "+ Add Vendor".



### 3. Analytics & Intelligence

* **Reports:**
* **Flag Log:** Permanent audit trail of route deviations or alerts (resolved flags are retained). Tracks Rider, Flag Type, Description, When, Status, and Action. Includes a dropdown filter by Flag Type and a "Resolve all" button.
* **Additional Report Tabs:** Rider Scorecards, GPS Replay (route history), Daily Report, and Fuel & Complaints.


* **Traxx AI:**
* **Conversational Interface:** Fleet intelligence assistant capable of analyzing operational data (e.g., driver performance, delayed deliveries, fuel consumption trends, delivery volume predictions).
* **Features:** Chat history sidebar and suggested quick prompts.



### 4. Setup & Configuration

* **Booking Page:**
* **Public Access:** Shareable booking link and downloadable QR Code.
* **Website Integration:** Embed codes for WordPress, Shopify, and custom sites (e.g., "Request a Quote" button).
* **Customization:** Toggles to enable/disable the booking page, add custom footer messages, and configure Hub Locations (drop-off points).
* **Payment Settings:** Options for Cash on Delivery vs. Pay Before Delivery, bank details, social media handles, and custom payment notes.


* **Pricing & Zones:**
* **Pricing Models:** Configuration for "Zone-based + per-km fallback" or "Per-km rate only". Default rate acts as a fallback (e.g., ₦2,500/km).
* **Zone Management:** Tools to "+ Add Zone" or "Bulk Add" known areas.
* **Customer Visibility:** Toggle to show/hide pricing quotes on the public booking page.
* **Testing Tool:** Built-in "Preview a quote" calculator using pickup and drop-off inputs.



### 5. Settings & Global Tools

* **Company Profile (Settings):**
* **Account Details:** Form fields for Company Name, CAC Registration, Industry, State, LGA, Email, and Phone.
* **Additional Settings Tabs:** Subscription management (Starter Plan), Sign Off Approvers, Alert Configuration, and Billing History.


* **Feedback Modal:**
* **User Reporting:** Form to submit Bug Reports, Feature Requests, Rider App Issues, Billing/Subscription queries, or Performance feedback. Includes a text area with a character counter and a microphone icon for voice dictation.


* **Global Controls:**
* Universal search bar in the side navigation.
* Dark mode / Light mode toggle.
* Account switcher and Sign out functionality.