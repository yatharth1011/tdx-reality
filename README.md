# ⚡ TDX Reality Engine

![TDX Reality Engine Overview](https://img.shields.io/badge/Status-Active-success) ![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Android-blue) ![Tech Stack](https://img.shields.io/badge/Tech-HTML%20%7C%20JS%20%7C%20Firebase-orange)

**TDX Reality Engine** is a highly gamified, advanced study-tracking and productivity application. Tailored particularly for rigorous competitive exam preparation (like JEE/NEET), it transforms mundane study routines into a "Combat Matrix" where study resources, task completion, and performance metrics are tracked with precision. 

🌍 **Live Web App**: [tdx-reality.web.app](https://tdx-reality.web.app/)

---

## ✨ Key Features

* **Gamified "Command Centre" UI:** Transforms your daily study targets into "Daily Missions" and subject progress into "Combat Data".
* **Extensive Resource Mapping:** Directly integrates with heavy preparation materials (e.g., Physical Chem, Organic Chem, Math Yellow Book, Physics GQB). Users can quickly generate a matrix of chapters and sections for bulk-tracking.
* **💧 Droplet Engine & Porosity Tracking:** A unique algorithm that calculates "Optimal Campaign Porosity". If you can't solve every question, the engine uses gradient descent to minimize *X* (as in doing "1 in X" questions) across all subjects globally, ensuring maximum syllabus coverage without burnout.
* **Dynamic Daily Missions:** Add one-off custom objectives or question targets that disappear the next day if left incomplete.
* **Mood & Tradeoff Analysis:** Analyzes your daily capacity and subject mood to dynamically override task distribution without altering your total daily cap.
* **Cloud Sync:** Uses Google Authentication to sync your "battle data" seamlessly across web and mobile platforms.
* **Raw Data Editor:** Gives you complete granular control to manually edit resources, subjects, and past logs. 

---

## 🛠️ Tech Stack

* **Frontend:** Vanilla JavaScript (62.6%), HTML5 (24.7%), CSS3 (12.6%)
* **Backend / BaaS:** Google Firebase
  * **Authentication:** Google Sign-in integration
  * **Database:** Cloud Firestore & Realtime Database (with custom security rules)
  * **Hosting:** Firebase Hosting
* **Mobile / Packaging:** Contains a specialized `TDX - Google Play package` for Android app compilation.

---

## 📂 Repository Structure

```text
tdx-reality/
├── public/                     # Main frontend web assets (HTML, CSS, JS, UI components)
├── TDX - Google Play package/  # Package files and assets for Google Play / Android deployment
├── backups/                    # Backup folders (backup1, backup2, backup3) for version states
├── .firebaserc                 # Firebase project configuration
├── firebase.json               # Firebase hosting and deployment settings
├── firestore.indexes.json      # Firestore database indexing rules
├── firestore.rules             # Firestore security and access rules
├── database.rules.json         # Realtime Database security rules
└── tdx-v20.html                # App entry/view file

```

---

## 🚀 Setup & Installation

To run the TDX Reality Engine locally or deploy it to your own Firebase project, follow these steps:

### Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine (A Node installer `node-v24.18.0-x64.msi` is included in the repo if needed for Windows).
* Firebase CLI installed globally (`npm install -g firebase-tools`).

### 1. Clone the repository

```bash
git clone https://github.com/yatharth1011/tdx-reality.git
cd tdx-reality

```

### 2. Connect to Firebase

You will need to link this to your own Firebase project or get access to the existing one.

```bash
firebase login
firebase init

```

*(Select Hosting, Firestore, and Realtime Database. Do not overwrite existing rule files when prompted).*

### 3. Run Locally

Serve the application locally using the Firebase emulator/hosting server:

```bash
firebase serve

```

The application will be available at `http://localhost:5000`.

### 4. Deployment

To push changes to the live Firebase hosting environment:

```bash
firebase deploy

```

---

## 📱 Android Build (Google Play)

The repository contains a `TDX - Google Play package` folder and a `.zip` file. This contains the wrapped web application and specific assets configured for submission to the Google Play Store. It also contains the final APK to be installed on android devices.

---

## 📝 License & Contributing

* Currently maintained by [yatharth1011](https://github.com/yatharth1011).
* Feel free to fork the repository and submit Pull Requests for bug fixes or feature additions. If you encounter any issues, please open an issue in the tracker.
