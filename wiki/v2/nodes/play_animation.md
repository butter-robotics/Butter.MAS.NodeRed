# Play Animation

Controls animation playback.

## Properties

- **robotIp** (*string*) – robot IP address.

- **animationName** (*string*) – the name of the animation to be played.

- **lenient** (*boolean*, **optional*) – whether or not to wait for current animation the finish before animating this one. Defaults to false.

- **relative** (*boolean*, **optional*) – whether or not to play animation relative to the current robot position. Defaults to false.

- **debugMode** (*boolean*, **optional*) – whether or not the node logging show be verbose. Defaults to false.

## Inputs

- Amount: single input.
- Type:   JSON object with the above properties.

## Outputs

- Amount: single output.
- Type:   Butter Robotics Javascript API [Response](https://butterrobotics.com/#/library/documentation/mas_javascript_api?document=interfaces%2Finterfaces_response.Response.md).