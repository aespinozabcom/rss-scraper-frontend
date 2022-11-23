import React, { useEffect, useState } from "react";

export const MedioRow = ({ data, edited, setEdited }) => {
  const [medio, setMedio] = useState({
    _id: "",
    descripcion: "",
    url: "",
    urlFeedly: "",
  });

  const { _id, descripcion, url, urlFeedly } = medio;

  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setMedio(data);
  }, []);

  const onChange = ({ target }) => {
    setMedio({
      ...medio,
      [target.name]: target.value,
    });

    if (!changed) {
      setChanged(true);
    }
  };

  useEffect(() => {
    if (changed) {
      const filtrar = edited.filter((x) => x._id === _id);

      if (filtrar.length > 0) {
        const lista = edited.map((nt) => {
          if (nt._id === _id) {
            return medio;
          } else {
            return nt;
          }
        });

        const listaFiltrado = lista.filter((x) => x._id !== "");
        setEdited(listaFiltrado);
      } else {
        const lista = edited;
        lista.push(medio);
        const listaFiltrado = lista.filter((x) => x._id !== "");

        setEdited(listaFiltrado);
      }
    }
  }, [medio]);

  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>
        <input
          type="text"
          name="descripcion"
          onChange={onChange}
          className="form-control"
          value={descripcion}
        />
      </td>
      <td>
        <input
          type="text"
          name="url"
          onChange={onChange}
          className="form-control"
          value={url}
        />
      </td>
      <td>
        <input
          type="text"
          name="urlFeedly"
          onChange={onChange}
          className="form-control"
          value={urlFeedly}
        />
      </td>
    </tr>
  );
};
