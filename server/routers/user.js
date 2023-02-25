
const selectAll = `SELECT * FROM login`;

function userRoutes(app, db) {


    app.get('/api/getUsers/:table', async (req, res) => {
        try {
            let sigRes = `select * from ${req.params.table}`;
            const selRes = await db.query(sigRes)
            res.json({
                msg: "success",
                data: selRes[0]
            })
        } catch (error) {
            res.json({
                msg: "failed",
                error: error
            })
        }
    });

    app.get('/api/getAllLand/', async (req, res) => {
        try {
            let sigRes = `select land.*, login.* from land, login where login.email=land.email`;
            const selRes = await db.query(sigRes)
            res.json({
                msg: "success",
                data: selRes[0]
            })
        } catch (error) {
            res.json({
                msg: "failed",
                error: error
            })
        }
    });



    app.post('/api/insertUser/:id', async (req, res) => {
        try {
            let data = req.body;
            const insRes = `INSERT INTO ${req.params.id} SET ?`;
            await db.query(insRes, data)
            const selRes = await db.query(selectAll)
            res.json({
                msg: "success",
                data: selRes[0]
            })
        } catch (error) {
            res.json({
                msg: "failed",
                error: error
            })
        }
    }); 

   
    app.put('/api/updateLand', async (req, res) => {
        try {
            data = req.body;
            const updRes = `UPDATE land SET isavailable=?, registered=? WHERE surveyno =?`;
            let sinRes = `select * from land WHERE surveyno='${data.surveyno}'`
            await db.query(updRes, [data.isavailable, data.registered, data.surveyno])
            const selRes = await db.query(sinRes)
            res.json({
                msg: "success",
                data: selRes[0]
            })
        } catch (error) {
            res.json({
                msg: "failed",
                error: error
            })
        }
    });

   
}


module.exports = userRoutes