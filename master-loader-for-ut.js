var ORM = require('./orm');

describe('マスタデータのロード', function () {
    var date = Date.now();
    it('GlobalInfo', function (done) {
        ORM.GlobalInfo.destroy({where: {}, truncate:true})
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('GlobalInfoのデータを削除しました：' + lines + ' lines.');
            ORM.GlobalInfo.bulkCreate([
                { infoId: 'INTERVIEW-SHEET-VERSION', createdAt: date, updatedAt: date, strValue: '1.0.0.0' }
            ]);
        })
        .then(function () {
            console.log('GlobalInfoにデータを挿入しました。');
            done();
        });
    });

    it('InterviewSheet', function (done) {
        ORM.InterviewSheet.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('InterviewSheetのデータを削除しました：' + lines + 'lines.');
            ORM.InterviewSheet.bulkCreate([
                { version: '1.0.0.0', questionId: '0', createdAt: date, updatedAt: date, questionText: 'インタビューを開始します。', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'Root', createdAt: date, updatedAt: date, questionText: 'どこが痛いですか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MiddleBackCause', createdAt: date, updatedAt: date, questionText: '痛めた原因は？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBHowLong', createdAt: date, updatedAt: date, questionText: '痛みはどのくらい続いていますか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBArchBackPain', createdAt: date, updatedAt: date, questionText: '腰を反らすと痛みが出現しますか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBHipLegNumbness', createdAt: date, updatedAt: date, questionText: '臀部や足に痺れがありますか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBPainScene', createdAt: date, updatedAt: date, questionText: 'どのような時に痛みますか？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBLestTimePain', createdAt: date, updatedAt: date, questionText: '安静にしていても痛みますか？（長時間寝ていて起きる痛みを除いて）', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LowBackPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HipPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LegPainScene', createdAt: date, updatedAt: date, questionText: '咳・くしゃみで痛みますか？ ', templateType: 'basic'},
                { version: '1.0.0.0', questionId: 'LBPainScene', createdAt: date, updatedAt: date, questionText: '咳・くしゃみで痛みますか？', templateType: 'basic'},
                { version: '1.0.0.0', questionId: 'LBPainScene2', createdAt: date, updatedAt: date, questionText: 'どのようなときに痛みますか？', templateType: 'basic'},
                { version: '1.0.0.0', questionId: 'HPPainScene', createdAt: date, updatedAt: date, questionText: '咳・くしゃみで痛みますか？', templateType: 'basic' }
            ]);
        })
        .then(function () {
            console.log('InterviewSheetにデータを挿入しました。');
            done();
        });

    });

    it('InterviewSheetSelection', function (done) {
        ORM.InterviewSheetSelection.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('InterviewSheetSelectionのデータを削除しました：' + lines + 'lines.');
            ORM.InterviewSheetSelection.bulkCreate([
                { version: '1.0.0.0', questionId: '0', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'root', selectionText: '最初の質問に移動します。', answerCode: 'submit', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MiddleBackCause', selectionText: '背中', answerCode: 'MiddleBack', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LowBackPainType', selectionText: '腰', answerCode: 'LowBack', conditionType: 0 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'HipPainType', selectionText: '臀部', answerCode: 'Hip', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'LegPainScene', selectionText: '足', answerCode: 'Leg', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MiddleBackCause', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBHowLong', selectionText: '「思いものを持ち上げたときに」など物理的に負荷がかかる原因があった。', answerCode: 'MBHeavyWeight', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MiddleBackCause', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBPainType', selectionText: 'これといった原因はない、もしくは、普通のl日常生活動作で起きた', answerCode: 'HBNoCause', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHowLong', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBArchBackPain', selectionText: '２週間以上前から続く慢性痛', answerCode: 'LongTimePain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHowLong', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBHipLegNembress', selectionText: '２週間いないに発生した急性痛', answerCode: 'ShortTimePain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainType', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '急性筋・筋膜性腰痛', selectionText: '局所的に響く、鋭い痛み', answerCode: 'SharpPain', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'MBPainType', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBPainScene', selectionText: '重だるい、鈍い痛み', answerCode: 'DullPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBArchBackPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBArchBackPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHipLegNembress', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBLegUpPain', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHipLegNembress', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰椎捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '腰をそらす動作によって痛む。', answerCode: 'ArchPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: '長時間の座位など、姿勢によって痛む', answerCode: 'LongTimeSamePositionPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '朝や同じ獅子絵の後の動き始めに痛む', answerCode: 'MoveStartPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'MBRestTimePain', selectionText: '上記以外もしくは、上記の組み合わせで痛む', answerCode: 'OthersOrPrural', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBRestTimePain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '内臓疾患（便秘含む）や尿路結石の可能性', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBRestTimePain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LowBackPainCause', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'Q023', selectionText: '腰をそらす動作によって痛む', answerCode: 'ArchBack', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LowBackPainCause', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: ' Q023 ', selectionText: ' 長時間の座位など、 同じ姿勢をとることによって痛む ', answerCode: ' LongTimeSamePosture ', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LowBackPainCause', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'Q023', selectionText: '朝や同じ姿勢の後の動き初めに痛む', answerCode: 'BeginingOfMove', conditionType: -1 }
            ]);
        })
        .then(function () {
            console.log('InterviewSheetSelectionにデータを挿入しました。');
            done();
        });

    });

    it('Recipe', function (done) {
        ORM.Recipe.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('Recipeのデータを削除しました：' + lines + 'lines.');
            ORM.Recipe.bulkCreate([
                { conditionType: -1, version: 1, createdAt: date, updatedAt: date , title: '調査中', overview: '調査中', infoUrl1: "http://backtech.cloudapp.net/", infoUrl2: "http://backtech.cloudapp.net/index.html", infoUrl3: "http://backtech.cloudapp.net/menu/" },
                { conditionType: 0, version: 1, createdAt: date, updatedAt: date , title: '所見なし', overview: 'たぶん健康', infoUrl1: "http://backtech.cloudapp.net/1", infoUrl2: "http://backtech.cloudapp.net/2", infoUrl3: "http://backtech.cloudapp.net/3" }
            ]);
        })
        .then(function () {
            console.log('Recipeにデータを挿入しました。');
            done();
        });

    });

    it('User', function (done) {
        ORM.User.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('Userのデータを削除しました：' + lines + 'lines.');
            ORM.User.bulkCreate([
                { userId: 'test-user', createdAt: date, updatedAt: date , familyName: '腰痛', lastName: '対策', age: 35, sex: 2, addressCode: 18, password: 'password', passwordLastUpdatedAt: date, lastAccessedAt: date },
                { userId: 'test-user-02', createdAt: date, updatedAt: date , familyName: '腰痛', lastName: '対策02', age: 35, sex: 2, addressCode: 18, password: 'password', passwordLastUpdatedAt: date, lastAccessedAt: date },
                { userId: 'test-user-03', createdAt: date, updatedAt: date , familyName: '腰痛', lastName: '対策03', age: 35, sex: 2, addressCode: 18, password: 'password', passwordLastUpdatedAt: date, lastAccessedAt: date },
            ]);
        })
        .then(function () {
            console.log('Userにデータを挿入しました。');
            done();
        });

    });

    it('UserStatus', function (done) {
        ORM.UserStatus.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('UserStatusのデータを削除しました：' + lines + 'lines.');
            ORM.UserStatus.bulkCreate([
                { userId: 'test-user', createdAt: date, updatedAt: date , conditionType: -1 , painRate:-1},
                { userId: 'test-user-02', createdAt: date, updatedAt: date , version: '1.0.0.0', conditionType: 2 , painRate: -1},
                { userId: 'test-user-03', createdAt: date, updatedAt: date , conditionType: -1 , painRate: -1},
            ]);
        })
        .then(function () {
            console.log('UserStatusにデータを挿入しました。');
            done();
        });

    });
});