const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherDiv = document.getElementById("weather");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const historyDiv = document.getElementById("history");

loadHistory();

searchBtn.addEventListener("click", () => {
    getWeather(cityInput.value);
});

async function getWeather(city){

    try{
        loadingDiv.innerHTML="⏳ Đang tải...";
        errorDiv.innerHTML="";
        weatherDiv.innerHTML="";

        const res = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if(!res.ok){
            throw new Error("Không tìm thấy thành phố");
        }

        const data = await res.json();

        weatherDiv.innerHTML = `
            <h3>${city}</h3>
            <p>Nhiệt độ: ${data.current_condition[0].temp_C}°C</p>
            <p>Độ ẩm: ${data.current_condition[0].humidity}%</p>
            <p>${data.current_condition[0].weatherDesc[0].value}</p>
        `;

        saveHistory(city);

    }catch(error){
        errorDiv.innerHTML = error.message;
    }finally{
        loadingDiv.innerHTML="";
    }
}

function saveHistory(city){

    let history =
        JSON.parse(localStorage.getItem("cities")) || [];

    history = history.filter(c => c !== city);

    history.unshift(city);

    history = history.slice(0,5);

    localStorage.setItem(
        "cities",
        JSON.stringify(history)
    );

    loadHistory();
}

function loadHistory(){

    const history =
        JSON.parse(localStorage.getItem("cities")) || [];

    historyDiv.innerHTML="";

    history.forEach(city => {

        const btn=document.createElement("button");

        btn.textContent=city;
        btn.className="history-btn";

        btn.onclick=()=>getWeather(city);

        historyDiv.appendChild(btn);
    });
}