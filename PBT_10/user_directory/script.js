let users = [];
let editingId = null;

const form =
document.getElementById("userForm");

const searchInput =
document.getElementById("searchInput");

loadUsers();

async function loadUsers(){

    try{

        ui.showLoading();

        users = await api.getUsers();

        ui.renderUsers(users);

    }catch(error){

        ui.showError(error.message);

    }finally{

        ui.hideLoading();
    }
}

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const name =
    document.getElementById("name").value;

    const email =
    document.getElementById("email").value;

    const userData = {
        name,
        email
    };

    try{

        if(editingId){

            const updated =
            await api.updateUser(
                editingId,
                userData
            );

            users = users.map(user =>
                user.id === editingId
                ? updated
                : user
            );

            editingId = null;

            ui.showSuccess("Cập nhật thành công");

        }else{

            const newUser =
            await api.createUser(userData);

            newUser.id = Date.now();

            users.unshift(newUser);

            ui.showSuccess("Thêm thành công");
        }

        ui.renderUsers(users);

        form.reset();

    }catch(error){

        ui.showError(error.message);
    }
});

function editUser(id){

    const user =
    users.find(u => u.id === id);

    document.getElementById("name")
    .value = user.name;

    document.getElementById("email")
    .value = user.email;

    editingId = id;
}

async function deleteUser(id){

    const confirmDelete =
    confirm("Bạn có chắc muốn xóa?");

    if(!confirmDelete) return;

    try{

        await api.deleteUser(id);

        users = users.filter(
            user => user.id !== id
        );

        ui.renderUsers(users);

        ui.showSuccess("Đã xóa");

    }catch(error){

        ui.showError(error.message);
    }
}

searchInput.addEventListener("input",()=>{

    const keyword =
    searchInput.value.toLowerCase();

    const filtered =
    users.filter(user =>

        user.name
        .toLowerCase()
        .includes(keyword)

        ||

        user.email
        .toLowerCase()
        .includes(keyword)
    );

    ui.renderUsers(filtered);
});