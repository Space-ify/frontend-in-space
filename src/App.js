import React, { Suspense, useState, useEffect } from "react"; // Import useState here
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import sunTexture from "./textures/sun.jpg";
import "./styles.css";
import dummyPlanetData from "./planetData";

import Header from "./components/Header/Header";
import Bottomer from "./components/Bottomer/Bottomer";

import tx1 from "./textures/1.jpg";
import tx2 from "./textures/2.jpg";
import tx3 from "./textures/3.jpg";
import tx4 from "./textures/4.jpg";
import tx5 from "./textures/5.jpg";
import tx6 from "./textures/6.jpg";

const totalPlanets = 6;

const random = (a, b) => a + Math.random() * b;
const randomInt = (a, b) => Math.floor(random(a, b));
const randomColor = () =>
  `rgb(${randomInt(80, 50)}, ${randomInt(80, 50)}, ${randomInt(80, 50)})`;

const shuffle = (a) => {
  const temp = a.slice(0);
  for (let i = temp.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [temp[i], temp[j]] = [temp[j], temp[i]];
  }
  return temp;
};

const textures = shuffle([tx1, tx2, tx3, tx4, tx5, tx6]);

// Declare the spotifyLink state variable and its setter function

//const [planetData, setPlanetData] = useState("");

export default function App() {
  const [planetData, setPlanetData] = useState([]);
  //const [spotifyLink, setSpotifyLink] = useState("");
  console.log("planetData", planetData);

  useEffect(() => {
    console.log("Planet data has changed:", planetData);

    // Any additional logic you want to run when planetData changes
  }, [planetData]); // Dependency array with planetData means this effect runs when planetData changes

  const handleSearch = async (spotifyLink) => {
    console.log("handle search called");
    console.log("spotifyURL: ", spotifyLink);

    try {
      const response = await fetch(`http://localhost:8000/spotify/test`);
      const json = await response.json();
      console.log("response: ", json);
      setPlanetData(json.items);
      console.log("State Planet Variable", { planetData });

      // Process your response data here
    } catch (error) {
      console.error("Error fetching data: ", error);
      // Handle error here
    }
  };

  if (planetData) {
    console.log("planet case");
    console.log("planetData", planetData);
    return (
      <>
        <Header></Header>

        <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
          <Suspense fallback={null}>
            <Sun />
            {console.log("dummy before map: ", dummyPlanetData)}
            {console.log("before map: ", planetData)}
            {planetData.map((planet) => (
              <Planet planet={planet} key={planet.id} />
            ))}
            <Lights />
            <OrbitControls />
          </Suspense>
        </Canvas>

        <Bottomer handleSearch={handleSearch}></Bottomer>
      </>
    );
  } else {
    console.log("empty case");
    return (
      <>
        <Header></Header>

        <Canvas camera={{ position: [0, 20, 25], fov: 45 }}>
          <Suspense fallback={null}>
            <Sun />

            <Lights />
            <OrbitControls />
          </Suspense>
        </Canvas>

        <Bottomer handleSearch={handleSearch}></Bottomer>
      </>
    );
  }
}

function Sun() {
  const texture = useLoader(THREE.TextureLoader, sunTexture);
  return (
    <mesh>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
function Planet({
  planet: {
    color,
    xRadius,
    zRadius,
    size,
    speed,
    offset,
    rotationSpeed,
    textureMap,
  },
}) {
  const planetRef = React.useRef();
  const texture = useLoader(THREE.TextureLoader, tx1);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + offset;
    const x = xRadius * Math.sin(t);
    const z = zRadius * Math.cos(t);
    planetRef.current.position.x = x;
    planetRef.current.position.z = z;
    planetRef.current.rotation.y += rotationSpeed;
  });

  return (
    <>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <Ecliptic xRadius={xRadius} zRadius={zRadius} />
    </>
  );
}

function Lights() {
  return (
    <>
      <ambientLight />
      <pointLight position={[0, 0, 0]} />
    </>
  );
}

// function Ecliptic({ xRadius = 1, zRadius = 1 }) {
//   const points = [];
//   for (let index = 0; index < 64; index++) {
//     const angle = (index / 64) * 2 * Math.PI;
//     const x = xRadius * Math.cos(angle);
//     const z = zRadius * Math.sin(angle);
//     points.push(new THREE.Vector3(x, 0, z));
//   }

//   points.push(points[0]);

//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <line geometry={lineGeometry}>
//       <lineBasicMaterial attach="material" color="#BFBBDA" linewidth={10} />
//     </line>
//   );
// }

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
  // Using only one radius parameter for a circle
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle); // Use xRadius for both x and z
    const z = zRadius * Math.sin(angle); // Use xRadius for both x and z
    points.push(new THREE.Vector3(x, 0, z));
  }

  points.push(points[0]); // Close the loop

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#393e46" linewidth={10} />
    </line>
  );
}
