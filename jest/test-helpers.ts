export const flushPromises = (): Promise<void> => new Promise<void>(setImmediate);
