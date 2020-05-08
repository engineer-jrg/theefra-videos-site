console.log("hello YouTube-Api-Client!");

const urlApi = 'http://localhost:4000/videos';
const filterInput = document.querySelector('#filter');

let allVideos = [];

document.querySelector('form').addEventListener('submit', (e) => e.preventDefault());

filterInput.addEventListener('keydown', (event) => {
    const searchWord = new RegExp(filterInput.value, 'gi');
    if (allVideos) {
        allVideos.forEach((video) => {
            if (video.snippet.title.match(searchWord)) {
                document.getElementById(video.id.videoId).classList.remove('hide-video');
            } else {
                document.getElementById(video.id.videoId).classList.add('hide-video');
            }
        })
    }
})

const createVideoElement = (video) => {
    // tarjeta
    const videoElement = document.createElement('div');
    videoElement.className = 'card video-card';
    videoElement.id = video.id.videoId;

    // imagen de la tarjeta
    const imgElement = document.createElement('img');
    if (video.snippet.thumbnails.maxres) {
        imgElement.src = video.snippet.thumbnails.maxres.url;
    } else if (video.snippet.thumbnails.high) {
        imgElement.src = video.snippet.thumbnails.high.url;
    } else {
        imgElement.src = video.snippet.thumbnails.default.url;
    }
    imgElement.className = 'card-img-top';

    // cuerpo dela tarjeta
    const bodyElemet = document.createElement('div');
    bodyElemet.className = 'card-body';

    // titulo
    const headerBodyElement = document.createElement('h5');
    headerBodyElement.className = 'card-title';
    headerBodyElement.innerHTML = video.snippet.title;

    // descripcion
    const descriptionElement = document.createElement('p');
    descriptionElement.className = 'card-text text-truncate';
    descriptionElement.innerHTML = video.snippet.description

    // link
    const linkElement = document.createElement('a');
    linkElement.className = 'btn btn-primary';
    linkElement.innerHTML = 'ver el video';
    linkElement.target = '_blank';
    linkElement.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;

    videoElement.appendChild(imgElement);

    bodyElemet.appendChild(headerBodyElement);
    bodyElemet.appendChild(descriptionElement);
    bodyElemet.appendChild(linkElement);

    videoElement.appendChild(bodyElemet);
    document.getElementById('videos-container').appendChild(videoElement);
}

fetch(urlApi)
    .then((response) => response.json())
    .then((videos) => {
        allVideos = videos;
        videos.forEach(video => createVideoElement(video));
    });
