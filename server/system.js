const express = require("express");
const router = express.Router();
//导入数据库 sqlFn('sql',[],res=>{})
const sqlFn = require("./mysql");
//导入mockjs
const Mock = require("mockjs");



//登录
router.get("/denglu", (req, res) => {
    //查询数据库
    const username = req.query.username;
    const password = req.query.password;
    const timer = req.query.timer
    console.log(username);
    console.log(username);
    console.log(req.query);
    const sqlLen = "select * from login where username='" + username + "'and password='" + password + "'";

    sqlFn(sqlLen, null, (result) => {
        if (result.length > 0) {
            let sql = "update login set timer=? where username=?"
            sqlFn(sql, [timer, username], data => { })
            res.send({
                status: 200,
                result,
            });

        } else {
            res.send({
                status: 500,
                msg: "不存在用户",
            });
        }
    });

});




//注册
router.get("/register", (req, res) => {
    //查询数据库
    const username = req.query.username;
    const password = req.query.password;

    const sqlfind = "select * from login where username='" + username + "'and password='" + password + "'";

    sqlFn(sqlfind, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 400,
                msg: "已经存在用户"
            });
        } else {
            const sqlLen = "insert into login(username,password) values(?,?)";
            let arr = [username, password]

            sqlFn(sqlLen, arr, (result) => {
                if (result.affectedRows > 0) {
                    res.send({
                        status: 200,
                        msg: "添加成功"
                    })
                } else {
                    res.send({
                        status: 500,
                        msg: "添加失败"
                    })
                }
            });
        }
    });





});

//用户列表
router.get("/userlist", (req, res) => {
    const sql = "select * from login"
    console.log("1111");
    sqlFn(sql, null, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                total: result.length,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

//删除权限
router.get("/deleteuser", (req, res) => {
    var id = req.query.id;
    const sql = "delete from login where id=?";
    const arr = [id];
    sqlFn(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功",
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败",
            });
        }
    });
});

//更新用户角色

router.get("/updateRole", (req, res) => {
    const role = req.query.role;
    const username = req.query.username;
    const sql = "update login set role=? where username=?"
    sqlFn(sql, [role, username], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


//部门名称列表


router.get("/apartment", (req, res) => {

    const page = req.query.page || 1;

    const sqlLen = "select * from apartment where id";
    sqlFn(sqlLen, null, (data) => {
        let len = data.length;

        let sql = "select * from apartment order by id desc limit 6 offset " + (page - 1) * 6;
        sqlFn(sql, null, (result) => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 6,
                    total: len,
                });
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据",
                });
            }
        });
    });

});


//部门管理查询
router.get("/systemSearch", (req, res) => {
    var search = req.query.search;

    const sql = "select * from apartment where concat(`name`,`manage`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result,
            });
        } else {
            res.send({
                status: 500,
                msg: "暂无数据",
            });
        }
    });
});

//部门添加
router.get("/systemAdd", (req, res) => {
    /**
     * 获取参数
     */
    var name = req.query.name;
    var manage = req.query.manage;


    const sql = "insert into apartment(name,manage) values (?,?)"
    var arr = [name, manage];

    sqlFn(sql, arr, result => {

        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})

//更新部门
router.get("/updateSystem", (req, res) => {
    const name = req.query.name;
    const manage = req.query.manage;
    const id = req.query.id;
    const sql = "update apartment set name=?,manage=? where id=?"
    sqlFn(sql, [name, manage, id], result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


//删除权限
router.get("/delSystem", (req, res) => {
    var id = req.query.id;
    const sql = "delete from apartment where id=?";
    const arr = [id];
    sqlFn(sql, arr, (result) => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功",
            });
        } else {
            res.send({
                status: 500,
                msg: "删除失败",
            });
        }
    });
});

module.exports = router;