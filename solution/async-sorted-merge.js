"use strict";

// Print all entries, across all of the *async* sources, in chronological order.
const minHeap = require("./ds/minHeap");

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    /*

    Make array of tuples of logSource and logEntry
    and insert them into the heap

  */

    let i = 0;
    for (let logSource of logSources) {
      let logEntry = await logSource.popAsync();
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
          logEntry = await logSource.popAsync();
        }
        break;
      } else {
        let { logSource, logEntry, i } = minHeap.extractMin();

        let secondDate = minHeap.peek();

        while (logEntry.date < secondDate && !logSource.drained) {
          printer.print(logEntry);
          logEntry = await logSource.popAsync();
        }

        if (logSource.drained === false) {
          minHeap.insert({ logSource, logEntry, i });
        }
      }
    }

    return resolve(printer.done());
  });
};
