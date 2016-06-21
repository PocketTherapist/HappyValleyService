var express = require('express');
var router = express.Router();
var ORM = require('../orm');
var Assert = require('assert');
var Promiss = require('bluebird');
var mailer = require('nodemailer');
var GFunc = require('./GlobalFunction.js');
/* GET home page. */


//決まり事
//①最初の新規登録時＆パスワードを忘れた時は
//仮パスワード発行→仮パスワードでログイン→本パスワードへの変更を基本とする。

//パスワード処理を入れるか入れないかのスイッチ
//・パスワードスイッチON(1)：メール経由で仮パスワード発行→本パスワード登録
//・パスワードスイッチOFF(0)：最初にパスワードを登録する。忘れた場合は？対応できない。

var passwordSwitch = 1;

router.get('/', function (req, res) {
    
    //クッキーの中身確かめる。    
    var uid = req.cookies.BackTech_UserID;
    var sid = req.cookies.BackTech_LogInSession;
    
    console.log(uid);
    
    //クッキーにuserIDが書かれいなかったら、Login画面へ
    if (uid == undefined || uid == '') {
        console.log('cookie BackTech UID does not exist.');
        res.cookie('BackTech_UserID', '', { maxAge: 360000000, httpOnly: false });
        res.cookie('BackTech_LogInSession', '', { maxAge: 360000000, httpOnly: false });
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 0,
            FORGETPASSWORD : passwordSwitch
        });
    //クッキーにuserIDが書かれてセッションが有効なら、メニューorパスワード変更画面へ
    } else {
        
        GFunc.SendMailForTempPassword(uid, GFunc.MakeTempPassword());
        ORM.GetSessionInfo(sid)
        .then(function (sessionInfo) {
            if (sessionInfo == null) {
                console.log('Session is null.');
                res.cookie('BackTech_UserID', '', { maxAge: 360000000, httpOnly: false });
                res.render('EntryPoint.ejs', {
                    LOGIN_MISS : 0,
                    FORGETPASSWORD : passwordSwitch
                });
            } else {
                ORM.GetUserInfo(uid)
                .then(function (UserInfo){
                    if (UserInfo.temporaryPassword && passwordSwith == 1) {
                        res.render('ChangePassword.ejs', {
                            SID : sid,
                            UID : uid
                        })
                        return;
                    } else {
                        res.render('Menu.ejs', {
                            SID : sid,
                            UID : uid,
                        })
                        return;
                    }                    
                })
                .catch(function(error){
                    console.log('ユーザー情報取得に失敗しました。');
                    return;
                })
            }

        })
        .catch(function (error) {
            //Assert(false, "セションの更新に失敗しました。：" + error);
            console.log('セションの更新に失敗しました。');
            res.render('EntryPoint.ejs', {
                LOGIN_MISS : 0,
                FORGETPASSWORD : passwordSwitch
            });
            return;
        })

    }

});

//パスワードを忘れた時の仮パスワード発行
router.get('/ForgetPassword', function (req, res) {

    res.render('ForgetPassword.ejs' , { 
        CONF_MISS : 0
    })
    return;
});

//仮パスワードをIDのメアドに送信し、ログイン画面に戻る。
router.post('/SendPassword',function(req,res) {
    
    ORM.GetUserInfo(req.body.user_id)
    .then(function (user) {
        console.log(user);
        if (user !== undefined) {
            GFunc.SendMailForTempPassword(req.body.user_id, GFunc.MakeTempPassword());
            res.render('ReportSendMail.ejs', {
                LOGIN_MISS : 0
            });
            return;
        } else {
            res.render('Forgetpassword.ejs' , {
                CONF_MISS : 1
            });
            return;
        }

    })

   
});

