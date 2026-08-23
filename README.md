# BIT-SHIELD | Local Air-Gapped AML & Forensics Platform

BIT-SHIELD is an enterprise-grade, privacy-centric, offline Anti-Money Laundering (AML) and cryptocurrency forensics platform designed for air-gapped defense and intelligence environments. The platform executes entirely on local hardware (127.0.0.1), ensuring zero data egress and absolute data sovereignty.

---

## Architecture & Core Components

* Feature Pipeline: High-performance Polars-backed engine for processing blockchain transactions and extracting behavioral metrics.
* Anomaly Detection: Unsupervised Isolation Forest model paired with statistical risk evaluation.
* Max-Spike Scoring Engine: Custom multi-factor scoring logic that prevents risk dilution by prioritizing individual severe feature spikes.
* Dual-Layer Graph Engine: NetworkX graph generator mapping wallet-to-wallet transactions and shared infrastructure endpoints.
* Tech Stack: Python 3 (FastAPI, Polars, Scikit-Learn, NetworkX) + Next.js 15 (TypeScript, Tailwind CSS).

---

## Prerequisites

Ensure the following tools are installed on your host machine before setup:
* Python: 3.10 or higher
* Node.js: 18.0 or higher (includes npm)
* Git: Installed and configured on your system

---

## Environment Setup & Installation

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd bit-shield
```

### Step 2: Backend Virtual Environment Setup
A virtual environment (.venv) is required to isolate Python dependencies and prevent system-level package conflicts.

#### On macOS / Linux:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

#### On Windows (Command Prompt / PowerShell):
```cmd
python -m venv .venv
.venv\Scripts\activate
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 3: Frontend Dependency Installation
Open a secondary terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

---

## System Execution Guide

To operate BIT-SHIELD, launch both the FastAPI backend and Next.js frontend concurrently in separate terminal sessions.

### Terminal 1 - Backend API Service
From the root directory (bit-shield):
```bash
source .venv/bin/activate
PYTHONPATH=. .venv/bin/python backend/main.py
```
* API Service Address: http://127.0.0.1:8000
* Swagger API Documentation: http://127.0.0.1:8000/docs

### Terminal 2 - Frontend Client Application
From the frontend directory:
```bash
cd frontend
npm run dev
```
* Web Dashboard: http://localhost:3000

---

## Collaborative Workflow

* Self-Contained Local Infrastructure: Every team member runs a local instance of the FastAPI backend and Next.js frontend. No external cloud credentials or remote API keys are needed.
* Frontend Development: UI components and dashboard layouts are located under frontend/app/ and frontend/components/. Changes auto-reload in real-time.
* Backend Development: Scoring rules, features, and model pipelines reside in src/ and backend/services/. The FastAPI service auto-reloads on file changes.

---

## Troubleshooting

* ModuleNotFoundError: Verify that your virtual environment is active ((.venv) prefix in terminal) and PYTHONPATH=. is included when running Python scripts manually.
* Port Conflicts: Ensure ports 8000 (Backend) and 3000 (Frontend) are not occupied by other background processes.
