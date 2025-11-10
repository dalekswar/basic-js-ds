// const { NotImplementedError } = require('../lib/errors');
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  root() {
    return this._root ?? null;
  }

  add(data) {
    if (this._root == null) {
      this._root = new Node(data);
      return;
    }
    let cur = this._root;
    for (;;) {
      if (data === cur.data) return;
      if (data < cur.data) {
        if (cur.left) cur = cur.left;
        else {
          cur.left = new Node(data);
          return;
        }
      } else {
        if (cur.right) cur = cur.right;
        else {
          cur.right = new Node(data);
          return;
        }
      }
    }
  }

  find(data) {
    let cur = this._root ?? null;
    while (cur) {
      if (data === cur.data) return cur;
      cur = data < cur.data ? cur.left : cur.right;
    }
    return null;
  }

  has(data) {
    return this.find(data) !== null;
  }

  remove(data) {
    const rm = (node, value) => {
      if (!node) return null;
      if (value < node.data) {
        node.left = rm(node.left, value);
        return node;
      }
      if (value > node.data) {
        node.right = rm(node.right, value);
        return node;
      }

      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minRight = node.right;
      while (minRight.left) minRight = minRight.left;
      node.data = minRight.data;
      node.right = rm(node.right, minRight.data);
      return node;
    };

    this._root = rm(this._root ?? null, data);
  }

  min() {
    let n = this._root ?? null;
    if (!n) return null;
    while (n.left) n = n.left;
    return n.data;
  }

  max() {
    let n = this._root ?? null;
    if (!n) return null;
    while (n.right) n = n.right;
    return n.data;
  }
}

module.exports = {
  BinarySearchTree,
};
