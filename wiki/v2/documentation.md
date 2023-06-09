# Documentation

## Overview
1. Access the Node-RED editor in a web browser with Node-RED running.
2. Create a flow by wiring nodes together. A flow is a collection of nodes wired together and appears as a tab in the workspace.
3. Use the Inject node to inject messages into the flow.
4. Use the Butter Robotics nodes to interact with your robot from within the flow.
5. Connect the two nodes by dragging from the output of the Inject node to the input of the Butter Robotics node.
6. Double-click on a node to open its configuration dialog and edit it properties.

## Using Butter Robotics Nodes

After the installation, you would be able to find all of our nodes under the _butter_ section in your palette. You can drag and drop nodes to use them in you flow.

### Default properties

Each node have a default mandatory properties, you can access them by double clicking the node. You will have to fill the default mandatory properties and save them before you would be able to use the node. The <span title="red rectangle" aria-label="red rectangle">🔺</span> symbol denotes that some of the node properties are invalid, the invalid properties will be highlighted in red. The <small title="blue circle" aria-label="blue circle">🔵</small> symbol denotes that some of the node properties had been altered but was not deployed to the flow.

### Dynamic properties

It is possible to pass the node properties when you invoke it. One way to inject a message to the node is to use the Inject node. Set the message.payload type to JSON. You can define the new node properties in the following manner: 
```json
{
    "robotIp": "192.168.0.200",
    "animationName": "welcome",
    "relative": false
}
```
Each node will have a unique set of properties. You can find detailed information about each node and its properties in the Nodes section.

### Activating a node

Any node will activate once it receives a messages. If the message have a valid payload object, it will override the default node properties and will invoke it, otherwise, the default properties will be used.

### Additional information

You can find detailed information about each node and its properties in the Nodes section. This node description is also available within Node Red in the help tab.