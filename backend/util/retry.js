module.exports = function retryOnce(func, recoverFunc, at, rt) {
  return func(at)
    .catch(err => recoverFunc(err, rt).then(at => func(at)));
};
