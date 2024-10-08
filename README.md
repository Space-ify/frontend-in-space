# Spaceify

## Currently Hosted here:
https://spaceify.jaydenpyles.dev/

## You need to grab a spotify share URL to display songs on the app
<img width="609" alt="Screenshot 2024-07-18 at 3 18 46 PM" src="https://github.com/user-attachments/assets/ada67dc0-7abe-49b4-9a47-aefd1519676d">



## **Built in 24 hours** - Auburn Hackathon 2024 Submission - Hackathon Theme: Space

### React web app hosted on AWS EC2 that allows users to dynamically populate 3d rendering of playlists as a solar system. Song metadata determines factors of the planet like size, speed, and rotation. Users can click on planets to hear 30 second snippets of the song that planet represents. Employs computer vision to map album art palette to planet color gradient. Utilizes Docker to host the backend, frontend, and NGINX. 

### This repository is one of three. To see the others go to the "Space-ify" organization

## Architechture 

<img width="900" alt="SpaceifyWorkflow" src="https://github.com/user-attachments/assets/38fc6c58-6642-48e7-b8d6-1da0e7989339">

### **Tools Used:**
* `React` For rendering jsx elements and creating UI
* `Npm` Package management and frontend server management
* `ReactThree.js` Rendering and manipulating geometric objects in React
* `Docker` Containerization of frontend, backend, and NGINX
* `SKLearn` Machine learning appliation used to target prominent colors used to alter image data
* `AWS EC2` Cloud hosting of web applciation
* `GoDaddy` Hosting for our domain
* `NGINX` Reverse proxy manager to route traffice from port 80 to docker containers
* `MultiThreading` Ran multiple threads for concurrent execution (downloading images is IO limited)
* `FastAPI` Python api for querying spotify api and returning data to the frontend
* `Spotify` We used their API to recieve meta data about playlists for planet manipulation

## Loading Playlist
![Loading](https://github.com/Space-ify/frontend-in-space/assets/107063397/5ea6dba6-67d8-43fb-98c4-fecaa5b9366b)
## Planet Motion
![PlanetSpin](https://github.com/Space-ify/frontend-in-space/assets/107063397/ba1087f1-4d48-4152-a76d-ce16109b5bc6)
## Planet Selection (no audio in gif, but tracks are being played)
![MusicSelect](https://github.com/Space-ify/frontend-in-space/assets/107063397/0238ac7f-69f2-49e3-a390-5fb8fccf889b)
## Dynamic Input (100 songs)
![100planets](https://github.com/Space-ify/frontend-in-space/assets/107063397/694a9241-6974-422b-ab05-a9f27338ce91)

## Data Flow
* Our frontend makes a fetch to the API
``` Python
const res = await fetch(
        "http://localhost:8000/api/spotify/playlist",
        options
      );
```
* Our API is hosted on a Uvicorn webserver, which accepts the HTTP request and routes it to the correct path to execute all of the logic to return the requested and modified data. the webserver plans to submit back a json object of the songs transformed into planet data.

* First, we have to use our Spotify developer account to retrieve an authorization token that allows for access to the spotify API
```Python
    def generate_authorization_token(self) -> str:
        """ """
        url = "https://accounts.spotify.com/api/token"
        payload = {
            "grant_type": "client_credentials",
            "client_id": self.CLIENT_ID,
            "client_secret": self.CLIENT_SECRET,
        }
        headers = {"Content-Type": "application/x-www-form-urlencoded"}

        try:
            response = requests.post(url, data=payload, headers=headers)
            response.raise_for_status()  # Raise an exception if there's an HTTP error
            self.access_token = response.json().get("access_token")
            return self.access_token
        except requests.exceptions.RequestException as e:
            print(f"Error making request: {e}")
            return None
```
* After we are authenticated, we can query Spotify and retrieve back the playlist data
``` Python
@spotify_router.post("/api/spotify/playlist")
async def get_playlist(request: Request):
    spotify.auth.generate_authorization_token()

    res = await request.json()
    assert res.get("url")

    url = res.get("url")

    ID = re.search(r"/playlist/([^?]+)", url.get("query"))
    if ID:
        ID = ID.group(1)

    bearer_token = f"Bearer {spotify.auth.access_token}"
    headers = {"Authorization": bearer_token}

    playlist = Endpoints.PLAYLIST.value
    playlist = f"{playlist.PLAYLIST.value}/{ID}"

    res = requests.get(playlist, headers=headers)

    try:
        t = Transformer(res.json())
        return {"items": t.tracklist}
    except:
        return {"message": "Error parsing tracks."}
```
* We then transform that data and map it to a planet, along with other transformations not shown
``` Python
      track_as_dict = {
            "id": i,
            "size": size,
            "speed": speed,
            "name": name,
            "artists": artist_name,
            "textureMap": textureMap,
            "rotationSpeed": (random.randrange(15000, 25000) / 1000000),
            "offset": random.randint(0, 100),
            "xRadius": (i * 4) + 6,
            "is_explicit": is_explicit,
            "population": population,
            "preview": preview,
            "image_url": album_img,
            "album": album,
        }
```

## Inspiration
We saw a project that procedurally generated a topographical map based on bit data from Spotify. Instead, we thought a song representing each celestial body would be more theme-driven. 

We have a React frontend and a Python FastAPI backend. The frontend sends the playlist URL to the backend via fetch. Then the backend makes a call to Spotify API. The data is returned to the backend where the data is processed and organized into a planet data set with characteristics unique to the Spotify metadata. We use ReactThree.js to render 3d models in the react app. We hosted the microservices for our web app on AWS in an Ubuntu runner via Docker containers. NGINX was used to reverse proxy to route traffic from port 80 into our webapp container. We acquired a domain from GoDaddy to route to our public IP for the EC2 container. 


