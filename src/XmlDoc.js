

/**
 * XmlDoc.js
 * @file XmlDoc.js
 * @description mdjs XmlDoc class
 * @author Guillaume RYCKELYNCK
 * @version b15
 * @license MIT
 * Copyright (c) 2016 - CIGAL (G. Ryckelynck)
 */

(function(mdjs, undefined) {
    "use strict";

    ////////////////////////////////////////////////////////////////////////
    // Class xmlDoc
    ////////////////////////////////////////////////////////////////////////

    /**
     * @class mdjs.XmlDoc
     * @param  {XML document} xmlDoc        - XML document to initialize XmlDoc object
     * @param  {XML element} rootElement    - Root element to initialize XmlDoc object
     * @param  {Array} xmlns                - List of name space of XML document
     * @return {Object}                     - XmlDoc object
     * @property {XML document} doc         - XML document to initialize XmlDoc object
     * @property {XML element} root         - Root element to initialize XmlDoc object
     * @property {Array} xmlns              - List of name space of XML document
     */
    mdjs.XmlDoc = function(xmlDoc, rootElement, xmlns) {
        if (xmlDoc) {
            this.doc = xmlDoc;
            this.root = this.doc.documentElement;
            this.xmlns = this.getXmlns();
        } else {
            // Define params
            rootElement = rootElement || mdjs.root;
            this.xmlns = xmlns || mdjs.xmlns;
            // Create XML document
            this.doc = document.implementation.createDocument('', '', null);
            // Create root node
            this.root = this.doc.createElementNS(xmlns['xmlns:gmd'], rootElement);
            this.doc.appendChild(this.root);
            // Add default namespace - simple xmlns attribute
            // this.root.setAttribute('xmlns', this.xmlns.gmd);
            this.root.setAttribute('xmlns', this.xmlns['xmlns:gmd']);
            // Add other namespace - attribute in xmlns namespace
            for (var ns in this.xmlns) {
                var ns_parts = ns.split(':');
                if (ns_parts.length > 1) {
                    this.root.setAttributeNS(this.xmlns[ns_parts[0]], ns, this.xmlns[ns]);
                }
            }
        }
        return this;
    };

    /**
     * Get the list of name space of XML document
     * @return {Array}  - list of name space of XML document
     */
    mdjs.XmlDoc.prototype.getXmlns = function() {
        var xmlns = mdjs.xmlns;
        if (this.root) {
            var attrs = this.root.attributes;
            for (var i = 0; i < attrs.length; ++i) {
                if (attrs[i].name.indexOf("xmlns:") === 0) {
                    xmlns[attrs[i].name] = attrs[i].value;
                }
            }
        }
        return xmlns;
    };

    /**
     * Add node to parent
     * @param  {XML node} parentNode        Parent node
     * @param  {String} nodeName        Name of child node
     * @param  {String} nodeText        Text of child node content
     * @param  {Object} nodeAttributes   Node attributes object
     * @return {XML node}                   Node child
     */
    mdjs.XmlDoc.prototype.addNode = function(parentNode, nodeName, nodeText, nodeAttributes) {
        // Define params
        nodeText = nodeText || undefined;
        nodeAttributes = nodeAttributes || {};
        var childNode;
        // Create childNode element with name space if necessary
        var nodeNameParts = nodeName.split(':');
        if (nodeNameParts.length === 1) {
            childNode = this.doc.createElement(nodeName);
        } else {
            var nameSpace = nodeNameParts[0];
            childNode = this.doc.createElementNS(this.xmlns['xmlns:'+nameSpace], nodeName);
        }
        // Add text to childNode if necessary
        if (nodeText) {
            var text = this.doc.createTextNode(nodeText);
            childNode.appendChild(text);
        }
        // Add nodeAttributes to childNode if necessary
        for (var attribute in nodeAttributes) {
            childNode.setAttribute(attribute, nodeAttributes[attribute]);
        }
        // Add childNode to parentNode
        parentNode.appendChild(childNode);
        return childNode;
    };

    /**
     * Get XML node from xpath
     * @param  {String} path        - Xpath to node
     * @param  {XML document} doc   - XML document
     * @param  {String} resultType  - Type of result (ORDERED_NODE_SNAPSHOT_TYPE, ANY_TYPE or UNORDERED_NODE_ITERATOR_TYPE)
     * @return {XML node}           - XML node
     */
    mdjs.XmlDoc.prototype.getNodeFromPath = function(path, doc, resultType) {
        var types = {
            snapshot: 'ORDERED_NODE_SNAPSHOT_TYPE',
            any: 'ANY_TYPE',
            iterator: 'UNORDERED_NODE_ITERATOR_TYPE'
        };
        doc = doc || this.doc;
        resultType = resultType || 'snapshot';
        var xmlns = this.xmlns;
        function nsResolver(prefix) {
            prefix = prefix || 'xmlns';
            return xmlns['xmlns:'+prefix] || null;
        }
        var evaluator = new XPathEvaluator();
        return evaluator.evaluate(path, doc, nsResolver, XPathResult[types[resultType]], null);
    };

    /**
     * Get node value
     * @param  {String} path        - Xpath to node
     * @param  {XML document} doc   - XML document
     * @return {Array}              - Array of String
     */
    mdjs.XmlDoc.prototype.getNodeValues = function(path, doc) {
        var nodes = this.getNodeFromPath(path, doc);
        var result = [];
        for (var i = 0; i < nodes.snapshotLength; i++) {
            result.push(nodes.snapshotItem(i).textContent.trim());
        }
        return result;
    };

    //
    /**
     * Add tree of node elements from path
     * @param  {XML document} doc   - XML document
     * @param  {String} path        - Path to create tree of elemet ('/' separator)
     * @param  {XML node} parent    - Parent node
     * @param  {Boolean} append     - If true => always add new node, else use existing node (if exists)
     * @return {XML document}       - XML document
     */
    mdjs.XmlDoc.prototype.addTreeFromPath = function(doc, path, parent, append) {
        append = append || false;
        parent = parent || doc.root;
        var items = path.split('/');
        for (var i = 0; i < items.length; i++) {
            if (items[i] && items[i] != "text()" && items[i] != "@codeListValue") {
                if (append || doc.getNodeFromPath(items[i], parent).snapshotLength === 0) {
                    parent = doc.addNode(parent, items[i]);
                } else {
                    parent = doc.getNodeFromPath(items[i], parent).snapshotItem(0);
                }
            }
        }
        return doc;
    };

    /**
     * Add tree node elements from object
     * @param  {XML document} doc   - XML document
     * @param  {Object} path        - Path to create tree of elemet
     * @param  {XML node} parent    - Parent node
     * @param  {Boolean} append     - If true => always add new node, else use existing node (if exists)
     * @return {XML document}       - XML document
     */
    mdjs.XmlDoc.prototype.addTreeFromObj = function(doc, path, parent, append) {
        parent = parent || doc.root;
        append = append || false;
        var node;
        for (var p in path) {
            if (append || doc.getNodeFromPath(path[p].name, parent).snapshotLength === 0) {
                node = doc.addNode(parent, path[p].name, path[p].text, path[p].attributes);
            } else {
                node = doc.getNodeFromPath(path[p].name, parent).snapshotItem(0);
            }
            if (path[p].hasOwnProperty('children')) {
                this.addTreeFromObj(doc, path[p].children, node);
            }
        }
        return doc;
    };

    /**
     * Get XML document as string
     * @param  {Object} config  - Configuration object to set 'beautifier' (boolean), 'minify' (boolean), 'version' (string) and 'characterset' (string) parameters
     * @return {string}         - XML document as string
     */
    mdjs.XmlDoc.prototype.getXmlString = function(config) {
        //  Define params
        var beautifier = config.beautifier || false;
        var minify = config.minify || false;
        var version = config.version || '1.0';
        var characterSet = config.characterSet || 'UTF-8';
        var header = header || '<?xml version="' + version + '" encoding="' + characterSet + '"?>\n';
        // Serialize XML document
        var data = new XMLSerializer().serializeToString(this.doc);
        // Return standard or beatify XML string
        if (beautifier) {
            return vkbeautify.xml(header + data);
        } else if (minify) {
            return vkbeautify.xmlmin(header + data);
        }
        return header + data;
    };

}(window.mdjs = window.mdjs || {}));
