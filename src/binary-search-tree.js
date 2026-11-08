const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (this._root === null) {
      this._root = newNode;
      return;
    }

    let current = this._root;

    while (true) {
      if (data < current.data) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      } else {
        // Дубликаты не добавляем
        return;
      }
    }
  }

  find(data) {
    let current = this._root;

    while (current !== null) {
      if (data === current.data) {
        return current;
      }

      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  has( data ) {
    return this.find(data) !== null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    }

    if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    }

    // Узел найден
    if (node.left === null && node.right === null) {
      return null;
    }

    if (node.left === null) {
      return node.right;
    }

    if (node.right === null) {
      return node.left;
    }

    // У узла два потомка: берём минимальный узел из правого поддерева
    let minRight = node.right;

    while (minRight.left !== null) {
      minRight = minRight.left;
    }

    node.data = minRight.data;
    node.right = this._removeNode(node.right, minRight.data);

    return node;
  }

  min() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;

    while (current.left !== null) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }

    let current = this._root;

    while (current.right !== null) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};
