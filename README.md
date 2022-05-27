# web-dev
Jeux web: Sudoku, Scrabble, Curling.
Framework : Angular 2 & Node.js 7.4.0

Installation :
    Windows : (entre nous .. windows ... )
        $ npm install --no-cache
    Mac :
        $ npm install

pour executer uniquement le client :

    1) aller dans le folder client 
    2) $ npm start

pour executer le client et le serveur :

    1) aller dans le folder client 
    2) $ npm start
    3) aller dans le folder server
    4) $ npm start

pour tslint : 

    1) aller dans le folder client ou server
    2) $ npm run lint 

pour les tests : 

    Les executer et actualiser sur la sauvegarde :
        $ npm test

    Les executer une seule fois :
        $ npm run test-once

pour nettoyer votre repertoire :
    1) aller dans le repertoire client ou server voulu
    2) $ npm run clean 

## Considérations ##
### Installation de node à la bonne version ###
Windows: https://nodejs.org/en/download/
Linux:
sudo apt-get install nodejs (ou l'équivalent, ex: yum)
	
Sur Linux, si la version reste 0.x.x, rouler le script dans installHigherNodeVersion.sh

### Règles Lint ###
Les règles qui vérifient le TypeScript sont dans le fichier tslint.json 
Pour ajouter, ou modifier des règles, il faut modifier ce fichier en considérant les règles disponibles sur :
https://palantir.github.io/tslint/rules/
https://github.com/buzinas/tslint-eslint-rules
https://github.com/mgechev/codelyzer (Seulement pour Angular)