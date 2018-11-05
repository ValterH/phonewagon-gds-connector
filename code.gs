/** Returns the authentication type required for the Connector */
function getAuthType() {
  return {
    type: "USER_PASS"
  };
}

/** Returns the configuration for the Community Connector */
function getConfig(request) {
  try {
    var userProperties = PropertiesService.getUserProperties();
    var client_id = userProperties.getProperty("ID");
    var client_secret = userProperties.getProperty("SECRET");
  } catch (e) {
    console.log(e);
    throwConnectorError("Please provide your PhoneWagon client_id as username and client_secret as password", true);
  }
  var options = getOptions(client_id, client_secret);
  
  var cc = DataStudioApp.createCommunityConnector();
  var config = cc.getConfig();
  
  config
    .newInfo()
    .setId('Info')
    .setText('Select for which companies and campaigns you wish to select data');
  
  
  var comp = cc.getConfig()
    .newSelectMultiple()
    .setId('companies')
    .setName('Select Client')
    .setHelpText('Select Companies for your report')
    for (i = 0; i < options.companies.length; i++) {
      var option = options.companies[i];
      comp.addOption(config.newOptionBuilder().setLabel(option.label).setValue(option.value));
    }
  
  var camp = cc.getConfig()
    .newSelectMultiple()
    .setId('campaigns')
    .setName('Select Campaigns')
    .setHelpText('Select Campaigns for your report')
    for (i = 0; i < options.campaigns.length; i++) {
      var option = options.campaigns[i];
      camp.addOption(config.newOptionBuilder().setLabel(option.label).setValue(option.value));
    }
  
  config.setDateRangeRequired(true);
  
  var connectorConfig = config.build();
  
  return connectorConfig;
}

var dataSchema = [{
                    name: 'CompanyId',
                    label: 'Company Id',
                    dataType: 'NUMBER',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallId',
                    label: 'Call Id',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CompanyName',
                    label: 'Company Name',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallerName',
                    label: 'Caller Name',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'ContactState',
                    label: 'Contact State',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CampaignId',
                    label: 'Campaign Id',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'ReceiveCallTime',
                    label: 'Receive Call Time',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION',
                                 SemanticGroup: 'DATETIME'
                                }
                  },
                  {
                    name: 'CustomerPhoneNumber',
                    label: 'Customer Phone Number',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CustomerCity',
                    label: 'Customer City',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallCharge',
                    label: 'Call Charge',
                    dataType: 'NUMBER',
                    semantics: { conceptType: 'METRIC' }
                  },
                  {
                    name: 'CallNotes',
                    label: 'Call Notes',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallDirection',
                    label: 'Call Direction',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallSource',
                    label: 'Call Source',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CampaignName',
                    label: 'Campaign Name',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CampaignNumber',
                    label: 'Campaign Number',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Status',
                    label: 'Status',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Duration',
                    label: 'Duration',
                    dataType: 'NUMBER',
                    semantics: { conceptType: 'METRIC',
                                 SemanticGroup: 'DURATION'
                                }
                  },
                  {
                    name: 'RecordingUrl',
                    label: 'Recording Url',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'AgentForwardingNumber',
                    label: 'AgentForwardingNumber',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'CallsTags',
                    label: 'Calls Tags',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'UTMSource',
                    label: 'UTM Source',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'UTMMedium',
                    label: 'UTM Medium',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'UTMContent',
                    label: 'UTMContent',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'UTMCampaign',
                    label: 'UTM Campaign',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'UTMTerm',
                    label: 'UTM Term',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Gclid',
                    label: 'Gclid',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Keyword',
                    label: 'Keyword',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'MatchType',
                    label: 'Match Type',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'AdPosition',
                    label: 'Ad Position',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Device',
                    label: 'Device',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'Network',
                    label: 'Network',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'KeywordId',
                    label: 'Keyword Id',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'GoogleCampaignId',
                    label: 'Google Campaign Id',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'GoogleAdgroupId',
                    label: 'Google Adgroup Id',
                    dataType: 'STRING',
                    semantics: { conceptType: 'DIMENSION' }
                  },
                  {
                    name: 'TotalCalls',
                    label: 'Total Calls',
                    dataType: 'NUMBER',
                    semantics: { conceptType: 'METRIC' }
                  }];
                  
/** Returns the schema for the connector, depending on the configuration */
function getSchema(request) {
  return {schema: dataSchema};
}

