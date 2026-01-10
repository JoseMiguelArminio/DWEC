const dropZone = document.getElementById('drop-zone');
const preview = document.getElementById('preview');
let images = [];

dropZone.addEventListener('dragover', e => e.preventDefault());
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            images.push({ name: file.name, data: reader.result });
            const img = document.createElement('img');
            img.src = reader.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

document.getElementById('process').addEventListener('click', () => {
    const watermark = document.getElementById('watermark').value;
    const maxWidth = parseInt(document.getElementById('maxWidth').value);
    const format = document.getElementById('format').value;
    const downloads = document.getElementById('downloads');
    downloads.innerHTML = '';

    images.forEach(imgObj => {
        const img = new Image();
        img.src = imgObj.data;
        img.onload = () => {
            const ratio = img.width / img.height;
            const width = Math.min(img.width, maxWidth);
            const height = width / ratio;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, width, height);
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.fillText(watermark, 10, height - 10);

            const a = document.createElement('a');
            a.href = canvas.toDataURL(format);
            a.download = `editada-${imgObj.name}`;
            a.textContent = `Descargar ${imgObj.name}`;
            a.style.display = 'block';
            downloads.appendChild(a);
        };
    });
});
