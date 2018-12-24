import { Dispatcher } from 'autoinquirer';

export const createDatasource = async function(
  schemaFile,
  dataFile,
  renderer?
) {
  // jshint ignore:line

  const dispatcher = new Dispatcher(schemaFile, dataFile, renderer);
  await dispatcher.connect(); // jshint ignore:line
  return dispatcher;
};