//ログイン時にIDとパスワードを確認する。クッキーに登録
router.post('/LogIn', function (req, res) {
    
    var sid = null;
    var uid = null;

    ORM.LoginUser(req.body.user_id,req.body.password)
    .then(function (_session) {
        //Assert.notEqual(null, _session, "ログインに失敗しました。セッション情報を作成できませんでした。");
        sid = _session.sessionId;
        uid = _session.ownerId;
    })
    .catch(function (error) {
        //Assert(false, "ログイン処理中に例外が発生しました。：" + error);
        console.log("ログイン処理中に例外が発生しました。" );
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 1,
            FORGETPASSWORD : passwordSwitch
        });
        return;
    })
    .then(function () {
        res.cookie('BackTech_UserID', uid, { maxAge: 3600000000 });
        res.cookie('BackTech_LogInSession', sid, { maxAge: 3600000000 });
    })
    .then(function () {
        console.log('###Session ID:' + sid);
        console.log('###User ID:' + uid);
        ORM.GetUserInfo(req.body.user_id)
        .then(function (userInfo){
            if (userInfo.temporaryPassword && passwordSwitch == 1) {
                res.render('ChangePassword.ejs', {
                    SID : sid,
                    UID : uid
                })
                return;
            } else {
                res.render('Menu.ejs', {
                    SID : sid,
                    UID : uid
                })
                return;
            }
        })



        return;
    })
});

//仮パスワードから本パスワードに変更する画面。
router.post('/ChangePassword', function (req, res) {
    
    ORM.GetUserInfo(req.body.changePassword_uid)
    .then(function (userInfo) {
        userInfo.password = req.body.password;
        userInfo.temporaryPassword = false;
        
        ORM.EditUserInfo(userInfo)
        .then(function (dummy) {

        });
        
    })
    .catch(function (error) {
        console.log('パスワード変更でエラーになりました。');
        return;
    })
    .then(function () {
        res.render('Menu.ejs', {
            SID : req.body.changePassword_sid,
            UID : req.body.changePassword_uid
        })
        return;
    });
    

});

//ログイン状態からログアウト状態にする。クッキーも消す
router.post('/LogOut', function (req, res) {
    
    console.log('###Session ID:' + req.body.logout_sid);
    console.log('###User ID:' + req.body.logout_uid);
    
    ORM.CloseSession(req.body.logout_sid)
    .then(function (updatedRows) {
        //Assert.equal(1, updatedRows, "セションの無効化に失敗しました。更新行数:" + updatedRows);
        res.cookie('BackTech_UserID', '', { maxAge: 3600000000 });
        res.cookie('BackTech_LogInSession', '', { maxAge: 3600000000 });
    })
    .catch(function (error) {
        //Assert(false, "セションの無効化に失敗しました。：" + error);
        console.log("ログアウト処理中に例外が発生しました。");
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 0,
            FORGETPASSWORD : passwordSwitch

        })
        return;
    })
    .then(function (error) {
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 0,
            FORGETPASSWORD : passwordSwitch
        })
        return;
    }); 
});

//新規登録画面に移行する。
router.get('/Registration', function (req, res) {
    res.render('Registration.ejs', {
        REGISTED_ID: 0,
        PASSWORD_SWITCH: passwordSwitch
    })
});

//新規登録を行う。同じIDがあるかチェックする。
router.post('/Regist', function (req, res) {
    
    var sid = null;
    var uid = null;
    
    var tempPass = GFunc.MakeTempPassword(); 
    console.log('temporary password:' + tempPass);

    var user = {
        userId: req.body.email,
        familyName: req.body.familyName,
        lastName: req.body.firstName,
        age: Number(req.body.age),
        sex: Number(req.body.sex),
        addressCode: Number(req.body.PostCood),
        password: '',
        temporaryPassword: false
    }
    
    if (passwordSwitch == 0) {
        user.password = req.body.password;
        user.temporaryPassword = false;
     
    } else {
        user.password = tempPass;
        user.temporaryPassword = true;
    }


       
    ORM.RegisterUser(user)
    .then(function (_result) {
        console.log("ユーザ情報登録 status:" + _result);
        //Assert.equal(0, _result, "ユーザ作成に失敗しました。Code:" + _result);
    })
    .catch(function (error) { 
        console.log("ユーザー情報登録中に例外が発生しました。")
        res.render('Registration.ejs', {
            REGISTED_ID: 1,
            PASSWORD_SWITCH: passwordSwitch
        })
        return;
    })
    .then(function () {
        if (passwordSwitch == 0) {
            ORM.LoginUser(user.userId, user.password)
            .then(function (_session) {
                Assert.notEqual(null, _session, "ログインに失敗しました。セッション情報を作成できませんでした。");
                sid = _session.sessionId;
                uid = _session.ownerId;
            })
            .catch(function (error) {
                //Assert(false, "ログイン処理中に例外が発生しました。：" + error);
                console.log("ログイン処理中に例外が発生しました。")
                res.render('EntryPoint.ejs', {
                    LOGIN_MISS : 0,
                    FORGETPASSWORD : passwordSwitch
                });
            })
            .then(function () {
                console.log('###Session ID:' + sid);
                console.log('###User ID:' + uid);
                res.render('Menu.ejs', {
                    SID : sid,
                    UID : uid
                })
            });
        } else {
            GFunc.SendMailForTempPassword(req.body.email, tempPass);
            res.render('ReportSendMail.ejs', {
                LOGIN_MISS : 0,
                USER_MAILADDRESS : req.body.email
            });
        }

        return;

    })
});

