import { LeaderBoard } from './leaderboard';
import { UserActivity } from './userActivity';
import { UserGroupMembership } from './userGroupMembership';
import { UserSetting } from './userSetting';


export class User {
  userId: string;
  userDisplayName: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  leaderBoards: Array<LeaderBoard>;
  userActivities: Array<UserActivity>;
  userGroupMemberships: Array<UserGroupMembership>;
  userSettings: Array<UserSetting>;
}
