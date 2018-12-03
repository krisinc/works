<?php
    session_start();
    include_once('./conn.php');
    require_once('./utils.php');

    $is_error = false;
    if(
        isset($_POST['username']) &&
        isset($_POST['password']) &&
        isset($_POST['nickname'])
    ) {
        if(
            !empty($_POST['username']) &&
            !empty($_POST['password']) &&
            !empty($_POST['nickname'])
        ) {
            $username = htmlspecialchars($_POST['username'], ENT_QUOTES, 'utf-8');
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $nickname = $_POST['nickname'];

            $stmt = $conn->prepare("INSERT INTO krisinc_users(username, password, nickname) VALUES (?, ?, ?)");
            $stmt->bind_param('sss', $username, $password, $nickname);

            if($stmt->execute()) {
                $_SESSION['username'] = $username;
                printMessage('註冊成功！', './index.php');
            }else {
                printMessage($conn->error, './register.php');
            }

        } else {
            printMessage(' 請輸入帳號、密碼！', './register.php');
        }
    }
?>
