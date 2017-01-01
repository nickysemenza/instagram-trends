const InstagramPosts = require('instagram-screen-scrape').InstagramPosts;
const config = require('./config');
const plotly = require('plotly')(config.plotly_username, config.plotly_api_key);

const streamOfPosts = new InstagramPosts({
  username: config.instagram_username,
});


const dates = [];
const likes = [];

streamOfPosts.on('data', (post) => {
  const time = new Date(post.time * 1000);
  if (post.time > config.timestamp_after) {
    dates.unshift(time.toLocaleDateString());
    likes.unshift(post.likes);
  }
});
streamOfPosts.on('end', () => {
  const data = [
    {
      x: dates,
      y: likes,
      type: 'scatter',
    },
  ];
  const graphOptions = { filename: 'date-ax es', fileopt: 'overwrite' };
  plotly.plot(data, graphOptions, (err, msg) => {
    console.log(msg);
  });
});
