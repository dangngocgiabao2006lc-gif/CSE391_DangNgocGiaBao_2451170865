const gallery =
document.getElementById("gallery");

const loading =
document.getElementById("loading");

let page = 1;
let isLoading = false;

async function loadPhotos(){

    if(isLoading) return;

    isLoading = true;

    loading.style.display = "block";

    try{

        const res = await fetch(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        const photos = await res.json();

        photos.forEach(photo=>{

            const img =
            document.createElement("img");

            img.dataset.src = photo.download_url;

            img.alt = photo.author;

            lazyObserver.observe(img);

            img.addEventListener("click",()=>{

                document.getElementById(
                "lightbox"
                ).style.display="flex";

                document.getElementById(
                "lightbox-img"
                ).src = photo.download_url;
            });

            gallery.appendChild(img);
        });

        page++;

    }catch(error){

        alert(error.message);

    }finally{

        loading.style.display = "none";
        isLoading = false;
    }
}

const lazyObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const img = entry.target;

            img.src = img.dataset.src;

            lazyObserver.unobserve(img);
        }
    });

});

const scrollObserver =
new IntersectionObserver(entries=>{

    if(entries[0].isIntersecting){

        loadPhotos();
    }

});

scrollObserver.observe(
document.getElementById("load-trigger")
);

document
.getElementById("close")
.addEventListener("click",()=>{

    document.getElementById(
    "lightbox"
    ).style.display="none";
});

loadPhotos();