/// 
///
/// 
///  - SignIn(uid, passwd)
///  - OpenSession(uid, isForce)
///  - CloseSession(sid)
///  - OpenInterviewSession(sid, isForce)
///  - GetInterviewInfo(version, qid, interviewSessionId)
///  - PushInterviewLog(interviewSessionId)
///  - PopInterviewLog(interviewSessionId)


var UUID = require('node-uuid');
var Promiss = require('bluebird');
var ORM = require('./models');


ORM.Error = {
    'SUCCESS': 0,    
    'ERROR_ALREADY_EXISTS': 10,
}

// NaN判定用のメソッド 
function isReallyNaN(x) {
    return x !== x;
}

// -- 公開メソッド



ORM.RegisterUser = function (_registerInfo) {
    console.log('in:RegisterUser');
    
    return ORM.sequelize.transaction(function (t) {
        return _RegisterUser(_registerInfo);
    })
    .then(function (_result) {
        console.log('out:RegisterUser:' + _result);
        return _result;
    });
}

ORM.UnregisterUser = function (_userId) {
    console.log('in:UnregisterUser');
    
    return ORM.sequelize.transaction(function (t) {
        return _UnregisterUser(_userId);
    })
    .then(function (_result) {
        return _result;
    });
}

ORM.GetUserInfo = function (_userId) {
    console.log('in:GetUserInfo');
    
    return ORM.sequelize.transaction(function (t) {
        return _GetUserInfo(_userId);
    })
    .then(function (_userInfo) {
        return _userInfo;
    });
}
ORM.EditUserInfo = function (_userInfo) {
    console.log('in:EditUserInfo');
    
    return ORM.sequelize.transaction(function (t) {
        return _EditUserInfo(_userInfo);
    })
    .then(function (_result) {
        return _result;
    });
}



ORM.LoginUser = function (_user, _password) {
    console.log('in:LoginUser');
    
    return ORM.sequelize.transaction(function (t) {
        return _LoginUser(_user, _password);
    })
    .then(function (_session) {
        return _session;
    });
}


ORM.OpenSession = function (owner) {
    console.log('in:OpenSession');
    
    return ORM.sequelize.transaction(function (t) {
        return _CreateSession(owner);
    })
    .then(function (_session) {
        return _session;
    });
}

ORM.UpdateSession = function (_sid) {
    console.log('in:UpdateSession');
    
    return ORM.sequelize.transaction(function (t) {
        return _UpdateSession(_sid);
    })
    .then(function (_result) {
        return _result;
    });
}

ORM.CloseSession = function (_sid) {
    console.log('in:CloseSession');
    
    return ORM.sequelize.transaction(function (t) {
        return _CloseSession(_sid);
    })
    .then(function (_result) {
        return _result;
    });
}

ORM.GetSessionInfo = function (_sid) {
    console.log('in:GetSessionInfo');
    
    return ORM.sequelize.transaction(function (t) {
        return _GetSessionInfo(_sid);
    })
    .then(function (_result) {
        return _result;
    });
    
}

ORM.OpenInterviewSession = function (isForce, sid) {
    console.log('in:OpenInterviewSession');
    
    return ORM.sequelize.transaction(function (t) {
        return _OpenInterviewSession(isForce, sid);
    })
    .then(function (_log) {
        return _log;
    });
}
ORM.GetInterviewInfo = function ( _qid, _iSessionId) {
    console.log('in:GetInterviewInfo');
    
    return ORM.sequelize.transaction(function (t) {
        return _GetInterviewInfo(_qid, _iSessionId);
    })
    .then(function (_info) {
        return _info;
    });
}


ORM.PushInterviewLog = function ( _qId, _selection, _iSessionId, _currentStep) {
    console.log('in:PushInterviewLog');
    
    return ORM.sequelize.transaction(function (t) {
        return _PushInterviewLog(_qId, _selection, _iSessionId, _currentStep);
    })
    .then(function (_log) {
        return _log;
    });
}

