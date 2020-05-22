# Tip Top Tournament Client

## Introduction

### What is Tip Top Tournament?

Tip Top tournament is a tournament manager service to organize table tennis tournaments. This repository is the interface for the manager and the participant.

### How to use this application?

For the usage of this application you don't need to install anything. You can acces it trough your browser (we suggest Google Chrome) [here](https://sopra-fs20-group-01-client.herokuapp.com/home).
There are two parts to this application a manager who controls and overviews a table tennis tournament and participants who play against each other.

### What is a manager?

A manager is an organizer of a tournament and he can invite participants to join his tournament via a unique tournament-code and he can setup a tournament according to these settings. The application will then calculate a time plan for the organizer and a bracket for the players.
The manager can:

- Define the location via Google Maps
- Select the Start time
- Select the amount of available tables
- Select the expected amount of players
- How long each game and break in between should take

### What is a participant?

A participant is a player with a license number that joins a tournament and competes against others to come out on top and win the tournament!

### What is a license number? And why do I need one?

We use license numbers as a result of working together with Swiss Table Tennis. They require all registered players to have a license. So if you are already licensed by them, you can just sign up for an account and login with your license number and your stats will already be available. Our idea was that you could simply play your tournament through our application and we would send the results to Swiss Table Tennis.

### Will my scores be sent directly to Swiss Table Tennis?

Sadly this idea is out of scope, for the reason that we are only working with data exports and not with the data directly. That's why we cannot send the results of the tournament to them yet, but in case this might change later we insist on using the license numbers.

## Technologies

### styled-components

[styled-components](https://www.styled-components.com/docs)
It removes the mapping between components and styles (i.e. external css files). This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it

### react-bootstrap

Because we wanted to display our app properly on mobile devices, we had to make it responsive. Therefore we used the thrid party library react-bootstrap. For more information check the documentation [here](https://react-bootstrap.github.io/).

### react-select

To fill out forms easily we used react-select.
Check out the documentation [here](https://react-select.com/home).

### react-router-dom

To create an application with multiple pages we used [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start).

### react-tree-graph

We used this to create and display brackets. Documentation can be found [here](https://github.com/jpb12/react-tree-graph)

### react-geocode, react-google-maps & react-google-autocomplete

To set locations with Google Maps we used those librarys. Documentation can be found here: [react-google-maps](https://tomchentw.github.io/react-google-maps/), [react-gecode](https://github.com/shukerullah/react-geocode), [react-google-autocomplete](https://github.com/ErrorPro/react-google-autocomplete)

## High-level components

```
App.js
└─────AppRouter.js
        |─────ManagerView
        |       |─────ManagerNavBar.js
        |       |─────CreateTournament.js
        |       └─────<Pages...>
        │─────ManagerViewExtended
        |       |─────ManagerNavBarExtended.js
        |       └─────<Pages...>
        |─────ParticipantView
        |       |─────ParticipantNavBar.js
        |       └─────<Pages...>
        └─────<Pages...>
```

This figure simply represents how our app is composed.<br>
Main components:

- The [AppRouter.js](https://github.com/sopra-fs-20-group-1/Client/blob/master/src/components/shared/routers/AppRouter.js) component is responsible for routing to the right page. Because the application has multiple different pages and different views, it is also splitted up in multiple components like ManagerView and ParticipantView. This modularity allows to have different navigationbars for different views.

- The [ManagerNavBar.js](https://github.com/sopra-fs-20-group-1/Client/blob/master/src/components/shared/ManagerNavBar.js) component is one of three navigationbars. Note that there are pages like login or regristration which don't have one. The purpose of the navigation is to easily switch between different pages, without re-rendering after switching.

- The [CreateTournament.js](https://github.com/sopra-fs-20-group-1/Client/blob/master/src/components/tournament/CreateTournament.js) component is a very important one for the manager. It is actually just a page where one can create and specify a tournament. In this page there is a Google Maps component, where one can set the location. As one can see it is a child of the ManagerView, so just the manager can create tournaments.

## Contribution

For your local development environment you'll need Node.js >= 8.10. You can download it [here](https://nodejs.org). All other dependencies we use like react-bootstrap, react-select, react-geocode etc. including React gets installed with:

### `npm install`

This has to be done before starting the application for the first time library (only once).

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. To use this app fully while developing you also need to start the server. You can get the information about the server [here](https://github.com/sopra-fs-20-group-1/Server).

The page will reload if you make edits.<br>
You will also see any lint errors in the console (use Google Chrome!).

### `npm run test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If you want to directly deploy on our heroku server you just need to push your commits on this repository. GitHub Actions will automatically deploy it on herkou. If you want to fork this repository and want to deploy it anywhere else see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Illustrations

### Manager

After succesfully register and login as a manager you can create a tournament when you click on create tournament. It will redirect you to the tournament creation page. After filling out the form you can see your tournaments in the menu. Clicking on the tournament will redirect you to the tournament overview.

### Participant

After successfully register and login with your licensenumber or your generated licensnumber you are directed to a page where you can enter the tournament code. After joining the tournament you can see the information about the tournament. Also you can see the playerlist, the bracket and the leaderboard. If a game is defined for you you can enter the score after the match.

## Roadmap

If you want to extend this app there are some ideas:

- implement a push notification service for a participant when a game is determined.

- implement an artificial announcer. Nowdays in the tournament hall every match is announced through speakers. If a game is determined the announcer service will call out the game like Siri.

## License

Copyright (c) 2020 Fabio Sisi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
