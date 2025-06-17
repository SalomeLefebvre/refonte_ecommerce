## 🛍️ Refonte e-commerce

### Technologies choisies
Les technologies utilisées sont Angular pour le frontend et le framework Nest.js pour le backend. Ce sont celles que j’utilise dans l’entreprise où je suis en alternance. J’aimerais retravailler la configuration des environnements de test, car ce n’est généralement pas moi qui m’en occupe en entreprise, et j’ai l’impression d’avoir des lacunes à ce niveau.

Jest est utilisé pour les test, il s’intègre parfaitement avec des environnements JavaScript/TypeScript, notamment Angular et NestJS. Il est reconnu pour sa simplicité d’utilisation, sa rapidité d’exécution et la clarté de ses messages d’erreur. Il permet aussi bien les tests unitaires que d’intégration, avec une bonne prise en charge du mocking.

### 🛠️ Installation du projet et setup du projet
- Cloner le dépôt
- Installer les dépendances avec la commande dans le dossier backend et frontend :
```
npm install
```
- Dans le dossier json serveur, lancer la commande :
```
npm install -g json-server
```

### ▶️ Lancer le projet
#### Front-end (Angular)

- Se rendre dans le dossier frontend et lancer la commande :
```
ng serve
```

L’application sera disponible à l’adresse : http://localhost:4200

#### Back-end (NestJS)

- Se rendre dans le dossier backend et lancer la commande :
```
npm run start
```
Le serveur NestJS sera accessible sur : http://localhost:3001 (ou selon votre configuration)

#### JSON Server
- Se rendre dans le dossier backend et lancer la commande :
```
json-server data.json --port 3000
```

L’API simulée sera accessible sur : http://localhost:3000

#### 🧪 Exécuter les tests
#### Front-end (Jest avec Angular)
- Se rendre dans le dossier backend et lancer la commande :
```
npm run test
```
#### Back-end (Jest avec NestJS)
- Se rendre dans le dossier backend et lancer la commande :
```
npm run test
```