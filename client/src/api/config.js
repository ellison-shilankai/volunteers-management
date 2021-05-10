import users from './users';
import news from './news';
import activities from './activities';
import organizes from './organizes';
import userAct from './userAct';
import userOrg from './userOrg';

const config = {
  ...users,
  ...news,
  ...activities,
  ...organizes,
  ...userAct,
  ...userOrg
};

export default config;