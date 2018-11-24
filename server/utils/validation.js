const isRealString = (maybeString) => {
  return typeof maybeString === 'string' &&
         maybeString.trim().length > 0;
};

module.exports = { isRealString };
