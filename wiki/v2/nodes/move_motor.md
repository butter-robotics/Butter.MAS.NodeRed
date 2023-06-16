# Move Motor

Controls motor movement.

## Properties

- **robotIp** (*string*) – robot IP address.

- **motorName** (*string*) – motor name.

- **units** (*RotationUnits*) – properties base units, "radians" | "degrees".

- **position** (*float*) – motor position (units).

- **velocity** (*float*, **optional*) – movement velocity (units per second).

- **acceleration** (*float*, **optional*) – movement acceleration (units per second²).

- **duration** (*float*, **optional*) – movement duration (milliseconds).

- **debugMode** (*boolean*, **optional*) – whether or not the node logging show be verbose. Defaults to false.

## Inputs

- Amount: single input.
- Type:   JSON object with the above properties.

## Outputs

- Amount: single output.
- Type:   Butter Robotics Javascript API [Response](https://butterrobotics.com/#/library/documentation/mas_javascript_api?document=interfaces%2Finterfaces_response.Response.md).