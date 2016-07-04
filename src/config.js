/**
 * config.js
 * @file config.js
 * @description mdjs config file
 * @author Guillaume RYCKELYNCK
 * @version b15
 * @license MIT
 * Copyright (c) 2016 - CIGAL (G. Ryckelynck)
 */

/**
 * Main application object mdjs
 * @type {Object}
 */
var mdjs = {};

(function(mdjs, undefined) {
    "use strict";

    /**
     * List of default name space
     * @type {Object}
     */
    mdjs.xmlns = {
        "xmlns": "http://www.w3.org/2000/xmlns/",
        "xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:gco": "http://www.isotc211.org/2005/gco",
        "xmlns:gts": "http://www.isotc211.org/2005/gts",
        "xmlns:xs": "http://www.w3.org/2001/XMLSchema",
        // "xmlns:gml": "http://www.opengis.net/gml",
        "xmlns:gml": "http://www.opengis.net/gml/3.2",
        "xmlns:gsr": "http://www.isotc211.org/2005/gsr",
        "xmlns:gmx": "http://www.isotc211.org/2005/gmx",
        "xmlns:gss": "http://www.isotc211.org/2005/gss",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "xmlns:gmd": "http://www.isotc211.org/2005/gmd",
        "xmlns:srv": "http://www.isotc211.org/2005/srv",
        "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "xmlns:xi": "http://www.w3.org/2001/XInclude",
        "xsi:schemaLocation": "http://www.isotc211.org/2005/gmd http://schemas.opengis.net/iso/19139/20060504/gmd/gmd.xsd",

    };

    /**
     * Default XML root element
     * @type {String}
     */
    mdjs.root = "gmd:MD_Metadata";

}(window.mdjs = window.mdjs || {}));
