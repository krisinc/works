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


        $stmt = $conn->prepare("INSERT INTO krisinc_comments (username, content, parent_id) VALUES (?, ?, ?)");
        $stmt->bind_param('ssi', $user, $content, $parent_id);

        if($stmt->execute()) {
            $last_id = $conn->insert_id;
            $sql = "SELECT * from krisinc_comments as c LEFT JOIN krisinc_users as u ON c.username = u.username WHERE c.id = ? ";
            $stmtAjax = $conn->prepare($sql);
            $stmtAjax->bind_param('i', $last_id);
            $is_success = $stmtAjax->execute();
            $result = $stmtAjax->get_result();
            if($is_success) {
                if($parent_id === "0"){
                    $row = $result->fetch_assoc();
                    echo json_encode(array(
                        'result' => 'success',
                        'nickname' => $row['nickname'],
                        'created_at' => $row['created_at'],
                        'id' => $last_id
                    ));
                }else {
                    $row = $result->fetch_assoc();
                    echo json_encode(array(
                        'result' => 'sub success',
                        'nickname' => $row['nickname'],
                        'created_at' => $row['created_at'],
                        'id' => $last_id,
                        'parent_id' => $row['parent_id']
                    ));
                }
            }
        } else {
            echo json_encode(array(
                'result' => 'failure',
                'message' => 'failed to add comment'
            ));
        }
    } else {
        echo json_encode(array(
            'result' => 'failure',
            'message' => 'failed to add comment'
        ));
    }
    
?>