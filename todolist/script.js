$(document).ready((e) => {
    $('.add_todo').keydown(function(e) {
        if (e.key === 'Enter') {
            addTodo(e.target.value);
        }
    })
    $('.btn_add').click(function(e){
        addTodo($('.add_todo').val())
    })


    $('.todo_list').on('click', '.btn_mark', (e)=> {
        const element = $(e.target)
        const markToComplete = !element.parent().parent().hasClass('completed')
        element.toggleClass('btn-outline-success').toggleClass('btn-outline-secondary')
        element.text(markToComplete ? '未完成' : '已完成')
        element.parent().parent().toggleClass('completed')
        if(markToComplete) {
            element.parent().prepend('<span class="badge badge-success badge-pill p-2 mr-4">已完成<span>')
        } else {
            element.parent().find('.badge').remove()
        }
    })

    $('.todo_list').on('click', '.btn_remove', (e) => {
        $(e.target).parent().parent().remove()
    })

    $('.filter_all').click(function() {
        $('.filter').removeClass('active')
        $(this).addClass('active')
        $('.todo').show()
    })

    $('.filter_uncomplete').click(function() {
        $('.filter').removeClass('active')
        $(this).addClass('active')
        $('.todo').show()
        $('.completed').hide()
    })
    $('.filter_completed').click(function() {
        $('.filter').removeClass('active')
        $(this).addClass('active')
        $('.todo').hide()
        $('.completed').show()
    })


    function addTodo(value) {
        const newTodo = getTodoHTML(value);
        $('.add_todo').val('');
        $('.todo_list').append(newTodo);
    }
    function getTodoHTML(value) {
        return `
            <li class="list-group-item justify-content-between align-items-center todo" style="display: flex">
                ${value}
                <div>
                    <div class="btn btn-outline-success btn_mark">已完成</div>
                    <div class="btn btn-outline-danger btn_remove">刪除</div>
                </div>
            </li>`
    }
})