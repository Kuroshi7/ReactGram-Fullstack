
PicNest
Projeto Full Stack de Compartilhamento de Fotos
PicNest é uma aplicação full stack desenvolvida com foco em gerenciamento de usuários, autenticação segura e compartilhamento de fotos. O projeto utiliza tecnologias modernas e boas práticas, oferecendo uma experiência interativa para os usuários. Com funcionalidades como upload de fotos, comentários e gerenciamento de perfil, este projeto simula um ambiente semelhante a redes sociais.

🛠️ Tecnologias Utilizadas
Frontend
React: Para criação de componentes reutilizáveis e interface de usuário.
Redux Toolkit: Gerenciamento de estado global.
React Router: Navegação entre páginas.
CSS: Estilização e responsividade.
Backend
Node.js: Servidor backend.
Express: Framework para criação de APIs RESTful.
MongoDB: Banco de dados NoSQL para armazenar informações de usuários e fotos.
Mongoose: ODM para modelar e gerenciar os dados no MongoDB.
JWT (JSON Web Token): Autenticação segura.
Bcrypt: Hash de senhas para segurança.
🌟 Funcionalidades
Frontend
Cadastro e login de usuários com autenticação JWT.
Upload de fotos com pré-visualização.
Adição de comentários e visualização de fotos publicadas.
Gerenciamento de perfil do usuário, incluindo atualização de nome, bio e imagem de perfil.
Mensagens claras de erro e sucesso exibidas ao usuário.
Backend
Rotas protegidas por autenticação.
CRUD completo para usuários e fotos.
Validação de dados usando express-validator.
Upload de arquivos com armazenamento local.
🖥️ Como Rodar o Projeto
Pré-requisitos
Node.js instalado
MongoDB configurado
Gerenciador de pacotes (npm ou yarn)
Passo 1: Configuração do Backend
Navegue até a pasta backend.
Instale as dependências:


npm install
Crie um arquivo .env na raiz da pasta backend e configure as variáveis de ambiente:
makefile

PORT=5000
DB_USER=seu_usuario
DB_PASS=sua_senha
JWT_SECRET=sua_chave_secreta
Inicie o servidor:


npm run server
Passo 2: Configuração do Frontend
Navegue até a pasta frontend.
Instale as dependências:

npm install
Crie um arquivo .env na raiz da pasta frontend e configure a variável de ambiente:

REACT_APP_API_URL=http://localhost:5000/api
Inicie o servidor:

npm start
Passo 3: Testar a Aplicação
Acesse o frontend em: http://localhost:3000.
O backend estará rodando em: http://localhost:5000.
🚀 Funcionalidades Planejadas
Implementação de animações e transições visuais mais ricas.
Adição de funcionalidades de "dislike" em postagens.
Sistema de notificações em tempo real.
Melhoria na responsividade e otimização de imagens.
📝 Aprendizados
Durante o desenvolvimento deste projeto, ganhei experiência prática em:

Estruturação de projetos com o padrão MVC.
Uso de Redux Toolkit para gerenciamento de estado global e operações assíncronas.
Autenticação e segurança com JWT.
Integração completa entre frontend e backend com uma API RESTful.
Manipulação de arquivos e upload de imagens no backend.
Tratamento de erros e exibição de mensagens claras no frontend.
📷 Capturas de Tela
Página Inicial	Página de Login	Página de Perfil
Adicione imagens aqui	Adicione imagens aqui	Adicione imagens aqui
