# Data processing Mart Hoff

#### Waarom NodeJS/Express voor een rest api

Met Express en NodeJS kun je gemakkelijk schaalbare rest api's opzetten. NodeJS is enorm popular onder programmeurs om rest API op te zetten, hierdoor is er enorm veel documentatie beschikbaar. Ook zijn er veel modules beschikbaar gemakkelijk te implementeren zijn, denk hierbij aan;

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
npm i express
npm i jsonschema
npm i xml2js
npm i libxmljs2-xsd
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

  * {**pad**/visualisatie/visualisatie1.html}
  * {**pad**/visualisatie/visualisatie2.html}
  * {**pad**/visualisatie/visualisatie3.html}
