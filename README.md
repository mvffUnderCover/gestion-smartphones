# Projet Fil Rouge – Plateforme de Gestion de Smartphones

Sonatel Academy

## Présentation Générale

Ce projet fil rouge a été réalisé dans le cadre de la formation intensive à la Sonatel Academy, avec pour objectif de concevoir une application backend robuste, intégrant des logiques métier réelles, et déployée selon les standards professionnels DevOps et Cloud Native.

L’application est une plateforme complète de gestion de smartphones, pensée non pas comme un simple CRUD, mais comme un système backend structurant, intégrant :

une architecture modulaire

des pipelines CI/CD automatisés

une conteneurisation complète

une orchestration Kubernetes

Ce projet reflète ma capacité à concevoir, industrialiser et opérer une application backend moderne en production.

## Objectifs Techniques du Projet

Concevoir une API backend solide avec des règles métier non triviales

Mettre en place une architecture scalable et maintenable

Appliquer les bonnes pratiques DevOps (CI/CD, Docker, Kubernetes)

Automatiser entièrement le build, le déploiement et la livraison

Simuler un environnement proche de la production

Architecture Globale
Client (React + Tailwind)
        |
        v
API Backend (Express.js)
        |
        v
Base de données (MongoDB)
        |
        v
Docker → CI/CD → Docker Hub
        |
        v
Kubernetes (Docker Desktop)

## Stack Technique

### Backend

- Node.js / Express.js

- MongoDB (modélisation des données & relations)

- Architecture modulaire (routes, services, controllers, middlewares)

- Gestion des erreurs et validations

- Séparation claire des responsabilités

### Frontend

- React

- Tailwind CSS

- Consommation sécurisée de l’API REST

### DevOps / Cloud Native

- Docker (Frontend & Backend dockerisés)

- Docker Hub (registry d’images)

- Jenkins (local) pour CI/CD

- Webhooks GitHub + Grok pour déclencher automatiquement les pipelines

- Kubernetes (orchestration via Docker Desktop)

## Logique Métier Implémentée

Le backend ne se limite pas à un simple CRUD.
Il repose sur la conception d’une API REST de gestion de smartphones, développée avec Express.js et MongoDB, et structurée de manière modulaire.

Il comprend notamment :

- Un module connectdb dédié à la connexion et à la configuration de la base de données MongoDB

- Un module model pour la définition et la gestion des modèles de données

- Un module controller regroupant la logique métier, avec les fonctionnalités suivantes :

     - Ajout d’un smartphone

     - Récupération de l’ensemble des smartphones

     - Récupération des informations détaillées d’un smartphone spécifique

     - Mise à jour des informations d’un smartphone

     - Suppression d’un smartphone

- Un module de routage chargé de définir et d’exposer les différentes routes de l’API

- Un fichier app servant de point d’entrée de l’application et assurant l’initialisation globale du backend

## CI/CD & Automatisation

- Un pipeline complet a été mis en place :

- Push de code sur GitHub

- Déclenchement automatique via Webhooks

- Notification de Jenkins en local à l’aide de Grok

- Build automatique des images Docker

- Push des images vers Docker Hub

- Mise à jour des services orchestrés par Kubernetes

Résultat : Chaque git push déclenche une intégration et un déploiement automatisés, sans intervention manuelle.

## Orchestration Kubernetes

- Déploiement des conteneurs frontend et backend

- Gestion des services

- Préparation à une montée en charge

- Environnement proche d’un cluster de production

Ce choix permet :

  - une meilleure résilience

  - une isolation des services

  - une base solide pour un déploiement cloud futur

## Ce que ce projet démontre

✔️ Solide maîtrise du backend Node.js
✔️ Capacité à concevoir une architecture backend propre et évolutive
✔️ Maîtrise de Docker & Kubernetes
✔️ Compréhension réelle des enjeux CI/CD & DevOps
✔️ Vision production-ready, pas académique
✔️ Autonomie de bout en bout (code → déploiement → orchestration)