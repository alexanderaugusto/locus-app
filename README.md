
<p align="center">
  <img alt="Travis CI" src="https://travis-ci.org/alexanderaugusto/imovel-app.svg?branch=master" />
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/alexanderaugusto/imovel-app?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/alexanderaugusto/imovel-app">
  
  <a href="https://github.com/alexanderaugusto/imovel-app/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/alexanderaugusto/imovel-app">
  </a>
    
   <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">  
 
</p>

<h4 align="center"> 
	✅ IMovel - Concluído ✅
</h4>

<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-layout">Layout</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autores">Autores</a> • 
 <a href="#user-content--licença">Licença</a>
</p>


## 💻 Sobre o projeto

IMovel - é uma forma de conectar clientes e proprietários, tornando a escolha de alugar ou comprar um novo imóvel mais agradável e simples.

Este projeto foi desenvolvido para a disciplina de Engenharia de Software, com o objetivo de aplicar os conhecimentos adquiridos durante o curso.

---

## ⚙️ Funcionalidades

  - Usuário:
	  - [x] Cadastrar  
	  - [x] Realizar login
	  - [x] Editar dados	  
  - Imóveis:
	  - [x] Cadastrar 
	  - [x] Listar
	  - [x] Favoritar  
	  - [x] Pesquisar
    - [x] Deletar  
---

## 🎨 Layout

<p align="center">
  <img alt="IMovel Cadastro e Login - ios" src="https://user-images.githubusercontent.com/57146734/102159074-8c358680-3e61-11eb-9aca-3c41911756c4.gif" width="30%;">
  <img alt="IMovel - Android" src="https://user-images.githubusercontent.com/57146734/102159236-e5051f00-3e61-11eb-83f7-fb9278ee4fa7.gif" width="30%;">
</p>

---

## 🚀 Como executar o projeto