//メニュー画面へ行く
router.post('/Menu', function (req, res) {
    console.log('###Session ID:' + req.body.menu_sid);
    console.log('###User ID:' + req.body.menu_uid);
    res.render('Menu.ejs', {
        SID : req.body.menu_sid,
        UID : req.body.menu_uid,
    })
});

//痛みのログ入力画面へ移行
router.post('/PainLog', function (req, res) {
    
    console.log('###Session ID:' + req.body.log_sid);
    console.log('###User ID:' + req.body.log_uid);
    
    res.render('PainLog.ejs', {
        SID : req.body.log_sid,
        UID : req.body.log_uid,
    })
    /* 痛みログのグラフ表示用に作ったがペンディング　20151031 miyasato
    ORM.GetPainLogArray(req.body.log_sid, 10)
    .then(function (log_array){
        res.render('PainLog.ejs', {
            SID : req.body.log_sid,
            UID : req.body.log_uid,
            LOGARRAY : log_array
        })
    })
    */



});

//痛みログを登録して、メニュー画面に戻る
router.post('/Regist_PainLog', function (req, res) {
    
    console.log('###Session ID:' + req.body.regist_log_sid);
    console.log('###User ID:' + req.body.regist_log_uid);
    //ORM.AddPainLog(req.body.regist_log_uid, true, Number(req.body.PainLevel))
    
    // Modified by ryokai 20150830
    // 第一パラメタはユーザIDではなく、セッションIDのため    
    //    ORM.AddPainLog(req.body.regist_log_uid, true, 5)
    ORM.AddPainLog(req.body.regist_log_sid, Boolean(req.body.CounterMeasure), Number(req.body.PainLevel))
    .then(function (log){
        res.render('Menu.ejs', {
            SID : req.body.regist_log_sid,
            UID : req.body.regist_log_uid
        })
    })
    .catch(function (error) {
        //Assert(false, "痛みのログ記録時に例外が発生しました。：" + error);
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 0,
            FORGETPASSWORD : passwordSwitch
        });
    })
    

});

//アルゴリズムの説明に行く
router.post('/ExplainAlgorithm', function (req, res) {
    console.log('###Session ID:' + req.body.explainAlgorithm_sid + '@ExplainAlgorithm('+ Date.now() +')');
    console.log('###User ID:' + req.body.explainAlgorithm_uid + '@ExplainAlgorithm(' + Date.now() + ')');
    res.render('ExplainAlgorithm.ejs', {
        SID : req.body.explainAlgorithm_sid,
        UID : req.body.explainAlgorithm_uid
    })
 
});

//アルゴリズム画面へ行く
router.post('/Algorithm', function (req, res) {
    
    var iSessionId = null;
    ORM.OpenInterviewSession(true, req.body.argorithm_sid)
    .then(function (_log) {
        iSessionId = _log.interviewSessionId;
        console.log('###Session ID:' + req.body.argorithm_sid);
        console.log('###User ID:' + req.body.argorithm_uid);
        console.log('###QSession ID:' + iSessionId);
    })
    .catch(function (error){
        console.log("インタビューセッション作成時に例外が発生しました。");
        //Assert(false, "インタビューセッション作成時に例外が発生しました。：" + error);
        res.render('Menu.ejs', {
            SID : req.body.argorithm_sid,
            UID : req.body.argorithm_uid
        })
    })
    .then(function () {
        ORM.GetInterviewInfo('Root', iSessionId)
        .then(function (info) {
            res.render('Question.ejs', {
                QA : info,
                SID : req.body.argorithm_sid,
                UID : req.body.argorithm_uid,
                QSID: iSessionId
            })
        })
        .catch(function (error) {
            console.log("インタビュー情報取得時に例外が発生しました。");
            //Assert(false, "インタビュー情報取得時に例外が発生しました。：" + error);
            res.render('Menu.ejs', {
                SID : req.body.argorithm_sid,
                UID : req.body.argorithm_uid
            })
        })
    })

});

