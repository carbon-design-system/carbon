# Getting Started with Create React App

This project helps to bootstrap your application with IBM Carbon Design framework. The application
has 2 sample pages, and those can be accessed over ```/``` and ```/repopage``` respectively.
It's easy for someone to spin up an app with everything you need to start building with Carbon.

## Prerequisites: 

Please create a personal github token and add it to your .env file as given below. The repopage
uses apollo-client library to fetch repositories and display it on the carbon datatable. This is
only needed, when you want 'REPOPAGE' to be loaded with datatable.

```dotenv
REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN=xxx
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

