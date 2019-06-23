var express = require('express')
var router = express.Router()

function ejs(req, res, next)
{
	let locals = {
		title : 'EJS',
		link : 'http://www.embeddedjs.com/',
		description : 'EJS limpia el HTML del JavaScript con plantillas del lado cliente. Combina datos y una plantilla para producir HTML. Código entre <% %> se ejecuta. Código entre <%= %> lo añade al HTML que se resuelve.',
		/*seasons : [
			['Primavera', ['Abril', 'Mayo', 'Junio']],
			['Verano', ['Julio', 'Agosto', 'Septiembre']],
			['Otoño', ['Octubre', 'Noviembre', 'Diciembre']],
			['Invierno', ['Enero', 'Febrero', 'Marzo']],
		]   Ejemplo de estructura de dato*/
	}

	res.render('home', locals)
}
function error404(req, res, next)
{
	let error = new Error(),
		locals = {
			title : 'Error 404',
			description : 'Recurso No Encontrado',
			error : error
		}

	error.status = 404

	res.render('error', locals)

	next()
}
router
	.get('/', (req, res) => {
		res.end('<h1>Terminamos la configuraci&oacute;n de nuestra primer App en Express</h1>')
	})
	.get('/ejs', ejs)
    .use(error404)
    
module.exports = router