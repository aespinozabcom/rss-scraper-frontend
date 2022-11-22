import {
  faCaretDown,
  faCaretUp,
  faPenToSquare,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  const [toggleFeeds, setToggleFeeds] = useState(false);

  return (
    <div className="sidebar bg-secondary text-left">
      <ul>
        <li>
          <button className="btn btn-secondary w-100">
            <NavLink to="/" className="text-light">
              Listar Noticias
              {"  "}
              <FontAwesomeIcon icon={faPenToSquare} />
            </NavLink>
          </button>
        </li>
        <li>
          <button
            className="btn btn-secondary w-100"
            onClick={() => setToggleFeeds(!toggleFeeds)}
          >
            Feeds{"  "}
            <FontAwesomeIcon icon={toggleFeeds ? faCaretUp : faCaretDown} />
          </button>
          {toggleFeeds && (
            <div>
              <button className="btn btn-secondary w-100">
                <NavLink to="/crear-medio" className="text-light">
                  Crear Medio{"  "}
                  <FontAwesomeIcon icon={faPlus} />
                </NavLink>
              </button>
              <button className="btn btn-secondary w-100">
                <NavLink to="/seleccionar-medio" className="text-light">
                  Listar Medios{"  "}
                  <FontAwesomeIcon icon={faPenToSquare} />
                </NavLink>
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};
