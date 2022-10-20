"use strict";

// Print all entries, across all of the sources, in chronological order.
const minHeap = require("./ds/minHeap");

module.exports = (logSources, printer) => {
  /*

    Make array of tuples of logSource and logEntry
    and insert them into the heap

  */

  let i = 0;
  for (let logSource of logSources) {
    let logEntry = logSource.pop();
    if (logEntry) {
      minHeap.insert({ logSource, logEntry, i });
    }
    i++;
  }

  /*


    While the heap is not empty, extract the min, and nearest neighbor
    print all dates from the min, whilst above the nearest neighbor.

    Place both back into the heap
*/

  while (true) {
    if (minHeap.minHeap.length === 1) {
      let { logSource, logEntry } = minHeap.extractMin();
      while (logEntry) {
        printer.print(logEntry);
        logEntry = logSource.pop();
      }
      break;
    } else {
      let { logSource, logEntry, i } = minHeap.extractMin();

      let secondDate = minHeap.peek();

      while (logEntry.date < secondDate && !logSource.drained) {
        printer.print(logEntry);
        logEntry = logSource.pop();
      }

      if (logSource.drained === false) {
        minHeap.insert({ logSource, logEntry, i });
      }
    }
  }

  printer.done();

  return console.log("Sync sort complete.");
};
