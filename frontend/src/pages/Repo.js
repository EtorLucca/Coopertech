import React from "react";

export default function Repo({ data }) {
  return (
    <div className="repo">
      { 
        !data ? 
          ""
        : 
        data.map((id) => (
          <div key={id.name} className="card">
            <textarea
              readOnly
              className="repository"
              value={`Repositório: ${id.name}`}
            />
            <textarea
              readOnly
              className="stars"
              value={`Stars: ${id.stargazers_count}`}
            />
            <textarea
              readOnly
              className="description"
              value={`Descrição: ${id.description}`}
            />
            <a className="url" href={id.html_url}>
              Acessar Repositório
            </a>
          </div>
        ))
      }
    </div>
  );
}
