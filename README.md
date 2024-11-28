**PicNest**

PicNest é uma aplicação full stack para compartilhamento de fotos, desenvolvida com foco em gerenciamento de usuários, autenticação segura e uma experiência interativa para os usuários. O projeto utiliza tecnologias modernas e segue boas práticas para escalabilidade.

Funcionalidades
Cadastro e login de usuários com autenticação JWT.
Upload de fotos com pré-visualização e título.
Visualização e gerenciamento de fotos publicadas.
Atualização de perfil: nome, bio e imagem de perfil.
Mensagens de sucesso e erro exibidas dinamicamente.
Backend estruturado no padrão MVC com validação de dados e segurança.
Tecnologias Utilizadas
Frontend:

⚛️ React
🛠️ Redux Toolkit
🌐 React Router
🎨 CSS

Backend:

🟢 Node.js com Express
📂 MongoDB com Mongoose
🔒 JWT e Bcrypt para segurança
✅ Express-Validator para validação de dados
Configuração do Projeto

**Clone o repositório**:
 ```bash
git clone https://github.com/seu_usuario/PicNest.git
```

**Entre na pasta do backend:**


 ```bash
cd PicNest/backend
```

**Instale as dependências:**

 ```bash

npm install

```
**Crie um arquivo .env com as variáveis de ambiente necessárias:**

 ```bash

PORT=5000
DB_USER=seu_usuario
DB_PASS=sua_senha
JWT_SECRET=sua_chave_secreta
```

**Inicie o servidor backend:**

 ```bash

npm run server
```
**Configure o frontend:**

**Navegue até a pasta frontend:**
 ```bash
cd ../frontend
```

**Instale as dependências:**
 ```bash

npm install
```

**Inicie o servidor frontend:**
 ```bash

npm start
```

**Utilização do Projeto:**

Acesse o frontend: http://localhost:3000
Endpoints do backend: http://localhost:5000

Recursos:

Página Inicial: Navegue pelas fotos publicadas e interaja com os perfis de outros usuários.

Cadastro e Login: Crie sua conta e autentique-se para acessar funcionalidades exclusivas.

Perfil: Faça upload de fotos, edite seu perfil e visualize suas publicações.

Planejamento Futuro:

Implementar funcionalidade de "dislike" para fotos.

Adicionar animações e transições mais ricas.

Criar notificações para interações entre usuários.


