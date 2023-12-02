export interface UserGoal {
    // Don't need goalId for now..
    userId: string,
    startTime: number,
    endTime: number,
    targetPoints: number,
    currentPoints: number,
}