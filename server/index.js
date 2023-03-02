//搭建express服务
const express = require("express");
const app = express()

//post请求表单数据
app.use(express.urlencoded({ extended: true }))

//资源共享
// const cors = require('cors')
// app.use(cors)

//静态文件托管
app.use(express.static('upload'))

//路由
const router = require('./router')
//订单
const order = require('./order')
const system = require("./system")
app.use('/', router)
app.use('/order', order)
app.use('/system', system)



app.listen(8989, () => {
    console.log(8989);
})