
list = [
    {
        QuestionId: 1,
        QuestionText: "どこが痛みますか？",
        FigureUrl: "images/imageQ1.png",
        LastQuestionId: 1,
        Selections: [
            {
                SelectionId: 1,
                SelectionText: "背中",
                AnswerCode: "MiddleBack",
                NextQuetionId: 11,
                FigureUrl: "images/imageQ1S1.png"
            },
            {
                SelectionId: 2,
                SelectionText: "腰",
                AnswerCode: "LowBack",
                NextQuetionId: 31,
                FigureUrl: "images/imageQ1S2.png"
            },
            {
                SelectionId: 3,
                SelectionText: "臀部",
                AnswerCode: "Hip",
                NextQuetionId: 51,
                FigureUrl: "images/imageQ1S3.png"
            },
            {
                SelectionId: 4,
                SelectionText: "足",
                AnswerCode: "Leg",
                NextQuetionId: 71,
                FigureUrl: "images/imageQ1S4.png"
            }
        ]
    },
    {
        QuestionId: 11,
        QuestionText: "痛めた原因は？",
        FigureUrl: "images/imageQ11.png",
        LastQuestionId: 1,
        Selections: [
            {
                SelectionId: 1,
                SelectionText: "「重いものを持ち上げるとき」など物理的な負荷がかかる原因があった。",
                AnswerCode: "LiftHeavy",
                NextQuetionId: 12,
                FigureUrl: "images/imageQ11S1.png"
            },
            {
                SelectionId: 2,
                SelectionText: "これといった原因はない、または普通の日常生活動作で起こった",
                AnswerCode: "RoutineWork",
                NextQuetionId: 13,
                FigureUrl: "images/imageQ11S2.png"
            }
        ]
    },
    {
        QuestionId: 31,
        QuestionText: "痛みの種類は？",
        FigureUrl: "images/imageQ31.png",
        LastQuestionId: 1,
        Selections: [
            {
                SelectionId: 1,
                SelectionText: "局所的に響く、鋭い痛み。",
                AnswerCode: "SharpPain",
                NextQuetionId: 32,
                FigureUrl: "images/imageQ31S1.png"
            },
            {
                SelectionId: 2,
                SelectionText: "重だるい、鈍い痛み。",
                AnswerCode: "DullPain",
                NextQuetionId: 33,
                FigureUrl: "images/imageQ31S2.png"
            }
        ]
    },
    {
        QuestionId: 51,
        QuestionText: "痛みの種類は？",
        FigureUrl: "images/imageQ51.png",
        LastQuestionId: 1,
        Selections: [
            {
                SelectionId: 1,
                SelectionText: "ピリピリ響く、鋭い痛み。",
                AnswerCode: "SharpPain",
                NextQuetionId: 52,
                FigureUrl: "images/imageQ31S1.png"
            },
            {
                SelectionId: 2,
                SelectionText: "重だるい、鈍い痛み。",
                AnswerCode: "DullPain",
                NextQuetionId: 53,
                FigureUrl: "images/imageQ31S2.png"
            }
        ]
    },
    {
        QuestionId: 71,
        QuestionText: "咳・くしゃみで痛みますか？",
        FigureUrl: "images/imageQ71.png",
        LastQuestionId: 1,
        Selections: [
            {
                SelectionId: 1,
                SelectionText: "はい",
                AnswerCode: "YES",
                NextQuetionId: 72,
                FigureUrl: "images/imageQ71S1.png"
            },
            {
                SelectionId: 2,
                SelectionText: "いいえ",
                AnswerCode: "No",
                NextQuetionId: 73,
                FigureUrl: "images/imageQ71S2.png"
            }
        ]
    }
];

exports.QAlist = function(id){
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].QuestionId == id)
            break;
    }   
    return list[i];
}

exports.NextQAId = function (Qid, SelectionId){
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].QuestionId == Qid)
            break;
    }   
    return list[i].Selections[SelectionId].NextQuetionId;
}

exports.LastQAId = function (Qid) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].QuestionId == Qid)
            break;
    }
    return list[i].LastQuestionId; /*undefindになってしまう。*/
}
