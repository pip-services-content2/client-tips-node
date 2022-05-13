# Client API (version 1) <br/> Tips Microservices Client SDK for Node.js

Node.js client API for Tips microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [Installation](#install)
* [Getting started](#get_started)
* [AttachmentV1 class](#class1)
* [PartyRefereneceV1 class](#class2)
* [TipV1 class](#class4)
* [ITipsClientV1 interface](#interface)
    - [getTips()](#operation1)
    - [getRandomTip()](#operation2)
    - [getTipById()](#operation3)
    - [createTip()](#operation4)
    - [updateTip()](#operation5)
    - [deleteTipById()](#operation6)
* [TipsHttpClientV1 class](#client_http)
* [TipsSenecaClientV1 class](#client_seneca)
* [TipsLambdaClientV1 class](#client_lambda)
* [TipsDirectClientV1 class](#client_direct)

## <a name="install"></a> Installation

To work with the client SDK add dependency into package.json file:

```javascript
{
    ...
    "dependencies": {
        ....
        "client-tips-node": "^1.0.*",
        ...
    }
}
```

Then download the dependency using **npm**:

```javascript
# Installing dependencies
npm install

# Updating dependencies
npm update
```

## <a name="get_started"></a> Getting started

This is a simple example on how to work with the microservice using REST client:

```javascript
// Get Client SDK for Version 1 
let sdk = new require('client-tips-node');

// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};

// Create the client instance
let client = sdk.TipsHttpClientV1(config);

// Open client connection to the microservice
client.open(null, function(err) {
    if (err) {
        console.error(err);
        return; 
    }
    
    console.log('Opened connection');
        
    // Create a new tip
    client.createTip(
        null,
        { 
            topics: ['ui'],
            title: { en: 'Context help' },
            content: { en: 'Press Ctrl-F1 to get context help' }
        },
        function (err, tip) {
            if (err) {
                console.error(err);
                return;
            }
            
            console.log('Created tip is');
            console.log(tip);
            
            // Get a random tip
            client.getRandomTip(
                null,
                {},
                function(err, tip) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    
                    console.log('Random tip is');
                    console.log(tip);
                    
                    // Close connection
                    client.close(null); 
                }
            );
        }
    );
});
```

## Data types

### <a name="class1"></a> AttachmentV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class4"></a> TipV1 class

Represents a system tip. 

**Properties:**
- id: string - unique tip id
- topics: string[] - list of topics
- creator: PartyReferenceV1 - party who created the tip
- create_time: Date - date and time when tip was created
- title: MultiString - (optional) tip title in multiple languages
- content: MultiString - tip textual content in multiple languages
- more_url: string - (optional) URL with additional information
- pic_ids: [string] - (optional) array of picture block ids in storage attached to this tip
- docs: [AttachmentV1] - (optional) array of attached documents
- tags: [string] - (optional) explicit tags with annoucement topic for searching
- all_tags: [string] - (readonly) normalized array of explicit and hash tags used by search
- status: string - editing status: 'new', 'writing', 'translating', 'completed' (default: 'new')
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

## <a name="interface"></a> ITipsClientV1 interface

If you are using Typescript, you can use ITipsClientV1 as a common interface across all client implementations. 
If you are using plain Javascript, you shall not worry about ITipsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```javascript
interface ITipsClientV1 {
    getTips(correlationId, filter, paging, callback);
    getRandomTip(correlationId, filter, callback);
    getTipById(correlationId, tipId, callback);
    createTip(correlationId, tip, user, callback);
    updateTip(correlationId, tipId, update, user, callback);
    deleteTipById(correlationId, tipId, callback);
}
```

### <a name="operation1"></a> getTips(correlationId, filter, paging, callback)

Retrieves a list of tips by specified criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- paging: object - paging parameters
  - paging: bool - (optional) true to enable paging and return total count
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - page: DataPage<TipV1> - retrieved page of Tip objects

### <a name="operation2"></a> getRandomTip(correlationId, filter, callback)

Gets a random tip by specified search criteria

**Params properties:** 
- correlationId: string - id that uniquely identifies transaction
- filter: object - filter parameters
  - topics: string - (optional) list of topics
  - status: string - (optional) editing status
  - from\_create\_time: Date - (optional) start of tip created interval
  - to\_create\_time: Date - (optional) end of tip created interval
  - tags: [string] - search tags
  - search: string - string for full text search in title, content and creator name
- callback: (err, page) => void - callback function
  - err: Error - occured error or null for success
  - tip: TipV1 - a random Tip object

### <a name="operation3"></a> getTipById(correlationId, tipId, callback)

Retrieves tip by its unique id. 

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- tipId: string - unique tip id
- callback: (err, tip) => void - callback function
  - err: Error - occured error or null for success
  - tip: TipV1 - retrieved Tip object

### <a name="operation4"></a> createTip(correlationId, tip, callback)

Creates an tip

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- tip: TipV1 - a tip to be created
- callback: (err, tip) => void - callback function
  - err: Error - occured error or null for success
  - tip: TipV1 - created Tip object
 
### <a name="operation5"></a> updateTip(correlationId, tip, callback)

Updates an tip

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- tip: TipV1 - a tip to be updated
- callback: (err, tip) => void - callback function
  - err: Error - occured error or null for success
  - tip: TipV1 - updated Tip object
 
### <a name="operation6"></a> deleteTipById(correlationId, tipId, callback)

Deletes system tip specified by its unique id.

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- tipId: string - unique tip id
- callback: (err) => void - callback function
  - err: Error - occured error or null for success
 
## <a name="client_http"></a> TipsHttpClientV1 class

TipsHttpClientV1 is a client that implements HTTP protocol

```javascript
class TipsHttpClientV1 extends CommandableHttpClient implements ITipsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTips(correlationId, filter, paging, callback);
    getRandomTip(correlationId, filter, callback);
    getTipById(correlationId, tipId, callback);
    createTip(fcorrelationId, eedback, user, callback);
    updateTip(correlationId, tipId, update, user, callback);
    deleteTipById(correlationId, tipId, callback);
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - type: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_seneca"></a> TipsSenecaClientV1 class

TipsSenecaClientV1 is a client that implements Seneca protocol

```javascript
class TipsSenecaClientV1 extends CommandableSenecaClient implements ITipsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTips(correlationId, filter, paging, callback);
    getRandomTip(correlationId, filter, callback);
    getTipById(correlationId, tipId, callback);
    createTip(fcorrelationId, eedback, user, callback);
    updateTip(correlationId, tipId, update, user, callback);
    deleteTipById(correlationId, tipId, callback);
}
```

**Constructor config properties:** 
- connection: object - (optional) Seneca transport configuration options. See http://senecajs.org/api/ for details.
  - type: string - Seneca transport type 
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - Seneca port number

## <a name="client_seneca"></a> TipsLambdaClientV1 class

TipsLambdaClientV1 is a client that connects to AWS lambda function

```javascript
class TipsLambdaClientV1 extends CommandableLambdaClient implements ITipsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTips(correlationId, filter, paging, callback);
    getRandomTip(correlationId, filter, callback);
    getTipById(correlationId, tipId, callback);
    createTip(fcorrelationId, eedback, user, callback);
    updateTip(correlationId, tipId, update, user, callback);
    deleteTipById(correlationId, tipId, callback);
}
```

**Constructor config properties:** 
- connection: object - AWS lambda connection options. 
  - type: string - 'aws'
  - arn: string - Lambda function arn
- credential: object - AWS lambda credential options
  - access_id: string - Amazon access id
  - access_key: string - Amazon secret access key

## <a name="client_seneca"></a> TipsDirectClientV1 class

TipsDirectClientV1 is a client that calls controller directly from the same container.
It can be used in monolythic deployments when multiple microservices run in the same process.

```javascript
class TipsDirectClientV1 extends DirectClient implements ITipsClientV1 {
    constructor(config: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getTips(correlationId, filter, paging, callback);
    getRandomTip(correlationId, filter, callback);
    getTipById(correlationId, tipId, callback);
    createTip(fcorrelationId, eedback, user, callback);
    updateTip(correlationId, tipId, update, user, callback);
    deleteTipById(correlationId, tipId, callback);
}
```
