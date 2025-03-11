# Anota.ai

## Sobre o Projeto
- Anota AÍ é uma aplicação web para gerenciar tarefas. Ela permite aos usuários gerenciar suas atividades diárias de forma eficiente e organizada.

- Com uma interface moderna e intuitiva, o app permite que o usuário crie, edite, exclua e busque tarefas, além de possibilitar a adição de status e descrição de cada uma delas.

- Com o Anota AÍ, você irá ter mais produtividade e controle, menos estresse e esquecimento.

## Funcionalidades
- Autenticação via OAuth com Google
- Troca de temas (dark e light)
- Criação de tarefa
- Edição de tarefa
- Deleção de tarefa
- Listagem de tarefas
- Filtragem de busca (período, status de tarefa)
- Gráfico de balanço mensal de tarefas (pendentes, fazendo, concluídas e canceladas)
- Alteração de dados pessoais
- Busca de tarefas (search)

## Tecnlogias utilizadas

<table style="width: 100%">
  <thead>
    <th>Front-end</th>
    <th>Back-end</th>
    <th>UI / Style</th>
  </thead>
  <tbody style="color: #ccc">
    <tr>
      <td>NextJS</td>
      <td>Prisma ORM</td>
      <td>TailwindCSS</td>
    </tr>
    <tr>
      <td>ReactJS</td>
      <td>PostgreSQL</td>
      <td>Shadcn UI</td>
    </tr>
    <tr>
      <td>TypeScript</td>
      <td>Docker</td>
      <td></td>
    </tr>
  </tbody>
</table>

## Bibliotecas
- **AuthJS:** Autenticação
- **Prisma ORM:** Interação com Banco de dados
- **Husky:** GitHooks e automatizações no desenvolvimento
- **Next Theme:** Tema escuro e tema claro
- **Shadcn UI:** Padronização de componentes modernos
- **Zod:** Validação de dados

## Variáveis de ambiente
- AUTH_SECRET= [AuthJS](https://authjs.dev/)
- AUTH_GOOGLE_ID= [Console Google](https://console.cloud.google.com/apis/credentials)
- DATABASE_URL= [Neon DB](https://neon.tech/)

## Melhorias
- [ ] Colaboração entre equipes
- [ ] Paginação
- [ ] Integração com IA
- [ ] Adicionar deadline das tarefas
- [ ] Lembretes por e-mail de tarefas próximas a data de vencimento

## Autor
- Desenvolvedor Web Front-end
- [Higor Silva Soares](https://www.linkedin.com/in/hiigorsilva/)