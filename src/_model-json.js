(function(mdjs, undefined) {
    "use strict";

    /**
     * empty_json main object
     * lends md
     * @type {Object}
     */
    mdjs.empty_json = {};

    /**
     * Empty contact object
     * lends mdjs.empty_json
     * @type {Array}
     */
    mdjs.empty_json.contact = {
        "name": "",
        "position": "",
        "organisation": "",
        "address": "",
        "cp": "",
        "city": "",
        "phone": "",
        "email": "",
        "role": "",
        "logo_text": "",
        "logo_url": ""
    };

    /**
     * Empty date object
     * lends mdjs.empty_json
     * @type {Array}
     */
    mdjs.empty_json.date = {
        "type": "",
        "date": ""
    };

    /**
     * Empty resource identifier object
     * @type {Array}
     */
    mdjs.empty_json.identifier = {
        "code": "",
        "codespace": ""
    };

    /**
     * Empty geographic extent object
     * @type {Array}
     */
    mdjs.empty_json.geographicextent = {
        "name": "",
        "xmin": "",
        "xmax": "",
        "ymin": "",
        "ymax": ""
    };

    /**
     * Empty browse graphic object
     * @type {Array}
     */
    mdjs.empty_json.browsegraphic = {
        "url": "",
        "description": "",
        "type": ""
    };

    /**
     * Empty temporal extent object
     * @type {Array}
     */
    mdjs.empty_json.temporalextent = {
        "begin": "",
        "end": "",
        "description": ""
    };

    /**
     * Empty keyword object
     * @type {Array}
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
     * Empty inspire keyword object
     * @type {Array}
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
     * Empty reference system object
     * @type {Array}
     */
    mdjs.empty_json.referencesystem = {
        "code": "",
        "codespace": ""
    };

    /**
     * Empty data format object
     * @type {Array}
     */
    mdjs.empty_json.distributionformat = {
        "name": "",
        "version": "",
        "specification": ""
    };

    /**
     * Empty linkage object
     * @type {Array}
     */
    mdjs.empty_json.linkage = {
        "name": "",
        "description": "",
        "url": "",
        "protocol": ""
    };

    /**
     * Empty data quality conformity object
     * @type {Array}
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
     * Empty metdata object
     * @type {Array}
     */
    mdjs.empty_json.metadata = {
        "md_fileidentifier": "",
        "md_language": "",
        "md_characterset": "",
        "md_hierarchylevel": "",
        "md_contacts": [],
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
        "data_browsegraphics": [],
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
