import axios from "axios";
import React, { useEffect, useState } from "react";
import { NoticiaRow } from "../noticias/NoticiaRow";
import "../styles/noticias.css";

export const SeleccionarNoticiaScreen = () => {
  const [noticias, setNoticias] = useState([]);

  const fetch = async () => {
    const buscarNoticias = await axios({
      url: `${process.env.REACT_APP_BACKEND_HOST}/api/noticia`,
      method: "GET",
    });

    setNoticias(buscarNoticias.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <p className="display-4">SeleccionarNoticiaScreen</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">URL</th>
            <th scope="col">Fecha</th>
            <th scope="col" className="inputTitulo">
              Titulo
            </th>
            <th scope="col" className="inputContent">
              Contenido
            </th>
            <th scope="col" className="inputContent">
              Summary
            </th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((nt, index) => {
            return <NoticiaRow key={index} data={nt} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
