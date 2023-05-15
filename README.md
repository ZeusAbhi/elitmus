# Assignment - Puzzle Application

## Problem Statement

You need to design an interactive puzzle that can be solved on an online website.
The aim of the puzzle is to assess the soft skills of its users (eg - eye for detail, perseverance, curiosity, etc.)
The soft skills to be assessed by the puzzle can be chosen by you
The puzzle should incorporate direct or subtle methods of measuring these soft skills

### What do we mean by an Interactive puzzle?
- You must be familiar with the concept of a treasure hunt - a game in which players search for hidden objects by following a trail of clues
- You need to build the same by hiding clues and treasures on the website
- The clues can be simple text, videos, 3D animations, games, links or anything else that your user has to find or solve. Each clue tells your user where to find the next clue. The final clue leads to the treasure.
- You are allowed to send users outside the website you build (eg. a clue can be an instagram post, youtube video etc.)

> * As you develop the puzzle, please keep in mind that it should revolve around a central theme and should be original, not copied from the internet.
> * Note : To ensure accessibility and ease of use for our users, it is mandatory to deploy this interactive puzzle on cloud-hosting websites such as GitHub.io or Netlify. This will enable our users to access and solve the puzzle seamlessly from any device with an internet connection.

## Feature List (Must Have)
 
The Website should contain the following list of features
- Anyone with an email address can create an Id and password to participate in the game
The puzzle must contain
- Minimum 5 clues
- Minimum 2 dead-ends
- Minimum 1 solution 
- All the progress / user data (eg - time taken by each user for every step, solution accuracy, etc.) depending on your puzzle requirements should be stored for every user
- On refreshing, from either browser or website, the puzzle should start from the same step or give the user an option to restart
- A dashboard for the admin where the progress of all the users can be tracked & analyzed

## Additional Requirements
 
These requirements are not mandatory but nice to have
- User analytics (eg - time taken by each user for every step, solution accuracy, etc.) depending on your puzzle should be stored and shown in the admin dashboard
- Data analysis using different graphs or tables
- User Leaderboard

# Progress 

## Features Implemented
[x] MySQL DB and schemas

[x] Auth and User schemas

[x] Basics

[x] Login Page

[x] Home Page

[x] Dashboard Page
- List of puzzles and start button

[x] Leaderboard

[x] Puzzles

[x] Admin panel

[x] Animations

## Features possible to add with some more time
[ ] A way to add new puzzles (similar to [This](https://github.com/lohit244/naps-website) project of mine)

[ ] Tracking and analytics for the user answers at a per-puzzle level

[ ] Using something like node-mailer to verify the email and also implement `forgot password` funtionality

and maybe some others...

# Info for the submission -

- Hosting link - [Frontend Here](https://elitmus-zeta.vercel.app) and [Backend here](https://elitmus-production.up.railway.app)

- Admin ID & password
    - username: admin
    - password: password

## Soft skills tested and the logic behind them.
- Puzzle 01
    - Makes the player look through a big piece of text to find characters that stick out.
    - Tests their attention to detail.

<br/>

- Puzzle 02
    - Forces the player to make a tough decision.
    - Tests their leadership and how they treat others when the finger is pointed at them.

<br/>

- Puzzle 03
    - Tests the player's ability to think of edge cases through a simple programming problem.

<br/>

- Puzzle 04
    - Tests how well the player can remember/recall information.
    - Also tests their attentiveness as the information being asked is not highlighted in any way and is at the bottom of the index page.

<br/>

- Puzzle 05
    - I wanted this one to be a harder version of the previous problems, so this again tests the player's attention to detail.
    - But this time, the flag is hidden in the page's source code, forcing the player to think outside of the box.
