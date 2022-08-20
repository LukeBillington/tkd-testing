import styled from "@emotion/styled";
import {
  faArrowRight,
  faCalendarPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { ButtonGroup } from "../shared/styles";

const JoinKey = styled.input`
  text-transform: uppercase;
`;

const Home = () => {
  const router = useRouter();

  const [createEventKey, setCreateEventKey] = useState<string | undefined>(
    undefined
  );
  const [createEventLoading, setCreateEventLoading] = useState<boolean>(false);
  const [createEventError, setCreateEventError] = useState<boolean>(false);

  const [joinEventKey, setJoinEventKey] = useState<string>("");

  const handleCreateEvent = async () => {
    setCreateEventLoading(true);
    setCreateEventError(false);
    try {
      setCreateEventKey((await axios.post("/api/new")).data);
    } catch (err) {
      setCreateEventError(true);
    }
    setCreateEventLoading(false);
  };

  const handleCreateEventJoin = () => {
    if (createEventKey) {
      router.push(`/${createEventKey}`);
    }
  };

  const handleJoinEventKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinEventKey(e.currentTarget.value);
  };

  const handleJoinEventJoin = () => {
    router.push(`/${joinEventKey}`);
  };

  return (
    <main>
      <h1>Testing</h1>
      <section>
        <h2>Create Event</h2>
        {createEventError && (
          <p>
            <strong>Error: </strong>The event could not be created. Try again.
          </p>
        )}
        {!createEventKey && (
          <ButtonGroup>
            <button onClick={handleCreateEvent} disabled={createEventLoading}>
              <FontAwesomeIcon icon={faCalendarPlus} /> Create Event
            </button>
          </ButtonGroup>
        )}
        {createEventKey && (
          <>
            <p>
              <strong>Event Key: </strong>
              {createEventKey}
            </p>
            <ButtonGroup>
              <button onClick={handleCreateEventJoin}>
                Join Event <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </ButtonGroup>
          </>
        )}
      </section>
      <section>
        <h2>Join Event</h2>
        <label htmlFor="joinEventKey">Event Key</label>
        <JoinKey
          id="joinEventKey"
          type="text"
          maxLength={6}
          value={joinEventKey}
          onChange={handleJoinEventKeyChange}
        />
        <ButtonGroup>
          <button
            onClick={handleJoinEventJoin}
            disabled={joinEventKey.length !== 6}
          >
            Join Event <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </ButtonGroup>
      </section>
    </main>
  );
};

export default Home;
