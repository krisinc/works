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
    <script
        src="https://code.jquery.com/jquery-1.12.4.min.js"
        integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
        crossorigin="anonymous"></script>
    <script src="./app.js"></script>
    <link rel="stylesheet" type="text/css" href="./style.css">
    <title>留言板</title>
</head>
<body>
    <?php include_once('./templates/navbar.php') ?>
    <?php
        $page = 1;
        if(isset($_GET['page']) && !empty($_GET['page'])) {
            $page = (int) $_GET['page'];
        }
        $size = 3;
        $start = $size * ($page - 1);
        $sql = "SELECT c.id, c.content, c.username, c.created_at, u.nickname 
            from krisinc_comments as c 
            LEFT JOIN krisinc_users as u ON c.username = u.username 
            WHERE c.parent_id = 0 
            ORDER BY created_at DESC
            LIMIT ?, ?            
            ";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param('ii', $start, $size);
        $is_success = $stmt->execute();
        $result = $stmt->get_result();
    ?>
    <div class="container">
        <form class="form" action="./add_comment.php" method="POST">
            <div class="form__row">
                <h2>新增留言</h2>
            </div>
            <input type="hidden" value="0" name="parent_id">
            <div class="form__row">
                內容: 
                <div>
                    <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='10' cols='50'></textarea>
                </div>
            </div>
            <?php if($user) { ?>
                <input class="btn" type="submit" value="提交">   
            <?php } else { ?>
                <div>請先註冊或登入</div>
            <?php } ?>
        </form>
        <?php
            $count_sql = "SELECT count(*) as count from krisinc_comments where parent_id = 0";
            $stmt_count = $conn->prepare($count_sql);
            $is_count_success = $stmt_count->execute();
            $count_result = $stmt_count->get_result();
            if ($is_count_success && $count_result->num_rows > 0) {
                $count = $count_result->fetch_assoc()['count'];
                $total_page = ceil($count / $size);
                echo '<div class="page">';
                for ($i=1; $i<=$total_page; $i++) {
                    echo "<a href='./index.php?page=$i'>$i</a>";
                }
                echo '</div>';
            }
        ?>
        <div class="comments">
            <?php
                if($is_success) {
                    while ($row = $result->fetch_assoc()) {
            ?>

            <div class="comment">
                <div class="comment__top">
                    <div class="comment__author">作者：<?= escape($row['nickname']) ?></div>

                    <div class='functional'>
                        <?
                            if ($user === $row["username"]) {
                                echo renderDeleteBtn($row['id']);
                                echo renderEditBtn($row['id']);
                            }
                        ?>
                    </div>
                </div>
                <div class="comment__time">發言時間：<?= $row['created_at'] ?></div>
                <div class="comment__content"><?= escape($row['content']) ?></div>


                <div class="sub-comments">
                    <?php
                        $parent_id = $row['id'];
                        $sql_sub = "SELECT c.id, c.content, c.username, c.created_at, u.nickname 
                            from krisinc_comments as c 
                            LEFT JOIN krisinc_users as u ON c.username = u.username 
                            WHERE c.parent_id = ? 
                            ORDER BY created_at ASC";
                        $stmt_sub = $conn->prepare($sql_sub);
                        $stmt_sub->bind_param('i', $parent_id);
                        $is_sub_success = $stmt_sub->execute();
                        $result_sub = $stmt_sub->get_result();
        
                        if($is_sub_success) {
                            while ($row_sub = $result_sub->fetch_assoc()) {
                    ?>
                    <div class="sub-comment">
                        <div class="sub-comment__top">
                            <div class="sub-comment__author">作者：<?= escape($row_sub['nickname']) ?></div>

                            <div class="functional">
                                <?
                                    if ($user === $row_sub["username"]) {
                                        echo renderDeleteBtnSub($row_sub['id']);
                                        echo renderEditBtnSub($row_sub['id']);
                                    }
                                ?>
                            </div>
                        </div>
                        <div class="sub-comment__time">發言時間：<?= $row_sub['created_at'] ?></div>
                        <div class="sub-comment__content"><?= escape($row_sub['content']) ?></div>
                    </div>
                    <?php
                            }
                        }
                    ?>
                    <div class="add-sub-comment">
                        <form action="./add_comment.php" method="POST">
                            <div class="form__row">
                                <h3>新增留言</h3>
                            </div>
                            <input type="hidden" value="<?php echo $row['id'] ?>" name="parent_id">
                            <div class="form__row">
                                內容: 
                                <div>
                                    <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='10' cols='50'></textarea>
                                </div>
                            </div>
                            <?php if($user) { ?>
                                <input class="btn" type="submit" value="提交">   
                            <?php } else { ?>
                                <div>請先註冊或登入</div>
                            <?php } ?>
                        </form>
                    </div>
                </div>
            </div>
            <?php
                    }
                }
            ?>
            
        </div>
    </div>
</body>
</html>