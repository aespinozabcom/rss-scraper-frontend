import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export const Sidebar = () => {
  const [toggleFeeds, setToggleFeeds] = useState(false);

  return (
    <div className="sidebar bg-secondary text-left">
      <ul>
        <li>
          <button className="btn btn-secondary w-100">Listar Noticias</button>
        </li>
        <li>
          <button
            className="btn btn-secondary w-100"
            onClick={() => setToggleFeeds(!toggleFeeds)}
          >
            Feeds{" "}
            <FontAwesomeIcon icon={toggleFeeds ? faCaretUp : faCaretDown} />
          </button>
          {toggleFeeds && (
            <div>
              <button className="btn btn-secondary w-100">Crear Medio</button>
              <button className="btn btn-secondary w-100">Listar Medios</button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};
