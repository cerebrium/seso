/*


  Taken from my practice repo for doing ds/algo stuff: https://github.com/cerebrium/practice/blob/main/ds/index.ts

  Actually mostly solved this on a repl.it: https://replit.com/join/vaxwiurcdu-nicholas-shankl

  Formatted it to handle the correct data structure


  Took far far too long to realize that I was using [1] instead of [0] for the peek 
  method. In some other implementations there is null inputted at 0. 

*/

class minHeap {
  minHeap = [];

  insert = function (val) {
    this.minHeap.push(val);
    this.bubbleUp(this.minHeap.length - 1);
  };

  bubbleUp = function (index) {
    while (index > 0 && index < this.minHeap.length) {
      // get the parent
      var parent = Math.floor((index + 1) / 2) - 1;

      let parentDate = this.minHeap[parent].logEntry.date;

      let currentNode = this.minHeap[index].logEntry.date;

      // if parent is greater than child
      if (parentDate > currentNode) {
        // swap
        var temp = this.minHeap[parent];
        this.minHeap[parent] = this.minHeap[index];
        this.minHeap[index] = temp;
      }

      index = parent;
    }
  };

  extractMin = function () {
    var min = this.minHeap[0];

    // set first element to last element
    this.minHeap[0] = this.minHeap.pop();

    // call bubble down
    this.bubbleDown(0);

    return min;
  };

  bubbleDown = function (index) {
    while (true) {
      var child = (index + 1) * 2;
      var sibling = child - 1;
      var toSwap = null;

      let childNode = this.minHeap[child]
        ? this.minHeap[child].logEntry.date
        : null;

      let currentNode = this.minHeap[index]
        ? this.minHeap[index].logEntry.date
        : null;

      let siblingNode = this.minHeap[sibling]
        ? this.minHeap[sibling].logEntry.date
        : null;

      // if current is greater than child
      if (currentNode > childNode) {
        toSwap = child;
      }

      // if sibling is smaller than child, but also smaller than current
      if (
        currentNode &&
        siblingNode &&
        currentNode > siblingNode &&
        (childNode === null || (childNode !== null && siblingNode < childNode))
      ) {
        toSwap = sibling;
      }

      // if we don't need to swap, then break.
      if (!toSwap || !this.minHeap[toSwap]) break;

      var temp = this.minHeap[toSwap];
      this.minHeap[toSwap] = this.minHeap[index];
      this.minHeap[index] = temp;

      if (index > this.minHeap.length) break;
      index = toSwap;
    }
  };

  peek = function () {
    if (this.minHeap[0]) {
      return this.minHeap[0].logEntry.date;
    }
  };
}

module.exports = new minHeap();
