(function(mdjs, undefined) {
    "use strict";

    /**
     * Model of metadata file.
     * It's used to generate JSON and XML Metadata object.
     * Each sub object his named "node" in this definition. Order of nodes is important to generate XML Metadata object.
     * Node properties are:
     * 	- @property {String}   xpath       - Path to value(s) in XML Metadata file
     *  - @property {String}   multi    - Element is simple or multiple. Use to store value(s) in JSON Metadata object: true = string (without child) or object (with children) and false = array
     *  - @property {Object}   children    - List of children of this node to get sub value(s) from XML Metadata file and generate JSON Metdata object
     *  - @property {Object}   attributes  - List of attributes added to XML node during XML Metdata file generation from JSON Metadata object
     *  - @property {Boolean}  skip        - If true, skip this node when generating XML Metdata file from JSON Metdata object
     *  - @property {String}   profile     - Name of profile for this field ('inspire', 'cigal' or 'iso')
     * @type {Object}
     */
    mdjs.model_xml = {};

    mdjs.model_xml.onlineResource = {
        url: {
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:linkage/gmd:URL/text()',
        },
        protocol: {
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:protocol/gco:CharacterString/text()',
        },
        name: {
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:name/gco:CharacterString/text()',
        },
        description: {
            multi: false,
            xpath: 'gmd:CI_OnlineResource/gmd:description/gco:CharacterString/text()',
        },
        function: {
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
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:individualName/gco:CharacterString/text()',
            profile: 'cigal'
        },
        organisationName: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:organisationName/gco:CharacterString/text()',
            profile: 'inspire'
        },
        positionName: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:positionName/gco:CharacterString/text()',
            profile: 'cigal'
        },
        // phone: {
        //     multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice/gco:CharacterString/text()',
        // },
        phoneVoices: {
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:voice',
            children: {
                phoneVoice: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()',
                }
            },
            profile: 'cigal'
        },
        phoneFacsimiles: {
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:phone/gmd:CI_Telephone/gmd:facsimile',
            children: {
                phoneFacsimile: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()',
                }
            },
            profile: 'iso'
        },
        // deliveryPoint: {
        //     multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint/gco:CharacterString/text()',
        // },
        deliveryPoints: {
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:deliveryPoint',
            children: {
                deliveryPoint: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()',
                }
            },
            profile: 'cigal'
        },
        city: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:city/gco:CharacterString/text()',
            profile: 'cigal'
        },
        postalCode: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:postalCode/gco:CharacterString/text()',
            profile: 'cigal'
        },
        country: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:country/gco:CharacterString/text()',
            profile: 'iso'
        },
        // email: {
        //     multi: false,
        //     xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress/gco:CharacterString/text()',
        //     profile: 'inspire'
        // },
        emails: {
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:address/gmd:CI_Address/gmd:electronicMailAddress',
            children: {
                email: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()',
                }
            },
            profile: 'cigal'
        },
        linkages: {
            multi: true,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:onlineResource',
            children: mdjs.model_xml.onlineResource,
            profile: 'cigal'
        },

        logoUrl: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/@src',
            skip: true,
            profile: 'cigal'
        },
        logoDescription: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:contactInfo/gmd:CI_Contact/gmd:contactInstructions/gmx:FileName/text()',
            attributes: {
                src: 'node=logoUrl',
            },
            profile: 'cigal'
        },
        role: {
            multi: false,
            xpath: 'gmd:CI_ResponsibleParty/gmd:role/gmd:CI_RoleCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_RoleCode'
            },
            profile: 'inspire'
        },
    };

    mdjs.model_xml.date = {
        date: {
            multi: false,
            xpath: 'gmd:CI_Date/gmd:date/gco:Date/text()',
            profile: 'inspire'
        },
        dateTime: {
            multi: false,
            xpath: 'gmd:CI_Date/gmd:date/gco:DateTime/text()',
            profile: 'inspire'
        },
        dateType: {
            multi: false,
            xpath: 'gmd:CI_Date/gmd:dateType/gmd:CI_DateTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#CI_DateTypeCode'
            },
            profile: 'inspire'
        },
    };

    mdjs.model_xml.browseGraphic = {
        name: {
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileName/gco:CharacterString/text()',
        },
        description: {
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileDescription/gco:CharacterString/text()',
        },
        type: {
            multi: false,
            xpath: 'gmd:MD_BrowseGraphic/gmd:fileType/gco:CharacterString/text()',
        },
    };

    mdjs.model_xml.keyword = {
        // keyword: {
        //     multi: false,
        //     xpath: 'gmd:MD_Keywords/gmd:keyword/gco:CharacterString/text()',
        // },
        keywords: {
            multi: true,
            xpath: 'gmd:MD_Keywords/gmd:keyword',
            children: {
                keyword: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        keywordType: {
            multi: false,
            xpath: 'gmd:MD_Keywords/gmd:type/gmd:MD_KeywordTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_KeywordTypeCode'
            }
        },
        thesaurusName: {
            multi: false,
            xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:title/gco:CharacterString/text()',
        },
        thesaurusDates: {
            multi: true,
            xpath: 'gmd:MD_Keywords/gmd:thesaurusName/gmd:CI_Citation/gmd:date',
            children: mdjs.model_xml.date
        }
    };

    mdjs.model_xml.languageCode = {
        languageCode: {
            multi: false,
            xpath: 'gmd:LanguageCode/@codeListValue',
            attributes: {
                codeList: 'http://www.loc.gov/standards/iso639-2/'
            }
        },
    };

    mdjs.model_xml.topicCategory = {
        topicCategory: {
            multi: false,
            xpath: 'gmd:MD_TopicCategoryCode/text()',
        },
    };

    mdjs.model_xml.main = {
        mdFileIdentifier: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:fileIdentifier/gco:CharacterString/text()'
        },
        mdLanguage: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:language/gmd:LanguageCode/@codeListValue',
            attributes: {
                codeList: 'http://www.loc.gov/standards/iso639-2/'
            }
        },
        mdCharacterSet: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode'
            }
        },
        mdHierarchyLevel: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:hierarchyLevel/gmd:MD_ScopeCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode'
            }
        },
        mdHierarchyLevelName: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:hierarchyLevelName/gco:CharacterString/text()',
        },
        mdContacts: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:contact',
            children: mdjs.model_xml.contact
        },
        mdDateStamp: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:dateStamp/gco:Date/text()',
        },
        mdStandardName: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:metadataStandardName/gco:CharacterString/text()',
        },
        mdStandardVersion: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:metadataStandardVersion/gco:CharacterString/text()',
        },
        dataReferenceSystems: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:referenceSystemInfo',
            children: {
                code: {
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gco:CharacterString/text()',
                },
                codeAnchorLink: {
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gmx:Anchor/@xlink:href',
                    skip: true
                },
                codeAnchor: {
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:code/gmx:Anchor/text()',
                    attributes: {
                        'xlink:href': 'node=codeAnchorLink'
                    }
                },
                codeSpace: {
                    multi: false,
                    xpath: 'gmd:MD_ReferenceSystem/gmd:referenceSystemIdentifier/gmd:RS_Identifier/gmd:codeSpace/gco:CharacterString/text()',
                },
            }
        },
        // Data Information
        dataTitle: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:title/gco:CharacterString/text()'
        },
        dataAlternateTitle: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:alternateTitle/gco:CharacterString/text()'
        },
        // Dates
        dataDates: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:date',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:date',
            children: mdjs.model_xml.date
        },
        dataEdition: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:edition/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:citation/gmd:CI_Citation/gmd:edition/gco:CharacterString/text()'
        },
        dataEditionDates: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:editionDate/gco:Date/text()'
        },
        // Presentation form
        // TODO: vérifier position
        dataPresentationForm: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:presentationForm/gmd:CI_PresentationFormCode/@codeListValue',
            attributes: {
                codeList: ''
            }
        },
        // Identifiers
        dataIdentifiers: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:identifier',
            children: {
                code: {
                    multi: false,
                    xpath: 'gmd:RS_Identifier/gmd:code/gco:CharacterString/text()',
                },
                codeSpace: {
                    multi: false,
                    xpath: 'gmd:RS_Identifier/gmd:codeSpace/gco:CharacterString/text()',
                },
            }
        },
        // series
        dataSeries: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:citation/gmd:CI_Citation/gmd:series',
            children: {
                name: {
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:name/gco:CharacterString/text()',
                },
                issueIdentification: {
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:issueIdentification/gco:CharacterString/text()',
                },
                page: {
                    multi: false,
                    xpath: 'gmd:CI_Series/gmd:page/gco:CharacterString/text()',
                },
            }
        },
        dataAbstract: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:abstract/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:abstract/gco:CharacterString/text()'
        },
        // purpose
        dataPurpose: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:purpose/gco:CharacterString/text()',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:purpose/gco:CharacterString/text()'
        },
        // status
        dataStatus: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:status',
            children: {
                progressCode: {
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
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:pointOfContact',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:pointOfContact/gmd:CI_ResponsibleParty',
            children: mdjs.model_xml.contact
        },
        dataMaintenanceFrequency: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceAndUpdateFrequency/gmd:MD_MaintenanceFrequencyCode/@codeListValue',
            attributes: {
                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_MaintenanceFrequencyCode'
            }
        },
        dataMaintenanceNotes: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceNote',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceMaintenance/gmd:MD_MaintenanceInformation/gmd:maintenanceNote',
            children: {
                maintenanceNote: {
                    multi: false,
                    xpath: 'gco:CharacterString/text()'
                }
            }
        },
        // Browsegraphic
        dataBrowseGraphics: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:graphicOverview',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:graphicOverview',
            children: mdjs.model_xml.browseGraphic
        },
        // Keywords
        dataKeywords: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:descriptiveKeywords',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:descriptiveKeywords',
            children: mdjs.model_xml.keyword
        },
        // Specific Usage
        dataUsages: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceSpecificUsage',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceSpecificUsage',
            children: {
                specificUsage: {
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:specificUsage/gco:CharacterString/text()'
                },
                dateTime: {
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:usageDateTime/gco:DateTime/text()'
                },
                userDeterminedLimitations: {
                    multi: false,
                    xpath: 'gmd:MD_Usage/gmd:userDeterminedLimitations/gco:CharacterString/text()'
                },
                userContactInfo: {
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
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataUseLimitation: {
                    multi: false,
                    xpath: 'gmd:MD_Constraints/gmd:useLimitation/gco:CharacterString/text()',
                    // children: {
                    //     useLimitation: {
                    //         multi: false,
                    //         xpath: 'gco:CharacterString/text()',
                    //     },
                    // }
                }
            }
        },
        // Legal Constraints
        dataLegalConstraints: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataLegalUseLimitations: {
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:useLimitation',
                    children: {
                        legalUseLimitation: {
                            multi: false,
                            xpath: 'gco:CharacterString/text()',
                        },
                    }
                },
                dataLegalAccessConstraints: {
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:accessConstraints',
                    children: {
                        legalAccessConstraints: {
                            multi: false,
                            xpath: 'gmd:MD_RestrictionCode/@codeListValue',
                            attributes: {
                                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode'
                            }
                        },
                    },
                },
                dataLegalUseConstraints: {
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:useConstraints',
                    children: {
                        legalUseConstraints: {
                            multi: false,
                            xpath: 'gmd:MD_RestrictionCode/@codeListValue',
                            attributes: {
                                codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_RestrictionCode'
                            }
                        },
                    }
                },
                dataLegalOtherConstraints: {
                    multi: true,
                    xpath: 'gmd:MD_LegalConstraints/gmd:otherConstraints',
                    children: {
                        legalOtherConstraint: {
                            multi: false,
                            xpath: 'gco:CharacterString/text()',
                        },
                    }
                }

            }
        },
        dataSecurityConstraints: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:resourceConstraints',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/gmd:resourceConstraints',
            children: {
                dataSecurityUseLimitations: {
                    multi: true,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:useLimitation',
                    children: {
                        securityUseLimitation: {
                            multi: false,
                            xpath: 'gco:CharacterString/text()',
                        },
                    }
                },
                dataSecurityClassification: {
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
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialRepresentationType/gmd:MD_SpatialRepresentationTypeCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_SpatialRepresentationTypeCode'
            }
        },
        // Scale
        // Scale denominator
        dataScaleDenominator: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:MD_RepresentativeFraction/gmd:denominator/gco:Integer/text()',
        },
        // Scale distance
        dataScaleDistance: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:spatialResolution/gmd:MD_Resolution/gmd:distance/gco:Distance/text()',
            attributes: {
                uom: 'http://standards.iso.org/ittf/PublicityAvailableStandards/ISO_19139_Schemas/resources.uom/ML_gmxUom.xml#m'
            }
        },
        // Languages
        dataLanguages: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:language',
            children: mdjs.model_xml.languageCode
        },
        // Data Character Set
        dataCharacterSet: {
            multi: false,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:characterSet/gmd:MD_CharacterSetCode/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/resources/codeList.xml#MD_CharacterSetCode'
            }
        },
        // Topic Categories
        dataTopicCategories: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:topicCategory',
            children: mdjs.model_xml.topicCategory
        },
        // Service Type
        srvType: {
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:serviceType/gco:LocalName/text()',
        },
        srvAccessProperties: {
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:accessProperties',
            children: {
                fees: {
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:fees/gco:CharacterString/text()',
                },
                plannedAvailableDateTime: {
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:plannedAvailableDateTime/gco:DateTime/text()',
                },
                orderingInstructions: {
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:orderingInstructions/gco:CharacterString/text()',
                },
                turnarournd: {
                    multi: false,
                    xpath: 'gmd:MD_StandardOrderProcess/gmd:turnarournd/gco:CharacterString/text()',
                }
            }
        },
        // Extents
        dataExtents: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:identificationInfo/gmd:MD_DataIdentification/gmd:extent',
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:extent',
            children: {
                dataExtentName: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:description/gco:CharacterString/text()',
                },
                // GeographicExtents,
                dataGeographicExtentWestBound: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:westBoundLongitude/gco:Decimal/text()',
                },
                dataGeographicExtentEastBound: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:eastBoundLongitude/gco:Decimal/text()',
                },
                dataGeographicExtentSouthBound: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:southBoundLatitude/gco:Decimal/text()',
                },
                dataGeographicExtentNorthBound: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:geographicElement/gmd:EX_GeographicBoundingBox/gmd:northBoundLatitude/gco:Decimal/text()',
                },
                // GeographicExtents by identifier - Not implemented
                // TemporalExtents
                dataTemporalExtentBegin: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:beginPosition/text()',
                },
                dataTemporalExtentEnd: {
                    multi: false,
                    xpath: 'gmd:EX_Extent/gmd:temporalElement/gmd:EX_TemporalExtent/gmd:extent/gml:TimePeriod/gml:endPosition/text()',
                },
                // VerticalExtents
                dataVerticalExtent_Max: {
                    multi: false,
                    xpath: '',
                },
                dataVerticalExtent_Unit: {
                    multi: false,
                    xpath: '',
                },
                dataVerticalExtent_Ref: {
                    multi: false,
                    xpath: '',
                },
            }
        },
        // TODO: <srv:coupledResource/>
        // srvCoupledResource: {
        //     multi: true,
        //     xpath_srv: '',
        //     children: {}
        // },
        // <srv:couplingType>
        srvCouplingType: {
            multi: false,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:couplingType/srv:SV_CouplingType/@codeListValue',
            attributes: {
                codeList: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#SV_CouplingType'
            }
        },
        // <srv:containsOperations>
        srvContainsOperations: {
            multi: true,
            xpath_srv: '/gmd:MD_Metadata/gmd:identificationInfo/srv:SV_ServiceIdentification/srv:containsOperations',
            children: {
                operationName: {
                    multi: false,
                    xpath: 'srv:SV_OperationMetadata/srv:operationName/gco:CharacterString/text()'
                },
                dcp: {
                    multi: false,
                    xpath: 'srv:SV_OperationMetadata/srv:DCP/srv:DCPList/@codeListValue',
                    attributes: {
                        codeList: 'http://www.isotc211.org/2005/iso19119/resources/Codelist/gmxCodelists.xml#DCPList'
                    }
                },
                connectPoint: {
                    multi: true,
                    xpath: 'srv:SV_OperationMetadata/srv:connectPoint',
                    children: mdjs.model_xml.onlineResource
                },
            }
        },
        // DistributionFormats
        dataDistributionFromats: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:distributionFormat',
            children: {
                formatName: {
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:name/gco:CharacterString/text()',
                },
                formatVersion: {
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:version/gco:CharacterString/text()',
                },
                formatSpecification: {
                    multi: false,
                    xpath: 'gmd:MD_Format/gmd:specification/gco:CharacterString/text()',
                },
                formatDistributor: {
                    multi: true,
                    xpath: 'gmd:MD_Format/gmd:formatDistributor/gmd:MD_Distributor/gmd:distributorContact',
                    children: mdjs.model_xml.contact
                }
            }
        },
        // Distributors
        dataDistributors: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:distributor',
            children: {
                distributorContact: {
                    multi: false,
                    xpath: 'gmd:MD_Distributor/gmd:distributorContact',
                    children: mdjs.model_xml.contact
                },
                // distributionOrderProcess: {
                //     multi: true,
                //     xpath: 'gmd:MD_Format/gmd:version/gco:CharacterString/text()',
                // },
                distributionOrderProcess: {
                    multi: true,
                    xpath: 'gmd:MD_Distributor/gmd:distributionOrderProcess',
                    children: {
                        fees: {
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:fees/gco:CharacterString/text()',
                        },
                        plannedAvailableDateTime: {
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:plannedAvailableDateTime/gco:DateTime/text()',
                        },
                        orderingInstructions: {
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:orderingInstructions/gco:CharacterString/text()',
                        },
                        turnarournd: {
                            multi: false,
                            xpath: 'gmd:MD_StandardOrderProcess/gmd:turnarournd/gco:CharacterString/text()',
                        }
                    }
                }
            }
        },
        // TransferOptions
        dataTransferOptions: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:transferOptions',
            children: {
                unitsOfDistribution: {
                    multi: false,
                    xpath: 'gmd:MD_DigitalTransferOptions/gmd:unitsOfDistribution/gco:CharacterString/text()',
                },
                linkages: {
                    multi: true,
                    xpath: 'gmd:MD_DigitalTransferOptions/gmd:onLine',
                    children: mdjs.model_xml.onlineResource
                }
            }
        },
        // Linkages
        dataLinkages: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:distributionInfo/gmd:MD_Distribution/gmd:transferOptions/gmd:MD_DigitalTransferOptions/gmd:onLine',
            children: mdjs.model_xml.onlineResource
        },
        // Data Quality
        // Data Quality level
        dataQualityInfo: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:dataQualityInfo',
            children: {
                dataDqLevel: {
                    multi: false,
                    xpath: 'gmd:DQ_DataQuality/gmd:scope/gmd:DQ_Scope/gmd:level/gmd:MD_ScopeCode/@codeListValue',
                    attributes: {
                        codeList: 'http://standards.iso.org/ittf/PubliclyAvailableStandards/ISO_19139_Schemas/resources/Codelist/ML_gmxCodelists.xml#MD_ScopeCode'
                    }
                },
                // Data Lineage
                dataLiStatement: {
                    multi: false,
                    xpath: 'gmd:DQ_DataQuality/gmd:lineage/gmd:LI_Lineage/gmd:statement/gco:CharacterString/text()',
                },
                // Data Process Steps
                //'Data_LI_ProcessStep': {
                //     multi: false,
                //     xpath: '',
                // },
                // Data Source
                //'Data_LI_Source': {
                // multi: false,
                //     xpath: '',
                // },
            }
        },
        // Data Conformities
        dataDqConformities: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:dataQualityInfo/gmd:DQ_DataQuality/gmd:report',
            children: {
                dataDqConformityTest: {
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:specification/gmd:CI_Citation/gmd:title/gco:CharacterString/text()',
                },
                dataDqConformityDates: {
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:specification/gmd:CI_Citation/gmd:date',
                    children: mdjs.model_xml.date
                },
                dataDqConformityResult: {
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:explanation/gco:CharacterString/text()',
                },
                dataDqConformityPass: {
                    multi: false,
                    xpath: 'gmd:DQ_DomainConsistency/gmd:result/gmd:DQ_ConformanceResult/gmd:pass/gco:Boolean',
                },
            }
        },
        mdSecurityConstraints: {
            multi: true,
            xpath: '/gmd:MD_Metadata/gmd:metadataConstraints',
            children: {
                securityUseLimitations: {
                    multi: true,
                    xpath: 'gmd:MD_SecurityConstraints/gmd:useLimitation',
                    children: {
                        securityUseLimitation: {
                            multi: false,
                            xpath: 'gco:CharacterString/text()',
                        },
                    }
                },
                securityClassification: {
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
