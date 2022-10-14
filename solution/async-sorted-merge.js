"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    const handleBatching = async (logSources, printer) => {
      console.log("logSources", logSources.length);
      const promises = logSources.map((logSource) => logSource.popAsync());
      const results = await Promise.all(promises);

      const logEntries = results.filter((result) => result !== false);
      const logSourcesWithEntries = logEntries.map((logEntry, i) => {
        return {
          logEntry,
          logSource: logSources[i],
        };
      });

      const sortedLogSources = logSourcesWithEntries.sort((a, b) => {
        return a.logEntry.date - b.logEntry.date;
      });

      sortedLogSources.forEach((sortedLogSource) => {
        printer.print(sortedLogSource.logEntry);
      });

      const logSourcesWithoutEntries = logSources.filter((logSource) => {
        return !logSourcesWithEntries.some((logSourceWithEntry) => {
          return logSourceWithEntry.logSource === logSource;
        });
      });

      if (logSourcesWithoutEntries.length > 0) {
        await handleBatching(logSourcesWithoutEntries, printer);
      }
    };

    await handleBatching(logSources, printer);
    printer.done();
    resolve();
  });
};
