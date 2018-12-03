<?php
    session_start(); // 1. 產生 session id 放到 cookie
    include_once('./conn.php');
    require_once('./utils.php');

    if(
        isset($_POST['username']) &&
        isset($_POST['password']) &&
        !empty($_POST['username']) &&
        !empty($_POST['password'])
    ) {
        $username = $_POST['username'];
        $password = $_POST['password'];

        $stmt = $conn->prepare("SELECT * from krisinc_users where username=?");
        $stmt->bind_param('s', $username);
        if(!$stmt->execute()) {
            echo $conn->error;
            exit();
        }
        $result = $stmt->get_result();
        if($result->num_rows <= 0) {
            printMessage('帳號或密碼錯誤', './login.php');
            exit();
        }

        $row = $result->fetch_assoc();
        if(password_verify($password, $row['password'])) {
            // 2. $username 放到記憶體裡面去
            /*
                {
                    '7f91c62383b2c9d6d921bf6ff8c0b992': {
                        username: $username
                    }
                }
            */
            $_SESSION['username'] = $username;
            printMessage('登入成功！', './index.php');
        }else {
            printMessage('帳號或密碼錯誤', './login.php');
            exit();
        }

    } else {
        printMessage(' 請輸入帳號、密碼！', './login.php');
    }
?>
