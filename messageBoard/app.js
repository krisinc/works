$(document).ready(function() {
    $('.comments').on('click', '.delete-comment', function(e) {
        if(!confirm('是否確定要刪除？')) return
        const id = $(e.target).attr('data-id')
        $.ajax({
            method: "POST",
            url: "./delete_comment.php",
            data: {
                id
            }
        }).done(function(response) {
            const msg = JSON.parse(response)
            const comment = $(e.target).parent().parent().parent()
            if(comment.length === 0) {
                comment.hide(200)            
            } else {
                comment.hide(200)
            }
        }).fail(function() {
            alert('delete fail!')
        })
    })
    $('form').submit(function(e) {
        e.preventDefault();
        const content = $(e.target).find('textarea[name=content]').val()
        const parentId = $(e.target).find('input[name=parent_id]').val()
        $(e.target).parent().find('textarea[name=content]').val('');
        $.ajax({
            method: "POST",
            url: "./add_comment.php",
            data: {
                content: content,
                parent_id: parentId,
            }
        }).done(function(response) {
            const res = JSON.parse(response)
            if(res.result === 'success') {
                $('.comments').prepend(`
                    <div class="comment">
                        <div class="comment__top">
                            <div class="comment__author">作者：${escapeHtml(res.nickname)}</div>
                    
                            <div class='functional'>
                                <div class='delete-comment btn dele__btn' data-id='${res.id}'>X</div>
                                <div class='edit-comment'>
                                    <form method='GET' action='./edit_comment.php'>
                                        <input type='hidden' name='id' value='${res.id}'>
                                        <input class='btn dele__btn' type='submit' value='EDIT'>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="comment__time">發言時間：${res.created_at}</div>
                        <div class="comment__content">${escapeHtml(content)}</div>
                        <div class="sub-comments">
                            <div class="add-sub-comment">
                                <form action="./add_comment.php" method="POST">
                                    <div class="form__row">
                                        <h3>新增留言</h3>
                                    </div>
                                    <input type="hidden" value="${res.id}" name="parent_id">
                                    <div class="form__row">
                                        內容: 
                                        <div>
                                            <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='10' cols='50'></textarea>
                                        </div>
                                    </div>
                                        <input class="btn" type="submit" value="提交">
                                </form>
                            </div>
                        </div>
                    </div>
                `)
            }
            if(res.result === 'sub success') {
                $('.sub-comments').prepend(`
                    <div class="sub-comment">
                        <div class="sub-comment__top">
                            <div class="sub-comment__author">作者：${escapeHtml(res.nickname)}</div>

                            <div class="functional">
                                <div class='delete-comment btn dele__btn--sub' data-id='$id'>X</div>
                                <div class='edit-comment'>
                                    <form method='GET' action='./edit_comment.php'>
                                        <input type='hidden' name='id' value='${res.id}'>
                                        <input class='btn dele__btn--sub' type='submit' value='EDIT'>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="sub-comment__time">發言時間：${res.created_at}</div>
                        <div class="sub-comment__content">${escapeHtml(content)}</div>
                    </div>
                `)
            }
        }).fail(function() {
            alert('你的留言跟公投一樣失敗。')
        })
    })
})
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}