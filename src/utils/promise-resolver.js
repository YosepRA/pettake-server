async function promiseResolver(prom) {
  try {
    const result = await prom;

    return [result, null];
  } catch (error) {
    return [null, error];
  }
}

module.exports = promiseResolver;
