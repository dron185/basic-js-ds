const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addInside(this.rootNode, data);

    function addInside(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.value === value) {
        return node;
      }

      if (value < node.value) {
        node.left = addInside(node.left, value);
      } else {
        node.right = addInside(node.right, value);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.rootNode, data);

    function searchInside(node, value) {
      if (!node) {
        return false;
      }

      if (node.value === value) {
        return true;
      }

      return value < node.value ?
       searchInside(node.left, value) :
       searchInside(node.right, value);
    }
  }

  find(data) {
    if (!this.has(data)) {
      return null;
    }
    
    if (this.has(data)) {
      return new Node(data);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.value < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left;
          return node;
        }

        let minRight = node.right;
        while (minRight.left) {
          minRight = minRight.left;
        }

        node.data = minRight.data;

        node.right = removeNode(node.right, minRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }
    
    return currentNode.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }

    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }
    
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree
};