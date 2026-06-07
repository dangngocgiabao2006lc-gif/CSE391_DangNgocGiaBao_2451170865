const widget1 =
document.getElementById("widget1");

const widget2 =
document.getElementById("widget2");

const widget3 =
document.getElementById("widget3");

const timeText =
document.getElementById("time");

async function loadDashboard(){

    const startTime =
    Date.now();

    widget1.innerHTML="Loading...";
    widget2.innerHTML="Loading...";
    widget3.innerHTML="Loading...";

    const results =
    await Promise.allSettled([

        fetch(
        "https://jsonplaceholder.typicode.com/users"
        ).then(r=>r.json()),

        fetch(
        "https://randomuser.me/api/?results=3"
        ).then(r=>r.json()),

        fetch(
        "https://dog.ceo/api/breeds/image/random/3"
        ).then(r=>r.json())

    ]);

    if(results[0].status==="fulfilled"){

        const users =
        results[0].value;

        widget1.innerHTML = `
        <h3>Users</h3>
        ${users.slice(0,5)
        .map(u=>`<p>${u.name}</p>`)
        .join("")}
        `;

    }else{

        widget1.innerHTML =
        "Lỗi tải Users";
    }

    if(results[1].status==="fulfilled"){

        const users =
        results[1].value.results;

        widget2.innerHTML =
        "<h3>Random Users</h3>";

        users.forEach(user=>{

            widget2.innerHTML += `
            <p>
            ${user.name.first}
            ${user.name.last}
            </p>
            `;
        });

    }else{

        widget2.innerHTML =
        "Lỗi Random User API";
    }

    if(results[2].status==="fulfilled"){

        const dogs =
        results[2].value.message;

        widget3.innerHTML =
        "<h3>Dog Images</h3>";

        dogs.forEach(img=>{

            widget3.innerHTML += `
            <img
            src="${img}"
            width="100"
            >
            `;
        });

    }else{

        widget3.innerHTML =
        "Lỗi Dog API";
    }

    const loadTime =
    Date.now() - startTime;

    timeText.innerHTML =
    `Data loaded in ${loadTime} ms`;
}

document
.getElementById("refreshBtn")
.addEventListener("click",
loadDashboard);

loadDashboard();