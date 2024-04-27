export type Logger = {
  info(message: string, data?: { [key: string]: any }): void;
  warn(message: string, data?: { [key: string]: any }): void;
  error(error: Error, message: string, data?: { [key: string]: any }): void;
  with(name: string, data?: { [key: string]: any }): Logger;
};

export const createLogger = (
  name: string,
  initData?: { [key: string]: any }
) => {
  const getLogger = (
    name?: string,
    parentData?: { [key: string]: any }
  ): Logger => ({
    info: (message, data) =>
      console.info(message, {
        ...parentData,
        ...data,
        logger: { name: name },
      }),
    warn: (message, data) =>
      console.warn(message, {
        ...parentData,
        ...data,
        logger: { name: name },
      }),
    error: (error, message, data) =>
      console.error(message, {
        ...parentData,
        ...data,
        logger: { name: name },
        error,
      }),
    with: (childName, data) =>
      getLogger(`${name}.${childName}`, {
        ...parentData,
        ...data,
      }),
  });

  return getLogger(name, initData);
};
