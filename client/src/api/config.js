import users from './users';
import news from './news';
import activities from './activities';
import organizes from './organizes';

const config = {
  ...users,
  ...news,
  ...activities,
  ...organizes,
};

export default config;