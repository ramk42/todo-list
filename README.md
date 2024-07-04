# todo-list for junior developer 

### Énoncé de Projet : Application de ToDo Liste

#### Objectif
Le but de ce projet est de développer une application backend qui permet de gérer une liste de tâches. Tu devras implémenter les fonctionnalités de création, modification, suppression et consultation des tâches via des APIs RESTful.

#### Description des Tâches

Chaque tâche devra avoir les champs suivants :
- **ID** (identifiant unique de la tâche)
- **created_at** (date et heure de création de la tâche)
- **updated_at** (date et heure de la dernière modification de la tâche)
- **status** (statut de la tâche : peut être 'à faire', 'en cours', ou 'terminée')

#### Fonctionnalités à Implémenter

1. **Création d'une tâche**
   - Endpoint : `POST /tasks`
   - Description : Permet de créer une nouvelle tâche.
   - Champs à fournir : `status` (optionnel, par défaut 'à faire')

2. **Modification d'une tâche**
   - Endpoint : `PUT /tasks/{id}`
   - Description : Permet de modifier les informations d'une tâche existante.
   - Champs modifiables : `status`

3. **Suppression d'une tâche**
   - Endpoint : `DELETE /tasks/{id}`
   - Description : Permet de supprimer une tâche existante.

4. **Consultation d'une tâche**
   - Endpoint : `GET /tasks/{id}`
   - Description : Permet de récupérer les informations d'une tâche spécifique.

5. **Liste des tâches**
   - Endpoint : `GET /tasks`
   - Description : Permet de récupérer la liste de toutes les tâches.

#### Contraintes Techniques

- Utilise le langage de programmation / framework de ton choix.
- Assure-toi que les dates et heures (`created_at` et `updated_at`) sont gérées automatiquement par le système.
- Utilise un format de données standard pour les échanges (JSON recommandé).
- Implémente des validations appropriées pour les données d'entrée.
- Documente les endpoints de ton API (tu peux utiliser des outils comme Swagger).

