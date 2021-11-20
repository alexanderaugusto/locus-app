
<p align="center">
  <img alt="Github Actions" src="https://github.com/alexanderaugusto/locus-app/actions/workflows/main.yml/badge.svg" />

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alexanderaugusto/locus-app?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alexanderaugusto/locus-app">

  <a href="https://github.com/alexanderaugusto/locus-app/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexanderaugusto/locus-app">
  </a>

   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">

</p>

<h4 align="center">
	✅ Locus - em desenvolvimento ✅
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> •
 <a href="#-como-executar-o-projeto">Como executar</a> •
 <a href="#-estrutura-de-arquivos">Estrutura de arquivos</a> • 
 <a href="#-tecnologias">Tecnologias</a> •
 <a href="#-autores">Autores</a> •
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

Locus - é uma forma de conectar clientes e proprietários, tornando a escolha de alugar ou comprar um novo imóvel mais agradável e simples.

---

## ⚙️ Funcionalidades

  - Usuário:
	  - [x] Cadastrar
	  - [x] Realizar login
	  - [x] Editar dados
  - Imóveis:
	  - [x] Cadastrar
	  - [x] Editar dados
	  - [x] Listar
	  - [x] Favoritar
	  - [x] Pesquisar
    - [x] Deletar
---

## 🎨 Layout

<p align="center">
  <img alt="Locus Cadastro e Login - ios" src="https://user-images.githubusercontent.com/57146734/102159074-8c358680-3e61-11eb-9aca-3c41911756c4.gif" width="30%;">
  <img alt="Locus - Android" src="https://user-images.githubusercontent.com/57146734/102159236-e5051f00-3e61-11eb-83f7-fb9278ee4fa7.gif" width="30%;">
</p>

---

## 🚀 Como executar o projeto