ORM.PopInterviewLog = function (_iSessionId, _currentStep) {
    console.log('in:PopInterviewLog');
    
    return ORM.sequelize.transaction(function (t) {
        return _PopInterviewLog(_iSessionId, _currentStep);
    })
    .then(function (_result) {
        return _result;
    });
}
ORM.GetRecipe = function (_conditionType) {
    console.log('in:GetRecipe');
    
    return ORM.sequelize.transaction(function (t) {
        return _GetRecipe(_conditionType);
    })
    .then(function (_result) {
        return _result;
    });
}

ORM.GetRecipeWithVersion = function (_conditionType, _ver) {
    console.log('in:GetRecipe');
    
    return ORM.sequelize.transaction(function (t) {
        return _GetRecipeWithVersion(_conditionType, _ver);
    })
    .then(function (_result) {
        return _result;
    });
}

ORM.AddPainLog = function (_sid, _isBeforeTreatment, _painRate) {
    return ORM.sequelize.transaction(function (t) {
        return _AddPainLog(_sid, _isBeforeTreatment, _painRate);
    })
    .then(function (_result) {
        return _result;
    });
}

/* 痛みログのグラフ表示用に作ったがペンディング　20151031 miyasato
ORM.GetPainLogArray = function (_sid, _numData) {
    return ORM.sequelize.transaction(function (t) {
        return _GetPainLogArray(_sid, _numData);
    })
    .then(function (_result) {
        return _result;
    });
}
*/

// -- 実装部メソッド

_GetRecipe = function ( _conditionType) {
    var p =
    ORM.Recipe.max('version', { where: { conditionType: _conditionType } })
    .then(function (_max) {
        return ORM.Recipe.findOne({ where: { conditionType: _conditionType , version: _max } });
    });

    return p;
}

_GetRecipeWithVersion = function (_conditionType, _ver) {
    var p =
    ORM.Recipe.findOne({ where: { conditionType: _conditionType , version: _ver } });
    
    return p;
}

_GetInterviewInfo = function (_qid, _iSessionId) {
    console.log('in:GetInterviewInfo');
    var info = {};
    var version = null;
    // InterveiwSheet
    var p =
    ORM.InterviewLog.max('step', { where: { interviewSessionId: _iSessionId } })
    .then(function (_max) {
        return ORM.InterviewLog.findOne({ where: { interviewSessionId: _iSessionId , step: _max } });
    })
    .then(function (_log) {
        info.PreviousQuestionId = _log.questionId;
        info.Step = _log.step;
        info.InterviewSessionId = _log.interviewSessionId;

        version = _log.sheetVersion;

        return info;
    })
    .then(function (){
        return ORM.InterviewSheet.findOne({ where: { version: version, questionId: _qid } })
    })
    .then(function (sheet) {
        console.log('in:GetInterviewInfo.then');
        info.Version = version;
        info.QuestionId = _qid;
        info.TemplateType = sheet.templateType;
        info.QuestionText = sheet.questionText;
        info.FigureUrl = sheet.figureUrl;
        info.Selections = [];
        
        return info;
    })
    .then(function () {
        return ORM.InterviewSheetSelection.findAll({ where: { version: version, questionId: _qid }, order: ['selectionId'] });
    })
    .then(function (selections) {
        
        if (null != selections) {
            selections.forEach(function (item) {
                console.log('Selections:#' + JSON.stringify(item, null, '  '));
                info.Selections.push({
                    SelectionId: item.selectionId,
                    SelectionText: item.selectionText,
                    AnswerCode: item.answerCode,
                    NextQuestionId: item.nextQuestionId,
                    ConditionType: item.conditionType,
                    FigureUrl: item.figureUrl
                });

            });
        }
        return (info);
    });
    
    return p;

}



function _CreateInterviewSession(_uid, _seq, promise) {
    console.log('in:_CreateInterviewSession');
    if (null != promise) {
        return promise.then(function () { return _CreateInterviewSessionImpl(_uid, _seq); });
    } else {
        return _CreateInterviewSessionImpl(_uid, _seq);
    }
}

