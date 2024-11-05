const express = require ("express")
const router = express()

router.use("/api/users",require ("./UserRotas"));

//Rota de teste
router.get("/",(req,res)=>{
    res.send("A API esta funcionando com postamn.")
})

module.exports = router