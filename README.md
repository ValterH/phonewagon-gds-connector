# phonewagon-gds-connector
*This is not an official Google product*

This [Data Studio](https://datastudio.google.com) [Community
Connector](https://developers.google.com/datastudio/connector) lets users access their
[PhoneWagon](https://phonewagon.com/) service data. This Community
Connector uses the [PhoneWagon API](https://phonewagon.com/api/) 

## Try the Community Connector in Data Studio

You can try out the managed deployment of the latest code: [PhoneWagon Community Connector](https://datastudio.google.com/u/0/datasources/create?connectorId=AKfycbxRJ9ifqWr9HS8M2tZqjQ86Xk5Zp2kaTiTHRtPZWNlV)

## Examples and use cases covered in the connector

- **Third-party authentication**  
  This community connector requires third-party authentication. 
  A `client_id` and `client_secret` are required.
- **Error handling and messaging**  
  Example of using [error handling methods and providing useful error messages
  to users](https://developers.google.com/datastudio/connector/error-handling).
- **Using the sampleExtraction property**  
  Example of returning pre-defined sample data-set for more efficient
  `getData()` queries when sampleExtraction is `true`. Learn more about
  [sampleExtraction](https://developers.google.com/datastudio/connector/reference#getdata).
