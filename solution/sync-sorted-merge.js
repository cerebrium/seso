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

  const compareLogSourcesAndExhaustEarlierSource = (logSource1, logSource2) => {
    let earlierLogSource;
    let laterLogSource;

    if (logSource1.logEntry.date < logSource2.logEntry.date) {
      earlierLogSource = logSource1;
      laterLogSource = logSource2;
    } else {
      earlierLogSource = logSource2;
      laterLogSource = logSource1;
    }

    while (earlierLogSource.logEntry.date < laterLogSource.logEntry.date) {
      printer.print(earlierLogSource.logEntry);
      earlierLogSource.logEntry = earlierLogSource.logSource.pop();
    }
  };

  /*

    Identify the top two log sources
    and their indices in the sortedLogTuples array

    call the compare and print function

    resort

    while the top log source is not exhausted
    call the compare function

  */

  let topLogSource = sortedLogTuples[0];
  let secondLogSource = sortedLogTuples[1];

  while (topLogSource.logEntry) {
    compareLogSourcesAndExhaustEarlierSource(topLogSource, secondLogSource);
    sortedLogTuples.sort((a, b) => {
      return a.logEntry.date - b.logEntry.date;
    });
    topLogSource = sortedLogTuples[0];
    secondLogSource = sortedLogTuples[1];
  }

  printer.done();

  return console.log("Sync sort complete.");
};
