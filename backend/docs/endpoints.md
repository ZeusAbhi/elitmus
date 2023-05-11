# Endpoints Documentation

## Public Endpoints

### Hello Route (GET /hello)
- Sends back ` {hello: "world"} ` to ensure that the backend is working!

### Register User (POST /users/register)
- Register a new user
- Req Body - 
```json
{
  "username": {username},
  "password": {password}
}
```

- Response - 
```json
{
  token: {token},
  username: {username}
}
```
### Login (POST /users/login)
- Login a user
- Req Body - 
```json
{
  "username": {username},
  "password": {password}
}
```

- Response - 
```json
{
  token: {token},
  username: {username}
}
```
### Get Progress  (GET /users/progress)
- Get the current status for the puzzles user has attempted
- Req Headers - 
```json
{
  authorization: Bearer {token}
}
```
- Response - 
```json
[{
  id: number,
  userId: number,
  puzzleNum: number,
  success: boolean,
  startTime: Date,
  endTime: Date | null,
  totalTime: number | null,
  createdAt: Date
}, {...}, {...}, ...]
```
### Update Progress (POST /users/progress)
- Update route for updating user progress ( mark a puzzle as started or submit an attempt to a puzzle )
- Req Headers - 
```json
{
  authorization: Bearer {token}
}
```
- Req Body - 
```json
{
 puzzleNum: {puzzle number which is being updated },
 status: "answer" | "start",
 answer?: { user's answer if the status is answer }
}
```
The status represents if the user is starting or answering a puzzle

- Response - 
```json
{
  success: {boolean}
}
```
or 
```json
{
  error: {error}
}
```
### Leaderboard (GET /leaderboard)
- Gets the top ten users for each puzzle
- Response - 
```json
{
  1: [{
    username: string,
    userId: number,
    totalTime: number
  }, {...}, {...}],
  2: [{...}, {...}, ...],
  .
  .
  .
}
```
Here 1,2 and the other keys are the puzzle numbers for each array of top 10 users

## Admin Routes
### Get all user progress (GET /admin/progress)
- Query Params - 
```json
{
  userId= {optional}
  puzzleNum={optional}
  page={optional}
}
```
- Req Headers - 
```json
{
  authorization: Bearer {token}
}
```
- Response - 
```json
{ 
  page: {page from query params or 1},
  progress: [{
    id: number,
    userId: number,
    puzzleNum: number,
    success: boolean,
    startTime: Date,
    endTime: Date | null,
    totalTime: number | null,
    createdAt: Date
  }, {...}, {...}, ...],
  count: { Total Number of Pages }
}
```
