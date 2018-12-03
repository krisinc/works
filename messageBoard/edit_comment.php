<?php
    include_once('./check_login.php');
    include_once('./conn.php');
    include_once('./utils.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" type="text/css" href="./style.css">
    <title>編輯留言</title>
</head>
<body>
    <?php include_once('./templates/navbar.php') ?>

    <div class="container">
        <form class="form" action="./handle_edit_comment.php" method="POST">
            <div class="form__row">
                <h2>編輯留言</h2>
            </div>
            <input type="hidden" value="<? echo $_GET['id'] ?>" name="id">
            <div class="form__row">
                內容: 
                <div>
                    <textarea clas='form__content' name='content' rows='10' cols='50'></textarea>
                </div>
            </div>
            <?php if($user) { ?>
                <input class="btn" type="submit" value="提交">   
            <?php } else { ?>
                <div>請先註冊或登入</div>
            <?php } ?>
        </form>
    </div>
</body>
</html>