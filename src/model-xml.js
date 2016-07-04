

/**
 * model-xml.js
 * @file model-xml.js
 * @description mdjs XML model file
 * @author Guillaume RYCKELYNCK
 * @version b15
 * @license MIT
 * Copyright (c) 2016 - CIGAL (G. Ryckelynck)
 */

(function(mdjs, undefined) {
    "use strict";

    /**
     * Model of metadata file.
     * It's used to generate JSON and XML Metadata object according to ISO 19115 UML schema.
     * Each sub object his named "node" in this definition. Order of nodes is important to generate XML Metadata object.
     * Node properties are:
     * @property {String}   xpath       - Path to value(s) in XML Metadata file
     * @property {String}   multi       - Element is simple or multiple. Use to store value(s) in JSON Metadata object: true = string (without child) or object (with children) and false = array
     * @property {Object}   children    - List of children of this node to get sub value(s) from XML Metadata file and generate JSON Metdata object
     * @property {Object}   attributes  - List of attributes added to XML node during XML Metdata file generation from JSON Metadata object
     * @property {Boolean}  skip        - If true, skip this node when generating XML Metdata file from JSON Metdata object
     * @property {String}   profile     - Name of profile for this field ('inspire', 'cigal' or 'iso') - Not directly used
     * @type {Object}
     */
    mdjs.model_xml = {};

    mdjs.model_xml.onlineResource = {
        url: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:linkage/gmd:URL/text()'
        },
        protocol: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString/text()'
        },
        name: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:name/gco:CharacterString/text()'
        },
        description: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:description/gco:CharacterString/text()'
        },
        'function': {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:function/gmd:CI_OnLineFunctionCode/@codeListValue',
            attributes: {
                codeList: 'http://librairies.ign.fr/geoportail/resources/CodeLists.xml#CI_OnLineFunctionCode'
            }
        }
    };

    mdjs.model_xml.contact = {
        // Contact
        individualName: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString/text()'
        },
        organisationName: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString/text()'
        },
        positionName: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString/text()'
        },
        // phone: {
        //     profile: 'iso', multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice/gco:CharacterString/text()',
        // },
        phoneVoices: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice',
            children: {
                phoneVoice: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        phoneFacsimiles: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:facsimile',
            children: {
                phoneFacsimile: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        // deliveryPoint: {
        //     profile: 'iso', multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint/gco:CharacterString/text()',
        // },
        deliveryPoints: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint',
            children: {
                deliveryPoint: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        city: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:city/gco:CharacterString/text()'
        },
        postalCode: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:postalCode/gco:CharacterString/text()'
        },
        country: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:country/gco:CharacterString/text()'
        },
        // email: {
        //     profile: 'iso', multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString/text()',
        //
        // },
        emails: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress',
            children: {
                email: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()',
                }
            }
        },
        linkages: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource',
            children: mdjs.model_xml.onlineResource
        },
        logoUrl: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/@src',
            skip: true
        },
        logoDescription: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/text()',
            attributes: {
                src: 'node=logoUrl',
            }
        },
        role: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_RoleCode'
            }
        },
    };

    mdjs.model_xml.date = {
        date: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_Date/gmd:date/gco:Date/text()'
        },
        dateTime: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_Date/gmd:date/gco:DateTime/text()'
        },
        dateType: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode'
            }
        }
    };

    mdjs.model_xml.browseGraphic = {
        fileName: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileName/gco:CharacterString/text()'
        },
        fileDescription: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileDescription/gco:CharacterString/text()'
        },
        fileType: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileType/gco:CharacterString/text()'
        }
    };

    mdjs.model_xml.keyword = {
        // keyword: {
        //     profile: 'iso', multi: false,
        //     xpath: 'gmd:MD_Keywords/gmd:keyword/gco:CharacterString/text()',
        // },
        keywords: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:MD_Keywords/gmd:keyword',
            children: {
                keyword: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        keywordType: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_Keywords/gmd:type/gmd:MD_KeywordTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_KeywordTypeCode'
            }
        },
        thesaurusName: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString/text()'
        },
        thesaurusDates: {
            profile: 'iso',
            multi: true,
            xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:date',
            children: mdjs.model_xml.date
        }
    };

    mdjs.model_xml.languageCode = {
        languageCode: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:LanguageCode/@codeListValue',
            attributes: {
                codeList: 'http://www.loc.gov/standards/iso639-2/'
            }
        }
    };

    mdjs.model_xml.topicCategory = {
        topicCategory: {
            profile: 'iso',
            multi: false,
            xpath: 'gmd:MD_TopicCategoryCode/text()'
        }
    };

    mdjs.model_xml.main = {
        mdFileIdentifier: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString/text()'
        },
        mdLanguage: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:language/gmd:LanguageCode/@codeListValue',
            attributes: {
                codeList: 'http://www.loc.gov/standards/iso639-2/'
            }
        },
        mdCharacterSet: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode'
            }
        },
        mdHierarchyLevel: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:hierarchyLevel/gmd:MD_ScopeCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode'
            }
        },
        mdHierarchyLevelName: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:hierarchyLevelName/gco:CharacterString/text()'
        },
        mdContacts: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:contact',
            children: mdjs.model_xml.contact
        },
        mdDateStamp: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:dateStamp/gco:Date/text()'
        },
        mdStandardName: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:metadataStandardName/gco:CharacterString/text()'
        },
        mdStandardVersion: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:metadataStandardVersion/gco:CharacterString/text()'
        },
        dataReferenceSystems: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:referenceSystemInfo',
            children: {
                code: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gco:CharacterString/text()'
                },
                codeAnchorLink: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gmx:Anchor/@xlink:href',
                    skip: true
                },
                codeAnchor: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gmx:Anchor/text()',
                    attributes: {
                        'xlink:href': 'node=codeAnchorLink'
                    }
                },
                codeSpace: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:codeSpace/gco:CharacterString/text()'
                }
            }
        },
        // Data Information
        dataTitle: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString/text()'
        },
        dataAlternateTitle: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString/text()'
        },
        // Dates
        dataDates: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:date',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:date',
            children: mdjs.model_xml.date
        },
        dataEdition: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:edition/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:edition/gco:CharacterString/text()'
        },
        dataEditionDates: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:editionDate/gco:Date/text()'
        },
        // Presentation form
        // TODO: vérifier position
        dataPresentationForm: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:presentationForm/gmd:CI_PresentationFormCode/@codeListValue',
            attributes: {
                codeList: ''
            }
        },
        // Identifiers
        // GRK - change dataIdentifiers par dataRSIdentifiers
        dataRsIdentifiers: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:identifier',
            children: {
                code: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:RS_Identifier/gmd:code/gco:CharacterString/text()'
                },
                codeSpace: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:RS_Identifier/gmd:codeSpace/gco:CharacterString/text()'
                }
            }
        },
        // GRK - Add dataMdIdentifiers
        dataMdIdentifiers: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:identifier',
            children: {
                code: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Identifier/gmd:code/gco:CharacterString/text()'
                }
            }
        },
        // series
        dataSeries: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:series',
            children: {
                name: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:name/gco:CharacterString/text()'
                },
                issueIdentification: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:issueIdentification/gco:CharacterString/text()'
                },
                page: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:page/gco:CharacterString/text()'
                },
            }
        },
        dataAbstract: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:abstract/gco:CharacterString/text()'
        },
        // purpose
        dataPurpose: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:purpose/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:purpose/gco:CharacterString/text()'
        },
        // status
        dataStatus: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:status',
            children: {
                progressCode: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_ProgressCode/@codeListValue',
                    attributes: {
                        codeList: 'http://librairies.ign.fr/geoportail/resources/CodeLists.xml#MD_ProgressCode'
                    }
                }
            }
        },
        // Contacts: tableau d'objets
        dataPointOfContacts: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty',
            children: mdjs.model_xml.contact
        },
        dataMaintenanceFrequency: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_MaintenanceFrequencyCode'
            }
        },
        dataMaintenanceNotes: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceNote',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceNote',
            children: {
                maintenanceNote: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        // Browsegraphic
        dataBrowseGraphics: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:graphicOverview',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:graphicOverview',
            children: mdjs.model_xml.browseGraphic
        },
        // Keywords
        dataKeywords: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:descriptiveKeywords',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:descriptiveKeywords',
            children: mdjs.model_xml.keyword
        },
        // Specific Usage
        dataUsages: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceSpecificUsage',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceSpecificUsage',
            children: {
                specificUsage: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:specificUsage/gco:CharacterString/text()'
                },
                dateTime: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:usageDateTime/gco:DateTime/text()'
                },
                userDeterminedLimitations: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:userDeterminedLimitations/gco:CharacterString/text()'
                },
                userContactInfo: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_Usage/gmd:userContactInfo',
                    children: mdjs.model_xml.contact
                },
                // TODO: A compléter
            }
        },
        // Limits and constraints
        // dataConstraints: {
        dataUseLimitations: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataUseLimitation: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Constraints/gmd:useLimitation/gco:CharacterString/text()'
                }
            }
        },
        // Legal Constraints
        dataLegalConstraints: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataLegalUseLimitations: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:useLimitation',
                    children: {
                        legalUseLimitation: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gco:CharacterString/text()'
                        },
                    }
                },
                dataLegalAccessConstraints: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:accessConstraints',
                    children: {
                        legalAccessConstraints: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_RestrictionCode/@codeListValue',
                            attributes: {
                                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode'
                            }
                        }
                    }
                },
                dataLegalUseConstraints: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:useConstraints',
                    children: {
                        legalUseConstraints: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_RestrictionCode/@codeListValue',
                            attributes: {
                                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode'
                            }
                        }
                    }
                },
                dataLegalOtherConstraints: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:otherConstraints',
                    children: {
                        legalOtherConstraint: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gco:CharacterString/text()'
                        }
                    }
                }
            }
        },
        dataSecurityConstraints: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataSecurityUseLimitations: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:useLimitation',
                    children: {
                        securityUseLimitation: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gco:CharacterString/text()'
                        }
                    }
                },
                dataSecurityClassification: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:classification/gmd:MD_ClassificationCode/@codeListValue',
                    attributes: {
                        codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ClassificationCode'
                    }
                }
            }
        },
        // Spatial Representation Type (vector/raster)
        dataSpatialRepresentationType: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialRepresentationType/gmd:MD_SpatialRepresentationTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode'
            }
        },
        // Scale
        // Scale denominator
        // DONE: change path
        dataScaleDenominator: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialResolution/gmd:MD_Resolution/gmd:equivalentScale/gmd:MD_RepresentativeFraction/gmd:denominator/gco:Integer/text()'
        },
        // Scale distance
        dataScaleDistance: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialResolution/gmd:MD_Resolution/gmd:distance/gco:Distance/text()',
            attributes: {
                uom: 'http://standards.iso.org/ittf/PublicityAvailableStandards/ISO_19139_Schemas/resources.uom/ML_gmxUom.xml#m'
            }
        },
        // Languages
        dataLanguages: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:language',
            children: mdjs.model_xml.languageCode
        },
        // Data Character Set
        dataCharacterSet: {
            profile: 'iso',
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode'
            }
        },
        // Topic Categories
        dataTopicCategories: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:topicCategory',
            children: mdjs.model_xml.topicCategory
        },
        // Service Type
        srvType: {
            profile: 'iso',
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:serviceType/gco:LocalName/text()',
        },
        srvAccessProperties: {
            profile: 'iso',
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:accessProperties',
            children: {
                fees: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:fees/gco:CharacterString/text()',
                },
                plannedAvailableDateTime: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:plannedAvailableDateTime/gco:DateTime/text()',
                },
                orderingInstructions: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:orderingInstructions/gco:CharacterString/text()',
                },
                turnarournd: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:turnarournd/gco:CharacterString/text()',
                }
            }
        },
        // Extents
        dataExtents: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:extent',
            children: {
                dataExtentName: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:description/gco:CharacterString/text()',
                },
                // GeographicExtents,
                dataGeographicExtentWestBound: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal/text()',
                },
                dataGeographicExtentEastBound: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal/text()',
                },
                dataGeographicExtentSouthBound: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal/text()',
                },
                dataGeographicExtentNorthBound: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal/text()',
                },
                // GeographicExtents by identifier - Not implemented
                // TemporalExtents
                dataTemporalExtentBegin: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition/text()',
                },
                dataTemporalExtentEnd: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition/text()',
                },
                // VerticalExtents
                dataVerticalExtent_Max: {
                    profile: 'iso',
                    multi: false,
                    xpath: '',
                },
                dataVerticalExtent_Unit: {
                    profile: 'iso',
                    multi: false,
                    xpath: '',
                },
                dataVerticalExtent_Ref: {
                    profile: 'iso',
                    multi: false,
                    xpath: '',
                },
            }
        },
        // TODO: <srv:coupledResource/>
        // srvCoupledResource: {
        //     profile: 'iso', multi: true,
        //     xpath_srv: '',
        //     children: {}
        // },
        // <srv:couplingType>
        srvCouplingType: {
            profile: 'iso',
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:couplingType/srv:SV_CouplingType/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#SV_CouplingType'
            }
        },
        // <srv:containsOperations>
        srvContainsOperations: {
            profile: 'iso',
            multi: true,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:containsOperations',
            children: {
                operationName: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'srv:SV_OperationMetadata/srv:operationName/gco:CharacterString/text()'
                },
                dcp: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'srv:SV_OperationMetadata/srv:DCP/srv:DCPList/@codeListValue',
                    attributes: {
                        codeList: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#DCPList'
                    }
                },
                connectPoint: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'srv:SV_OperationMetadata/srv:connectPoint',
                    children: mdjs.model_xml.onlineResource
                },
            }
        },
        // DistributionFormats
        dataDistributionFormats: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:distributionFormat',
            children: {
                formatName: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:name/gco:CharacterString/text()',
                },
                formatVersion: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:version/gco:CharacterString/text()',
                },
                formatSpecification: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:specification/gco:CharacterString/text()',
                },
                formatDistributor: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_Format/gmd:formatDistributor/gmd:MD_Distributor/gmd:distributorContact',
                    children: mdjs.model_xml.contact
                }
            }
        },
        // Distributors
        dataDistributors: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:distributor',
            children: {
                distributorContact: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_Distributor/gmd:distributorContact',
                    children: mdjs.model_xml.contact
                },
                // distributionOrderProcess: {
                //     profile: 'iso',
                //     multi: true,
                //     xpath: 'gmd:MD_Format/gmd:version/gco:CharacterString/text()',
                // },
                distributionOrderProcess: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_Distributor/gmd:distributionOrderProcess',
                    children: {
                        fees: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:fees/gco:CharacterString/text()',
                        },
                        plannedAvailableDateTime: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:plannedAvailableDateTime/gco:DateTime/text()',
                        },
                        orderingInstructions: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:orderingInstructions/gco:CharacterString/text()',
                        },
                        turnarournd: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:turnarournd/gco:CharacterString/text()',
                        }
                    }
                }
            }
        },
        // TransferOptions
        dataTransferOptions: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:transferOptions',
            children: {
                unitsOfDistribution: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_DigitalTransferOptions/gmd:unitsOfDistribution/gco:CharacterString/text()',
                },
                linkages: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_DigitalTransferOptions/gmd:onLine',
                    children: mdjs.model_xml.onlineResource
                }
            }
        },
        // Linkages
        dataLinkages: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:transferOptions/gmd:MD_DigitalTransferOptions/gmd:onLine',
            children: mdjs.model_xml.onlineResource
        },
        // Data Quality
        // Data Quality level
        dataQualityInfo: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:dataQualityInfo',
            children: {
                dataDqLevel: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DataQuality/gmd:scope/gmd:DQ_Scope/gmd:level/gmd:MD_ScopeCode/@codeListValue',
                    attributes: {
                        codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode'
                    }
                },
                // Data Lineage
                dataLiStatement: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:statement/gco:CharacterString/text()',
                },
                // Data Process Steps
                //'Data_LI_ProcessStep': {
                //     profile: 'iso', multi: false,
                //     xpath: '',
                // },
                // Data Source
                //'Data_LI_Source': {
                // profile: 'iso', multi: false,
                //     xpath: '',
                // },
            }
        },
        // Data Conformities
        dataDqConformities: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:report',
            children: {
                dataDqConformityTest: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:specification/gmd:CI_Citation/gmd:title/gco:CharacterString/text()',
                },
                dataDqConformityDates: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:specification/gmd:CI_Citation/gmd:date',
                    children: mdjs.model_xml.date
                },
                dataDqConformityResult: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:explanation/gco:CharacterString/text()',
                },
                dataDqConformityPass: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:pass/gco:Boolean',
                },
            }
        },
        mdSecurityConstraints: {
            profile: 'iso',
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:metadataConstraints',
            children: {
                securityUseLimitations: {
                    profile: 'iso',
                    multi: true,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:useLimitation',
                    children: {
                        securityUseLimitation: {
                            profile: 'iso',
                            multi: false,
                            xpath: 'gco:CharacterString/text()',
                        },
                    }
                },
                securityClassification: {
                    profile: 'iso',
                    multi: false,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:classification/gmd:MD_ClassificationCode/@codeListValue',
                    attributes: {
                        codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ClassificationCode'
                    }
                }
            }
        },
    };

}(window.mdjs = window.mdjs || {}));
