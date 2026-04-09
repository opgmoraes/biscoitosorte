# 🥠 Biscoito da Sorte

Aplicativo mobile desenvolvido em React Native com Expo, que exibe frases motivacionais ao "quebrar" um biscoito da sorte. Possui controle de tempo para limitar a abertura a uma vez a cada 6 horas.

---

## 📋 Requisitos

- [Node.js](https://nodejs.org/) (versão LTS)
- [Expo Go](https://expo.dev/client) instalado no celular
- VS Code (recomendado)

---

## 🚀 Como rodar o projeto

### 1. Clone ou baixe o projeto

```bash
git clone https://github.com/seu-usuario/biscoitosorte.git
cd biscoitosorte
```

### 2. Instale as dependências

```bash
npm install
npx expo install @react-native-async-storage/async-storage
```

### 3. Inicie o servidor

```bash
npx expo start
```

### 4. Abra no celular

- Instale o app **Expo Go** na App Store (iPhone) ou Play Store (Android)
- Garanta que o celular e o computador estão na **mesma rede Wi-Fi**
- Escaneie o QR code que aparecer no terminal com a câmera do iPhone (ou com o Expo Go no Android)

---

## 📁 Estrutura do projeto

```
biscoitosorte/
├── src/
│   ├── biscoito.png         # Imagem do biscoito fechado
│   └── biscoitoAberto.png   # Imagem do biscoito aberto
├── App.js                   # Código principal do app
├── app.json                 # Configurações do Expo
└── package.json             # Dependências do projeto
```

---

## 🧠 Como o código funciona

### Estado inicial (`constructor`)

```js
this.state = {
  textoFrase: '',                        // frase exibida (vazia no início)
  img: require('./src/biscoito.png'),    // imagem do biscoito fechado
  botaoDesabilitado: false,              // botão começa habilitado
  tempoRestante: '',                     // mensagem de tempo (vazia no início)
};
```

O construtor também define o array `this.frases` com 20 frases motivacionais que serão sorteadas aleatoriamente.

---

### Verificação de tempo (`verificarTempo`)

```js
async verificarTempo() {
  const ultimoTempo = await AsyncStorage.getItem(STORAGE_KEY);
  // Lê do armazenamento interno do celular quando foi
  // a última vez que o biscoito foi quebrado

  const diferencaHoras = (agora - ultimo) / (1000 * 60 * 60);
  // Calcula quantas horas se passaram desde a última abertura

  if (diferencaHoras < 6) {
    // Ainda dentro do bloqueio: desabilita o botão
    // e mostra quanto tempo falta
  } else {
    // Passou as 6 horas: reabilita o botão
    // e volta a imagem do biscoito fechado
  }
}
```

Essa função é chamada:
- Assim que o app abre (`componentDidMount`)
- A cada 1 minuto automaticamente (`setInterval`)

---

### Quebrar o biscoito (`quebraBiscoito`)

```js
async quebraBiscoito() {
  const agora = new Date().getTime();
  await AsyncStorage.setItem(STORAGE_KEY, agora.toString());
  // Salva o horário atual no armazenamento do celular

  const numeroAleatorio = Math.floor(Math.random() * this.frases.length);
  // Sorteia um número entre 0 e 19 (total de frases)

  this.setState({
    textoFrase: this.frases[numeroAleatorio], // exibe a frase sorteada
    img: require('./src/biscoitoAberto.png'), // troca para biscoito aberto
    botaoDesabilitado: true,                  // desabilita o botão
  });
}
```

---

### Ciclo de vida do componente

| Método | Quando é chamado | O que faz |
|--------|-----------------|-----------|
| `componentDidMount` | App abre | Chama `verificarTempo` e inicia o timer de 1 minuto |
| `componentWillUnmount` | App fecha | Para o timer para não vazar memória |

---

### Armazenamento (`AsyncStorage`)

O `AsyncStorage` funciona como um "banco de dados simples" no celular. Neste app ele armazena apenas uma informação:

| Chave | Valor | Descrição |
|-------|-------|-----------|
| `@biscoito_ultimo_tempo` | timestamp em ms | Momento em que o biscoito foi quebrado |

---

## ✨ Funcionalidades

- ✅ Exibe biscoito fechado ao abrir o app
- ✅ Ao tocar no botão, sorteia uma frase e abre o biscoito
- ✅ Bloqueia o botão por 6 horas após abrir
- ✅ Mostra contador regressivo com horas e minutos restantes
- ✅ Reabilita automaticamente após 6 horas
- ✅ 20 frases motivacionais diferentes
- ✅ Armazenamento persistente (funciona mesmo fechando o app)

---

## 🛠️ Tecnologias utilizadas

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| React Native | via Expo | Framework mobile |
| Expo | SDK 55 | Ambiente de desenvolvimento |
| AsyncStorage | latest | Persistência de dados local |
| JavaScript | ES2020+ | Linguagem principal |

---

## 👨‍💻 Desenvolvido por

Pedro Gabriel — Projeto da disciplina de Desenvolvimento Mobile
