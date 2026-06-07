const ui = {

    renderUsers(users){

        const list =
        document.getElementById("userList");

        list.innerHTML="";

        users.forEach(user=>{

            list.innerHTML += `
                <div>
                    <b>${user.name}</b>
                    <p>${user.email}</p>

                    <button onclick="editUser(${user.id})">
                    Edit
                    </button>

                    <button onclick="deleteUser(${user.id})">
                    Delete
                    </button>
                </div>
                <hr>
            `;
        });
    },

    showLoading(){
        document.getElementById("loading")
        .innerHTML="Loading...";
    },

    hideLoading(){
        document.getElementById("loading")
        .innerHTML="";
    },

    showError(msg){
        alert(msg);
    },

    showSuccess(msg){
        alert(msg);
    }
};