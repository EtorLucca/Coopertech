import React, { useState } from "react";
import Repo from "./Repo";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userImageUrl, setUserImageUrl] = useState(
    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  );
  const [userData, setUserData] = useState();

  function handleSubmit() {
    if (userName.length > 3) {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            setUserImageUrl(
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            );
            setUserData(null);
          }
        })
        .then((data) => {
          if (data) {
            setUserImageUrl(`http://github.com/${userName}.png`);
            setUserData(data);
          }
        });
    } else {
      setUserImageUrl("https://cdn-icons-png.flaticon.com/512/149/149071.png");
      setUserData(null);
    }
  }

  return (
    <main className="container">
      <section className="form">
        <h1>Busca de Repositórios Github do usuário</h1>
        <img className="perfil" src={userImageUrl} alt="usuário não existe" />
        <input
          placeholder="Pesquise pelo username"
          className="username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <p className={userData === null ? "showError" : "hide"}>
          {userName.length <= 3 ? "*Por favor insira um usuário válido" : userData === null ? "*Usuário não encontrado" : ""}
        </p>
        <button
          className="search"
          onClick={() => {
            handleSubmit();
          }}
        >
          Pesquisar
        </button>
      </section>
      <section className={userData ? "data" : "hide"}>
        <div className="repoList">
          <Repo data={userData} />
        </div>
      </section>
    </main>
  );
}