//診断結果を表示する画面
router.post('/Result', function (req, res) {
    
    console.log('###Session ID:' + req.body.result_sid);
    console.log('###User ID:' + req.body.result_uid);
    ORM.GetUserInfo(req.body.result_uid)
    .then(function (user) {
        if (user.conditionType == -1) {
            res.render('Menu.ejs', {
                SID : req.body.result_sid,
                UID : req.body.result_uid
            })
        } else {
            ORM.GetRecipe(user.conditionType)
            .then(function (recipe) {
                res.render('Result.ejs', {
                    RT: recipe,
                    SID : req.body.result_sid,
                    UID : req.body.result_uid
                })
            })
            .catch(function (error) {
                console.log("対策取得中に例外が発生しました。");
                //Assert(false, "対策取得中に例外が発生しました。：" + error);
                res.render('EntryPoint.ejs', {
                    LOGIN_MISS : 0,
                    FORGETPASSWORD : passwordSwitch
                });
            })
        }
    })
    .catch(function (error) {
        console.log("ユーザー情報取得中に例外が発生しました。");
        //Assert(false, "ユーザー情報取得中に例外が発生しました。：" + error);
        res.render('EntryPoint.ejs', {
            LOGIN_MISS : 0,
            FORGETPASSWORD : passwordSwitch
        });
    })
});

//対策画像を表示する画面
router.post("/CounterMeasure", function (req, res) {

    console.log('###Session ID:' + req.body.cm_sid);
    console.log('###User ID:' + req.body.cm_uid);

    ORM.GetUserInfo(req.body.cm_uid)
    .then(function (user) {
        ORM.GetRecipe(user.conditionType)
        .then(function (recipe) {
            if (req.body.cm_url == '病院受診' || req.body.cm_url =='') {
                res.render('CounterMeasure.ejs', {
                    RT: recipe,
                    YoutubeURL: req.body.cm_url,
                    YoutubeID: req.body.cm_url,
                    SID : req.body.cm_sid,
                    UID : req.body.cm_uid
                })
            } else {
                AcquiredURL = req.body.cm_url.split('/');
                res.render('CounterMeasure.ejs', {
                    RT: recipe,
                    YoutubeURL: req.body.cm_url,
                    YoutubeID: AcquiredURL[3],
                    SID : req.body.cm_sid,
                    UID : req.body.cm_uid
                })
            }
        })
    })
});

router.post('/Next', function (req, res) {
        
    console.log(req.body.QuestionIdForNext);
    console.log(req.body.NextSelectionId);
    console.log('###Session ID:' + req.body.next_sid);
    console.log('###User ID:' + req.body.next_uid);
    console.log('###QSession ID:' + req.body.next_qsid);
    
    AcquiredData = req.body.NextSelectionId.split('$');
   
    ORM.PushInterviewLog(req.body.QuestionIdForNext, Number(AcquiredData[0]), req.body.next_qsid, Number(req.body.LogStepForNext))
    .then(function (){
        if (AcquiredData[2] == -1) {
            ORM.GetInterviewInfo(AcquiredData[1], req.body.next_qsid)
            .then(function (info) {
                res.render('Question.ejs', {
                    QA : info,
                    SID : req.body.next_sid,
                    UID : req.body.next_uid,
                    QSID: req.body.next_qsid
                })
            })
            .catch(function (error) {
                console.log("インタビュー情報の取得に失敗しました。");
                //Assert(false, 'インタビュー情報の取得に失敗しました。:' + error);
                res.render('Menu.ejs', {
                    SID : req.body.next_sid,
                    UID : req.body.next_uid
                })
            });
        } else {       
            ORM.GetRecipe(Number(AcquiredData[2]))
            .then(function (recipe) {
                res.render('Result.ejs',{
                    RT: recipe,
                    SID : req.body.next_sid,
                    UID : req.body.next_uid
                })            
            })
            .catch(function (error) {
                console.log("レシピの取得に失敗しました。");
                //Assert(false, 'レシピの取得に失敗しました。:' + error);
                res.render('Menu.ejs', {
                    SID : req.body.next_sid,
                    UID : req.body.next_uid
                })
            });
        }
    }).catch(function (error) {
        console.log("インタビューの記録に失敗しました。");
        //Assert(false, 'インタビューの記録に失敗しました。:' + error);
        res.render('Menu.ejs', {
            SID : req.body.next_sid,
            UID : req.body.next_uid
        })
    });

});