/** Returns the schema and data for the GDS query */
function getData(request) {
  var startDate = request.dateRange.startDate;
  var endDate = request.dateRange.endDate;
  var client_id = null;
  var client_secret = null;
  try {
    var company_id = request.configParams.companies;
    var campaign_id = request.configParams.campaigns;
  } catch (e) {
    console.log(e);
    throwConnectorError("Please provide the information required in the configuration", true);
  }
  
  // CACHE
  var cache = new DataCache(CacheService.getUserCache(), startDate, endDate);
  var calls = null;
  calls = fetchFromCache(cache);
  
  // SCHEMA
  var schema = [];
  for (var i = 0; i < request.fields.length; i++) {
    for (var j = 0; j < dataSchema.length; j++) {
      if (dataSchema[j].name == request.fields[i].name) {
        schema.push(dataSchema[j]);
      }
    }
  }

  
  // DATA
  if (!calls) {
    try {
      var userProperties = PropertiesService.getUserProperties();
      client_id = userProperties.getProperty("ID");
      client_secret = userProperties.getProperty("SECRET");
    } catch (e) {
      console.log(e);
      throwConnectorError("Please provide your PhoneWagon client_id as username and client_secret as password", true);
    }
    var access_token = authenticate(client_id, client_secret);
    if (typeof access_token != undefined) {
      calls = getCalls(access_token, startDate, endDate, company_id, campaign_id);
      setInCache(calls, cache);
    }
  }
  var data = getRows(calls, schema);
  
  return {schema: schema, rows: data};
}

/** Returns the access token for the PhoneWagon API */
function authenticate(id, secret) {
  var token = null;
  
  // Try to get the Token from Script Properties
  try {
    var sp = PropertiesService.getScriptProperties();
    token = sp.getProperty("token");
    var expires = sp.getProperty("expires");
  } catch(e) {
    console.log(e);
  }
  if (token != null & checkDate(new Date('Sat Nov 03 12:57:01 GMT+01:00 2018'), new Date(), expires)) return token;
  
  // If the Token is not in Script Properties obtain it from the API
  var url = 'https://api.phonewagon.com/token';
  var parameters = {'method' : 'POST',
                    'headers' : {'Content-Type' : 'application/x-www-form-urlencoded'},
                    'muteHttpExceptions': true,
                    'payload' : 'client_id=' + id + '&client_secret=' +  secret + '&grant_type=client_credentials'
                   };
  var response = UrlFetchApp.fetch(url,parameters).getContentText();
  token = JSON.parse(response).access_token;
  var seconds = JSON.parse(response).expires_in; 
  var expires = new Date();
  expires = new Date(expires.getTime() + seconds);
  
  /** set Token and Expiration Time to Script Properties */
  var sp = PropertiesService.getScriptProperties();
  sp.setProperty("token", token);
  sp.setProperty("expires",expires);
  return token;
}

/** Returns options for the Community Connector */
function getOptions(id, secret) {
  var access_token = authenticate(id, secret);
  var options = {};
  if (typeof access_token != undefined) {
      options['companies'] = getCompanies(access_token);
      options['campaigns'] = getCampaigns(access_token, options['companies']);
    }
  return options;
}

function getCompanies(token) {
  var options = []
  var url = 'https://api.phonewagon.com/api/calls';
  
  var parameters = {'method' : 'GET',
                    'headers' : {'Authorization' : 'Bearer ' + token,
                                 'Content-Type' : 'application/x-www-form-urlencoded'
                                 },
                    'muteHttpExceptions': true,
                }
  var response = UrlFetchApp.fetch(url,parameters).getContentText();
  var companies = JSON.parse(response);
  
  for (i = 0; i < companies.length; i++) {
    options.push({"label" : companies[i].CompanyName, "value": companies[i].CompanyId})
  }
  options.push({"label" : "All Companies", "value": 0});
  return options;
}

function getCampaigns(token, companies) {
  var options = [];
  var url = 'https://api.phonewagon.com/api/calls?company_id=';
  var parameters = {'method' : 'GET',
                    'headers' : {'Authorization' : 'Bearer ' + token,
                                 'Content-Type' : 'application/x-www-form-urlencoded'
                                 },
                    'muteHttpExceptions': true,
                }
  for (i = 0; i < companies.length; i++) {
    var URL = url + companies[i].value;
    var response = UrlFetchApp.fetch(URL,parameters).getContentText();
    var campaigns = JSON.parse(response);
    if (campaigns[0] == undefined) continue;
    for (j = 0; j < campaigns.length; j++) {
      options.push({"label" : campaigns[j].CampaignName, "value": campaigns[j].CampaignId})
    }
  }
  options.push({"label" : "All Campaigns", "value": 0});
  return options;
}

/** Returns data about calls from the PhoneWagon API */
function getCalls(token, start, end, company, campaign) {
  
  var url = 'https://api.phonewagon.com/api/calls';
  
  var parameters = {'method' : 'GET',
                    'headers' : {'Authorization' : 'Bearer ' + token,
                                 'Content-Type' : 'application/x-www-form-urlencoded'
                                 },
                    'muteHttpExceptions': true,
                }
  var page = 0;
  var run = true;
  var size = 1000;
  var calls = [];
  var params = {}
  var URL = url;
  while (run) {
    url = URL;
    url += '?page_start=' + page;
    url += '&page_size=' + size;
    url += '&start_date=' + "8/16/2014";
    url += '&end_date=' + Utilities.formatDate(new Date(), "UTC+1", "MM/dd/yyyy");
    url += '&page_sort=' + 1;
    url += '&page_order=' + "asc";
    url += '&search=' + '';
    url += '&is_lead_call=' + false;
    url += '&company_id=' + company;
    url += '&source_id=' + campaign;
    var response = UrlFetchApp.fetch(url,parameters).getContentText();
    var data = JSON.parse(response);
    var list = data.calls;
    var add = [];
    for (var i = 0; i < list.length; i+=1) {
      var callDate = list[i].ReceiveCallTime.slice(0,list[i].ReceiveCallTime.indexOf("T"));
      if(checkDate(start, callDate, end)) add.push(list[i]);
    }
    calls = calls.concat(add)
    if (data.total_records < size) run = false
    page++;
  }
  return calls;
}



