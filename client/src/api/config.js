import users from './users';
import news from './news';
import activities from './activities';

const config = {
  ...users,
  ...news,
  ...activities
};

export default config;