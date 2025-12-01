### 📘 Projet IoT : Collecte, Visualisation et Monitoring de Données Environnementales


### 🎯 Objectif du projet

    Ce projet a pour but de développer une plateforme IoT complète permettant :

    la génération ou la réception de données de capteurs (température, humidité, CO₂, lumière, bruit, pression, PM2.5)

    le stockage en base de données

    l’exposition d’une API REST pour accéder aux informations

    l’affichage d’un tableau de bord temps réel

    le monitoring du backend grâce à Prometheus et Grafana

    L’ensemble fonctionne via Docker Compose, garantissant portabilité et reproductibilité.



### 🏗️ Architecture générale

L’application s’appuie sur une architecture micro-services composée de :

✔ Backend (Node.js)

 -  API REST

 -  Simulateur de données IoT

 -  Export des métriques Prometheus

✔ Frontend (React)

 -  Dashboard utilisateur

 -  Graphiques temps réel

 -  Appels API vers le backend

✔ Base de données (PostgreSQL)

 -  Stockage persistant des mesures

 -  Initialisation automatique via script SQL

✔ Monitoring (Prometheus + Grafana)

 -  Collecte des métriques du backend

 -  Tableaux de bord préconfigurés

✔ Orchestration Docker

 -  Un fichier docker-compose.yml centralise tous les services.

### Schéma d’architecture 


                        ┌────────────────────────┐
                        │        FRONTEND        │
                        │     React / Nginx      │
                        │   http://localhost:3000 │
                        └─────────────┬──────────┘
                                      │
                                      ▼
                        ┌────────────────────────┐
                        │        BACKEND         │
                        │       Node.js API      │
                        │  http://localhost:4000 │
                        └─────────────┬──────────┘
                                      │
                         REST API     │      Metrics (/metrics)
                                      │
                     ┌────────────────┴─────────────────┐
                     │                                  │
                     ▼                                  ▼
        ┌────────────────────────┐         ┌────────────────────────┐
        │       POSTGRES         │         │      PROMETHEUS        │
        │   Stockage des mesures │ <────── │  Scrape metrics backend│
        │    Port 5432           │         │      Port 9090         │
        └─────────────┬──────────┘         └─────────────┬──────────┘
                      │                                    │
                      │                                    ▼
                      │                       ┌────────────────────────┐
                      │                       │        GRAFANA         │
                      │                       │ Dashboards + analyses  │
                      │                       │     Port 3001          │
                      │                       └────────────────────────┘
                      │
                      ▼
        ┌────────────────────────┐
        │  docker-compose.yml     │
        │   Orchestre tout        │
        └────────────────────────┘


### Diagramme des flux de données 
            (1) Génération des données →
            ──────────────────────────────────────
                    Backend (simulateur IoT)
            ──────────────────────────────────────
                            │
            (2) Insertion │ dans Postgres
                            ▼
                    ┌────────────────────┐
                    │    PostgreSQL      │
                    │ Stockage historique│
                    └────────────────────┘
                            │
            (3) Lecture   │ via API REST
                            ▼
                    ┌────────────────────┐
                    │     Backend        │
                    │   /api/sensors     │
                    └────────────────────┘
                            │
                            │ (4) Requête HTTP fetch
                            ▼
                    ┌────────────────────┐
                    │     Frontend       │
                    │   React Dashboard  │
                    └────────────────────┘

                Parallel flow (monitoring) :
            ────────────────────────────────────────

                Backend (metrics /metrics)
                            │
                            │ (A) Prometheus scrap every 5s
                            ▼
                    ┌────────────────────┐
                    │    Prometheus      │
                    │ Time-series scrape │
                    └────────────────────┘
                            │
                            │ (B) Queries
                            ▼
                    ┌────────────────────┐
                    │      Grafana       │
                    │ Visualisation live │
                    └────────────────────┘



### 📦 Services (Vue d’ensemble)
 
 -> Service	Rôle	Port
 -> Backend API	Génération + API REST	4000
 -> Frontend UI	Interface utilisateur	3000
 -> PostgreSQL	Base de données	5432
 -> Prometheus	Monitoring backend	9090
 -> Grafana	Dashboards	3001


### 🔁 Fonctionnement global

    Le backend génère périodiquement des valeurs de capteurs.

    Les données sont insérées dans PostgreSQL.

    Le frontend récupère l’information via l’API /api/sensors/latest.

    Prometheus interroge /metrics toutes les 5 secondes.

    Grafana utilise Prometheus comme source de données pour ses dashboards.


### 🛠️ Lancement du projet

Depuis le dossier infrastructure :

 - docker compose up --build


Les services deviennent accessibles :

Frontend : http://localhost:3000

Backend : http://localhost:4000

Metrics : http://localhost:4000/metrics

Prometheus : http://localhost:9090

Grafana : http://localhost:3001
 (admin/admin)



### 📊 Monitoring Prometheus

Exemples de métriques exposées :

iot_temperature
iot_humidity
iot_co2
iot_light
iot_noise
iot_pressure
iot_pm25


Prometheus les récupère automatiquement via :

metrics_path: /metrics
targets: ['backend:4000']




### 📈 Dashboard Grafana

Un tableau de bord complet est inclus :

        ->  Température

        ->  Humidité

        ->  CO₂

        ->  Lumière

        ->  Bruit

        ->  Pression

        ->  Particules PM2.5

Il se recharge automatiquement toutes les 5 secondes.



### 🧪 Tests
Backend :
npm test

Frontend :
npm test




### 🚀 CI (Intégration Continue)

La pipeline CI inclut :

        ->  installation des dépendances

        ->  tests automatiques

        ->  build frontend

        ->  build docker backend + frontend

        ->  publication d’images sur GitHub Packages




### 🔮 Améliorations futures

intégration réelle d’un capteur IoT via MQTT

migration vers TimescaleDB

ajout d’alertes Prometheus (CO₂ élevé, bruit important…)

export CSV dans l’interface React