Este projeto é dividido em três partes:
1. [Backend](https://github.com/alexanderaugusto/locus-api.git)
2. [Frontend - Web](https://github.com/alexanderaugusto/locus-web.git)
3. Frontend - Mobile (Neste repositório)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Expo](https://expo.io).

#### Executando o projeto

##### 🧭 Rodando a aplicação Frontend

   ```bash
    # Clone este repositório
    $ git clone https://github.com/alexanderaugusto/focus-app.git

    # Acesse a pasta do projeto no seu terminal/cmd
    $ cd focus-app

    # Instale as dependências
    $ yarn install

    # Execute a aplicação
    $ yarn start

    # Acesse o aplicativo expo e veja o projeto em execução, clique no aplicativo em execução.
   ```

---

## 📁 Estrutura de arquivos

Atualizado 15/11/2021

```
locus-app
├─ .editorconfig
├─ .eslintignore
├─ .eslintrc.json
├─ .expo-shared
│  └─ assets.json
├─ .gitignore
├─ .travis.yml
├─ app.config.js
├─ App.js
├─ assets
│  ├─ google-icon.png
│  ├─ icon.png
│  ├─ logo-black-mini.png
│  ├─ logo-blue-mini.png
│  ├─ logo-blue.png
│  └─ splash.png
├─ babel.config.js
├─ config
│  ├─ google-services.json
│  └─ GoogleService-Info.plist
├─ jest.config.js
├─ LICENSE
├─ node_modules
│  └─ .yarn-integrity
├─ package-lock.json
├─ package.json
├─ prettier.config.js
├─ README.md
├─ src
│  ├─ components
│  │  ├─ Button.js
│  │  ├─ CategoryCard.js
│  │  ├─ Error.js
│  │  ├─ FloatButton.js
│  │  ├─ ImagePicker.js
│  │  ├─ index.js
│  │  ├─ InputArea.js
│  │  ├─ InputSelect.js
│  │  ├─ Loader.js
│  │  ├─ OwnerInfoModal.js
│  │  ├─ PropertyCard.js
│  │  ├─ PropertyFilter.js
│  │  ├─ StepProgress.js
│  │  ├─ SwiperImage.js
│  │  └─ Warning.js
│  ├─ contexts
│  │  ├─ auth.js
│  │  ├─ loading.js
│  │  └─ reset.js
│  ├─ pages
│  │  ├─ Account.js
│  │  ├─ AddProperty.js
│  │  ├─ AddVisitPeriod.js
│  │  ├─ Advertise.js
│  │  ├─ EditAddress.js
│  │  ├─ EditImages.js
│  │  ├─ EditInfo.js
│  │  ├─ EditProperty.js
│  │  ├─ EditUser.js
│  │  ├─ EditVisit.js
│  │  ├─ Favorite.js
│  │  ├─ Home.js
│  │  ├─ index.js
│  │  ├─ PropertyDetail.js
│  │  ├─ ScheduleVisit.js
│  │  ├─ SignIn.js
│  │  └─ SignUp.js
│  ├─ routes
│  │  ├─ index.js
│  │  ├─ stack.routes.js
│  │  └─ tab.routes.js
│  ├─ services
│  │  ├─ api.js
│  │  └─ auth
│  │     └─ google.js
│  └─ utils
│     ├─ constants
│     │  ├─ colors.json
│     │  ├─ months.json
│     │  ├─ states.json
│     │  ├─ types.json
│     │  └─ weekdays.json
│     └─ util.js
├─ yarn.lock
└─ __tests__
   ├─ jestSetup.js
   ├─ mocks
   │  └─ constants
   │     ├─ properties.json
   │     ├─ property.json
   │     └─ user.json
   ├─ snapshot
   │  ├─ components
   │  │  ├─ FloatButton.test.js
   │  │  ├─ ImagePicker.test.js
   │  │  ├─ ImovelCard.test.js
   │  │  ├─ InputArea.test.js
   │  │  ├─ InputSelect.test.js
   │  │  ├─ Loader.test.js
   │  │  ├─ SwiperImage.test.js
   │  │  └─ __snapshots__
   │  │     ├─ FloatButton.test.js.snap
   │  │     ├─ ImagePicker.test.js.snap
   │  │     ├─ ImovelCard.test.js.snap
   │  │     ├─ InputArea.test.js.snap
   │  │     ├─ InputSelect.test.js.snap
   │  │     ├─ Loader.test.js.snap
   │  │     └─ SwiperImage.test.js.snap
   │  └─ screens
   │     ├─ Account.test.js
   │     ├─ AddProperty.test.js
   │     ├─ Advertise.test.js
   │     ├─ Contact.test.js
   │     ├─ Favorite.test.js
   │     ├─ Home.test.js
   │     ├─ PropertyDetail.test.js
   │     ├─ SignIn.test.js
   │     ├─ SignUp.test.js
   │     └─ __snapshots__
   │        ├─ Account.test.js.snap
   │        ├─ AddProperty.test.js.snap
   │        ├─ Advertise.test.js.snap
   │        ├─ Contact.test.js.snap
   │        ├─ Favorite.test.js.snap
   │        ├─ Home.test.js.snap
   │        ├─ PropertyDetail.test.js.snap
   │        ├─ SignIn.test.js.snap
   │        └─ SignUp.test.js.snap
   └─ unit
      ├─ components
      │  ├─ ImovelCard.test.js
      │  ├─ InputSelect.test.js
      │  └─ SwiperImage.test.js
      ├─ screens
      │  ├─ Account.test.js
      │  ├─ AddProperty.test.js
      │  ├─ Advertise.test.js
      │  ├─ Favorite.test.js
      │  ├─ Home.test.js
      │  ├─ SignIn.test.js
      │  └─ SignUp.test.js
      └─ utils
         └─ util.test.js

```
---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Mobile**  ([React Native](http://www.reactnative.com/))
- **Dependências**:
  -   **[Axios](https://github.com/axios/axios)**
  -   **[Expo](https://expo.io/)**
  -   **[Expo App Auth](https://github.com/expo/expo/tree/master/packages/expo-app-auth)**
  -   **[Expo Image Picker](https://docs.expo.io/versions/latest/sdk/imagepicker/)**
  -   **[React Navigation](https://reactnavigation.org/)**
  -   **[React Native Maps](https://github.com/react-native-maps/react-native-maps)**
  -   **[React Native Progress](https://github.com/oblador/react-native-progress)**
  -   **[React Native Progress Steps](https://github.com/colbymillerdev/react-native-progress-steps)**
  -   **[React Native Swipeable](https://github.com/jshanson7/react-native-swipeable)**
  -   **[React Native Swiper](https://github.com/leecade/react-native-swiper)**

- **Dependências de Desenvolvimento**:
  -   **[Jest Expo](https://docs.expo.io/guides/testing-with-jest/)**
  -   **[React Test Renderer](https://pt-br.reactjs.org/docs/test-renderer.html)**
  -   **[ESlint](https://eslint.org)**
  -   **[Prettier](https://prettier.io)**

Veja o arquivo  [package.json](https://github.com/alexanderaugusto/locus-app/blob/master/package.json)

---

## 🦸 Autores

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexanderaugusto/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/51683816?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Augusto</b></sub></a></td>
    <td align="center"><a href="https://github.com/pedroblimaa"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/46970693?v=4" width="100px;" alt=""/><br /><sub><b>Pedro Bonfilio</b></sub></a></td>
    <td align="center"><a href="https://github.com/vanessaSwerts/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/57146734?v=4" width="100px;" alt=""/><br /><sub><b>Vanessa Swerts</b></sub></a></td>
  </tr>
</table>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
