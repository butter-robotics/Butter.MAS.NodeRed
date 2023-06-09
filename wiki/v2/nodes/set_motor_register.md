# Set Motor Register

Sets motor register value.

## Properties

- **robotIp** (*string*) – robot IP address.

- **motorName** (*string*) – motor name.

- **registerName** (*string*) – motor register name.

- **debugMode** (*boolean*, **optional*) – whether or not the node logging show be verbose. Defaults to false.

## Inputs

- Amount: single input.
- Type:   JSON object with the above properties.

## Outputs

- Amount: single output.
- Type:   Butter Robotics Javascript API [Response](https://butterrobotics.com/#/library/documentation/mas_javascript_api?document=interfaces%2Finterfaces_response.Response.md).