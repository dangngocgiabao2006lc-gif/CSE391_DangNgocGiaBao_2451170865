const api = {

    baseURL:
    "https://jsonplaceholder.typicode.com",

    async getUsers(){

        const res =
        await fetch(`${this.baseURL}/users`);

        if(!res.ok){
            throw new Error("Không tải được users");
        }

        return await res.json();
    },

    async createUser(data){

        const res = await fetch(
            `${this.baseURL}/users`,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
        );

        return await res.json();
    },

    async updateUser(id,data){

        const res = await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
        );

        return await res.json();
    },

    async deleteUser(id){

        await fetch(
            `${this.baseURL}/users/${id}`,
            {
                method:"DELETE"
            }
        );
    }
};