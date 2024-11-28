PicNest
🚀 Projeto Full Stack de Compartilhamento de Fotos
PicNest é uma aplicação full stack desenvolvida com foco em gerenciamento de usuários, autenticação segura e compartilhamento de fotos. Este projeto utiliza tecnologias modernas e segue boas práticas, proporcionando uma experiência interativa e escalável.

🛠️ Tecnologias Utilizadas
Frontend
⚛️ React: Componentização e interface de usuário.
🛠️ Redux Toolkit: Gerenciamento de estado global.
🌐 React Router: Navegação entre páginas.
🎨 CSS: Estilização e responsividade.
Backend
🟢 Node.js: Servidor backend.
⚡ Express: Framework para criação de APIs RESTful.
📂 MongoDB: Banco de dados NoSQL.
📘 Mongoose: ODM para modelagem de dados no MongoDB.
🔒 JWT: Autenticação segura.
🔑 Bcrypt: Hash de senhas para segurança.
✅ Express-Validator: Validação de dados.
🌟 Funcionalidades
Frontend
Cadastro e login de usuários com autenticação JWT.
Upload de fotos com pré-visualização.
Adição de comentários e visualização de fotos publicadas.
Gerenciamento de perfil: atualização de nome, bio e imagem de perfil.
Mensagens claras de erro e sucesso exibidas ao usuário.
Backend
Rotas protegidas com autenticação JWT.
CRUD completo para usuários e fotos.
Validação de dados no backend.
Upload de imagens com armazenamento local.
🖥️ Como Rodar o Projeto
Pré-requisitos
Node.js instalado.
MongoDB configurado e em execução.
Gerenciador de pacotes (npm ou yarn).
Passo 1: Configuração do Backend
Navegue até a pasta backend.
Instale as dependências:
bash
Copy code
npm install
Crie um arquivo .env na raiz da pasta backend e configure as variáveis de ambiente:
makefile
Copy code
PORT=5000
DB_USER=seu_usuario
DB_PASS=sua_senha
JWT_SECRET=sua_chave_secreta
Inicie o servidor backend:
bash
Copy code
npm start
Passo 2: Configuração do Frontend
Navegue até a pasta frontend.
Instale as dependências:
bash
Copy code
npm install
Crie um arquivo .env na raiz da pasta frontend e configure a variável de ambiente:
bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Inicie o servidor frontend:
bash
Copy code
npm start
Passo 3: Testar a Aplicação
Acesse o frontend em: http://localhost:3000.
O backend estará rodando em: http://localhost:5000.
🚀 Funcionalidades Planejadas
Adicionar funcionalidade de "dislike" para postagens.
Melhorar animações e transições visuais com CSS avançado.
Implementar sistema de notificações interativas.
Aprimorar otimização e responsividade.
📝 Aprendizados
Durante o desenvolvimento deste projeto, obtive experiência prática em:

Estruturar projetos utilizando o padrão MVC.
Configurar e utilizar Redux Toolkit para gerenciar estados e operações assíncronas.
Integrar frontend e backend com APIs RESTful.
Implementar autenticação e segurança com JWT.
Manipular arquivos e configurar upload de imagens no backend.
Tratar erros e exibir mensagens claras para o usuário no frontend.
📷 Capturas de Tela
Página Inicial	Página de Login	Página de Perfil
Adicione imagens aqui	Adicione imagens aqui	Adicione imagens aqui

