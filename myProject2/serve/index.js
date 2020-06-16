const express = require('express')

const app = express()

app.set('secret', 'fhsdoiwenvs2f3sa21f')

app.use(require('cors')()) //跨域
app.use(express.json())
// 托管静态静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})