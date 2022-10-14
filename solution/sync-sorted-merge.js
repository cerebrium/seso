"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  /*

    Make array of tuples of logSource and logEntry

  */

  let logTuples = logSources.map((logSource) => {
    return {
      logEntry: logSource.pop(),
      logSource,
    };
  });

  /*


    Sort array of tuples by date of log source

  */

  let sortedLogTuples = logTuples.sort((a, b) => {
    return a.logEntry.date - b.logEntry.date;
  });

  /*


    create a function that will take 2 log sources
    it will then compare the dates of the log sources
    and return the log source with the earlier date
    exhausted up to the point of the log source with the later date.

    it returns the new later date log source


  */

  let logSourceWithEarliestDate = sortedLogTuples[0];
  let logSourceWithNextEarliestDate = sortedLogTuples[1];

  while (logSourceWithEarliestDate) {
    printer.print(logSourceWithEarliestDate.logEntry);
  }

  return console.log("Sync sort complete.");
};
