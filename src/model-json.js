

/**
 * model-json.js
 * @file model-json.js
 * @description mdjs JSON empty model file
 * @author Guillaume RYCKELYNCK
 * @version b15
 * @license MIT
 * Copyright (c) 2016 - CIGAL (G. Ryckelynck)
 */

(function(mdjs, undefined) {
    "use strict";

    /**
     * empty_json main object
     * lends mdjs
     * @type {Object}
     */
    mdjs.empty_json = {};

    /**
     * Empty json contact object
     * lends mdjs.empty_json
     * @type {Object}
     */
    mdjs.empty_json.contact = {
        "individualName": "",
        "positionName": "",
        "organisationName": "",
        "deliveryPoints": "",
        "postalCode": "",
        "city": "",
        "phoneVoices": "",
        "email": "",
        "role": "",
        "logo_text": "",
        "logo_url": ""
    };

    /**
     * Empty json date object
     * lends mdjs.empty_json
     * @type {Object}
     */
    mdjs.empty_json.date = {
        "type": "",
        "date": ""
    };

    /**
     * Empty json resource identifier object
     * @type {Object}
     */
    mdjs.empty_json.identifier = {
        "code": "",
        "codespace": ""
    };

    /**
    * Empty json geographic extent object
     * @type {Object}
     */
    mdjs.empty_json.geographicextent = {
        "dataExtentName": "",
        "dataGeographicExtentWestBound": "",
        "dataGeographicExtentEastBound": "",
        "dataGeographicExtentSouthBound": "",
        "dataGeographicExtentNorthBound": ""
    };

    /**
     * Empty json browse graphic object
     * @type {Object}
     */
    mdjs.empty_json.browsegraphic = {
        "fileName": "",
        "fileDescription": "",
        "fileType": ""
    };

    /**
     * Empty json temporal extent object
     * @type {Object}
     */
    mdjs.empty_json.temporalextent = {
        "dataTemporalExtentBegin": "",
        "dataTemporalExtentEnd": "",
        "dataExtentName": ""
    };

    /**
     * Empty json keyword object
     * @type {Object}
     */
    mdjs.empty_json.keyword = {
        "keyword": "",
        "type": "",
        "thesaurus_name": "",
        "thesaurus_dates": [{
            "type": "",
            "date": ""
        }]
    };

    /**
     * Empty json inspire keyword object
     * @type {Object}
     */
    mdjs.empty_json.inspirekeyword = {
        "keyword": "",
        "type": "",
        "thesaurus_name": "GEMET - INSPIRE themes, version 1.0",
        "thesaurus_dates": [{
            "type": "publication",
            "date": "2008-06-01"
        }]
    };

    /**
     * Empty json reference system object
     * @type {Object}
     */
    mdjs.empty_json.referencesystem = {
        "code": "",
        "codeSpace": ""
    };

    /**
     * Empty json data format object
     * @type {Object}
     */
    mdjs.empty_json.distributionformat = {
        "formatName": "",
        "formatVersion": "",
        "formatSpecification": ""
    };

    /**
     * Empty json linkage object
     * @type {Object}
     */
    mdjs.empty_json.linkage = {
        "name": "",
        "description": "",
        "url": "",
        "protocol": ""
    };

    /**
     * Empty json data quality conformity object
     * @type {Object}
     */
    mdjs.empty_json.dq_conformity = {
        "specification": "",
        "explaination": "",
        "pass": "",
        "dates": [{
            "type": "",
            "date": ""
        }]
    };

    /**
     * Empty json metdata object
     * @type {Object}
     */
    mdjs.empty_json.metadata = {
        "mdFileidentifier": "",
        "mdLanguage": "",
        "md_characterset": "",
        "md_hierarchylevel": "",
        "mdContacts": [],
        "md_datestamp": "",
        "md_standardname": "",
        "md_standardversion": "",
        "data_title": "",
        "data_dates": [],
        "data_datecreation": "",
        "data_datepublication": "",
        "data_daterevision": "",
        "data_identifiers": [],
        "data_abstract": "",
        "dataBrowseGraphics": [],
        "data_maintenancefrequencycode": "",
        "data_temporalextents": [],
        "data_languages": [],
        "data_topiccategories": [],
        "data_keywords": [],
        "data_inspirekeywords": [],
        "data_keywords_list": "",
        "data_pointofcontacts": [],
        "data_geographicextents": [],
        "data_referencesystems": [],
        "data_presentationform": "",
        "data_spatialrepresentationtype": "",
        "data_scaledenominator": "",
        "data_scaledistance": "",
        "data_dq_level": "",
        "data_li_statement": "",
        "data_characterset": "",
        "data_distributionformats": [],
        "data_uselimitations": [],
        "data_legal_uselimitations": [],
        "data_legal_useconstraints": [],
        "data_legal_accessconstraints": [],
        "data_legal_accessinspireconstraints": [],
        "data_legal_accessotherconstraints": [],
        "data_security_classification": "",
        "data_security_uselimitations": [],
        "data_linkages": [],
        "data_dq_inspireconformities": [],
        "data_dq_conformities": []
    };

}(window.mdjs = window.mdjs || {}));
