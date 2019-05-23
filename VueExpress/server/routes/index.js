const classify = require('./classify')
const article = require('./article')
const admin = require('./admin')

module.exports = function(app) {
	app.use('/api/classify',classify)
	app.use('/api/article',article)
	app.use('/api/admin',admin)
}