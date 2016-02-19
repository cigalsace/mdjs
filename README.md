# mdjs
Javascript to parse XML metadata Inspire/ISO file and convert it to JS object (and vis-versa)

Ce script fonctionne pour les métadonnées de donnée set les métadonnées de service.
Il s'agit d'une version initiale. Des tests sont encotre à réaliser pour fiabiliser le code.

Pure javascript.
N'utilise pas JQuery (sauf pour les tests).
Utilise de façon optionnelle la bibliothèque *vkbeautify* pour l'affichage du XML sous forme de chaîne de charactères.


**Principes:**

```
// XML to JSON
var metadata = new mdjs.Metadata();
metadata.setXml(xml);
json = metadata.getJson();

// JSON to XML
var metadata2 = new mdjs.Metadata();
metadata2.setJson(json);
metadata2.getXmlString({beautifier: true});
// Ou directement: metadata2.getXmlString({beautifier: true}, metadata.getJson());
```

La conversion se base sur le fichier model-xml.js qui définit la structure du fichier JSON produit et du fichier XML généré.