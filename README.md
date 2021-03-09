
<!-- PROJECT LOGO -->
<br />
<p align="center" style="margin-bottom: -6px">
  <a href="https://github.com/idc-milab/NodeRed-Butter/">
    <img src="nodes/icons/butter-node-red-logo.png" alt="Logo" width="80" height="108">
  </a>

  <h3 align="center">NodeRed-Butter</h3>

  <p align="center">
    This repo defines node-red nodes that encapsulate butter.mas.api opertaions.
    <br />
    <br />
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This project extends the basic node-red node types with new nodes that encapsulate Butter Robotics operations and api calls.
This can prove very useful when building IoT flows and orchestration using Node-Red, and needing to use Butter as well.


### Built With

* [Butter Javascript API](https://github.com/butter-robotics/Butter.MAS.JavascriptAPI)
* [Node-Red](https://nodered.org/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* Download Node-Red (Dah..)
  Plese refer to [this link](https://nodered.org/docs/getting-started/windows) for easy installation on Windows.
  
* npm install the package with the cmd while inside your user data directory (usually $HOME/.node-red)
  ```sh
  npm install node-red-contrib-milab-butter@latest -g
  ```
* Restart node red and validate that the new nodes exist in your node pallete !


<!-- USAGE EXAMPLES -->
## Usage

Once you have completed the prerequisites, the new nodes should appear in all their glory in the node pallete :)

![pallete pic](readme-resources/pallete-example.png?raw=true)

You can drag the butter nodes to use in your flows:

![flow pic](readme-resources/flow-example.png?raw=true)

Refer to the documentation given inside the node-red GUI to understand the usage better - have fun !


_To learn more about Node-Red, please refer to their [Documentation](https://nodered.org/docs/)_\
_To understand more about Butter, please refer to their [Documentation](https://github.com/butter-robotics/Butter.MAS.JavascriptAPI)_


<!-- CONTRIBUTING -->
## Contributing

We always have space for improvements, here is how to help:

1) Fork the repo.
2) Submit a PR.
3) Bump the version in package.json.
4) Write a concise summary of your change in the RELEASE-NOTES.md file.
5) _If your contribution includes a new node in the UI or any client facing feature, consult with @RonGissin about updating the example-flow file._  

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Ron Gissin - ron.gissin@milab.idc.ac.il

Project Link: [NodeRed-Butter](https://github.com/idc-milab/NodeRed-Butter)


## Authors

* [Ron Gissin](https://github.com/RonGissin)


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [Benny Megidish](https://github.com/bennymeg)



