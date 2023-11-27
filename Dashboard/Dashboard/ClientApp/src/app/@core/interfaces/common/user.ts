import { LeaderBoard } from './leaderboard';
import { UserActivity } from './userActivity';
import { UserGroupMembership } from './userGroupMembership';
import { UserSetting } from './userSetting';

export interface UserDto {
  userId: string;
  userDisplayName: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}
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

  //constructor();
  //constructor(userInfo: UserInfo);
  //constructor(userInfo?: UserInfo) {
  //  this.userDisplayName = userInfo.userDisplayName;
  //  this.userName = userInfo.userName;
  //  this.password = userInfo.password;
  //  this.firstName = userInfo.firstName;
  //  this.lastName = userInfo.lastName;
  //  this.email = userInfo.email;
  //  this.phoneNumber = userInfo.phoneNumber;
  //}
}