function _CreateInterviewSessionImpl(_uid, _seq) {
    
    var date = Date.now();
    var iSessionId = UUID.v1();
    
    var p = 
    ORM.GlobalInfo.findOne({ where: { infoId: 'INTERVIEW-SHEET-VERSION' } })
    .then(function (_ver) {
//        console.log('in:_CreateInterviewSessionImpl-1');
        var newISession = ORM.InterviewSession.build({
            interviewSessionId: iSessionId, 
            createdAt: date, 
            updatedAt: date,
            userId: _uid,
            sheetVersion:_ver.strValue,
            seq: _seq,
            closed: false
        });
        return (newISession);
    });

    return p.then(function (_iSession) { return _iSession.save(); });
}

_OpenInterviewSession = function (isForce, sid) {
    
    console.log('in: OpenInterviewSession');
    
    // 現在のセション情報からユーザIDを取得
    // ユーザの最終Interviewセションを取得
    // isForceがfalseなら最後のLog情報を返す
    // isForceがtrueなら最終Interviewセッションを削除して新規にInterviewセッションを作成
    var isNewSession = false;
    var session = null;
    var date = Date.now();
    
    return _GetSessionInfo(sid)
    .then(function (_session) {
        if (null == _session) {
            // セッション未開始
            console.log('sessionなし');
            //Promiss.reject('セッションが無効です。');
            
            throw new Error('セッションが無効です。');
            
        } else {
            session = _session;
            console.log('sessionあり2' + _session);
            return (_session.ownerId);
        }
    })
    .then(function (uid) { return ORM.InterviewSession.max('seq', { where: { userId: uid } });})
    .then(function (max) {
        console.log('Max:' + max);
        if (isReallyNaN(max)) {
            console.log('max is nan');
            return null;
        } else {
            console.log('max is not nan');
            return ORM.InterviewSession.findOne({ where: { userId: session.ownerId, seq: max } });
        }
    })
    .then(function (iSession) {
        var p = null;
        if (null == iSession) {
            console.log('インタビューセションなし:' + iSession);
            // 新規セションを作成
            isNewSession = true;

        } else if (iSession.closed == true) {
            console.log('インタビューセションあり(closed):' + iSession);
            // 新規セッションを作成
            isNewSession = true;
        } else if (isForce == true) {
            console.log('インタビューセションあり(opened/forced==true):' + iSession);
            // 前のインタビューセッションを削除して
            
            p = ORM.InterviewSession.destroy({ where: { interviewSessionId: iSession.interviewSessionId } })
                .then(function () { return ORM.InterviewLog.destroy({ where: { interviewSessionId: iSession.interviewSessionId } }) });
            // 新規セッションを作成
            isNewSession = true;
        } else {
            console.log('インタビューセションあり(opened/forced==false):' + iSession);

        }
        
        if (isNewSession) {
            console.log('インタビューセション作成');
            var newSeq = 1;
            if (null != iSession) {
                newSeq = iSession.seq + 1;
            }
            
            /*
            var iSessionId = UUID.v1();
            var sheetVersion = "1.0.0.0";
            var newISession = ORM.InterviewSession.build({
                interviewSessionId: iSessionId, 
                createdAt: date, 
                updatedAt: date,
                userId: session.ownerId,
                sheetVersion: sheetVersion,
                seq: newSeq,
                closed: false
            });

            
            // 
            if (null == p) {
                return newISession.save();

            } else {
                return p.then(function () { return newISession.save() });

            }
            */


            return _CreateInterviewSession(session.ownerId, newSeq, p);
        } else {
            console.log('インタビューセションは既存の活用');
            return (iSession);
        }
    })
    .then(function (_iSession) {
        // 最新のインタビューログを返す
        if (isNewSession) {
            
            console.log('インタビューログ作成:' + _iSession);
            // 新規の場合、ベースのログを登録する
            var newLog = ORM.InterviewLog.build(
                {
                    interviewSessionId: _iSession.interviewSessionId, 
                    step: 0,
                    userId : _iSession.userId,
                    seq : _iSession.seq,
                    createdAt: date,
                    updatedAt: date, 
                    sheetVersion: _iSession.sheetVersion,
                    questionId: '0',
                    selectedId: 1
                }
            );
            return newLog.save();
        } else {
            // 既にある場合には、最新のログを返す
            console.log('インタビューログ取得' + _iSession);
            return ORM.InterviewLog.max('step', { where: { interviewSessionId: _iSession.interviewSessionId } })
                        .then(function (max) {
                console.log('インタビューログ取得 step:' + max);
                return ORM.InterviewLog.findOne({ where: { interviewSessionId: _iSession.interviewSessionId, step: max } });
            });
        }
    });

}

