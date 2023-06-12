import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Sobre() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="display-4">Sobre o App</h1>
          <p className="lead">
            Bem-vindo ao nosso incrível aplicativo de anotações! Este aplicativo foi projetado
            para ajudá-lo a organizar e gerenciar suas anotações de maneira fácil e eficiente.
            Você pode criar, editar e excluir anotações, atribuir prioridades e manter tudo
            organizado em um só lugar.
          </p>
          <p className="lead">
            Nossa equipe trabalhou arduamente para garantir uma ótima experiência de usuário
            e funcionalidades úteis. Esperamos que este aplicativo torne a sua vida mais
            produtiva e organizada.
          </p>
          <p className="lead">
            Agradecemos por escolher o nosso app. Se tiver alguma dúvida ou sugestão, entre em
            contato conosco. Aproveite a utilização do aplicativo!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