Este projeto é dividido em duas partes:
1. [Backend](https://github.com/alexanderaugusto/imovel-api.git)
2. Frontend (Neste repositório)

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Expo](https://expo.io).

Caso você já tenha estas ferramentas instaladas, <a href="#executando-o-projeto">clique aqui</a> para seguir ao próximo passo.

#### Instalações

##### 1) Windows: 
  No Windows, vamos instalar com o [chocolatey](https://chocolatey.org)

- Instalar chocolatey: Primeiro, abra o powershell como administrador.

  ```bash
  # Rode esse comando para checar se você tem permissão para instalar dependências com o terminal.
  $ Get-ExecutionPolicy

  # Se o retorno for diferente de "Restricted" pule para o próximo comando. Senão, rode este comando:
  $ Set-ExecutionPolicy AllSigned

  # Finalmente, instale o chocolatey.
  $ Set-ExecutionPolicy Bypass -Scope Process -	
  Force; [System.Net.ServicePointManager]::SecurityProtocol = 
  [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex
  ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

  # Agora, teste a instalação executando no terminal (Não pode retornar nenhum erro):
  $ choco
  ```

- Instalar nodejs e yarn:
  ```bash
  # Basta executar este comando para instalar o nodejs:
  $ choco install -y nodejs-lts yarn

  # Reinicie seu terminal e tente executar (todas as dependências devem retornar a versão do pacote):
  $ node -v
  $ npm -v
  $ yarn -v
  ```
  
- Instalar expo-cli:
  ```bash
  # Basta executar este comando para instalar o expo-cli:
  $ npm install expo-cli ou yarn add expo-cli
  ```
  
- Instalar Expo App:
	- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
	- [IOS](https://apps.apple.com/br/app/expo-client/id982107779)
  
 
 ##### 2) Linux:
    
###### - Ubuntu (Debian):

  - Instalar Curl:  
    ```bash
     # Verifique se você instalou o Curl:
     $ sudo  apt-get  install  curl
     ```   
   
  - Instalar nodejs: Neste tutorial, a instalação é com curl, se você deseja instalar com um gerenciador de pacotes, tente isto: [nvm](https://github.com/nvm-sh/nvm#about). 
    
    ```bash 
    # Agora, se o curl estiver instalado, execute este comando:

    # Usando Ubuntu:
    $ curl -sL https://deb.nodesource.com/setup_12.x | 			
    sudo -E bash - sudo apt-get install -y nodejs

    # Usando Debian, with root 
    $ curl -sL https://deb.nodesource.com/setup_12.x | bash -
    apt-get install -y nodejs
    ```
  
- Instalar yarn:
  ```bash
  # Configure o repositório yarn em seu sistema:
  $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add - echo 
    "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

  # Execute este comando para instalar o yarn:
  $ sudo apt update && sudo apt install --no-install-recommends yarn
  
  # Agora, verifique as instalações:
  $ node -v
  $ npm -v
  $ yarn -v
  ```
  
- Instalar expo-cli:
  ```bash
  # Basta executar este comando para instalar o expo-cli:
  $ npm install expo-cli ou yarn add expo-cli
  ```

- Instalar Expo App:
	- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
	- [IOS](https://apps.apple.com/br/app/expo-client/id982107779)
  
###### - Arch Linux:

- Instalar nodejs e yarn:
  ```bash 
  $ sudo pacman -S nodejs yarn 
  
  # ou     
  
  $ sudo pacman -S nodejs npm
  ```
  
- Instalar expo-cli:
  ```bash
  # Basta executar este comando para instalar o expo-cli:
  $ npm install expo-cli ou yarn add expo-cli
  ```

- Instalar Expo App:
	- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
	- [IOS](https://apps.apple.com/br/app/expo-client/id982107779)

##### 3) Mac:
No mac, vamos instalar com o Homebrew.
	
- Instalar Homebrew:
  ```bash
  # Basta executar este comando para instalar o homebrew:
  $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
  ```

- Instalar nodejs e yarn:
  ```bash
  # Com o homebew, vamos instalar o nodejs e yarn:
  $ brew install node
  $brew install yarn

  # Reinicie seu terminal e tente executar (todas as dependências devem retornar a versão do pacote):
  $ node -v
  $ npm -v
  $ yarn -v
  ```

- Instalar expo-cli:
  ```bash
  # Basta executar este comando para instalar o expo-cli:
  $ npm install expo-cli ou yarn add expo-cli
  ```

- Instalar Expo App:
	- [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
	- [IOS](https://apps.apple.com/br/app/expo-client/id982107779)
  

#### Executando o projeto

##### 🧭 Rodando a aplicação Frontend

   ```bash
    # Clone este repositório
    $ git clone https://github.com/alexanderaugusto/imovel-app.git

    # Acesse a pasta do projeto no seu terminal/cmd
    $ cd imovel-app

    # Instale as dependências
    $ yarn install ou npm install ou expo install

    # Execute a aplicação
    $ yarn start ou npm start ou expo start

    # Acesse o aplicativo expo e veja o projeto em execução, clique no aplicativo em execução.
   ```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### **Mobile**  ([React Native](http://www.reactnative.com/))
- **Dependências**:
  -   **[Expo](https://expo.io/)**
  -   **[React Navigation](https://reactnavigation.org/)**
  -   **[Axios](https://github.com/axios/axios)**
  -   **[Progress Steps](https://github.com/colbymillerdev/react-native-progress-steps)**
  -   **[Expo Image Picker](https://docs.expo.io/versions/latest/sdk/imagepicker/)**
  -   **[Swiper](https://github.com/leecade/react-native-swiper)**
  -   **[Progress](https://github.com/oblador/react-native-progress)**
  
- **Dependências de Desenvolvimento**:
  -   **[Jest Expo](https://docs.expo.io/guides/testing-with-jest/)**
  -   **[React Test Renderer](https://pt-br.reactjs.org/docs/test-renderer.html)**
  -   **[ESlint](https://eslint.org)**
  -   **[Prettier](https://prettier.io)**

Veja o arquivo  [package.json](https://github.com/alexanderaugusto/imovel-app/blob/master/package.json)

---

## 🦸 Autores

<table>
  <tr>
    <td align="center"><a href="https://github.com/alexanderaugusto/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/51683816?v=4" width="100px;" alt=""/><br /><sub><b>Alexander Augusto</b></sub></a></td>      
    <td align="center"><a href="https://github.com/vanessaSwerts/"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/57146734?v=4" width="100px;" alt=""/><br /><sub><b>Vanessa Swerts</b></sub></a></td>  
  </tr>
</table>

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).
