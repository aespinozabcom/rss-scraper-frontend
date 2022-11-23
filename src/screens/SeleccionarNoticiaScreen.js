import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { NoticiaRow } from "../noticias/NoticiaRow";
import "../styles/noticias.css";

export const SeleccionarNoticiaScreen = () => {
  const [noticias, setNoticias] = useState([]);

  const [load, setLoad] = useState(false);
  const [reload, setReload] = useState(false);

  const [edited, setEdited] = useState([]);

  const fetch = async () => {
    const socket = io(process.env.REACT_APP_BACKEND_HOST);

    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });

    socket.on("disconnect", () => console.log("server disconnected"));

    socket.on("noticias", (data) => {
      alert("Nuevas noticias");
      console.log(data);
    });
    setLoad(true);

    const buscarNoticias = await axios({
      url: `${process.env.REACT_APP_BACKEND_HOST}/api/noticia`,
      method: "GET",
    });

    setNoticias(buscarNoticias.data);

    setLoad(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (noticias.length > 0 && reload) {
      fetch();

      setReload(!reload);
    }
  }, [reload, noticias]);

  const guardar = async () => {
    try {
      if (edited.length > 0) {
        for await (const nt of edited) {
          await axios({
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/noticia/${nt._id}`,
            method: "PUT",
            data: {
              ...nt,
            },
          });
        }

        alert("Noticias guardadas");
      } else {
        alert("No se han realizado cambios");
      }
      // edited.forEach(async (nt) => {
      //   await axios({
      //     url: `${process.env.REACT_APP_BACKEND_HOST}/api/noticia/${nt._id}`,
      //     method: "PUT",
      //     data: {
      //       ...nt,
      //     },
      //   });
      // });

      // alert("Noticias guardadas");
    } catch (error) {
      alert("Error al guardar la(s) noticia(s) editada(s)");
    }
  };

  return (
    <div className="p-5">
      <p className="display-4 text-center">Seleccionar Noticia</p>
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
            <th>Importar</th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            noticias.map((nt, index) => {
              return (
                <NoticiaRow
                  key={index}
                  data={nt}
                  edited={edited}
                  setEdited={setEdited}
                  setListaNoticia={setNoticias}
                  setLoad={setReload}
                />
              );
            })}
        </tbody>
      </table>
      <button onClick={guardar} className="btn btn-primary">
        Guardar
      </button>
    </div>
  );
};
