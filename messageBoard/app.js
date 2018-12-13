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
<<<<<<< HEAD
            const subComment = $(e.target).closest('.sub-comment')
            if(subComment.length === 0) {
                $(e.target).closest('.comment').hide(200)           
            } else {
                subComment.hide(200)
=======
            const comment = $(e.target).parent().parent().parent()
            if(comment.length === 0) {
                comment.hide(200)            
            } else {
                comment.hide(200)
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
            }
        }).fail(function() {
            alert('delete fail!')
        })
    })
<<<<<<< HEAD
    $('.container').on('submit', 'form[name="add_comment"]', function(e) {
=======
    $('form').submit(function(e) {
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
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
<<<<<<< HEAD
                                    <form name='edit__form' method='GET'>
=======
                                    <form method='GET' action='./edit_comment.php'>
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
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
<<<<<<< HEAD
                                <form name="add_comment" action="./add_comment.php" method="POST">
=======
                                <form action="./add_comment.php" method="POST">
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
                                    <div class="form__row">
                                        <h3>新增留言</h3>
                                    </div>
                                    <input type="hidden" value="${res.id}" name="parent_id">
                                    <div class="form__row">
                                        內容: 
                                        <div>
<<<<<<< HEAD
                                            <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='6' cols='50'></textarea>
=======
                                            <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='10' cols='50'></textarea>
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
                                        </div>
                                    </div>
                                        <input class="btn" type="submit" value="提交">
                                </form>
                            </div>
                        </div>
                    </div>
                `)
<<<<<<< HEAD
            } else if(res.result === 'sub success') {
                $(e.target).closest('.sub-comments').prepend(`
                    <div class="sub-comment">
                        <div class="sub-comment__top">
                            <div class="sub-comment__author">作者：${escapeHtml(res.nickname)}</div>
                            <div class="functional">
                                <div class='delete-comment btn dele__btn--sub' data-id='${res.id}'>X</div>
                                <div class='edit-comment'>
                                    <form name='edit__form' method='GET'>
=======
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
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
                                        <input type='hidden' name='id' value='${res.id}'>
                                        <input class='btn dele__btn--sub' type='submit' value='EDIT'>
                                    </form>
                                </div>
                            </div>
                        </div>
<<<<<<< HEAD
                        <div class="comment__time sub-comment__time">發言時間：${res.created_at}</div>
                        <div class="comment__content">${escapeHtml(content)}</div>
=======
                        <div class="sub-comment__time">發言時間：${res.created_at}</div>
                        <div class="sub-comment__content">${escapeHtml(content)}</div>
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
                    </div>
                `)
            }
        }).fail(function() {
            alert('你的留言跟公投一樣失敗。')
        })
    })
<<<<<<< HEAD
    $('.container').on('submit', 'form[name="edit__form"]',function(e) {
        e.preventDefault()
        $(e.target).parent().parent().hide()
        $(e.target).parent().parent().parent().parent().find('.comment__content').first().hide()
        const content = $(e.target).parent().parent().parent().parent().find('.comment__content').first().text()
        const id = $(e.target).find('input[name=id]').val()
        const editForm = `
            <form name="edit__comment" class="edit__form" action="./handle_edit_comment.php" method="POST">
                <div class="form__row">
                    <h5>修改留言</h5>
                </div>
                <input type="hidden" value="${id}" name="id">
                <div class="form__row">
                    內容: 
                    <div>
                        <textarea class='form__content' placeholder='說什麼啦！' name='content' rows='3' cols='50'>${content}</textarea>
                    </div>
                </div>
                <input class="btn" type="submit" value="提交">
            </form>
        `
        const sub = $(e.target).parent().parent().parent().parent().find('.comment__time').first()
        $(sub).after(editForm)
    })
    $('.container').on('submit', 'form[name="edit__comment"]',function(e) {
        e.preventDefault()
        const id = $(e.target).parent().find('input[name=id]').val()
        const content = $(e.target).parent().find('textarea[name=content]').val()
        $.ajax({
            method: "POST",
            url: "./handle_edit_comment.php",
            data: {
                id,
                content
            }
        }).done(function(response) {
            const res = JSON.parse(response)
            $(e.target).parents().find('.functional').show()
            $(e.target).parent().find('.comment__content').show().first().text(res.content)
            $(e.target).remove()
        })


    })
=======
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
})
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
<<<<<<< HEAD
}

=======
}
>>>>>>> 99f60cd44e492801c390b486aa805d9748a3adf5
