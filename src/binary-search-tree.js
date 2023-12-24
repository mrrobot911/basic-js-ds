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
    this.rootNode = _add(data, this.rootNode)
    function _add(data, node) {
      if (!node) return new Node(data)
      if (data < node.data) {
        node.left = _add(data, node.left)
      } else if (data > node.data) {
        node.right = _add(data, node.right)
      } else {
        node.data = data
      }
      return node
    }
  }

  has(data) {
    let node = this.rootNode
    while (node != null) {
      if (data === node.data) return true
      else if (data < node.data) node = node.left
      else node = node.right
    }
    return false
  }

  find(data) {
    return _find(data, this.rootNode);

    function _find(data, node) {
      if (!node) return null;
      if (node.data === data) return node;

      return node.data <= data
        ? _find(data, node.right)
        : _find(data, node.left);
    }
  }

  remove(data) {
    this.rootNode = _remove(data, this.rootNode);

    function _remove(data, node) {
      if (!node) return null;
      if (data < node.data) {
        node.left = _remove(data, node.left);
        return node;
      }
      if (data > node.data) {
        node.right = _remove(data, node.right);
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

        let minRightNode = node.right;
        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }
        node.data = minRightNode.data;

        node.right = _remove(minRightNode.data, node.right);

        return node;
      }
    }
  }

  min() {
    let node = this.rootNode;
    if (!node) return;

    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    if (!node) return;

    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};