import axios from "axios";
import React, { useEffect, useState } from "react";
import { MedioRow } from "../medios/MedioRow";

export const SeleccionarMedioScreen = () => {
  const [medios, setMedios] = useState([]);
  const [load, setLoad] = useState(false);

  const [edited, setEdited] = useState([]);

  const fetch = async () => {
    setLoad(true);
    const buscarMedios = await axios({
      url: `${process.env.REACT_APP_BACKEND_HOST}/api/feed-medio`,
      method: "GET",
    });

    setMedios(buscarMedios.data);
    setLoad(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(edited);
  }, [edited]);

  const onClick = async () => {
    try {
      if (edited.length > 0) {
        for await (const md of edited) {
          await axios({
            url: `${process.env.REACT_APP_BACKEND_HOST}/api/feed-medio/${md._id}`,
            method: "PUT",
            data: {
              ...md,
            },
          });
        }

        alert("Medios guardados");
      } else {
        alert("No se ha realizado ningún cambio");
      }
    } catch (error) {
      alert("Error al guardar los cambios");
      console.log(error);
    }
  };

  return (
    <div className="p-5">
      <p className="display-4 text-center">Seleccionar Medio</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Descripción</th>
            <th scope="col">URL</th>
            <th scope="col">URL Feed</th>
          </tr>
        </thead>
        <tbody>
          {!load &&
            medios.map((md, index) => {
              return (
                <MedioRow
                  data={md}
                  key={index}
                  edited={edited}
                  setEdited={setEdited}
                />
              );
            })}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={onClick}>
        Guardar
      </button>
    </div>
  );
};
