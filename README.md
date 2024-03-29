# Data processing Mart Hoff

#### Waarom NodeJS/Express voor een rest api

Met Express en NodeJS kun je gemakkelijk schaalbare rest api's opzetten. Omdat NodeJS zo enorm popular onder programmeurs is om rest API's op te zetten is er enorm veel documentatie beschikbaar. Ook zijn er veel modules beschikbaar gemakkelijk te implementeren zijn, denk hierbij aan;

**Express**, hiermee kan je gemakklijk een web-server opzetten om aan te roepen met HTTP requests.
**Passport**, dit kan gebruikt worden als middelware voor authenticatie doeleinden
**JWT**, ookwel Json Web Token, hiermee kan op een veilige manier data worden verstuurd en geauthenticeert.
**Socket IO**, veel gebruikt in applicaties om real time messaging applicaties op te zetten.

Met Javascript kan ik met **JSON SCHEMA** gemakkelijk mijn schema tegen de ingevoerde JSON valideren. 


# Veranderingen na feedback

* Code opgeschoond
* Index.js alleen nog voor de request.
* Functies, Server, Schema en routes nu in aparte files
* Namen bij Database aangepast
* Accept header nu gebruikt voor xml/json request
* Geen hoofdletters in request
* Geen var maar const of let. 


# Installatie en gebruik

**versies**

* Node v14.16.0
* Visual Studio 2019
* Xammp V3.2.4
* Windows 10
* Postman

**1) npm installs**

Run het volgende command in de terminal:
```
cd uw/pad/DP_Mart_Hoff/
npm i 
```

Hiermee worden alle dependencies geinstalleerd die nodig zijn om de rest api te laten werken.

**2) Importeer Database**

  * Start je PHPMySQL database (ik doe dit via XAMMP).
  * Maak een nieuwe database aan met de naam 'dp_mart_hoff'
  * Klik bovenaan in het menu op import
  * Klik op 'Choose File' en browse naar het database mapje in mijn github bestand.
  * Hier vind je de te importeren database
  * Check of de jusite port is geselecteerd in de index.js op regel: 41, momenteel staat deze op 3306.

**3) start server**

run het volgende commando in de terminal:

  ```
  cd uw/pad/DP_Mart_Hoff/
  node . 
  ```
 * de server is gelanceerd wanneer je 'Server is live! localhost:/8080' ziet.

**4) Postman**

* Ik heb de api calls die ik gebruik om te testen in een JSON map 'PostmanAPiCalls' gezet
* deze kun je importeren in PostMan door linksbovenaan op 'importeren' te klikken. En de json erin te slepen.


**5) Documentatie API**

* In Postman kan je hoveren op de map 'Api calls', klik op de drie puntjes en selecteer 'view documentation'
* Hier vind je de documentatie van de API calls die ik heb gemaakt.

**6) visualisatie**

Browse in een gewenste browser naar;
Voor XML visualatie;
* http://localhost:8080/visualisatie1

Voor JSON visualisatie;
* http://localhost:8080/visualisatie2