const express = require ("express")
const router = express()

router.use("/api/users",require ("./UserRotas"));
router.use("/api/photos",require("./PhotoRoutes"));

//Rota de teste
router.get("/",(req,res)=>{
    res.send("A API esta funcionando com postamn.")
})

module.exports = router