/** Returns data about calls properly structured and ready to return in function getData */
function getRows(calls, schema) {
  var total = calls.length;
  var data = [];
  var items = [];
  var ix = 0;
  var tags = [];
  
  for (i = 0; i < calls.length; i++) {
    items = [];
    tags = [];
    for(j = 0; j < schema.length; j++) {
      var item = schema[j].name;
      if (item == "CallsTags") {
        for (t=0; t < calls[i][item].length; t++) {
          tags.push(calls[i][item][t].TagName);
        }
        items.push("");
        ix = items.indexOf("");
      } else if (item == "TotalCalls") {
        items.push(total);
      } 
      else {
        if (schema[j].dataType == 'NUMBER' && calls[i][item] == null) {
          items.push(0);
        }
        else {
          items.push(calls[i][item]);
        }
      }
    }
    if (tags.length > 1) {
      var entries = new Array(tags.length);
      for (tag = 0; tag < tags.length; tag++) {
        entries[tag] = new Array(items.length);
        for (el = 0; el < items.length; el++) {
          entries[tag][el] = items[el];
        }
        entries[tag][ix] = tags[tag];
        data.push({"values" : entries[tag]});
      }
    } else {
      data.push({"values" : items});
    }
  }
  return data;
}

/** Returns true or false if the date of the call is in the specified date range or not */
function checkDate(start, call, end) {
  var startDate = new Date(start);
  var callDate = new Date(call);
  var endDate = new Date(end);
  return endDate > callDate && callDate> startDate;
}

/** Returns data from cache if it is available */
function fetchFromCache(cache) {
  var data = null;
  console.log('Trying to fetch from cache...');
  try {
    var callsString = cache.get();
    data = JSON.parse(callsString);
    console.log('Fetched succesfully from cache', data.length);
  } catch (e) {
    console.log('Error when fetching from cache:', e);
  }
  
  return data;
}

/** Sets Data into cache */
function setInCache(calls, cache) {
  console.log('Setting data to cache...');
  try {
    cache.set(JSON.stringify(calls));
  } catch (e) {
    console.log('Error when storing in cache', e);
  }
}

/**
   * Throws an error that complies with the community connector spec.
   * @param {string} message The error message.
   * @param {boolean} userSafe Determines whether this message is safe to show
   *     to non-admin users of the connector. true to show the message, false
   *     otherwise. false by default.
   */
function throwConnectorError(message, userSafe) {
  userSafe = (typeof userSafe !== 'undefined' &&
              typeof userSafe === 'boolean') ?  userSafe : false;
  if (userSafe) {
    message = 'DS_USER:' + message;   
  }

  throw new Error(message);
}
 
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var id = userProperties.getProperty("ID");
  var secret = userProperties.getProperty("SECRET");
  return validateCredentials(id, secret);
}

function validateCredentials(id, secret) {
  if (id === null || secret === null) {
    return false;
  }

  // To check if the credentials entered are valid.
  var url = 'https://api.phonewagon.com/token';
  var parameters = {'method' : 'POST',
                    'headers' : {'Content-Type' : 'application/x-www-form-urlencoded'},
                    'muteHttpExceptions': true,
                    'payload' : 'client_id=' + id + '&client_secret=' +  secret + '&grant_type=client_credentials'
                   };
  try {
    var response = UrlFetchApp.fetch(url,parameters)
  } catch (err) {
    return false;
  }
  // Status OK: 200
  // Status unauthorized: 401
  if (response.getResponseCode() == 200) {
    return true;
  }
  return false;
}

// Added for USER_PASS auth type.
function setCredentials(request) {
  var creds = request.userPass;
  var id = creds.username;
  var secret = creds.password;
  
  var validCreds = validateCredentials(id, secret);
  if (!validCreds) {
    return {
      errorCode: "INVALID_CREDENTIALS"
    };
  }
  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty("ID", id);
  userProperties.setProperty("SECRET", secret);
  return {
    errorCode: "NONE"
  };
}

function deleteScriptProperties() {
  var sp = PropertiesService.getScriptProperties();
  sp.deleteProperty("token");
  sp.deleteProperty("expires");
}

function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty("ID");
  userProperties.deleteProperty("SECRET");
}

function isAdminUser() {
  return true;
}