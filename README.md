# mdjs

Javascript code to parse XML metadata Inspire/ISO file and convert it to JS object (and vis-versa).

All configuration for XML and JSON structure in ``src/model-xml.js``.

Example:

```
// 'reponse' is an XML file content
var metadata = new mdjs.Metadata();
metadata.setXml(response);
console.log('metadata.xml (XmlDoc):', metadata.get('xml'));
console.log('metadata.xml (Normal string):', metadata.getXmlString({}));
console.log('metadata.xml (String with beautifier):', metadata.getXmlString({
    beautifier: true
}));
console.log('metadata.xml (String with minify):', metadata.getXmlString({
    minify: true
}));
console.log('metadata.json:', metadata.get('json'));
console.log('fileIdentifier 2:', metadata.get('xml').getNodeValues(mdjs.model_xml.main.mdFileIdentifier.xpath)[0]);
// Other way with relative path
var root = metadata.get('xml').getNodeFromPath('//gmd:MD_Metadata').snapshotItem(0);
console.log('fileIdentifier (relative path):', metadata.get('xml').getNodeValues('gmd:fileIdentifier/gco:CharacterString', root)[0]);
// To JSON
var metadata_json = metadata.toJson();
console.log(metadata_json);


var metadata_xml = new mdjs.Metadata();
console.log(metadata_xml.toXmlString({
    beautifier: true
}, metadata_json));
```