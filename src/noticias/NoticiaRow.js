import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/noticias.css";

export const NoticiaRow = ({ data, edited, setEdited }) => {
  const [noticia, setNoticia] = useState({
    _id: "",
    url: "",
    date_published: "",
    title: "",
    content_html: "",
    summary: "",
  });

  const [changed, setChanged] = useState(false);

  const { _id, url, date_published, title, content_html, summary } = noticia;

  useEffect(() => {
    setNoticia(data);
  }, []);

  const onChange = (e) => {
    setNoticia({
      ...noticia,
      [e.target.name]: e.target.value,
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
            return noticia;
          } else {
            return nt;
          }
        });

        const listaFiltrado = lista.filter((x) => x._id !== "");
        setEdited(listaFiltrado);
      } else {
        const lista = edited;
        lista.push(noticia);
        const listaFiltrado = lista.filter((x) => x._id !== "");

        setEdited(listaFiltrado);
      }
    }
  }, [noticia]);

  const onClick = async () => {
    try {
      await axios({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <tr>
      <th scope="row">{_id}</th>
      <td>{url}</td>
      <td>
        <input
          name="date_published"
          type="datetime-local"
          value={date_published.replace("Z", "")}
          onChange={onChange}
        />
      </td>
      <td>
        <textarea
          value={title}
          name="title"
          onChange={onChange}
          className="form-control inputTitulo"
        />
      </td>
      <td>
        <textarea
          value={content_html}
          name="content_html"
          onChange={onChange}
          className="form-control inputContent"
        />
      </td>
      <td>
        <textarea
          value={summary}
          name="summary"
          onChange={onChange}
          className="form-control inputContent"
        />
      </td>
      <td>
        <button onClick={onClick} className="btn btn-primary">
          Importar
        </button>
      </td>
    </tr>
  );
};
