# Simple web interface for MXNET model trained with CIFAR10 dataset.

More details on MXNET models can be found [here](https://gluon-cv.mxnet.io/build/examples_classification/demo_cifar10.html#sphx-glr-build-examples-classification-demo-cifar10-py).

## Libraries & Setup
* Front-end
  * HTML (Bootstrap)
  * Javscript (JQuery)


* Back-end
  * Python - Flask
  
    Back-end environment is built with [miniconda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/) from environment_droplet.yml
    ```
    conda env create -f environment_droplet.yml
    ```
    Then MXNET can be activated
    ```
    conda activate MXNET
    ```

## Usage

* index.html is run with [live-server](https://www.npmjs.com/package/live-server).
  ```
  live-server index.html
  ```

* server.py is run with Python 3.6.10
  ```
  python server.py
  ```
* index.js & styles.css is run with [http.server](https://docs.python.org/3/library/http.server.html).
  ```
  python -m http.server 8000
  ```