_PushInterviewLog = function (_qId, _selection, _iSessionId, _currentStep) {
    var date = Date.now();
    
    var log = null;
    var selection;
    
    var p =  
    ORM.InterviewLog.max('step', { where: { interviewSessionId: _iSessionId } })
    .then(function (step) {
        // check 
        if (step != _currentStep) {
            // error
            throw new Error('他のセションで既に更新されています。');
        }
        var pLog = ORM.InterviewLog.findOne({ where: { interviewSessionId: _iSessionId, step: _currentStep } });
        return pLog;
        
    })
    .then(function (_log) {
        console.log('interview log:#' + JSON.stringify(_log, null, '  '));
        
        log = ORM.InterviewLog.build({
            interviewSessionId: _log.interviewSessionId,
            step: _currentStep + 1, 
            userId: _log.userId,
            seq: _log.seq, 
            createdAt: date, 
            updatedAt: date, 
            sheetVersion: _log.sheetVersion, 
            questionId: _qId,
            selectedId: _selection
        });
        var pSelection = ORM.InterviewSheetSelection.findOne({ where: { version: _log.sheetVersion, questionId: _qId, selectionId: _selection } });
        return pSelection;
    })
    .then(function (_selectionInfo){
        if (null == _selectionInfo) {
            throw new Error('不正なパラメタです。qid:"'+_qId+'", selection:'+ _selection);
        }
        
        selection = _selectionInfo;
        
        var pLog = log.save()
        .then(function (_log) {
            if (-1 == selection.conditionType) {
                return (0);
            }
            
            var pSession = ORM.InterviewSession.update({ closed: true, conditionType: selection.conditionType }, { where: { interviewSessionId: _iSessionId } })
            .then(function () {
                var pUserSession = ORM.UserStatus.update({ version: log.sheetVersion, conditionType: selection.conditionType }, { where: { userId: log.userId } });
                return (pUserSession);
            })
            .then(function () {
                return (1);
            });
            return (pSession);

        });
        return pLog;
    })
    .then(function (_rval) {

        console.log("PushLog rval:" + _rval);
        return (_rval);
    });
    return (p);
}


_PushInterviewLog2 = function ( _qId, _selection, _iSessionId, _currentStep) {
    var date = Date.now();
    
    var p = 
    ORM.InterviewLog.max('step', { where: { interviewSessionId: _iSessionId } })
    .then(function (step) {
        // check 
        if (step != _currentStep) {
            // error
            throw new Error('他のセションで既に更新されています。');
        }
        var p = ORM.InterviewLog.findOne({ where: { interviewSessionId: _iSessionId, step: _currentStep } });
        return p;
        
    })
    .then(function (_log){
        console.log('interview log:#' + JSON.stringify(_log, null, '  '));

        var log = ORM.InterviewLog.build({
            interviewSessionId: _log.interviewSessionId,
            step: _currentStep + 1, 
            userId: _log.userId,
            seq: _log.seq, 
            createdAt: date, 
            updatedAt: date, 
            sheetVersion: _log.sheetVersion, 
            questionId: _qId,
            selectedId: _selection
        });

        return log.save()
    });
    return (p);
}



