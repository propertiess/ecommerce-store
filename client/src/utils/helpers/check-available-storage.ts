export const checkAvailableStorage = (): boolean => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const storage = window.localStorage;
    return true;
  } catch (e) {
    return false;
  }
};
