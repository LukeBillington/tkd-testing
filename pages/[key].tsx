import styled from "@emotion/styled";
import {
  faCircleCheck,
  faEraser,
  faShareFromSquare,
  faArrowLeft,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { ButtonGroup } from "../shared/styles";

const Spots = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 4rem 4rem 4rem 4rem 1fr;
  grid-template-rows: 4rem 4rem 4rem 4rem;
  grid-template-areas: ". . . . . ." ". . three four . ." ". one . . two ." ". . . . . .";
  column-gap: 1rem;
  row-gap: 1rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const Spot = styled.button<{ active: boolean; area: string }>`
  grid-area: ${(props) => props.area};
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => (props.active ? "#EE6055" : "black")};
  color: white;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const AllSpots = styled.button`
  width: 100%;
`;

const Home = () => {
  const router = useRouter();
  const { key } = router.query;

  const [spots, setSpots] = useState<[boolean, boolean, boolean, boolean]>([
    false,
    false,
    false,
    false,
  ]);

  const apiRoute = `/api/${key}`;

  const { data, error } = useSWR(
    apiRoute,
    async (url) => (await axios.get(url)).data,
    { refreshInterval: 1000 }
  );
  const { mutate } = useSWRConfig();

  const handleSetSpot = (spot: 0 | 1 | 2 | 3) => {
    setSpots((oldSpots) => {
      const newSpots: [boolean, boolean, boolean, boolean] = [...oldSpots];
      newSpots[spot] = !oldSpots[spot];
      return newSpots;
    });
  };

  const handleSubmitSpots = async () => {
    await axios.put(apiRoute, { spots });
    mutate(apiRoute);
    setSpots([false, false, false, false]);
  };

  const handleClearSpots = async () => {
    setSpots([false, false, false, false]);
    await axios.put(apiRoute, { spots: [false, false, false, false] });
    mutate(apiRoute);
  };

  const handleAllSpots = async () => {
    setSpots([true, true, true, true]);
  };

  const handleBack = () => {
    router.push("/");
  };

  useEffect(() => {
    if (
      JSON.stringify(spots) !== JSON.stringify([false, false, false, false]) &&
      JSON.stringify(data) === JSON.stringify([false, false, false, false])
    ) {
      setSpots([false, false, false, false]);
    }
  }, [data]);

  if (error) {
    return (
      <main>
        <h1>Event {key}</h1>
        <p>
          <strong>Error: </strong>There was an error loading this event.
        </p>
        <ButtonGroup>
          <button onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </ButtonGroup>
      </main>
    );
  }

  if (!error && !data) {
    return (
      <main>
        <h1>Event {key}</h1>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Event {key}</h1>
      <ButtonGroup>
        <button
          onClick={handleClearSpots}
          disabled={
            JSON.stringify(spots) ===
              JSON.stringify([false, false, false, false]) &&
            JSON.stringify(data) ===
              JSON.stringify([false, false, false, false])
          }
        >
          Clear <FontAwesomeIcon icon={faEraser} />
        </button>
        <button
          onClick={handleSubmitSpots}
          disabled={
            JSON.stringify(spots) ===
            JSON.stringify([false, false, false, false])
          }
        >
          Submit <FontAwesomeIcon icon={faShareFromSquare} />
        </button>
      </ButtonGroup>
      <Spots>
        <Spot
          active={data[0]}
          area="one"
          onClick={() => {
            handleSetSpot(0);
          }}
        >
          1 {spots[0] && <FontAwesomeIcon icon={faCircleCheck} />}
        </Spot>
        <Spot
          active={data[1]}
          area="two"
          onClick={() => {
            handleSetSpot(1);
          }}
        >
          2 {spots[1] && <FontAwesomeIcon icon={faCircleCheck} />}
        </Spot>
        <Spot
          active={data[2]}
          area="three"
          onClick={() => {
            handleSetSpot(2);
          }}
        >
          3 {spots[2] && <FontAwesomeIcon icon={faCircleCheck} />}
        </Spot>
        <Spot
          active={data[3]}
          area="four"
          onClick={() => {
            handleSetSpot(3);
          }}
        >
          4 {spots[3] && <FontAwesomeIcon icon={faCircleCheck} />}
        </Spot>
      </Spots>
      <AllSpots
        onClick={handleAllSpots}
        disabled={
          JSON.stringify(spots) === JSON.stringify([true, true, true, true])
        }
      >
        <FontAwesomeIcon icon={faBolt} /> Select All
      </AllSpots>
    </main>
  );
};

export default Home;
