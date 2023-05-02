
## Sujet

Dans le cadre de cette évaluation vous allez créer une application de type « annuaire d’entreprise ».

Vous êtes développeur dans une industrie agro alimentaire qui s’étend sur le territoire Français.

L’entreprise est en croissance et aujourd’hui elle est composée de

    - 5 sites dans différentes villes

    o   Paris : Siège administratif

    o   Nantes : site de Production

    o   Toulouse : site de Production

    o   Nice : site de Production

    o   Lille : site de Production

    - Plus de 1000 salariés

 

A ce titre il est nécessaire de fournir aux utilisateur une application permettant de connaitre instantanément le numéro de téléphone d’un collaborateur.

 

Les rôles dans l’application seront :

    - Visiteur : Afficher les information, recherche
    - Administration : Ajout / Modification / Suppression d’information.

 

L’administrateur doit pouvoir faire :

    - CRUD des sites : champ « ville » uniquement
    - CRUD des services : Comptabilité, production, accueil, informatique, commercial etc.
    - CRUD des salariés : Nom, prénom, téléphone fixe, téléphone portable, email, service (association), site (association)

 

Le visiteur doit pouvoir afficher la fiche salarié et réaliser une recherche :

    - Par nom de salarié  : saisir X lettres pour afficher les salariés correspondants
    - Par site via une liste des sites
    - Par service via une liste des services

 

La fiche salarié affiche toutes les informations du salarié (nom, prénom, téléphone fixe, téléphone portable, email, service, site)

 

 

Travail demandé

    - Développer une application web permettant d’interagir avec les données d’une base de données (Select, Insert, Update, Delete)

    - La base de données doit être relationnelle (PostgreSQL, MySQL, SQL Server...)

    - L’accès aux données entre le front et le back doit se faire via une API REST

    - L’application web sera développée en JavaScript full stack

    - Vous devez versionner votre code avec Git