_PopInterviewLog = function (_iSessionId, _currentStep) {

    var p = 
    ORM.InterviewLog.max('step', { where: { interviewSessionId: _iSessionId } })
    .then(function (step) {
        // check 
        if (step != _currentStep) {
            // error
            throw new Error('他のセションで既に更新されています。maxStep:'+step+"/ specific:"+_currentStep);
        }
        var p = ORM.InterviewLog.findOne({ where: { interviewSessionId: _iSessionId, step: _currentStep } });
        return p;
        
    })
    .then(function (_log) {
        return ORM.InterviewLog.destroy({ where: { interviewSessionId: _iSessionId, step: _currentStep } });
    });

    return (p);
}


_AddPainLog = function (_sid, _painRate, _isBeforeTreatment) {
    
    var date = Date.now();
    var p = _GetSessionInfo(_sid)
    .then(function (_session) {
        if (null == _session) {
            // セッション未開始
            console.log('sessionなし');
            //Promiss.reject('セッションが無効です。');
            
            throw new Error('セッションが無効です。');
            
        } else {
            
            var pain = ORM.PainLog.build({
                userId: _session.ownerId,
                entriedAt : date,             
                createdAt: date, 
                updatedAt: date, 
                isBeforeTreatment: _isBeforeTreatment,
                painRate: _painRate
            
            });
            
            return pain.save();

        }
    })

    
    return (p);
}


_AddPainLog = function (_sid, _isBeforeTreatment, _painRate) {
    
    var date = Date.now();
    var p = _GetSessionInfo(_sid)
    .then(function (_session) {
        if (null == _session) {
            // セッション未開始
            console.log('sessionなし');
            //Promiss.reject('セッションが無効です。');
            
            throw new Error('セッションが無効です。');
            
        } else {
            
            var pain = ORM.PainLog.build({
                userId: _session.ownerId,
                entriedAt : date,             
                createdAt: date, 
                updatedAt: date, 
                isBeforeTreatment: _isBeforeTreatment,
                painRate: _painRate
            
            });
            
            return pain.save()
            .then(function () {
                var pUserSession = ORM.UserStatus.update({ painRate: _painRate }, { where: { userId: _session.ownerId } });
                return (pUserSession);
            })
            .then(function () {
               return pain;
           });
        }
    })
        
    return (p);
}

/* 痛みログのグラフ表示用に作ったがペンディング　20151031 miyasato
_GetPainLogArray = function (_sid, _numData) {
    
    var date = Date.now();
    var p = _GetSessionInfo(_sid)
    .then(function (_session) {
        if (null == _session) {
            // セッション未開始
            console.log('sessionなし');
            //Promiss.reject('セッションが無効です。');
            
            throw new Error('セッションが無効です。');
            
        } else {
            //    ORM.Session.update({ updatedAt: date }, { where: { sessionId: sid } })

            ORM.PainLog.findAll({ where: { userId: _session.ownderId } })
            .success(function (data_array){
                for (var i = 0; i < data_array.length; i++) {
                    console.log(data_array[i]);
                    //データをソートする
                }
                return data_array;
                        
            })
            .error(function (error) {
                console.log(error);
            });
        }
    })

}
*/

_RegisterUser = function (_user) {
    // ユーザの存在チェック
    
    console.log("IN:_RegisterInfo.");
    var p = ORM.User.findById(_user.userId)
    .then(function (_userInfo) {
        console.log("IN:_RegisterInfo.User.findById");
        if (null != _userInfo) {
            console.log("ERROR:_RegisterInfo.User.findById: 既にユーザが存在します");
            return (ORM.Error.ERROR_ALREADY_EXISTS);
        }
        var userObject = ORM.User.build(_user);
        
        var now = Date.now();
        userObject.passwordUpdatedAt = now;
        userObject.lastAccessedAt = now;
        
        var p = userObject.save()
        .then(function () {
            var userStatus = ORM.UserStatus.build();
            userStatus.userId = _user.userId;
            userStatus.conditionVersion = null;
            userStatus.conditionType = -1;
            
            var pUserStatus = userStatus.save().then(function(){ return (userObject); });

            return (pUserStatus);
        });
        
        return (p);
    })
    .then(function (rc) {
        
        // 数値の場合にはエラー情報なのでそのまま返却
        if ('number' == typeof rc) {
            console.log("IN:_RegisterInfo.User.last: ERROR :"+rc);
            return (rc);
        }
        
        // 数値でなければ、ユーザ情報登録後のオブジェクトが帰ってきているので成功
        console.log("IN:_RegisterInfo.User.last: SUCCESS");
        return (ORM.Error.SUCCESS);
    });

    return (p);
}

