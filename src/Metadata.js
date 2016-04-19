////////////////////////////////////////////////////////////////////////
// Classe Metadata
////////////////////////////////////////////////////////////////////////

(function(mdjs, undefined) {
    "use strict";

    /**
     * Metadata object class
     * @return {Object} - Metadata object
     */
    mdjs.Metadata = function() {
        this.xml = new mdjs.XmlDoc(false, mdjs.root, mdjs.xmlns);
        this.json = mdjs.json;
        return this;
    };

    /**
     * Set XML property
     * @param  {XML document} xmlDoc        - XML document to initialize Metadata object
     * @param  {XML element} rootElement    - Root element to initialize Metadata object
     * @param  {Array} xmlns                - List of name space of XML document
     * @return {Object}                     - Metadata object
     */
    mdjs.Metadata.prototype.setXml = function(xmlDoc, rootElement, xmlns) {
        if (xmlDoc) {
            this.xml = new mdjs.XmlDoc(xmlDoc);
        } else {
            this.xml = new mdjs.XmlDoc(false, mdjs.root, mdjs.xmlns);
        }
        return this;
    };

    /**
     * Set JSON property
     * @param  {Object} json - Objet to initialize json property
     * @return {Object}      - Metadata object
     */
    mdjs.Metadata.prototype.setJson = function(json) {
        this.json = json || mdjs.json;
        return this;
    };

    /**
     * Get XML document from JSON property
     * @param  {Object} json - Objet to set json property if necessary
     * @return {Object}      - Metadata XML document property
     */
    mdjs.Metadata.prototype.getXml = function() {
        return this.xml;
    };

    /**
     * [function description]
     * @param  {[type]} config [description]
     * @param  {[type]} json   [description]
     * @return {[type]}        [description]
     */
    mdjs.Metadata.prototype.getXmlString = function(config) {
        return this.getXml().getXmlString(config);
    };

    /**
     * Get XML document from JSON property
     * @param  {Object} json - Objet to set json property if necessary
     * @return {Object}      - Metadata XML document property
     */
    mdjs.Metadata.prototype.toXml = function(json) {
        this.json = json || this.json;
        this.xml = this._json2Xml(this.xml, mdjs.model_xml.main, this.json, this.xml.root);
        return this.xml;
    };

    /**
     * [function description]
     * @param  {[type]} config [description]
     * @param  {[type]} json   [description]
     * @return {[type]}        [description]
     */
    mdjs.Metadata.prototype.toXmlString = function(config, json) {
        return this.toXml(json)
            .getXmlString(config);
    };

    /**
     * [function description]
     * @param  {[type]} xml [description]
     * @return {[type]}     [description]
     */
    mdjs.Metadata.prototype.getJson = function() {
        return this.json;
    };

    /**
     * [function description]
     * @param  {[type]} xml [description]
     * @return {[type]}     [description]
     */
    mdjs.Metadata.prototype.toJson = function(xml) {
        this.xml = xml || this.xml;
        this.json = this._xml2Json(this.xml, mdjs.model_xml.main, this.xml.doc);
        return this.json;
    };

    /**
     * [function description]
     * @param  {[type]} property [description]
     * @return {[type]}          [description]
     */
    mdjs.Metadata.prototype.get = function(property) {
        return this[property] || undefined;
    };

    /**
     * [function description]
     * @param  {[type]} property [description]
     * @param  {[type]} value    [description]
     * @return {[type]}          [description]
     */
    mdjs.Metadata.prototype.set = function(property, value) {
        this[property] = value || undefined;
        return this[property];
    };

    /**
     * [function description]
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    mdjs.Metadata.prototype.getXmlValues = function(node) {
        return this.xml.getNodeValues(mdjs.model_xml.main[node].xpath);
    };

    /**
     * [function description]
     * @param  {[type]} node [description]
     * @return {[type]}      [description]
     */
    mdjs.Metadata.prototype.getJsonValues = function(node) {
        return this.json[node];
    };

    /**
     * [function description]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    mdjs.Metadata.prototype._isService = function(type) {
        if (type == 'xml') {
            return this.getXmlValues('mdHierarchyLevel')[0] == 'service';
        } else {
            return this.getJsonValues('mdHierarchyLevel') == 'service';
        }
    };

    /**
     * [function description]
     * @param  {[type]} doc   [description]
     * @param  {[type]} model [description]
     * @param  {[type]} xml   [description]
     * @return {[type]}       [description]
     */
    mdjs.Metadata.prototype._xml2Json = function(doc, model, xml) {
        var json = {};
        for (var node in model) {
            // Define xpath variable. Use xpath_srv property if Metadata concern service.
            var xpath = model[node].xpath;
            if (model[node].hasOwnProperty('xpath_srv') && this._isService('xml')) {
                xpath = model[node].xpath_srv;
            }
            if (!model[node].multi && xpath) {
                if (model[node].hasOwnProperty('children')) {
                    // String with children
                    var elt = doc.getNodeFromPath(xpath, xml);
                    json[node] = this._xml2Json(doc, model[node].children, elt.snapshotItem(0));
                } else {
                    // String node without child
                    var nodeValue = doc.getNodeValues(xpath, xml)[0];
                    if (nodeValue) {
                        json[node] = nodeValue;
                    }
                }
            } else if (model[node].multi) {
                // json[node] is an array
                // json[node] = [];
                var array = [];
                var elts = doc.getNodeFromPath(xpath, xml);
                for (var i = 0; i < elts.snapshotLength; i++) {
                    if (model[node].hasOwnProperty('children')) {
                        var child = this._xml2Json(doc, model[node].children, elts.snapshotItem(i));
                        // If only one children item property, remove nodeName
                        if (Object.keys(model[node].children)
                            .length === 1) {
                            for (var c in model[node].children) {
                                child = child[c];
                            }
                        }
                        if (child && Object.keys(child)
                            .length) {
                            array.push(child);
                        }
                    }
                    if (array.length) {
                        json[node] = array;
                    }
                }
            }
        }
        // Chage extents organisation
        json = this._separateJsonExtents(json);
        return json;
    };

    /**
     * Separate extents property of sjson object to 3 properties: geographicExtents, temporalExtents and vertical to get more usefull object
     * @param  {Object} sjson sjson object
     * @return {Object}       modified sjson object
     */
    mdjs.Metadata.prototype._separateJsonExtents = function(json) {
        var dataGeographicExtents = [];
        var dataTemporalExtents = [];
        var dataVerticalExtents = [];
        for (var extent in json.dataExtents) {
            if (json.dataExtents[extent].hasOwnProperty('dataGeographicExtentEastBound')) {
                dataGeographicExtents.push(json.dataExtents[extent]);
            } else if (json.dataExtents[extent].hasOwnProperty('dataTemporalExtentBegin')) {
                dataTemporalExtents.push(json.dataExtents[extent]);
            } else {
                dataVerticalExtents.push(json.dataExtents[extent]);
            }
        }
        if (dataGeographicExtents.length) {
            json.dataGeographicExtents = dataGeographicExtents;
        }
        if (dataTemporalExtents.length) {
            json.dataTemporalExtents = dataTemporalExtents;
        }
        if (dataVerticalExtents.length) {
            json.dataVerticalExtents = verticalExtents;
        }
        return json;
    };

    // Hash string to get an id
    /**
     * [function description]
     * @param  {[type]} string [description]
     * @return {[type]}        [description]
     */
    mdjs.Metadata.prototype._getHash = function(string) {
        var hash = 0;
        for (var c = 0; c < string.length; c++) {
            hash = ((hash << 5) + hash) + string.charCodeAt(c);
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    };

/**
 * [function description]
 * @param  {[type]} doc    [description]
 * @param  {[type]} model  [description]
 * @param  {[type]} json   [description]
 * @param  {[type]} parent [description]
 * @return {[type]}        [description]
 */
    mdjs.Metadata.prototype._json2Xml = function(doc, model, json, parent) {
        for (var node in model) {
            if (json[node] && !model[node].skip) {
                var xpath = model[node].xpath;
                if (model[node].hasOwnProperty('xpath_srv') && this._isService('json')) {
                    xpath = model[node].xpath_srv;
                }
                var localParent = parent;
                if (xpath.indexOf('/') === 0) {
                    localParent = doc.root;
                }
                var items = xpath.split('/');
                for (var i = 0; i < items.length; i++) {
                    if (items[i] &&
                        items[i] != "text()" &&
                        items[i].indexOf('@') !== 0 &&
                        items[i] != "gmd:MD_Metadata") {
                        var text = '';
                        var attributes = {};
                        if (items[i + 1] && (
                                items[i + 1] == "text()" ||
                                items[i + 1].indexOf('@') === 0)) {
                            text = json[node];
                            attributes = {};
                            if (model[node].attributes) {
                                for (var attr in model[node].attributes) {
                                    if (model[node].attributes[attr].indexOf('node=') === 0) {
                                        attributes[attr] = json[model[node].attributes[attr].substring(5)];
                                    } else {
                                        attributes[attr] = model[node].attributes[attr];
                                    }
                                }
                            }
                            if (items[i + 1].indexOf('@') === 0) {
                                attributes[items[i + 1].substring(1)] = json[node];
                            }
                        }
                        if (model[node].hasOwnProperty('children')) { // = model[node].multi == true
                            if (i + 1 == items.length) { // Last item of xpath
                                if (!json[node].length) {
                                    // json[node] is an object and not an array. Convert it to array to use it
                                    json[node] = [json[node]];
                                }
                                for (var value in json[node]) {
                                    var subParent = doc.addNode(localParent, items[i]);
                                    if (Object.keys(model[node].children)
                                        .length === 1) {
                                        // json[node] is an array of string and not an array of objects
                                        var child_property = Object.keys(model[node].children)[0];
                                        var json_value = json[node][value];
                                        json[node][value] = {};
                                        json[node][value][child_property] = json_value;
                                    }
                                    this._json2Xml(doc, model[node].children, json[node][value], subParent);
                                }
                            }
                        }
                        if (items[i] == 'gml:TimePeriod') {
                            attributes['gml:id'] = 'timePeriod_' + this._getHash(json[node]);
                        }
                        if (doc.getNodeFromPath(items[i], localParent)
                            .snapshotLength === 0) {
                            localParent = doc.addNode(localParent, items[i], text, attributes);
                        } else {
                            localParent = doc.getNodeFromPath(items[i], localParent)
                                .snapshotItem(0);
                        }
                    }
                }
            }
        }
        return doc;
    };

}(window.mdjs = window.mdjs || {}));
