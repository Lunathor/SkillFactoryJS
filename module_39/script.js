
const API_ENDPOINTS = {
    dogs: 'https://dog.ceo/api/breeds/image/random/20',
    cats: 'https://api.thecatapi.com/v1/images/search?limit=10',
    photos: 'https://jsonplaceholder.typicode.com/photos?_start=0&_limit=20',

    fallback: 'https://picsum.photos/v2/list?page=1&limit=20'
};


const galleryContainer = document.getElementById('gallery');
const loaderElement = document.getElementById('loader');
const errorElement = document.getElementById('error');
const loadDogsButton = document.getElementById('loadDogs');
const loadCatsButton = document.getElementById('loadCats');
const loadPhotosButton = document.getElementById('loadPhotos');
const loadFallbackButton = document.getElementById('loadFallback');


let isLoading = false;


function showLoader() {
    isLoading = true;
    loaderElement.classList.add('loader--visible');
    hideError();
    disableButtons(true);
}


function hideLoader() {
    isLoading = false;
    loaderElement.classList.remove('loader--visible');
    disableButtons(false);
}


function showError(message) {
    errorElement.textContent = message;
    errorElement.classList.add('error--visible');
}


function hideError() {
    errorElement.classList.remove('error--visible');
}


function disableButtons(disabled) {
    const buttons = [loadDogsButton, loadCatsButton, loadPhotosButton, loadFallbackButton];
    buttons.forEach(button => {
        button.disabled = disabled;
    });
}


function clearGallery() {
    galleryContainer.innerHTML = '';
}


function createImageElement(imageData, imageUrl, title = '') {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery__item';
    
    const image = document.createElement('img');
    image.className = 'gallery__image';
    image.src = imageUrl;
    image.alt = title || 'Изображение из галереи';
    image.loading = 'lazy';
    
    const info = document.createElement('div');
    info.className = 'gallery__info';
    
    const titleElement = document.createElement('h3');
    titleElement.className = 'gallery__title';
    titleElement.textContent = title || 'Без названия';
    
    const urlElement = document.createElement('p');
    urlElement.className = 'gallery__url';
    urlElement.textContent = imageUrl;
    
    info.appendChild(titleElement);
    info.appendChild(urlElement);
    galleryItem.appendChild(image);
    galleryItem.appendChild(info);
    
    return galleryItem;
}


function processDogsData(data) {
    if (!data || !data.message || !Array.isArray(data.message)) {
        throw new Error('Неверный формат данных от API собак');
    }
    
    return data.message.map((imageUrl, index) => ({
        url: imageUrl,
        title: `Собачка ${index + 1}`
    }));
}


function processCatsData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Неверный формат данных от API кошек');
    }
    
    return data.map((cat, index) => ({
        url: cat.url,
        title: `Котик ${index + 1}`
    }));
}


function processPhotosData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Неверный формат данных от API фотографий');
    }
    
    return data.map(photo => ({
        url: photo.url,
        title: photo.title || 'Фотография'
    }));
}


function processFallbackData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Неверный формат данных от fallback API');
    }
    
    return data.map((item, index) => ({
        url: item.download_url,
        title: `Изображение ${index + 1}`
    }));
}


async function fetchWithFallback(url, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}


async function loadImages(apiType) {
    if (isLoading) return;
    
    try {
        showLoader();
        clearGallery();
        
        let data;
        let processedData;
        
        try {

            data = await fetchWithFallback(API_ENDPOINTS[apiType]);
        } catch (primaryError) {
            console.warn(`Основной API недоступен (${apiType}):`, primaryError.message);
            

            try {
                console.log('Пробуем fallback API...');
                data = await fetchWithFallback(API_ENDPOINTS.fallback);
                apiType = 'fallback';
            } catch (fallbackError) {
                console.error('Fallback API также недоступен:', fallbackError.message);
                throw new Error(`Не удалось загрузить изображения. Проверьте подключение к интернету.`);
            }
        }
        

        switch (apiType) {
            case 'dogs':
                processedData = processDogsData(data);
                break;
            case 'cats':
                processedData = processCatsData(data);
                break;
            case 'photos':
                processedData = processPhotosData(data);
                break;
            case 'fallback':
                processedData = processFallbackData(data);
                break;
            default:
                throw new Error('Неизвестный тип API');
        }
        

        processedData.forEach(imageData => {
            const imageElement = createImageElement(imageData, imageData.url, imageData.title);
            galleryContainer.appendChild(imageElement);
        });
        
        hideLoader();
        

        if (apiType === 'fallback') {
            showError('Загружены изображения из резервного источника. Некоторые API могут быть недоступны.');
        }
        
    } catch (error) {
        hideLoader();
        console.error('Ошибка при загрузке изображений:', error);
        showError(`Произошла ошибка при загрузке изображений: ${error.message}`);
    }
}


loadDogsButton.addEventListener('click', (event) => {
    event.preventDefault();
    loadImages('dogs');
});

loadCatsButton.addEventListener('click', (event) => {
    event.preventDefault();
    loadImages('cats');
});

loadPhotosButton.addEventListener('click', (event) => {
    event.preventDefault();
    loadImages('photos');
});

loadFallbackButton.addEventListener('click', (event) => {
    event.preventDefault();
    loadImages('fallback');
});


document.addEventListener('DOMContentLoaded', () => {
    console.log('Галерея фотографий загружена и готова к работе');
    

    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'welcome-message';
    welcomeMessage.innerHTML = `
        <h2>Добро пожаловать в галерею!</h2>
        <p>Выберите один из источников изображений выше, чтобы начать просмотр.</p>
    `;
    galleryContainer.appendChild(welcomeMessage);
});


document.addEventListener('error', (event) => {
    if (event.target.tagName === 'IMG') {
        console.warn('Ошибка загрузки изображения:', event.target.src);
        event.target.style.display = 'none';
    }
}, true);
