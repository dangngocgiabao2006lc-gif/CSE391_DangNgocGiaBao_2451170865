const images = [
    "https://picsum.photos/id/1015/700/400",
    "https://picsum.photos/id/1016/700/400",
    "https://picsum.photos/id/1025/700/400",
    "https://picsum.photos/id/1035/700/400",
    "https://picsum.photos/id/1043/700/400",
    "https://picsum.photos/id/1050/700/400",
    "https://picsum.photos/id/1060/700/400",
    "https://picsum.photos/id/1074/700/400",
    "https://picsum.photos/id/1084/700/400"
];

let currentIndex = 0;
let slideshow = null;

const galleryImage = document.querySelector("#galleryImage");
const modal = document.querySelector("#imageModal");
const modalImage = document.querySelector("#modalImage");
const thumbnailList = document.querySelector("#thumbnailList");

const commandPalette = document.querySelector("#commandPalette");
const commandInput = document.querySelector("#commandInput");
const commandList = document.querySelector("#commandList");

const commands = [
    { name: "Next Image", action: nextImage },
    { name: "Previous Image", action: prevImage },
    { name: "Start Slideshow", action: startSlideshow },
    { name: "Stop Slideshow", action: stopSlideshow }
];

function renderImage() {
    galleryImage.src = images[currentIndex];

    document.querySelectorAll(".thumbnail-list img").forEach((img, index) => {
        img.classList.toggle("active", index === currentIndex);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    renderImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    renderImage();
}

function startSlideshow() {
    if (slideshow) return;

    slideshow = setInterval(() => {
        nextImage();
    }, 2000);
}

function stopSlideshow() {
    clearInterval(slideshow);
    slideshow = null;
}

function toggleSlideshow() {
    if (slideshow) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

function renderThumbnails() {
    images.forEach((src, index) => {
        const img = document.createElement("img");

        img.src = src;
        img.alt = `Thumbnail ${index + 1}`;

        img.addEventListener("click", () => {
            currentIndex = index;
            renderImage();
        });

        thumbnailList.appendChild(img);
    });
}

function openModal() {
    modal.classList.remove("hidden");
    modalImage.src = images[currentIndex];
}

function closeModal() {
    modal.classList.add("hidden");
}

function renderCommands(filteredCommands = commands) {
    commandList.innerHTML = "";

    filteredCommands.forEach(command => {
        const li = document.createElement("li");

        li.textContent = command.name;

        li.addEventListener("click", () => {
            command.action();
            closePalette();
        });

        commandList.appendChild(li);
    });
}

function openPalette() {
    commandPalette.classList.remove("hidden");
    commandInput.focus();
    renderCommands();
}

function closePalette() {
    commandPalette.classList.add("hidden");
    commandInput.value = "";
}

commandInput.addEventListener("input", () => {
    const keyword = commandInput.value.toLowerCase();

    const filtered = commands.filter(command =>
        command.name.toLowerCase().includes(keyword)
    );

    renderCommands(filtered);
});

document.querySelector("#nextBtn").addEventListener("click", nextImage);
document.querySelector("#prevBtn").addEventListener("click", prevImage);

galleryImage.addEventListener("click", openModal);

modal.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openPalette();
    }

    if (e.key === "ArrowRight") {
        nextImage();
    }

    if (e.key === "ArrowLeft") {
        prevImage();
    }

    if (e.key === " ") {
        e.preventDefault();
        toggleSlideshow();
    }

    if (e.key === "Escape") {
        closeModal();
        closePalette();
    }

    const number = parseInt(e.key);

    if (number >= 1 && number <= 9) {
        currentIndex = number - 1;
        renderImage();
    }
});

renderThumbnails();
renderImage();