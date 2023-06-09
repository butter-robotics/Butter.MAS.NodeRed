# Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need to install [Node JS](https://nodejs.org/en/) & [Node Red](https://nodered.org/docs/getting-started/local) in order to use this software:

1. Download and install the latest recommended LTS version on Node JS
2. Open your Command Prompt (Windows) or Terminal (Mac / Linux) and execute the following command:

    `npm install -g --unsafe-perm node-red`

## Installing

Open your Command Prompt (Windows) or Terminal (Mac / Linux) and execute the following command:

`npm install -g @butter-robotics/mas-node-red-api@latest`

## Lunching Node RED

In order to launch Node RED open your Command Prompt (Windows) or Terminal (Mac / Linux) and execute the following command:

`node-red`

You can then access the Node RED editor by pointing your browser at http://localhost:1880 (the IP address might differ).
You can use Ctrl-C or close the terminal window to stop Node RED.

## Usage

Once you have completed the prerequisites, the new nodes should appear in the node pallette. 
You can drag and drop the butter nodes to use in your flows.
In the next Documentation section we will explain how to generally use nodes in your flow. You can find detailed description for each node under the Nodes section.