router.post('/Back', function (req, res) {
    
    console.log(req.body.BackQuestionId);
    console.log(req.body.QuestionIdForBack);
    console.log('###Session ID:' + req.body.back_sid);
    console.log('###User ID:' + req.body.back_uid);
    console.log('###QSession ID:' + req.body.back_qsid);
    

    if (req.body.BackQuestionId == String(0)) {
    ORM.GetInterviewInfo('Root', req.body.back_qsid)
        .then(function (info) {
            res.render('Question.ejs', {
                QA : info,
                SID : req.body.back_sid,
                UID : req.body.back_uid,
                QSID: req.body.back_qsid
            })
        })
        .catch(function (error) {
            console.log("インタビュー情報の取得に失敗しました。");
            //Assert(false, 'インタビュー情報の取得に失敗しました。:' + error);
            res.render('Menu.ejs', {
                SID : req.body.back_sid,
                UID : req.body.back_uid
            })
        });
    } else {
        ORM.PopInterviewLog(req.body.back_qsid, Number(req.body.LogStepForBack))
        .then(function () {
            ORM.GetInterviewInfo(req.body.BackQuestionId, req.body.back_qsid)
            .then(function (info) {
                res.render('Question.ejs', {
                    QA : info,
                    SID : req.body.back_sid,
                    UID : req.body.back_uid,
                    QSID: req.body.back_qsid
                })
            })
            .catch(function (error) {
                console.log("インタビューの消去に失敗しました。");
                //Assert(false, 'インタビューの消去に失敗しました。: ' + error);
                res.render('Menu.ejs', {
                    SID : req.body.back_sid,
                    UID : req.body.back_uid
                })
            });

        })
        .catch(function (error) {
            console.log("インタビュー情報の取得に失敗しました。");
            //Assert(false, 'インタビュー情報の取得に失敗しました。:' + error);
            res.render('Menu.ejs', {
                SID : req.body.back_sid,
                UID : req.body.back_uid
            })
        });
    }
 
});


//バックストーリ画面に行く
router.post('/BackStory', function (req, res) {
    console.log('###Session ID:' + req.body.backstory_sid);
    console.log('###User ID:' + req.body.backstory_uid);
    res.render('BackStory.ejs', {
        SID : req.body.backstory_sid,
        UID : req.body.backstory_uid
    })
 
});

//専門家が腰痛タイプの修正を行うため
router.post('/SpecialistEntryPoint', function (req, res) {
    console.log('###Session ID:' + req.body.backstory_sid);
    console.log('###User ID:' + req.body.backstory_uid);
    res.render('SpecialistEntryPoint.ejs', {
        SID : req.body.specialistEntryPoint_sid,
        UID : req.body.specialistEntryPoint_uid,
        LOGIN_MISS : 0
    })
 
});

//専門家が患者データをいじれるようにLoginする
router.post('/SpecialistLogin', function (req, res) {
    
    if (req.body.password === '09056355450') {
        res.render('SpecialistMenu.ejs', {
            SID : req.body.specialistPassword_sid,
            UID : req.body.specialistPassword_uid,
        })

    } else {
        res.render('SpecialistEntryPoint.ejs', {
            SID : req.body.specialistPassword_sid,
            UID : req.body.specialistPassword_uid,
            LOGIN_MISS : 1
        })

    }

});

module.exports = router;