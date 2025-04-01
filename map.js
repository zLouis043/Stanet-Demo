var map = L.map('map').setView([56.505, -0.09], 13);
var fg = new L.featureGroup();
const filePath = "csv/locations.csv";
const delimiter = ",";

var tile_layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

  
parseCSV(filePath, delimiter)
    .then((data) => {
        var latlng;
        data.forEach((row) => {
        if(row['Y'] && row['X']){
            latlng = new L.latLng(Number(row['Y']), Number(row['X']));
            var marker = new L.Marker(latlng).addTo(fg);
        }
        });

        map.setView(latlng,9);
    })
    .catch((error) => {
        console.error("Errore durante il parsing del CSV:", error);
    }
);

fg.addTo(map);

async function parseCSV(filePath, delimiter) {
    try {
        const response = await fetch(filePath);
        const csvData = await response.text();
        const rows = csvData.split('\n');
        const labels = rows[0].split(delimiter);
        const parsedData = [];
        for (let i = 1; i < rows.length; i++) {
        const columns = rows[i].split(delimiter);
        const rowObject = {};
    
        for (let j = 0; j < columns.length; j++) {
            rowObject[labels[j]] = columns[j];
        }
    
        parsedData.push(rowObject);
        }
    
        return parsedData;
    } catch (error) {
        console.error("Errore durante il parsing del CSV:", error);
    }
}