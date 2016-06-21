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
                { version: '1.0.0.0', questionId: '0', createdAt: date, updatedAt: date, questionText: 'インタビューを開始します。', figureUrl:'', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'Root', createdAt: date, updatedAt: date, questionText: 'どこが痛いですか？', figureUrl: 'images/imageQ1.png',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MiddleBackCause', createdAt: date, updatedAt: date, questionText: '痛めた原因は？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBHowLong', createdAt: date, updatedAt: date, questionText: '痛みはどのくらい続いていますか？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBArchBackPain', createdAt: date, updatedAt: date, questionText: '腰を反らすと痛みが出現しますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBHipLegNumbness', createdAt: date, updatedAt: date, questionText: '臀部や足に痺れがありますか？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', figureUrl: 'images/FigureB.png', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBPainScene', createdAt: date, updatedAt: date, questionText: 'どのような時に痛みますか？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'MBRestTimePain', createdAt: date, updatedAt: date, questionText: '安静にしていても痛みますか？（長時間寝ていて起きる痛みを除いて）', figureUrl: '',  templateType: 'basic' },

                { version: '1.0.0.0', questionId: 'LowBackPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBCause', createdAt: date, updatedAt: date, questionText: '痛めた原因は？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBCoughPain', createdAt: date, updatedAt: date, questionText: '咳・くしゃみでいたみますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBLegUpPain', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', figureUrl: 'images/FigureB.png',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBSitThanStand', createdAt: date, updatedAt: date, questionText: '立っているよりも、座っているほうが辛いですか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBMoveOrStatic', createdAt: date, updatedAt: date, questionText: 'どちらのほうが痛みますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBPainScene', createdAt: date, updatedAt: date, questionText: 'どのような時に痛みますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBSlantPain', createdAt: date, updatedAt: date, questionText: '痛みは(真ん中ではなく)片側に感じますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBRepeatStrainedBack', createdAt: date, updatedAt: date, questionText: 'ぎっくり腰を繰り返しますか？', figureUrl: '',  templateType: 'basic' },                

                { version: '1.0.0.0', questionId: 'LBCoughPain2', createdAt: date, updatedAt: date, questionText: '咳・くしゃみでいたみますか？', figureUrl: '', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBLegUpPain2', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', figureUrl: 'images/FigureB.png', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LBSitThanStand2', createdAt: date, updatedAt: date, questionText: '立っているよりも、座っているほうが辛いですか？', figureUrl: '', templateType: 'basic' },
 

                { version: '1.0.0.0', questionId: 'HipPainType', createdAt: date, updatedAt: date, questionText: '痛みの種類は？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPCoughPain', createdAt: date, updatedAt: date, questionText: '咳・くしゃみで痛みますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPPainScene', createdAt: date, updatedAt: date, questionText: 'どのような症状が最も当てはまりますか？', figureUrl: 'images/FigureA.png',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPHowReleavePain', createdAt: date, updatedAt: date, questionText: '痛みを鎮めるためにはどうしますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPStoopingFigure', createdAt: date, updatedAt: date, questionText: '足に痛みがあり、立つときや歩くときは、少し前かがみの姿勢が楽ですか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPLegUpPain', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', figureUrl: 'images/FigureB.png',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'HIPSitThanStand', createdAt: date, updatedAt: date, questionText: '立っているよりも、座っているほうが辛いですか？', figureUrl: '',  templateType: 'basic' },

                { version: '1.0.0.0', questionId: 'LEGCoughPain', createdAt: date, updatedAt: date, questionText: '咳・くしゃみで痛みますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LEGPainScene', createdAt: date, updatedAt: date, questionText: 'どのような症状が最も当てはまりますか？', figureUrl: 'images/FigureA.png', templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LEGHowReleavePain', createdAt: date, updatedAt: date, questionText: '痛みを鎮めるためにはどうしますか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LEGStoopingFigure', createdAt: date, updatedAt: date, questionText: '足に痛みがあり、立つときや歩くときは、少し前かがみの姿勢が楽ですか？', figureUrl: '',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LEGLegUpPain', createdAt: date, updatedAt: date, questionText: '仰向けに寝て、膝を伸ばしながら足を上げると痛みや痺れを感じますか？', figureUrl: 'images/FigureB.png',  templateType: 'basic' },
                { version: '1.0.0.0', questionId: 'LEGSitThanStand', createdAt: date, updatedAt: date, questionText: '立っているよりも、座っているほうが辛いですか？', figureUrl: '',  templateType: 'basic' },

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
                { version: '1.0.0.0', questionId: '0', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'Root', selectionText: '最初の質問に移動します。', answerCode: 'submit', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MiddleBackCause', selectionText: '背中', answerCode: 'MiddleBack', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LowBackPainType', selectionText: '腰', answerCode: 'LowBack', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'HipPainType', selectionText: '臀部', answerCode: 'Hip', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'Root', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'LEGCoughPain', selectionText: '足', answerCode: 'Leg', conditionType: -1 },
 
                { version: '1.0.0.0', questionId: 'MiddleBackCause', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBHowLong', selectionText: '「重いものを持ち上げたときに」など物理的に負荷がかかる原因があった。', answerCode: 'MBHeavyWeight', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MiddleBackCause', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBPainType', selectionText: 'これといった原因はない、もしくは、普通の日常生活動作で起きた', answerCode: 'MBNoCause', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHowLong', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBArchBackPain', selectionText: '２週間以上前から続く慢性痛', answerCode: 'LongTimePain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHowLong', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBHipLegNumbness', selectionText: '２週間以内に発生した急性痛', answerCode: 'ShortTimePain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBPainType', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '急性筋・筋膜性腰痛', selectionText: '局所的に響く、鋭い痛み', answerCode: 'SharpPain', conditionType: 6}, 
                { version: '1.0.0.0', questionId: 'MBPainType', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'MBPainScene', selectionText: '重だるい、鈍い痛み', answerCode: 'DullPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBArchBackPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 1},
                { version: '1.0.0.0', questionId: 'MBArchBackPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: 2 },
                { version: '1.0.0.0', questionId: 'MBHipLegNumbness', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'MBLegUpPain', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBHipLegNumbness', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰椎捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: 5 },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: 3 },
                { version: '1.0.0.0', questionId: 'MBLegUpPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: 4 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '腰をそらす動作によって痛む。', answerCode: 'ArchPain', conditionType: 7 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: '長時間の座位など、姿勢によって痛む', answerCode: 'LongTimeSamePositionPain', conditionType: 8 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '朝や同じ姿勢の後の動き始めに痛む', answerCode: 'MoveStartPain', conditionType: 9 },
                { version: '1.0.0.0', questionId: 'MBPainScene', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'MBRestTimePain', selectionText: '上記以外もしくは、上記の組み合わせで痛む', answerCode: 'OthersOrPrural', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'MBRestTimePain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '内臓疾患（便秘含む）や尿路結石の可能性', selectionText: 'はい', answerCode: 'Yes', conditionType: 10 },
                { version: '1.0.0.0', questionId: 'MBRestTimePain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: 11 },

                { version: '1.0.0.0', questionId: 'LowBackPainType', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBCause', selectionText: '局所的に響く、鋭い痛み', answerCode: 'SharpPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LowBackPainType', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LBPainScene', selectionText: '重だるい、鈍い痛み', answerCode: 'DullPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBCause', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBCoughPain', selectionText: '「重いものを持ち上げたとき」など物理的に負荷がかかる原因があった。', answerCode: 'LBHeavyWeight', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBCause', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LBMoveOrStatic', selectionText: 'これといった原因はない、もしくは、普通の日常生活動作で起きた。', answerCode: 'LBNoCause', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBPainScene', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBSlantPain', selectionText: '腰を反らす動作によって痛む', answerCode: 'ArchPain', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBPainScene', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '慢性筋・筋膜性腰痛', selectionText: '長時間の座位など、同じ姿勢をとることによって痛む。', answerCode: 'LongTimeSamePositionPain', conditionType: 20 },
                { version: '1.0.0.0', questionId: 'LBPainScene', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '朝や同じ姿勢の後の動き始めに痛む', answerCode: 'MoveStartPain', conditionType: 21 },
                { version: '1.0.0.0', questionId: 'LBMoveOrStatic', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBCoughPain2', selectionText: '何らかの動作時', answerCode: 'Move', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBMoveOrStatic', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '長時間同じ姿勢', answerCode: 'SamePosition', conditionType: 13 },
                { version: '1.0.0.0', questionId: 'LBCoughPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBLegUpPain', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBCoughPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '急性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: 12 },
                { version: '1.0.0.0', questionId: 'LBLegUpPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: 14 },
                { version: '1.0.0.0', questionId: 'LBLegUpPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LBSitThanStand', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBSitThanStand', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間板性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 15 },
                { version: '1.0.0.0', questionId: 'LBSitThanStand', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰部捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: 16 },
                { version: '1.0.0.0', questionId: 'LBSlantPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 17 },
                { version: '1.0.0.0', questionId: 'LBSlantPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LBRepeatStraintedBack', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBRepeatStraintedBack', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰椎分離症/すべり症', selectionText: 'はい', answerCode: 'Yes', conditionType: 18 },
                { version: '1.0.0.0', questionId: 'LBRepeatStraintedBack', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '変形性腰椎症', selectionText: 'いいえ', answerCode: 'No', conditionType: 19 },

                { version: '1.0.0.0', questionId: 'LBCoughPain2', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LBLegUpPain2', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBCoughPain2', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '急性筋・筋膜性腰痛', selectionText: 'いいえ', answerCode: 'No', conditionType: 1012 },
                { version: '1.0.0.0', questionId: 'LBLegUpPain2', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: 1014 },
                { version: '1.0.0.0', questionId: 'LBLegUpPain2', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LBSitThanStand2', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LBSitThanStand2', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間板性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 1015 },
                { version: '1.0.0.0', questionId: 'LBSitThanStand2', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰部捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: 1016 },


                { version: '1.0.0.0', questionId: 'HipPainType', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'HIPCoughPain', selectionText: 'ピリピリ響く、鋭い痛み', answerCode: 'SharpPain', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'HipPainType', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '椎間関節性腰痛', selectionText: '重だるい、鈍い痛み', answerCode: 'DullPain', conditionType: 22 },
                { version: '1.0.0.0', questionId: 'HIPCoughPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'HIPLegUpPain', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'HIPCoughPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'HIPPainScene', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'HIPPainScene', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: '図の恰好をすると痛みが出現する', answerCode: 'FigurePain', conditionType: 23 }, 
                { version: '1.0.0.0', questionId: 'HIPPainScene', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: 'いろいろな対策を行ったが、いまいち効果がなかった', answerCode: 'NoEffect', conditionType: 24 },
                { version: '1.0.0.0', questionId: 'HIPPainScene', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'HIPHowReleavePain', selectionText: '途中で休憩しないと長距離歩けない', answerCode: 'NoLongWalk', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'HIPPainScene', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'HIPStoopingFigure', selectionText: '歩くときにびっこをひく', answerCode: 'Gimp', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'HIPHowReleavePain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '脊椎管狭窄症', selectionText: '前かがみみなったり、椅子に腰をかけたり、しゃがみ込むなどして、腰を屈曲させた状態で休む', answerCode: '', conditionType: 25 }, 
                { version: '1.0.0.0', questionId: 'HIPHowReleavePain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '動脈閉塞性疾患', selectionText: 'しばらく立ったままじっとしている。', answerCode: 'KeepStanding', conditionType: 26 },
                { version: '1.0.0.0', questionId: 'HIPStoopingFigure', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '梨状筋症候群', selectionText: 'はい', answerCode: 'Yes', conditionType: 27 }, 
                { version: '1.0.0.0', questionId: 'HIPStoopingFigure', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '筋・筋膜性腰痛の関連痛、神経根障害以外の下肢症状の可能性', selectionText: 'いいえ', answerCode: 'No', conditionType: 28 },
                { version: '1.0.0.0', questionId: 'HIPLegUpPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: 2014 },
                { version: '1.0.0.0', questionId: 'HIPLegUpPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'HIPSitThanStand', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'HIPSitThanStand', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間板性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 2015 },
                { version: '1.0.0.0', questionId: 'HIPSitThanStand', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰部捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: 2016 },

                { version: '1.0.0.0', questionId: 'LEGCoughPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: 'LEGLegUpPain', selectionText: 'はい', answerCode: 'Yes', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'LEGCoughPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LEGPainScene', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },                
                { version: '1.0.0.0', questionId: 'LEGPainScene', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: '図の恰好をすると痛みが出現する', answerCode: 'FigurePain', conditionType: 3023 }, 
                { version: '1.0.0.0', questionId: 'LEGPainScene', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '仙腸関節性腰痛', selectionText: 'いろいろな対策を行ったが、いまいち効果がなかった', answerCode: 'NoEffect', conditionType: 3024 },
                { version: '1.0.0.0', questionId: 'LEGPainScene', selectionId: 3, createdAt: date, updatedAt: date , nextQuestionId: 'LEGHowReleavePain', selectionText: '途中で休憩しないと長距離歩けない', answerCode: 'NoLongWalk', conditionType: -1 }, 
                { version: '1.0.0.0', questionId: 'LEGPainScene', selectionId: 4, createdAt: date, updatedAt: date , nextQuestionId: 'LEGStoopingFigure', selectionText: '歩くときにびっこをひく', answerCode: 'Gimp', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LEGHowReleavePain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '脊椎管狭窄症', selectionText: '前かがみみなったり、椅子に腰をかけたり、しゃがみ込むなどして、腰を屈曲させた状態で休む', answerCode: '', conditionType: 3025 }, 
                { version: '1.0.0.0', questionId: 'LEGHowReleavePain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '動脈閉塞性疾患', selectionText: 'しばらく立ったままじっとしている。', answerCode: 'KeepStanding', conditionType: 3026 },
                { version: '1.0.0.0', questionId: 'LEGStoopingFigure', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '梨状筋症候群', selectionText: 'はい', answerCode: 'Yes', conditionType: 3027 }, 
                { version: '1.0.0.0', questionId: 'LEGStoopingFigure', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '筋・筋膜性腰痛の関連痛、神経根障害以外の下肢症状の可能性', selectionText: 'いいえ', answerCode: 'No', conditionType: 3028 },
                { version: '1.0.0.0', questionId: 'LEGLegUpPain', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '腰部椎間板ヘルニア', selectionText: 'はい', answerCode: 'Yes', conditionType: 3014 },
                { version: '1.0.0.0', questionId: 'LEGLegUpPain', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: 'LEGSitThanStand', selectionText: 'いいえ', answerCode: 'No', conditionType: -1 },
                { version: '1.0.0.0', questionId: 'LEGSitThanStand', selectionId: 1, createdAt: date, updatedAt: date , nextQuestionId: '椎間板性腰痛', selectionText: 'はい', answerCode: 'Yes', conditionType: 3015 },
                { version: '1.0.0.0', questionId: 'LEGSitThanStand', selectionId: 2, createdAt: date, updatedAt: date , nextQuestionId: '腰部捻挫', selectionText: 'いいえ', answerCode: 'No', conditionType: 3016 },
 
 
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
                { conditionType: -1, version: 1, createdAt: date, updatedAt: date , title: '調査中', overview: '調査中' , infoUrl1: '' },
                { conditionType: 0, version: 1, createdAt: date, updatedAt: date , title: '所見なし', overview: 'たぶん健康' , infoUrl1: '' },
                { conditionType: 1, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '禁忌：脊椎を無理して伸展しすぎない。' , infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'http://youtu.be/yq07tTp4cEI', infoUrl3: 'http://youtu.be/24ww9Sjj_Rk', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: '腰をそらすと痛い方用', infoUrl3Name: '足上げで腰痛改善' },
                { conditionType: 2, version: 1, createdAt: date, updatedAt: date , title: '慢性筋・筋膜性腰痛', overview: '', infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'http://youtu.be/dL-Iv69nCII', infoUrl3: 'http://youtu.be/HDwfa2tF-OE', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: '腰の筋肉を簡単にほぐす方法', infoUrl3Name: '椅子を使用した背筋エクササイズ' },
                { conditionType: 3, version: 1, createdAt: date, updatedAt: date , title: '腰部椎間板ヘルニア', overview: 'まず病院に受診してください。' , infoUrl1: '病院受診', infoUrl2: 'http://youtu.be/CodSVbbVZ14', infoUrl3: 'http://youtu.be/lTkwLeom-dA', infoUrl1Name: '病院受診', infoUrl2Name: '正しい持ち上げ動作', infoUrl3Name: 'マッケンジー体操' },
                { conditionType: 4, version: 1, createdAt: date, updatedAt: date , title: '仙腸関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'http://youtu.be/AJkIxUHpvYs', infoUrl3: 'http://youtu.be/N9e1CnkWKk0', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: 'ストレッチ１', infoUrl3Name: 'ストレッチ２' },
                { conditionType: 5, version: 1, createdAt: date, updatedAt: date , title: '腰椎捻挫', overview: 'ひどいなら病院で受診してください。' , infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'http://youtu.be/-jfu_c4Cqos', infoUrl3: '', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: '' },
                { conditionType: 6, version: 1, createdAt: date, updatedAt: date , title: '急性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/dL-Iv69nCII', infoUrl2: 'http://youtu.be/gHiBoIaB3mo', infoUrl3: 'http://youtu.be/HDwfa2tF-OE', infoUrl1Name: '腰の筋肉を簡単にほぐす方法', infoUrl2Name: '背中のストレッチ', infoUrl3Name: '椅子を使用した背筋エクササイズ' },
                { conditionType: 7, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '', infoUrl1: 'http://youtu.be/yq07tTp4cEI' , infoUrl2: 'http://youtu.be/gnZ0O_2FYkk', infoUrl3: 'http://youtu.be/HDwfa2tF-OE', infoUrl1Name: '腰をそらすと痛い方用', infoUrl2Name: '腰回しストレッチ', infoUrl3Name: '椅子を使用した背筋エクササイズ' },
                { conditionType: 8, version: 1, createdAt: date, updatedAt: date , title: '慢性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/xNX_oBpIfsM', infoUrl2: 'http://youtu.be/dL-Iv69nCII', infoUrl3: 'http://youtu.be/HDwfa2tF-OE', infoUrl1Name: '姿勢指導', infoUrl2Name: '腰の筋肉を簡単にほぐす方法', infoUrl3Name: '椅子を使用した背筋エクササイズ' },
                { conditionType: 9, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/yq07tTp4cEI', infoUrl2: 'http://youtu.be/gnZ0O_2FYkk', infoUrl3: 'http://youtu.be/HDwfa2tF-OE', infoUrl1Name: '腰をそらすと痛い方用', infoUrl2Name: '腰回しストレッチ', infoUrl3Name: '椅子を使用した背筋エクササイズ' },
                { conditionType: 10, version: 1, createdAt: date, updatedAt: date , title: '内臓疾患(便秘含む)や尿路結石の可能性', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診', infoUrl2: '', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: '', infoUrl3Name: '' },
                { conditionType: 11, version: 1, createdAt: date, updatedAt: date , title: '慢性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/dL-Iv69nCII', infoUrl2: 'http://youtu.be/HDwfa2tF-OE', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '腰の筋肉を簡単にほぐす方法', infoUrl2Name: '椅子を使用した背筋エクササイズ', infoUrl3Name: '体幹エクササイズ' }
            ]);
        })
        .then(function () {
            ORM.Recipe.bulkCreate([
                { conditionType:   12, version: 1, createdAt: date, updatedAt: date , title: '急性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/CodSVbbVZ14' , infoUrl2: 'http://youtu.be/dL-Iv69nCII', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: '腰の筋肉を簡単にほぐす方法', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 1012, version: 1, createdAt: date, updatedAt: date , title: '急性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/dL-Iv69nCII' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '腰の筋肉を簡単にほぐす方法', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType:   13, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '', infoUrl1: 'http://youtu.be/xNX_oBpIfsM' , infoUrl2: 'http://youtu.be/yq07tTp4cEI', infoUrl3: 'http://youtu.be/24ww9Sjj_Rk', infoUrl1Name: '姿勢指導', infoUrl2Name: '腰をそらすと痛い方用', infoUrl3Name: '足上げで腰痛改善'},
                { conditionType:   14, version: 1, createdAt: date, updatedAt: date , title: '腰部椎間板ヘルニア', overview: 'まず病院で受診してください。', infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/mKMLcLlNRGA', infoUrl3: 'http://youtu.be/mKMLcLlNRGA', infoUrl1Name: '病院受診', infoUrl2Name: 'マッケンジー体操', infoUrl3Name: 'マッケンジー体操'},
                { conditionType:   15, version: 1, createdAt: date, updatedAt: date , title: '椎間板性腰痛', overview: '' , infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'http://youtu.be/xNX_oBpIfsM', infoUrl3: 'http://youtu.be/mKMLcLlNRGA', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: '姿勢指導', infoUrl3Name: 'マッケンジー体操'},
                { conditionType:   16, version: 1, createdAt: date, updatedAt: date , title: '腰椎捻挫', overview: '' , infoUrl1: 'http://youtu.be/CodSVbbVZ14', infoUrl2: 'https://www.youtube.com/watch?t=31&v=-jfu_c4Cqos', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '正しい持ち上げ動作', infoUrl2Name: 'ストレッチ', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 1014, version: 1, createdAt: date, updatedAt: date , title: '腰部椎間板ヘルニア', overview: 'まず病院で受診してください。', infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/mKMLcLlNRGA', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '病院受診', infoUrl2Name: 'マッケンジー体操', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 1015, version: 1, createdAt: date, updatedAt: date , title: '椎間板性腰痛', overview: '' , infoUrl1: 'http://youtu.be/xNX_oBpIfsM' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: 'http://youtu.be/mKMLcLlNRGA', infoUrl1Name: '姿勢指導', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: 'マッケンジー体操' },
                { conditionType: 1016, version: 1, createdAt: date, updatedAt: date , title: '腰椎捻挫', overview: '安静は絶対にダメ。' , infoUrl1: 'https://www.youtube.com/watch?t=31&v=-jfu_c4Cqos' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: 'ストレッチ', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},         
                { conditionType: 2014, version: 1, createdAt: date, updatedAt: date , title: '腰部椎間板ヘルニア', overview: 'まず病院で受診してください。', infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/mKMLcLlNRGA', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '病院受診', infoUrl2Name: 'マッケンジー体操', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 2015, version: 1, createdAt: date, updatedAt: date , title: '椎間板性腰痛', overview: '' , infoUrl1: 'http://youtu.be/mKMLcLlNRGA' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType: 2016, version: 1, createdAt: date, updatedAt: date , title: '腰椎捻挫', overview: 'ひどいなら病院で受診してください。' , infoUrl1: 'http://youtu.be/-jfu_c4Cqos' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '体幹エクササイズ', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType: 3014, version: 1, createdAt: date, updatedAt: date , title: '腰部椎間板ヘルニア', overview: 'まず病院で受診してください。', infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/mKMLcLlNRGA', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: 'マッケンジー体操', infoUrl3Name: ''},
                { conditionType: 3015, version: 1, createdAt: date, updatedAt: date , title: '椎間板性腰痛', overview: '' , infoUrl1: 'http://youtu.be/mKMLcLlNRGA' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: 'マッケンジー体操', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType: 3016, version: 1, createdAt: date, updatedAt: date , title: '腰椎捻挫', overview: '' , infoUrl1: 'http://youtu.be/-jfu_c4Cqos' , infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '体幹エクササイズ１', infoUrl2Name: '体幹エクササイズ２', infoUrl3Name: ''}
            ]);
        })
        .then(function () {
            ORM.Recipe.bulkCreate([
                { conditionType:   17, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/yq07tTp4cEI', infoUrl2: 'http://youtu.be/24ww9Sjj_Rk', infoUrl3: '', infoUrl1Name: '腰をそらすと痛い方用', infoUrl2Name: '足上げで腰痛改善', infoUrl3Name: ''},/*NG*/
                { conditionType:   18, version: 1, createdAt: date, updatedAt: date , title: '腰椎分離症/すべり症', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診', infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType:   19, version: 1, createdAt: date, updatedAt: date , title: '変形性腰椎症', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診', infoUrl2: 'http://youtu.be/XSZ3841Y3xo', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: '体幹エクササイズ', infoUrl3Name: ''},
                { conditionType:   20, version: 1, createdAt: date, updatedAt: date , title: '慢性筋・筋膜性腰痛', overview: '' , infoUrl1: 'http://youtu.be/xNX_oBpIfsM', infoUrl2: 'http://youtu.be/dL-Iv69nCII', infoUrl3: '', infoUrl1Name: '姿勢指導', infoUrl2Name: '腰の筋肉を簡単にほぐす方法', infoUrl3Name: ''},/*NG*/
                { conditionType:   21, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/24ww9Sjj_Rk', infoUrl2: 'http://youtu.be/yq07tTp4cEI', infoUrl3: '', infoUrl1Name: '足上げで腰痛改善', infoUrl2Name: '腰をそらすと痛い方用', infoUrl3Name: ''},
                { conditionType:   22, version: 1, createdAt: date, updatedAt: date , title: '椎間関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/24ww9Sjj_Rk' , infoUrl2: 'http://youtu.be/yq07tTp4cEI', infoUrl3: '', infoUrl1Name: '足上げで腰痛改善', infoUrl2Name: '腰をそらすと痛い方用', infoUrl3Name: ''},
                { conditionType:   23, version: 1, createdAt: date, updatedAt: date , title: '仙腸関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/lDh5AHpdXY8' , infoUrl2: 'http://youtu.be/N9e1CnkWKk0', infoUrl3: 'http://youtu.be/TK-klYjSwjs', infoUrl1Name: 'ストレッチ１', infoUrl2Name: 'ストレッチ２', infoUrl3Name: '仙腸関節ストレッチ'},
                { conditionType: 3023, version: 1, createdAt: date, updatedAt: date , title: '仙腸関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/lDh5AHpdXY8' , infoUrl2: 'http://youtu.be/N9e1CnkWKk0', infoUrl3: '', infoUrl1Name: 'ストレッチ１', infoUrl2Name: 'ストレッチ２', infoUrl3Name: ''},/*NG*/
                { conditionType:   24, version: 1, createdAt: date, updatedAt: date , title: '仙腸関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/lDh5AHpdXY8' , infoUrl2: 'http://youtu.be/5Da1F70g0rE', infoUrl3: '', infoUrl1Name: 'ストレッチ１', infoUrl2Name: '体幹トレーニング', infoUrl3Name: ''},
                { conditionType: 3024, version: 1, createdAt: date, updatedAt: date , title: '仙腸関節性腰痛', overview: '' , infoUrl1: 'http://youtu.be/lDh5AHpdXY8' , infoUrl2: 'http://youtu.be/5Da1F70g0rE', infoUrl3: '', infoUrl1Name: 'ストレッチ１', infoUrl2Name: '体幹トレーニング', infoUrl3Name: ''},
                { conditionType:   25, version: 1, createdAt: date, updatedAt: date , title: '脊椎管狭窄症', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/kSVaaxZVdMI', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '病院受診', infoUrl2Name: 'ストレッチ', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 3025, version: 1, createdAt: date, updatedAt: date , title: '脊椎管狭窄症', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/kSVaaxZVdMI', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: 'ストレッチ', infoUrl3Name: ''},
                { conditionType:   26, version: 1, createdAt: date, updatedAt: date , title: '動脈閉塞性疾患', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診', infoUrl2: '', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: '', infoUrl3Name: ''},
                { conditionType: 3026, version: 1, createdAt: date, updatedAt: date , title: '動脈閉塞性疾患', overview: 'まず病院で受診してください。' , infoUrl1: '病院受診' , infoUrl2: '', infoUrl3: '', infoUrl1Name: '病院受診', infoUrl2Name: '', infoUrl3Name: ''},
                { conditionType:   27, version: 1, createdAt: date, updatedAt: date , title: '梨状筋症候群', overview: '', infoUrl1: 'http://youtu.be/tBkGzQ5RVro' , infoUrl2: '', infoUrl3: 'http://youtu.be/vya2zVaGWq4', infoUrl1Name: 'ストレッチ１', infoUrl2Name: '', infoUrl3Name: 'ストレッチ２'},
                { conditionType: 3027, version: 1, createdAt: date, updatedAt: date , title: '梨状筋症候群', overview: '', infoUrl1: 'http://youtu.be/tBkGzQ5RVro' , infoUrl2: '', infoUrl3: 'http://youtu.be/vya2zVaGWq4', infoUrl1Name: 'ストレッチ１', infoUrl2Name: '', infoUrl3Name: 'ストレッチ２'},
                { conditionType:   28, version: 1, createdAt: date, updatedAt: date , title: '筋・筋膜性腰痛の関連痛、神経根障害以外の下肢症状の可能性', overview: 'まず病院で受診してください。', infoUrl1: '病院受診' , infoUrl2: 'http://youtu.be/T5Usl4hM_M8', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '病院受診', infoUrl2Name: '梨状筋症候群用ストレッチ', infoUrl3Name: '体幹エクササイズ'},
                { conditionType: 3028, version: 1, createdAt: date, updatedAt: date , title: '筋・筋膜性腰痛の関連痛、神経根障害以外の下肢症状の可能性', overview: 'まず病院で受診してください。', infoUrl1: '病院受診', infoUrl2: 'http://youtu.be/dL-Iv69nCII', infoUrl3: 'http://youtu.be/XSZ3841Y3xo', infoUrl1Name: '病院受診', infoUrl2Name: '腰の筋肉を簡単にほぐす方法', infoUrl3Name: '体幹エクササイズ'}
            ]);
        })
        .then(function () {
            console.log('Recipeにデータを挿入しました。');
            done();
        });

    });
/*
    it('User', function (done) {
        ORM.User.destroy({ where: {}, truncate: true })
        .then(function (lines) {
            if (isNaN(lines)) {
                lines = 0;
            }
            console.log('Userのデータを削除しました：' + lines + 'lines.');
            ORM.User.bulkCreate([
                { userId: 'test-user', createdAt: date, updatedAt: date , familyName:'腰痛', lastName:'対策', age:35, sex:2, addressCode:18, password:'password', passwordLastUpdatedAt:date, lastAccessedAt:date, temporayPassword:false },
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
                { userId: 'test-user', createdAt: date, updatedAt: date , conditionType: -1 },
            ]);
        })
        .then(function () {
            console.log('UserStatusにデータを挿入しました。');
            done();
        });

    });
*/
});