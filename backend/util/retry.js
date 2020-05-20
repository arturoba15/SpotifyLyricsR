module.exports = function retryOnce(func, recoverFunc, rt) {
  return func()
    .catch(err => recoverFunc(err, rt).then(at => func(at)));
};
