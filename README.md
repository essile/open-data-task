# Open data task
A single page application that collects sensor data from an open API, saves the data to a database through another interface and visualizes the collected data.

### Tech stack used:
- React.js (including axios, react-bootstrap, react-router, history, bizcharts...) 
- Node.js (including express, cors, aws-sdk...)
- DynamoDB locally (Docker image) to store the data collected

### How does it work:

The data gets collected from an open API, but you need a token in order to get it.
On the MVP version of the application you can login with an email that already has a token. (However, not possible on the demo version to make it easier to use.)

The data gets fetched only when you are logged in.

After login you can see 
- the newest/current data from four sensors, that gets automatically updated every hour
- buttons to see individual data from each of the four sensors
- a line chart with all the data collected
- a table with all the data collected, and you can also see the row data in a bar chart by clicking the button on the row

The token gets saved to your local storage, so that you do not need to login again and you still get the newest data.

### Demo version

You can view the application here: https://thirsty-neumann-ced1d1.netlify.com/

The published version has working login details hardcoded to the login form. The database was removed (for financial reasons). Instead of sending the new collected data to a DynamoDB table (which is the source of the data history) the chart shows the data collected every hour between February 11th and 13th.

### Future development ideas

- Signup so that you can get your individual token
- At the moment the application shows only the data the user has collected. The backend could also collect and store all the data so that in case the user did not collect the data it would get stored anyway.
- You should be able to filter the data in different ways
- Ways to show the data history nicely even if it grows a lot (in addition to the filter f.ex. horizontal scrolling, bundling the data somehow)
- Ways to compare the data (f.ex. what was the sensor1 value at noon today compared to the value last week)
- Deployment in docker containers (separate backend and frontend)

#### What is the data?

The api does not tell but I believe it is some kind of weather data :) 
(f.ex. tide, humidity, temperature...)
