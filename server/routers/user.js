const { v4: uuidv4 } = require('uuid');

const selectAll = `SELECT * FROM login`;

function userRoutes(app, db) {

    app.get('/api/getAllLand/:id', async (req, res) => {
        try {
            let sigRes = `select l.*, u.username from land l , login u where l.id=u.id and (l.id='${req.params.id}' or l.registered='${req.params.id}')`;
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

    app.get('/api/getUnRegLand/:id', async (req, res) => {
        try {
            let sigRes = `select l.*, u.username from land l , login u where l.id=u.id and l.isavailable=1 and l.id!='${req.params.id}'`;
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
            if (req.params.id === "login")
                req.body.id = uuidv4();
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



    app.put('/api/updateLogin', async (req, res) => {
        try {
            data = req.body;
            const updRes = `UPDATE login SET username=?, phone=?, email=?, password=?, profileImg=? WHERE id=?`;
            const sinRes = `select * from login where id='${data.id}'`;
            await db.query(updRes, [data.username, data.phone, data.email, data.password, data.profileImg, data.id])
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

    app.get('/api/isloged/:id/:pas', async (req, res) => {
        try {
            const islog = `select * from login Where email='${req.params.id}' and password = '${req.params.pas}'`;
            const logdel = await db.query(islog);
            res.json({
                msg: "Success",
                data: logdel[0]
            })
        } catch (error) {
            res.json({
                msg: "Failed",
                error: error
            })
        }
    })
    app.delete('/api/getDeleteLand/:id', async (req, res) => {
        try {
            let sigRes = `DELETE FROM land l WHERE l.surveyno='${req.params.id}'`;
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






}


module.exports = userRoutes