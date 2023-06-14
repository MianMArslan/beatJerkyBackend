function error(app) {
  app.use(function (error, req, res, next) {
    if (error.name == 'beatJerky') res.fail({ status: error.status, error })
    else if (error.name.startsWith('Sequelize')) res.error({ error })
    else res.fail({ error })
  })
}
export default error
