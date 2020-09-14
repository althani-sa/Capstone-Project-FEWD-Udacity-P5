const  app  =  require("../server/index")
const port =  process.env.PORT || 1412
app.listen(port, function () {
    console.log('Example app listening on port 1412!')
})
