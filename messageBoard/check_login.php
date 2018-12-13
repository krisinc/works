<?php
    session_start(); // 1. 可以從 cookie 裡面拿到 PHPSESSID
    include_once('./conn.php');
    include_once('./utils.php');
    // 2. 拿 PHPSESSID 去查
    /*
        {
            '7f91c62383b2c9d6d921bf6ff8c0b992': {
                username: $username
            }
        }
    */
    $user = $_SESSION['username'];
?>