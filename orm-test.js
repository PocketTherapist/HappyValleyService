var Assert = require('assert');
var ORM = require('./orm');

function _OpenInterviewSession(sessionId){
    return ORM.OpenInterviewSession(false, sessionId);
}

describe('Test of ORM', function () {
    describe('初期化', function () {
        it('ユーザ情報初期化', function (done) {
            ORM.UserStatus.update({ version: null, conditionType: -1 }, { where: { userId: 'test-user-03' } }).then(function () { done() });
        });
    });
        
    describe('ユーザのテスト', function () {
        it('ユーザ情報取得', function (done) {
            ORM.GetUserInfo('test-user')
            .then(function (_info) {
                Assert.notEqual(null, _info)
                Assert.equal('test-user', _info.userId);
                Assert.equal('腰痛', _info.familyName);
                Assert.equal('対策', _info.lastName);
                Assert.equal(35, _info.age);
                Assert.equal(2, _info.sex);
                Assert.equal('password', _info.password);
                Assert.equal(false, _info.temporaryPassword);
                
                // condition info
                Assert.equal(null, _info.conditionVersion);
                Assert.equal(-1, _info.conditionType);

                done();
            })
            .catch(function (error) {
                Assert(false, "ユーザ情報取得に失敗しました。：" + error);
                done();
            });
        });
        
        it('ユーザ情報取得', function (done) {
            ORM.GetUserInfo('test-user-02')
            .then(function (_info) {
                Assert.notEqual(null, _info)
                Assert.equal('test-user-02', _info.userId);
                Assert.equal('腰痛', _info.familyName);
                Assert.equal('対策02', _info.lastName);
                Assert.equal(35, _info.age);
                Assert.equal(2, _info.sex);
                Assert.equal('password', _info.password);
                
                // condition info
                Assert.equal('1.0.0.0', _info.conditionVersion);
                Assert.equal(2, _info.conditionType);
                
                done();
            })
            .catch(function (error) {
                Assert(false, "ユーザ情報取得に失敗しました。：" + error);
                done();
            });
        });
        
        it('ユーザ情報取得(存在しないユーザ)', function (done) {
            ORM.GetUserInfo('unknown-user')
            .then(function (_info) {
                Assert.equal(null, _info, "不正なユーザ情報が返却されています。")
                done();
            })
            .catch(function (error) {
                Assert(false, "ユーザ情報取得に処理で例外が発生しました。：" + error);
                done();
            });
        });
          

        it('ユーザ登録', function (done) {
            var user =  {
                userId: 'test-user-01',
                familyName: '腰痛',
                lastName: '太郎',
                age: 30,
                sex: 1,
                addressCode: 17,
                password: 'test'
            }

            var sid = ORM.RegisterUser(user)
            .then(function (_result) {
                
                console.log("ユーザ情報登録 status:" + _result);

                Assert.equal(0, _result, "ユーザ作成に失敗しました。Code:" + _result);
                return (ORM.GetUserInfo('test-user-01'));
            })
            .then(function(_info) {
                Assert.notEqual(null, _info)
                Assert.equal('test-user-01', _info.userId);
                Assert.equal('腰痛', _info.familyName);
                Assert.equal('太郎', _info.lastName);
                Assert.equal(30, _info.age);
                Assert.equal(1, _info.sex);
                Assert.equal(17, _info.addressCode);
                Assert.equal('test', _info.password);

                done();

            })
            .catch(function (error) {
                Assert(false, "ユーザ作成に失敗しました。：" + error);
                done();
            });
        });
        
        it('ユーザ情報更新', function (done) {
            var newInfo = {
                userId: 'test-user-01',
                familyName: '腰痛XX',
                lastName: '太郎XX',
                age: 3,
                sex: 2,
                addressCode: 2317,
                password: 'testXX'
            }
            
            ORM.EditUserInfo(newInfo)
            .then(function (_edited) {
                Assert.notEqual(null, _edited)
                Assert.equal('test-user-01', _edited.userId);
                Assert.equal('腰痛XX', _edited.familyName);
                Assert.equal('太郎XX', _edited.lastName);
                Assert.equal(3, _edited.age);
                Assert.equal(2, _edited.sex);
                Assert.equal(2317, _edited.addressCode);
                Assert.equal('testXX', _edited.password);

                done();
            })
            .catch(function (error) {
                Assert(false, "ユーザ更新処理中でに例外が発生しました。：" + error);
                done();
            });
        });
        
        
        it('ユーザ登録(登録済みユーザ)', function (done) {
            var user = {
                userId: 'test-user-01',
                familyName: '腰痛',
                lastName: '太郎',
                age: 30,
                sex: 1,
                addressCode: 17,
                password: 'test'
            }
            
            var sid = ORM.RegisterUser(user)
            .then(function (_result) {
                
                Assert.equal(ORM.Error.ERROR_ALREADY_EXISTS, _result, "ユーザ登録処理で既存ユーザ登録処理で既存ユーザが検出できませんでした。Code:" + _result);
                done();
            })
            .catch(function (error) {
                Assert(false, "ユーザ作成処理中でに例外が発生しました。：" + error);
                done();
            });
        });
        
        it('ユーザ削除', function (done) {
            var sid = ORM.UnregisterUser("test-user-01")
            .then(function (_result) {
                Assert.equal(0, _result, "ユーザ削除に失敗しました。Code:" + _result);
                return (ORM.GetUserInfo('test-user-01'));
            })
            .then(function (_info) {
                Assert.equal(null, _info, "ユーザ削除に失敗しました。")
                done();

            })
            .catch(function (error) {
                Assert(false, "ユーザ削除に失敗しました。：" + error);
                done();
            });
        });
        
        it('ログイン', function (done) {
            ORM.LoginUser("test-user", "password")
            .then(function (_session) {
                Assert.notEqual(null, _session, "ログインに失敗しました。セッション情報を作成できませんでした。");
                
                done();
            })
            .catch(function (error) {
                Assert(false, "ログイン処理中に例外が発生しました。：" + error);
                done();
            });
        });
        
        
        it('ログイン失敗1(password unmatch)', function (done) {
            ORM.LoginUser("test-user")
            .then(function (_session) {
                Assert.equal(null, _session, "未登録ユーザに対してログインが成功しました");
                
                done();
            })
            .catch(function (error) {
                Assert(false, "ログイン処理中に例外が発生しました。：" + error);
                done();
            });
        });
        it('ログイン失敗2(password unmatch)', function (done) {
            ORM.LoginUser("test-user", "PASSWORD")
            .then(function (_session) {
                Assert.equal(null, _session, "未登録ユーザに対してログインが成功しました");
                
                done();
            })
            .catch(function (error) {
                Assert(false, "ログイン処理中に例外が発生しました。：" + error);
                done();
            });
        });

        it('ログイン(未登録ユーザ)', function (done) {
            ORM.LoginUser("unknown-user")
            .then(function (_session) {
                Assert.equal(null, _session, "未登録ユーザに対してログインが成功しました");
                
                done();
            })
            .catch(function (error) {
                Assert(false, "ログイン処理中に例外が発生しました。：" + error);
                done();
            });
        });


    });        

    

    describe('Sessionのテスト', function () {
        it('Sessionの作成', function (done) {
            var sid = ORM.OpenSession("test-user")
            .then(function (session) {
                ORM.Session.findOne({ where: { sessionId: session.sessionId } })
                .then(function (actual) {
                    Assert.ok(true, "セションの作成に成功しました。");
                    done();
                })
                .catch(function (error) {
                    Assert(false, "セションの作成に失敗しました。：" + error);
                    done();
                });
            })
            .catch(function (error) {
                Assert(false, "セションの作成に失敗しました。：" + error);
                done();
            });
;
        });

        it('Sessionの更新', function (done) {
            var sid = ORM.OpenSession("test-user")
            .then(function (session) {
                ORM.UpdateSession(session.sessionId)
                .then(function (updatedRows) {
                    
                    Assert.equal(1, updatedRows, "セションの更新に失敗しました。更新行数:"+updatedRows);
                    done();
                })
                .catch(function (error) {
                    Assert(false, "セションの更新に失敗しました。：" + error);
                    done();
                });
            })
            .catch(function (error) {
                Assert(false, "セションの作成に失敗しました。：" + error);
                done();
            });
        });

        it('Sessionの更新-不正なセションの指定', function (done) {
            ORM.UpdateSession('不正なID')
                .then(function (updatedRows) {
                
                Assert(false, "不正なセションIDを指定したにもかかわらず更新されました:" + updatedRows);
                done();
            })
                .catch(function (error) {
                done();
            });
        });

        it('Sessionの無効化', function (done) {
            var sid = ORM.OpenSession("test-user")
            .then(function (session) {
                ORM.CloseSession(session.sessionId)
                .then(function (updatedRows) {
                    
                    Assert.equal(1, updatedRows, "セションの無効化に失敗しました。更新行数:" + updatedRows);
                    done();
                })
                .catch(function (error) {
                    Assert(false, "セションの無効化に失敗しました。：" + error);
                    done();
                });
            })
            .catch(function (error) {
                Assert(false, "セションの作成に失敗しました。：" + error);
                done();
            });
        });
        
        it('Sessionの無効化-不正なセションの指定', function (done) {
            ORM.CloseSession('不正なID')
                .then(function (updatedRows) {
                
                Assert.equal(0, updatedRows, "誤ってセションが無効化されました。更新行数:" + updatedRows);
                done();
            })
                .catch(function (error) {
                done();
            });
        });

    });


    describe('Interview Logのテスト', function () {
        
        it('Interviewセッションの取得-無効なセション', function (done) {
            var sid = '11285700-0e7f-11e5-beb0-85e8346917af';
            
            _OpenInterviewSession(sid)
            .then(function () {
                Assert(false, '無効なセションにも関わらずインタビューセションが開始された。');
                done();
            })
            .catch(function (error) {
                console.log('無効なセションを検出。');
                done();
            });
        });
        
        it('Interviewセッションの取得', function (done) {
            ORM.OpenSession("test-user-03")
            .then(function (session) { return session.sessionId; })
            .then(_OpenInterviewSession)
            .then(function (log) {
                done();
            })
            .catch(function (error) {
                Assert(false, 'セションの取得に失敗しました。:' + error);
                done();
            });
        });

        it('Interviewセッションの取得-強制的に新規セション', function (done) {
            var sid = null;
            ORM.OpenSession("test-user-03")
            .then(function (session) { sid = session.sessionId; return ORM.OpenInterviewSession(false, session.sessionId) })
            .then(function (log) {
            })
            .then(function () {  return ORM.OpenInterviewSession(true, sid) })
            .then(function (log) {
                done();
            })
            .catch(function (error) {
                Assert(false, 'セションの取得に失敗しました。:' + error);
                done();
            });
        });

    });


    describe('InterviewSheetのテスト', function () {
        
        it('InterviewSheetの取得', function (done) {
            var sid = null;
            var iSessionId = null;

            ORM.OpenSession("test-user-03")
            .then(function (session) { sid = session.sessionId; return ORM.OpenInterviewSession(false, session.sessionId) })
            .then(function (log) {
            })
            .then(function () { return ORM.OpenInterviewSession(true, sid) })
            .then(function (log) {
                iSessionId = log.interviewSessionId;
                return (iSessionId);
            })
            .then(function (_iSessionId) {
                return ORM.GetInterviewInfo('Root', _iSessionId);
            })
            .then(function (info) {
                
                console.log('Interview sheetのチェック');
                Assert.notEqual(info, null, 'インタビューシートがnullです。');
                Assert.equal(info.Version, '1.0.0.0', 'InterviewSheet.Version');
                Assert.equal(info.QuestionId, 'Root', 'InterviewSheet.QuestionId');
                Assert.equal(info.QuestionText, 'どこが痛いですか？', 'InterviewSheet.QuestionText');
                Assert.equal(info.TemplateType, 'basic', 'InterviewSheet.TemplateType');
                Assert.equal(info.FigureUrl, null, 'InterviewSheet.FigureUrl');
                
                Assert.equal(info.PreviousQuestionId, '0', 'InterviewSheet.PreviousQuestionId');
                Assert.equal(info.Step, 0, 'InterviewSheet.Step');
                Assert.equal(info.InterviewSessionId, iSessionId, 'InterviewSheet.InterviewSessionId');
                                
                Assert.equal(info.Selections.length, 4, 'InterviewSheet.Selections#count');
                Assert.equal(info.Selections[0].SelectionId, 1, 'InterviewSheet.Selections[0].SelectionId');
                Assert.equal(info.Selections[0].SelectionText, '背中', 'InterviewSheet.Selections[0].SelectionText');
                Assert.equal(info.Selections[0].AnswerCode, 'MiddleBack', 'InterviewSheet.Selections[0].AnswerCode');
                Assert.equal(info.Selections[0].NextQuestionId, 'MiddleBackCause', 'InterviewSheet.Selections[0].NextQuestionId');
                Assert.equal(info.Selections[0].ConditionType, -1, 'InterviewSheet.Selections[0].ConditionType');
                
                Assert.equal(info.Selections[1].SelectionId, 2, 'InterviewSheet.Selections[1].SelectionId');
                Assert.equal(info.Selections[1].SelectionText, '腰', 'InterviewSheet.Selections[1].SelectionText');
                Assert.equal(info.Selections[1].AnswerCode, 'LowBack', 'InterviewSheet.Selections[1].AnswerCode');
                Assert.equal(info.Selections[1].NextQuestionId, 'LowBackPainType', 'InterviewSheet.Selections[1].NextQuestionId');
                Assert.equal(info.Selections[1].ConditionType, 0, 'InterviewSheet.Selections[1].ConditionType');
                                               
                Assert.equal(info.Selections[2].SelectionId, 3, 'InterviewSheet.Selections[2].SelectionId');
                Assert.equal(info.Selections[2].SelectionText, '臀部', 'InterviewSheet.Selections[2].SelectionText');
                Assert.equal(info.Selections[2].AnswerCode, 'Hip', 'InterviewSheet.Selections[2].AnswerCode');
                Assert.equal(info.Selections[2].NextQuestionId, 'HipPainType', 'InterviewSheet.Selections[2].NextQuestionId');
                Assert.equal(info.Selections[2].ConditionType, -1, 'InterviewSheet.Selections[2].ConditionType');
                
                Assert.equal(info.Selections[3].SelectionId, 4, 'InterviewSheet.Selections[3].SelectionId');
                Assert.equal(info.Selections[3].SelectionText, '足', 'InterviewSheet.Selections[3].SelectionText');
                Assert.equal(info.Selections[3].AnswerCode, 'Leg', 'InterviewSheet.Selections[3].AnswerCode');
                Assert.equal(info.Selections[3].NextQuestionId, 'LegPainScene', 'InterviewSheet.Selections[3].NextQuestionId');
                Assert.equal(info.Selections[3].ConditionType, -1, 'InterviewSheet.Selections[3].ConditionType');
                
                done();
            })

            .catch(function (error) {
                Assert(false, '例外が発生：'+error)
                done();
            });
        });

    });

    
    describe('InterviewLogのテスト 2', function () {
        
        it('InterviewLogの登録', function (done) {
            ORM.OpenSession("test-user-03")
            .then(function (session) { return ORM.OpenInterviewSession(false, session.sessionId) })
            .then(function (log) {
                return ORM.PushInterviewLog( "Root", 1, log.interviewSessionId, 0);
            })
            .then(function (rval) {
                Assert.equal(0, rval);
                done();
            })
            .catch(function (error) {
                Assert(false, 'セションの取得に失敗しました。:' + error);
                done();
            }); 
        });

        it('InterviewLogの削除(戻る操作)', function (done) {
            
            var iSessionId = null;
            
            ORM.OpenSession("test-user-03")
            .then(function (session) { return ORM.OpenInterviewSession(true, session.sessionId) })
            .then(function (log) {
                iSessionId = log.interviewSessionId;
                return ORM.PushInterviewLog("Root", 1, log.interviewSessionId, 0);
            })
            .then(function (log) {
                return ORM.PopInterviewLog(iSessionId, 1);
            })
            .then(function (log) {
                done();
            })
            .catch(function (error) {
                Assert(false, 'セションの取得に失敗しました。:' + error);
                done();
            });
        });

        it('InterviewLogのCLOSE', function (done) {
            
            var iSessionId = null;
            
            ORM.OpenSession("test-user-03")
            .then(function (session) { return ORM.OpenInterviewSession(true, session.sessionId) })
            .then(function (log) {
                iSessionId = log.interviewSessionId;
                return ORM.PushInterviewLog("Root", 2, log.interviewSessionId, 0);
            })
            .then(function (rval) {
                Assert.equal(1, rval);

                return (ORM.GetUserInfo("test-user-03"));
            })
            .then(function (_u) {
                Assert.equal("1.0.0.0", _u.conditionVersion);
                Assert.equal(0, _u.conditionType);
                done();
            })
            .catch(function (error) {
                Assert(false, 'セションの取得に失敗しました。:' + error);
                done();
            });
        });


    });

    describe('Recipeのテスト', function () {
        
        it('Recipeの取得', function (done) {
            ORM.GetRecipe(0)
            .then(function (_recipe) {
                Assert.equal(_recipe.conditionType, 0, 'Recipe.conditionType');
                Assert.equal(_recipe.version, 1, 'Recipe.version');
                Assert.equal(_recipe.title, "所見なし", 'Recipe.title');
                Assert.equal(_recipe.overview, "たぶん健康", 'Recipe.overview');
                Assert.equal(_recipe.infoUrl1, "http://backtech.cloudapp.net/1", 'Recipe.infoUrl1');
                Assert.equal(_recipe.infoUrl2, "http://backtech.cloudapp.net/2", 'Recipe.infoUrl2');
                Assert.equal(_recipe.infoUrl3, "http://backtech.cloudapp.net/3", 'Recipe.infoUrl3');

                done();
            })
            .catch(function (error) {
                Assert(false, '腰痛対策情報の取得に失敗しました。:' + error);
                done();
            });
        });

        it('Recipeの取得', function (done) {
            ORM.GetRecipeWithVersion(0, 1)
            .then(function (_recipe) {
                Assert.equal(_recipe.conditionType, 0, 'Recipe.conditionType');
                Assert.equal(_recipe.version, 1, 'Recipe.version');
                
                done();
            })
            .catch(function (error) {
                Assert(false, '腰痛対策情報の取得に失敗しました。:' + error);
                done();
            });
        });
    });

    describe('Pain Logのテスト', function () {
        
        it('Pain Logのテスト', function (done) {
            
            
            ORM.OpenSession("test-user-03")
            .then(function (session) { return ORM.AddPainLog(session.sessionId, true, 5) })
            .then(function (log) {
                Assert.equal(true, log.isBeforeTreatment);
                Assert.equal(5, log.painRate);
                return (ORM.GetUserInfo("test-user-03"));
            })
            .then(function (_u) {
                Assert.equal(5, _u.painRate);
                done();
            })
            .catch(function (error) {
                Assert(false, 'PainLogの追加に失敗しました。:' + error);
                done();
            });
        });

        it('Pain Logのテスト 2', function (done) {
            
            
            ORM.OpenSession("test-user-03")
            .then(function (session) { return ORM.AddPainLog(session.sessionId, false, 10) })
            .then(function (log) {
                Assert.equal(false, log.isBeforeTreatment);
                Assert.equal(10, log.painRate);
                return (ORM.GetUserInfo("test-user-03"));
            })
            .then(function (_u) {
                Assert.equal(10, _u.painRate);
                done();
            })
            .catch(function (error) {
                Assert(false, 'PainLogの追加に失敗しました。:' + error);
                done();
            });
        });

    });


});