<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <title>註冊</title>
</head>
<body>
    <?php include_once('./templates/navbar.php') ?>
    <div class="container container--small">
        <form class="form" action="./handle_register.php" method="POST">
            <div class="form__title">
                <h2>註冊</h2>
            </div>
            <br>
            <div class="form__row">
                USERNAME: <input name="username" type="text">
            </div>
            <div class="form__row">
                PASSWORD: <input name="password" type="text">
            </div>
            <div class="form__row">
                NICKNAME: <input name="nickname" type="text">
            </div>
            <input class="btn" type="submit" value="提交">
        </form>
    </div>

</body>
</html>