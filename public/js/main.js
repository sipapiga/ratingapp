$(document).ready(function () {
    const deleteMsgBtn = document.querySelectorAll('.deleteBtn');
    const editMsgBtn = document.querySelectorAll('.editBtn');
    const getDropdownItem = document.querySelectorAll('.dropdown-category');

    for (let category of getDropdownItem) {
        if (category != null) {
            let name = category.innerHTML;

            category.addEventListener('click', function () {
                console.log(name);
                window.location.href = 'http://localhost:3000/restaurants/category/' + name;
            });
        }
    }
    editMessage();
    deleteMessage();

    function editMessage() {
        for (let editbtn of editMsgBtn) {
            if (editbtn != null) {
                let editId = editbtn.getAttribute('id');
                editbtn.addEventListener('click', function () {
                    console.log('click');
                    $('#editModal').modal('show');
                    axios({
                        method: 'get',
                        url: 'http://localhost:3000/admin/' + editId + '/edit'
                    })
                        .then(res => appendData(res))
                        .catch(err => console.error(err));
                    document.getElementById('editForm').action = `/admin/edit/${editId}`;
                });
            }
        }
    }
    function appendData(data) {
        console.log(data.data[0]);
        document.getElementById('name').value = data.data[0].name;
        document.getElementById('location').value = data.data[0].location;
        document.getElementById('price').value = data.data[0].price;
        document.getElementById('phonenumber').value = data.data[0].phonenumber;
        document.getElementById('category').value = data.data[0].category;;

    }

    function deleteMessage() {
        for (let deletebtn of deleteMsgBtn) {
            if (deletebtn != null) {
                deletebtn.addEventListener('click', function () {
                    let msgId = deletebtn.getAttribute('id');
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.value) {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            axios({
                                method: 'delete',
                                url: 'http://localhost:3000/admin/delete/' + msgId
                            })
                                .then(res => console.log(res))
                                .catch(err => console.error(err));
                        }
                    })
                    setTimeout(function () {
                        window.location.href = "http://localhost:3000/admin"
                    }, 1500);
                });
            }
        }
    }


});