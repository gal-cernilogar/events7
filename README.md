# Events7

The app was made with Vue3 using SFC's, TypeScript and the
Composition API, Vite as the build tool, Pinia for state
management and Google Cloud Firestore for its database.

## How to build and run the application:

Assuming Node.js and Vue3 are preinstalled:

1. Install the dependencies in the project directory by running:

   npm install

   command in the terminal.

2. Build the application by running:

   npm run build

   command.

3. Run the build by running:

   npm run preview

   command or visit a temporary demo on [Events7](https://gal-cernilogar.github.io/).

## Assumptions made:

1. Event ID does not need to be larger than a 3 digit number so it is limited for layout purpose.

2. Data has to be stored only in the cloud and is inaccessible without a connection.

3. From UX perspective, because of the at-a-glance nature of dashboards and comparative and small
   amount of data per event definition, viewing would be more efficient in a single global view,
   rather than separate local views for each event that would require additional actions.
