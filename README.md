# IoT Fullstack DevOps — projet

## 1️⃣ Résumé rapide
Application IoT simulée : génération de mesures (température, humidité, CO₂, lumière, bruit, pression, PM2.5) par un backend Node.js, affichage temps réel via React, monitoring Prometheus + Grafana, entièrement conteneurisée (Docker) et déployable via CI/CD (GitHub Actions).

## 2️⃣ Architecture & contenu du repo
projet-iot-devops/
├── backend/ # API Node.js (ES Modules)
├── frontend/ # React (Create React App)
├── infra/ # Docker-compose + monitoring
│ ├── monitoring/
│ │ ├── prometheus/
│ │ └── grafana/
│ └── docker-compose.yml
├── Dockerfile_backend
├── Dockerfile_frontend
└── .github/workflows/ci.yml


## 3️⃣ Prérequis locaux
- Node.js 18+ (recommandé)
- npm ou yarn
- Docker & Docker Compose (pour lancer la stack complète)
- Un compte Docker Hub si tu veux pusher les images
- (Optionnel) un VPS avec Docker pour le déploiement

## 4️⃣ Installation & exécution (dev)
### Backend
```bash
cd backend
npm install
npm run start    # ou `node src/index.js`
Frontend (dev)
cd frontend
npm install
npm start        # ouvre http://localhost:3000

Accès API / métriques

API latest : http://localhost:4000/api/sensors/latest

API history: http://localhost:4000/api/sensors/history

Prometheus metrics: http://localhost:4000/metrics

5️⃣ Exécution via Docker Compose (stack complète)
cd infra
docker-compose up --build


Services exposés :

Frontend : http://localhost:3000

Backend : http://localhost:4000

Prometheus : http://localhost:9090

Grafana : http://localhost:3001 (admin/admin par défaut, à changer)

6️⃣ CI / CD (GitHub Actions)

Le workflow ci.yml installe, teste, build les images Docker, push sur Docker Hub et déploie sur le VPS via SSH.

Secrets nécessaires dans GitHub:

DOCKERHUB_USERNAME, DOCKERHUB_TOKEN

VPS_HOST, VPS_USER, VPS_KEY, VPS_DIR

7️⃣ Monitoring & dashboards

Grafana provisionné avec un dashboard IoT Sensors Dashboard (temp, humidity, CO2, light, noise, pressure, pm25).

Prometheus scrappe l’endpoint /metrics du backend.

Développement futur / améliorations possibles

Auth (JWT)

WebSockets / MQTT pour push temps réel

Alerting Grafana (notifications Slack/Discord)

Tests E2E (Cypress)

Reverse proxy (Traefik/NGINX) + HTTPS (Let's Encrypt)