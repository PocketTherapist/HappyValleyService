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
                { version: '1.0.0.0', questionId: 'root', createdAt: date, updatedAt: date, questionText: '最初の質問です。', templateType: 'basic'}
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
                { version: '1.0.0.0', questionId: 'root', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'Q021', selectionText: 'はい', answerCode: 'YES', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'root', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'Q022', selectionText: 'いいえ', answerCode: 'NO', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'root', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'Q023', selectionText: 'わからない', answerCode: 'UNKNOWN', conditionType: -1 },
            ]);
        })
        .then(function () {
            console.log('InterviewSheetSelectionにデータを挿入しました。');
            done();
        });

    });
});