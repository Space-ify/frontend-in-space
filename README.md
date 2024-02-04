<img width="900" alt="workflow" src="https://github.com/mfkimbell/dummmmmy/assets/107063397/f2ff542c-1003-4931-8704-ebc08bee67fd">

Website URL: ```http://space.spaceify.co/```

![spacify-gif](https://github.com/mfkimbell/dummmmmy/assets/107063397/86b924ac-0f93-43d8-ab9e-08e822567781)

### **Tools Used:**
* `React` For rendering jsx elements and creating UI
* `Npm` Package management and frontend server management
* `ReactThree.js` Rendering and manipulating geometric objects in React
* `Docker` Containerization of frontend, backend, and NGINX
* `SKLearn` Machine learning appliation used to target prominent colors used to alter image data
* `AWS EC2` Cloud hosting of web applciation
* `GoDaddy` Hosting for our domain
* `NGINX` Reverse proxy manager to route traffice from port 80 to docker containers
* `MultiThreading` Ran multiple threads for processing large amounts of image data
* `FastAPI` Python api for querying spotify api and returning data to the frontend
* `Spotify` We used their API to recieve meta data about playlists for planet manipulation

## Inspiration
We saw a project that procedurally generated a topographical map based on bit data from Spotify. Instead, we thought a song representing each celestial body would be more theme-driven. 
## What it does
It allows the user to input a Spotify playlist URL to dynamically create a galaxy based on the songs' metadata. Based on the song, each planet varies in speed, color, size, texture, and rotational speed. Songs that are more popular produce larger planets for example.
## How we built it
We have a React frontend and a Python FastAPI backend. The frontend sends the playlist URL to the backend via fetch. Then the backend makes a call to Spotify API. The data is returned to the backend where the data is processed and organized into a planet data set with characteristics unique to the Spotify metadata. We use ReactThree.js to render 3d models in the react app. We hosted the microservices for our web app on AWS in an Ubuntu runner via Docker containers. NGINX was used to reverse proxy to route traffic from port 80 into our webapp container. We acquired a domain from GoDaddy to route to our public IP for the EC2 container. 
## Challenges we ran into
React rendering issues, it can get very complicated with states not doing what you want. We had issues with merge conflicts trying to divide and conquer tasks. Obviously its a marathon, coding when tired leads to easy mistakes. I spent 45 minutes debugging only to realize I wrote "emtpy" instead of "empty". 
## Accomplishments that we're proud of
Josh did an amazing job implementing a very math heavy AI generation of planet textures from the spotify album art. We learned a ton about react and were super happy with the visual. Overally, it was amazing to see everything come together and learn so much in such a short period of time. 
## What we learned
Communication is key, task delegation is extremely important and no single one of us could have accomplished this on our own. 
## What's next for Spaceify
I would really like the AWS containers to be built with Terraform in the future. 
