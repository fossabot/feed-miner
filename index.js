
require('dotenv').config();

const graph = require('./lib/graph');
const log = require('./lib/log');

let process = graph.getListFriend();
const now = new Date();
process.then((users) => {
  users.forEach((user) => {
    log.info(user);
    process = process.then(() => graph.loadFeed(user.id, user.name))
      .then((feeds) => {
        feeds.forEach((feed) => {
          const that = new Date(feed.created_time);
          if (that.getDate() === now.getDate()
                              && that.getMonth() === now.getMonth()
                              && that.getFullYear() !== now.getFullYear()
                              && feed.id.match(new RegExp(`^${user.id}`))
          ) {
            log.info(user.name, `https://www.facebook.com/${feed.id}`);
          }
        });
      });
  });
});
