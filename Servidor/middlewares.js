//FUNCION QUE ACEPTA CALLBACK SIMULANDO TRY CATCH
function catchAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
}

module.exports = { catchAsync };
