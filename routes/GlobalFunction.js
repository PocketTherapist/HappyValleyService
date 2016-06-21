var mailer = require('nodemailer');

exports.MakeTempPassword = function () {
    var tempPass = '';
    for (var i = 0; i < 6; i++) {
        tempPass += String(~~(Math.random() * (9 - 0) + 0));
    }
    return tempPass;
};


exports.SendMailForTempPassword = function (uid, temporaryPassword) {
    /*
    webメールを使う場合
    this.setting = {
        service: 'Gmail',
        ssl: true,
        use_authentication: true,
        auth: {
            user: 'taku.myst55@gmail.com',
            pass: '',
        }
    };
    */
    
    //SMTPの設定
    var setting = {
        //SMTPサーバーを使う場合
        host: 'mail.backtech.tokyo',
        secureConnection: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
            user: 'support',
            pass: 'H@ppyvalley'
        }
    };

        
    var mailContents = '<h1>腰痛アプリの仮パスワードを発行します。</h1><br>' +
                '<p>下記URLより仮パスワードを使ってログインしてください。</p>' +
                '<p>仮パスワード:' + temporaryPassword + '</p>' +
                '<br><p>腰痛アプリURL:https://www.backtech.tokyo</p>'
    
    // SMTPの接続
    var transporter = mailer.createTransport('SMTP', this.setting);
    var mailOptions = {
        /*from: 'taku.myst55@gmail.com',*/
        from: 'support@backtech.tokyo',
        to: uid,
        subject: '腰痛アプリ　パスワード発行',
        html: mailContents
    };
    
    // メールの送信
    transporter.sendMail(mailOptions, function (err, res) {
        if (err) {
            // 送信に失敗したとき
            console.log(err);
        }
        else {
            // 送信に成功したとき
            console.log('Message sent: ' + res.message);
        }
        
        // SMTPの切断
        transporter.close();
        console.log('Send Mail!!');
    });
};