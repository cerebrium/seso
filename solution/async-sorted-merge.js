"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    /*

    Make array of tuples of logSource and logEntry

  */

    let logTuples = await Promise.all(
      logSources.map(async (logSource) => {
        return {
          logEntry: await logSource.popAsync(),
          logSource,
        };
      })
    );

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

    const compareLogSourcesAndExhaustEarlierSource = async (
      logSource1,
      logSource2
    ) => {
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
        earlierLogSource.logEntry = await earlierLogSource.logSource.popAsync();
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
      await compareLogSourcesAndExhaustEarlierSource(
        topLogSource,
        secondLogSource
      );
      sortedLogTuples.sort((a, b) => {
        return a.logEntry.date - b.logEntry.date;
      });
      topLogSource = sortedLogTuples[0];
      secondLogSource = sortedLogTuples[1];
    }

    return resolve(printer.done());
  });
};
