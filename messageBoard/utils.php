<?php
    function printMessage($msg, $redirect) {
        echo '<script>';
        echo "alert('" . htmlentities($msg, ENT_QUOTES) . "');";
        echo "window.location = '". $redirect ."';";
        echo '</script>';
    }

    function escape($str) {
        return htmlspecialchars($str, ENT_QUOTES, 'utf-8');
    }


    function setToken($conn, $username) {
        $token = uniqid();
        $sql = "DELETE FROM krisinc_certificate where username = '$username'";
        $conn->query($sql);

        $sql = "INSERT INTO krisinc_certificate(username,  token) VALUES('$username', '$token')";
        $conn->query($sql);
        setcookie("token", $token, time()+3600*24);
    }


    function renderDeleteBtn($id) {
        return "
        <div class='delete-comment btn dele__btn' data-id='$id'>
            X
        </div>
        ";
    }
    function renderDeleteBtnSub($id) {
        return "
        <div class='delete-comment btn dele__btn--sub' data-id='$id'>
            X
        </div>
        ";
    }

    function renderEditBtn($id) {
        return "
        <div class='edit-comment'>
            <form method='GET' action='./edit_comment.php'>
                <input type='hidden' name='id' value='$id'>
                <input class='btn dele__btn' type='submit' value='EDIT'>
            </form>
        </div>
        ";
    }
    function renderEditBtnSub($id) {
        return "
        <div class='edit-comment'>
            <form method='GET' action='./edit_comment.php'>
                <input type='hidden' name='id' value='$id'>
                <input class='btn dele__btn--sub' type='submit' value='EDIT'>
            </form>
        </div>
        ";
    }
?>

