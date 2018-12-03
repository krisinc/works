<?
    require_once('conn.php');
    include_once('check_login.php');
    require_once('utils.php');

    if(
        isset($_POST['content']) &&
        !empty($_POST['content'])
    ) {
        $content = $_POST['content'];
        $parent_id = $_POST['parent_id'];

        if($parent_id === '0') {
            $stmt = $conn->prepare("INSERT INTO krisinc_comments (username, content, parent_id) VALUES (?, ?, ?)");
            $stmt->bind_param('ssi', $user, $content, $parent_id);

            if($stmt->execute()) {
                $sql = "SELECT c.id, c.content, c.username, c.created_at, u.nickname 
                from krisinc_comments as c 
                LEFT JOIN krisinc_users as u ON c.username = u.username 
                WHERE c.parent_id = 0 
                ORDER BY created_at DESC
                ";
                $stmtAjax = $conn->prepare($sql);
                $is_success = $stmtAjax->execute();
                $result = $stmtAjax->get_result();
                if($is_success) {
                    $row = $result->fetch_assoc();
                    echo json_encode(array(
                        'result' => 'success',
                        'nickname' => $row['nickname'],
                        'created_at' => $row['created_at'],
                        'id' => $row['id']
                    ));
                }
            } else {
                echo json_encode(array(
                    'result' => 'failure',
                    'message' => 'failed to add comment'
                ));
            }
        } else {
            $stmt = $conn->prepare("INSERT INTO krisinc_comments (username, content, parent_id) VALUES (?, ?, ?)");
            $stmt->bind_param('ssi', $user, $content, $parent_id);

            if($stmt->execute()) {
                $sql = "SELECT c.id, c.content, c.username, c.created_at, u.nickname 
                from krisinc_comments as c 
                LEFT JOIN krisinc_users as u ON c.username = u.username 
                WHERE c.parent_id = 0 
                ORDER BY created_at DESC
                ";
                $stmtAjax = $conn->prepare($sql);
                $is_success = $stmtAjax->execute();
                $result = $stmtAjax->get_result();
                if($is_success) {
                    $row = $result->fetch_assoc();
                    echo json_encode(array(
                        'result' => 'sub success',
                        'nickname' => $row['nickname'],
                        'created_at' => $row['created_at'],
                        'id' => $row['id']
                    ));
                }
            } else {
                echo json_encode(array(
                    'result' => 'failure',
                    'message' => 'failed to add comment'
                ));
            }
        }
    } else {
        echo json_encode(array(
            'result' => 'failure',
            'message' => 'failed to add comment'
        ));
    }
    
?>