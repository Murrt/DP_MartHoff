# Data processing Mart Hoff

#### Waarom NodeJS/Express voor een rest api

Met Express en NodeJS kun je gemakkelijk schaalbare rest api's opzetten. Omdat NodeJS zo enorm popular onder programmeurs is om rest API's op te zetten is er enorm veel documentatie beschikbaar. Ook zijn er veel modules beschikbaar gemakkelijk te implementeren zijn, denk hierbij aan;

**Express**, hiermee kan je gemakklijk een web-server opzetten om aan te roepen met HTTP requests.
**Passport**, dit kan gebruikt worden als middelware voor authenticatie doeleinden
**JWT**, ookwel Json Web Token, hiermee kan op een veilige manier data worden verstuurd en geauthenticeert.
**Socket IO**, veel gebruikt in applicaties om real time messaging applicaties op te zetten.

Met Javascript kan ik met **JSON SCHEMA** gemakkelijk mijn schema tegen de ingevoerde JSON valideren. 


#### Installatie en gebruik

**versies**

* Node v14.16.0
* Visual Studio 2019
* Xammp V3.2.4
* Windows 10
* Postman

**npm installs**

```
npm i 

```

* **Importeer Database**
  Start je PHPMySQL database (ik doe dit via XAMMP).
  Klik bovenaan in het menu op import
  Klik op 'Choose File' en browse naar het database mapje in mijn github bestand.
  Hier vind je de te importeren database
* **start server**
  node . (in terminal) om de rest api server te lanceren, wacht tot je 'Server is live! localhost:/8080' ziet.
* **Postman**
  Ik heb de api calls die ik gebruik om te testen in een JSON gezet, deze kun je importeren in je PostMan.
* **Documentatie API**
* In Postman kan je hoveren op de map 'Api calls', klik op de drie puntjes en selecteer 'view documentation'
* **visualisatie**
  Browse in een gewenste browser naar;

http://localhost:8080/vis1
http://localhost:8080/vis2
http://localhost:8080/vis3
