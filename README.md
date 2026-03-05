# 🌊 Wave Analysis Workstation

A **Coastal Wave Monitoring Dashboard** for visualizing ocean wave parameters such as **wave height, wave period, direction, current speed, latitude, and longitude** using **buoy measurements and model predictions**.

This project provides an interactive dashboard where users can explore ocean data across multiple coastal locations and filter datasets by time range.

---

## 🚀 Project Overview

The **Wave Analysis Workstation** helps monitor ocean conditions using time-series visualization.
It compares **real buoy sensor measurements** with **model predictions** to analyze ocean wave behavior.

The system supports:

* Coastal location selection
* Time range filtering
* Interactive wave charts
* Buoy vs Model comparison
* Zooming and brushing on charts

---

## 🛠 Tech Stack

### Frontend

* React.js
* D3.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Data Handling

* JSON dataset
* Day.js for time filtering

---

## 📊 Features

* 🌍 **Multiple Coastal Locations**

  * Visakhapatnam
  * Chennai
  * Mumbai
  * Goa
  * Kochi
  * Puri

* 📅 **Custom Date Range Filtering**

* 📈 **Interactive Charts**

  * Latitude
  * Longitude
  * Significant Wave Height (Hm0)
  * Wave Period (T1)
  * Wave Direction
  * Current Speed

* 🔎 **Zoom & Brush Exploration**

* 🔄 **Buoy vs Model Data Comparison**

---

## 📂 Project Structure

```
wave-analysis-workstation
│
├── backend
│   ├── data
│   │   ├── Visakhapatnam.json
│   │   ├── Chennai.json
│   │   ├── Mumbai.json
│   │   └── ...
│   │
│   ├── routes
│   │   └── wave.routes.js
│   │
│   ├── services
│   │   └── wave.service.js
│   │
│   └── server.js
│
├── wave-frontend
│   ├── components
│   │   ├── ExplorerChart.jsx
│   │   └── OceanChart.jsx
│   │
│   ├── api
│   │   └── waveApi.js
│   │
│   ├── utils
│   │   └── transformWaveData.js
│   │
│   └── App.jsx
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```
git clone https://github.com/siddu2549/wave-analysis-workstation.git
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd wave-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Get Dataset Metadata

```
GET /wave/meta
```

Returns dataset start time, end time and interval.

---

### Get Wave Data

```
GET /wave?from=YYYY-MM-DDTHH:mm:ss&to=YYYY-MM-DDTHH:mm:ss&location=City
```

Example:

```
/wave?from=2026-02-01T00:00:00&to=2026-02-11T00:00:00&location=Chennai
```

---

## 🌊 Data Parameters

| Parameter         | Description                       |
| ----------------- | --------------------------------- |
| **Latitude**      | Geographic position (north/south) |
| **Longitude**     | Geographic position (east/west)   |
| **Hm0**           | Significant wave height           |
| **T1**            | Wave period                       |
| **Direction**     | Wave direction in degrees         |
| **Current Speed** | Ocean current velocity            |

---

## 📈 Visualization

Charts compare:

* 🔵 **Buoy Data** (real measurements)
* 🔴 **Model Data** (predicted values)

Users can zoom into specific time ranges for detailed analysis.

---

## 🔮 Future Improvements

* Real-time buoy data streaming
* Map-based station selection
* Live ocean monitoring
* Statistical summaries
* Mobile responsive interface

---

## 👨‍💻 Author

**Chandra Siddhartha Bellamkonda**

B.Tech Computer Science
AI & Data Science Enthusiast

---

## 📄 License

This project is for **educational and research purposes**.
