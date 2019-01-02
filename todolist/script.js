var todos = []

var id = 1

function setData() {
    window.localStorage.setItem('todoApp', JSON.stringify(todos))
}

function render(todolist) {
    $('.todo_list').empty()
    for(let i=0; i<todolist.length;i++) {
        $('.todo_list').append(`
            <li class="list-group-item justify-content-between align-items-center todo ${todolist[i].isCompleted ? 'completed' : ''}" data-id="${todolist[i].id}" style="display: flex">
                <input type="hidden" data-completed="${todolist[i].isCompleted}" />
                ${todolist[i].text}
                <div>
                    ${todolist[i].isCompleted ? '<span class="badge badge-success badge-pill p-2 mr-4">已完成</span>' : ''}
                    <div class="btn ${todolist[i].isCompleted ? 'btn-outline-secondary' : 'btn-outline-success'} btn_mark">
                        ${todolist[i].isCompleted ? '未完成' : '已完成'}
                    </div>
                    <div class="btn btn-outline-danger btn_remove">刪除</div>
                </div>
            </li>
        `)
    }
}

$(document).ready((e) => {
    const todoData = window.localStorage.getItem('todoApp')
    if(todoData) {
        todos = JSON.parse(todoData)
        render(todos)
        id = todos[todos.length - 1].id + 1
    }


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
        const state = element.parent().parent().find('input[type=hidden]').attr('data-completed')
        const id = Number(element.parent().parent().attr('data-id'))
        element.toggleClass('btn-outline-success').toggleClass('btn-outline-secondary')

        if(state === 'false') {
            element.parent().parent().find('input[type=hidden]').attr('data-completed', 'true')
            element.parent().parent().addClass('completed')
            element.parent().prepend('<span class="badge badge-success badge-pill p-2 mr-4">已完成</span>')
            element.text('未完成')
        } else {
            element.parent().parent().find('input[type=hidden]').attr('data-completed', 'false')
            element.parent().parent().removeClass('completed')
            element.parent().find('.badge').remove()
            element.text('已完成')
            
        }

        todos = todos.map(todo => {
            if(todo.id !== id) return todo
            return {
                ...todo,
                isCompleted: !todo.isCompleted
            }
        })
        setData()
    })

    $('.todo_list').on('click', '.btn_remove', (e) => {
        const id = $(e.target).parent().parent().attr('data-id')
        todos = todos.filter(todo => todo.id !== Number(id))
        $(e.target).parent().parent().remove()
        setData()

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


    function addTodo(text) {
        todos.push({
            text,
            isCompleted: false,
            id
        })
        setData()
        render(todos)
        $('.add_todo').val('');
        id++
    }
    function getTodoHTML(id, isCompleted, text) {
        return `
            <li class="list-group-item justify-content-between align-items-center todo" data-id="${id}" style="display: flex">
                <input type="hidden" data-completed="${isCompleted}" />
                ${text}
                <div>
                    <div class="btn btn-outline-success btn_mark">已完成</div>
                    <div class="btn btn-outline-danger btn_remove">刪除</div>
                </div>
            </li>`
    }
})