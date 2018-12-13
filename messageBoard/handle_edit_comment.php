<?
    require_once('conn.php');
    include_once('check_login.php');
    require_once('utils.php');

    if(
        isset($_POST['content']) &&
        !empty($_POST['content'])
    ) {
        $content = $_POST['content'];
        $id = $_POST['id'];

        $stmt = $conn->prepare("UPDATE krisinc_comments SET content=? WHERE id=? AND username=?");
        $stmt->bind_param('sis', $content, $id, $user);
        if($stmt->execute()) {
            $stmtEdit = $conn->prepare("SELECT * FROM krisinc_comments WHERE id=?");
            $stmtEdit->bind_param('i', $id);
            $stmtEdit->execute();
            $arr = $stmtEdit->get_result()->fetch_assoc();
            echo json_encode($arr);
            $stmtEdit->close();
        } else {
            printMessage($conn->error, $_SERVER["HTTP_REFERER"]);
        }
    } else {
        printMessage('請輸入內容', $_SERVER["HTTP_REFERER"]);
    }
?>