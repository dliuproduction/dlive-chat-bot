const getYoutubeData = require('../helpers/getYoutubeData');
let rxSongRequests = require('../helpers/rxSongRequests');

const run = async ({ message, data, args }) => {
    // Parse song request message
    var link = args[1];
    if (!link) return Promise.resolve(`Please use the format !sr [youtube link]`)
    var regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const videoId = link.match(regex)[1];
    if (!videoId) {
        return Promise.resolve(`Please use a valid youtube link`)
    }
    try {
        let res = await getYoutubeData(videoId)
        const title = res.data.items[0].snippet.title;
        console.log(title);
        console.log(data);
        data = data? data: [];
        const newSong = {id: videoId, title};
        songRequests = [...data, newSong]
        rxSongRequests.next(songRequests)
        return Promise.resolve({msg: `Here is your requested song: ${title}`, songRequests})
    } catch (err) {
        console.log(err);
        return Promise.resolve(`An error occured`)
    }
}

module.exports = {
    "name": "sr",
    "run": run,
    "description": "Add a song request from the youtube link to play.",
    "permissions": {
        "everyone": true
    }
}