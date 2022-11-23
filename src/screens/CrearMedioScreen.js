import axios from "axios";
import React, { useState } from "react";

export const CrearMedioScreen = () => {
  const [medio, setMedio] = useState({
    descripcion: "",
    urlFeedly: "",
  });

  const { descripcion, urlFeedly } = medio;

  const onChange = ({ target }) => {
    setMedio({
      ...medio,
      [target.name]: target.value,
    });
  };

  const onClick = async (e) => {
    e.preventDefault();

    if (descripcion !== "" && urlFeedly !== "") {
      if (!urlFeedly.includes("feed")) {
        return alert("Formato del feed incorrecto");
      }

      try {
        const url = decodeURIComponent(urlFeedly).replace("feed/", "");

        await axios({
          url: `${process.env.REACT_APP_BACKEND_HOST}/api/feed-medio`,
          method: "POST",
          data: {
            descripcion,
            url,
            urlFeedly,
          },
        });

        alert("Medio creado");

        setMedio({
          descripcion: "",
          urlFeedly: "",
        });
      } catch (error) {
        alert("Error al crear el medio");
        console.log(error);
      }
    } else {
      alert("Uno o más campos vacíos");
    }
  };

  return (
    <div className="p-3">
      <h1 className="display-4 text-center">Crear Medio</h1>
      <form>
        <div className="form-group">
          <label htmlFor="descripcionKey">Descripción:</label>
          <input
            type="text"
            className="form-control"
            name="descripcion"
            onChange={onChange}
            value={descripcion}
          />
        </div>
        <div className="form-group">
          <label htmlFor="descripcionKey">Enlace feedly:</label>
          <input
            type="text"
            className="form-control"
            name="urlFeedly"
            onChange={onChange}
            value={urlFeedly}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClick}>
          Guardar
        </button>
      </form>
    </div>
  );
};
