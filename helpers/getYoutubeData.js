const axios = require('axios');

module.exports = (videoId  => axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=AIzaSyBgVlIJ9x-P1Wzpgg_giQThuhrPOnzxGTU&part=snippet,contentDetails,statistics,status`))