_UnregisterUser = function (_id) {
    var p = 
    ORM.User.findById(_id)
    .then(function (_user) {
        if (null == _user) {
            throw new Exception("ユーザが存在しません");
        }
        var pUserStatus = ORM.UserStatus.destroy({ where: { userId: _id } })
        .then(function (){
            return (_user.destroy());

        })

        return (pUserStatus);

    });

    return (p);
}

_GetUserInfo = function (_id) {
    
    var p = 
    ORM.User.findById(_id)
    .then(function (_user) {
        if (null != _user) {
            var p2 = ORM.UserStatus.findById(_id)
            .then(function (_st) {
                if (null != _st) {
                    _user.conditionVersion = _st.version;
                    _user.conditionType = _st.conditionType;
                    _user.painRate = _st.painRate;
                } else {
                    _user.conditionVersion = null;
                    _user.conditionType = -1;
                    _user.painRate = -1;
                }
                return (_user);
            });
        }
        return (p2);
    });


    return (p);
}

_EditUserInfo = function (_newInfo){
    var p = 
    ORM.User.findById(_newInfo.userId)
    .then(function (_user) {
        if (null == _user) {
            throw new Exception("ユーザが存在しません");
        }

        _user.familyName = _newInfo.familyName;
        _user.lastName = _newInfo.lastName;
        _user.age = _newInfo.age;
        _user.sex = _newInfo.sex;
        _user.addressCode = _newInfo.addressCode;
        _user.password = _newInfo.password;
        _user.temporaryPassword = _newInfo.temporaryPassword;

        return (_user.save());

    });
    
    return (p);


}

_LoginUser = function (_id, _password) {
    var p = _GetUserInfo(_id)
    .then(function (_user) {
        if (null == _user) {
            return (null);
        }
        
//        console.log("_LoginUser._password:" + _password);
//        console.log("_LoginUser._user.password:" + _user.password);
        if (_password != _user.password) {
            return (null);
        }
        
        
        var p1 = _CreateSession(_id)
        .then(function (_session) {
            if (null == _session) {
                return (null);
            }
            
            _user.lastAccessedAt = Date.now();

            var p2 = _user.save().then(function(){ return (_session); });
            return (p2);
        });

        return (p1);
    });

    return (p);
}

_CreateSession = function (owner) {
    
    var date = Date.now();
    var sid = UUID.v1();
    var session = ORM.Session.build({ sessionId: sid, createdAt: date, updatedAt: date , ownerId: owner, closed: false });
    
    return session.save();
}

_UpdateSession = function (sid) {
    var date = Date.now();
    
    var p = 
    ORM.Session.update({ updatedAt: date }, { where: { sessionId: sid } })
    .then(function (_rows) {
        if (0 == _rows) {
            throw new Error('無効なセションが指定されました。');
        }
        return _rows;
    });
    
    return p;
}

_CloseSession = function (sid) {
    
    var date = Date.now();
    
    var p = 
    ORM.Session.update({ closed: true, updatedAt: date }, { where: { sessionId: sid } })
    .then(function (_rows) {
        if (0 == _rows) {
            throw new Error('無効なセションが指定されました。');
        }
        return _rows;
    });
 
    return (p);
}



_GetSessionInfo = function (sid) {
    
    var date = Date.now();
    
    var p = ORM.Session.findOne({ where: { sessionId: sid } });
        
   
    return (p);
}

ORM.GetSessionOwnerId = function (sid) {

}

module.exports = ORM;
