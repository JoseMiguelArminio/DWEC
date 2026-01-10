const map = L.map('map').setView([40.4168, -3.7038], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let points = [];
let totalDistance = 0;
let polyline = L.polyline([], { color: 'blue' }).addTo(map);

document.getElementById('addPoint').addEventListener('click', async () => {
  const lat = parseFloat(document.getElementById('lat').value);
  const lon = parseFloat(document.getElementById('lon').value);
  if (isNaN(lat) || isNaN(lon)) return alert('Introduce coordenadas válidas');

  const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
  const data = await res.json();
  const address = data.display_name || 'Dirección desconocida';

  const point = { lat, lon, address };
  points.push(point);

  const li = document.createElement('li');
  li.textContent = `${lat.toFixed(5)}, ${lon.toFixed(5)} - ${address}`;
  document.getElementById('pointsList').appendChild(li);

  L.marker([lat, lon]).addTo(map).bindPopup(address);

  polyline.setLatLngs(points.map(p => [p.lat, p.lon]));

  if (points.length > 1) {
    const prev = points[points.length - 2];
    totalDistance += haversine(prev.lat, prev.lon, lat, lon);
  }
  document.getElementById('totalDistance').textContent = totalDistance.toFixed(2);
});

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}
