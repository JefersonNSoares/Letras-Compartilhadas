# 📚 Letras Compartilhadas

Um aplicativo mobile desenvolvido com **React Native e Expo**.

## 🚀 Tecnologias

- **React Native**
- **Expo**
- **React Hooks** (useState, useEffect)

---

## 📦 Instalação e Execução

### **1️⃣ Pré-requisitos**
Antes de começar, certifique-se de ter instalado:
- **Node.js** (Recomendado: versão LTS) → [Baixar aqui](https://nodejs.org/)
- **Expo CLI** → Instale com:
  ```sh
  npm install -g expo-cli
  ```
- **Git** → [Baixar aqui](https://git-scm.com/)

### **2️⃣ Clonar o repositório**
```sh
 git clone [https://github.com/seu-usuario/letras-compartilhadas.git](https://github.com/JefersonNSoares/Letras-Compartilhadas.git)
 cd letras-compartilhadas
```

### **3️⃣ Instalar as dependências**
```sh
npm install
```
Ou, se estiver usando Yarn:
```sh
yarn install
```

### **4️⃣ Executar o projeto**
Para rodar o app no Expo:
```sh
npx expo start
```
Ou se estiver usando Yarn:
```sh
yarn expo start
```
Isso abrirá o Expo Developer Tools no navegador.

---

## 📱 Rodando no Emulador ou Dispositivo Físico

### **Android**
- Para rodar no emulador, primeiro abra o **Android Studio**, inicie um **emulador** e execute:
  ```sh
  npx expo run:android
  ```
- Para rodar no celular, conecte via **USB** e ative a **Depuração USB** nas opções do desenvolvedor.

### **iOS** (Apenas Mac)
- Certifique-se de ter o **Xcode** instalado.
- Execute:
  ```sh
  npx expo run:ios
  ```

---

## 🛠️ Configurações Adicionais
### **Usando Imagens SVG**
Se precisar usar imagens no formato **SVG**, instale o pacote:
```sh
npx expo install react-native-svg
```

### **Mostrar/Ocultar Senha no Campo de Login**
Caso queira adicionar um botão de "mostrar senha" no campo de login, veja o código no arquivo `Home.js`.

---

## 🐛 Problemas e Soluções
### 🔹 Erro `expo start` não reconhecido
Se o Expo não for reconhecido como comando, tente reinstalar:
```sh
npm install -g expo-cli
```

### 🔹 Erro ao rodar no Android (`SDK não encontrado`)
Verifique se o **Android Studio** está instalado e o **Emulador** está rodando corretamente.

### 🔹 `react-native-svg` não funciona
Se precisar usar arquivos `.svg`, instale o **react-native-svg-transformer**:
```sh
npm install react-native-svg-transformer
```
E adicione o arquivo `metro.config.js` na raiz do projeto:
```js
const { getDefaultConfig } = require("expo/metro-config");
module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
  config.resolver.sourceExts.push("svg");
  return config;
})();
```

---

## 📄 Licença
Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e melhorá-lo! 🚀

---

### **💡 Dúvidas ou Sugestões?**
Caso tenha alguma dúvida ou sugestão, abra uma **issue** ou entre em contato! 😊

