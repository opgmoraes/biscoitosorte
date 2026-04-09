import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@biscoito_ultimo_tempo";
const INTERVALO_HORAS = 6;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textoFrase: "",
      img: require("./src/biscoito.png"),
      botaoDesabilitado: false,
      tempoRestante: "",
    };

    this.quebraBiscoito = this.quebraBiscoito.bind(this);
    this.verificarTempo = this.verificarTempo.bind(this);

    this.frases = [
      "Siga os bons e aprenda com eles.",
      "O bom-senso vale mais do que muito conhecimento.",
      "O riso é a menor distância entre duas pessoas.",
      "Deixe de lado as preocupações e seja feliz.",
      "Realize o óbvio, pense no improvável e conquiste o impossível.",
      "Acredite em milagres, mas não dependa deles.",
      "A maior barreira para o sucesso é o medo do fracasso.",
      "Quem semeia ventos colhe tempestades.",
      "A persistência é o caminho do êxito.",
      "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
      "Não espere por uma crise para descobrir o que é importante em sua vida.",
      "A felicidade não é um destino, é uma forma de caminhar.",
      "Você é mais forte do que imagina.",
      "Cada dia é uma nova oportunidade de mudar sua história.",
      "Grandes realizações começam com pequenos passos.",
      "A vida é 10% o que nos acontece e 90% como reagimos a isso.",
      "Seja a mudança que você deseja ver no mundo.",
      "O melhor momento para começar era ontem. O segundo melhor é agora.",
      "Coragem não é ausência de medo, mas agir apesar dele.",
      "Sonhos não têm prazo de validade.",
    ];
  }

  componentDidMount() {
    this.verificarTempo();
    this.intervalo = setInterval(this.verificarTempo, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalo);
  }

  async verificarTempo() {
    try {
      const ultimoTempo = await AsyncStorage.getItem(STORAGE_KEY);

      if (ultimoTempo !== null) {
        const agora = new Date().getTime();
        const ultimo = parseInt(ultimoTempo);
        const diferencaMs = agora - ultimo;
        const diferencaHoras = diferencaMs / (1000 * 60 * 60);

        if (diferencaHoras < INTERVALO_HORAS) {
          const horasRestantes = INTERVALO_HORAS - diferencaHoras;
          const horas = Math.floor(horasRestantes);
          const minutos = Math.floor((horasRestantes - horas) * 60);

          this.setState({
            botaoDesabilitado: true,
            tempoRestante: `Disponível em ${horas}h ${minutos}min`,
          });
        } else {
          this.setState({
            botaoDesabilitado: false,
            tempoRestante: "",
            textoFrase: "",
            img: require("./src/biscoito.png"),
          });
        }
      }
    } catch (error) {
      console.log("Erro ao verificar tempo:", error);
    }
  }

  async quebraBiscoito() {
    try {
      const agora = new Date().getTime();
      await AsyncStorage.setItem(STORAGE_KEY, agora.toString());

      const numeroAleatorio = Math.floor(Math.random() * this.frases.length);

      this.setState({
        textoFrase: '"' + this.frases[numeroAleatorio] + '"',
        img: require("./src/biscoitoAberto.png"),
        botaoDesabilitado: true,
        tempoRestante: `Disponível em ${INTERVALO_HORAS}h 00min`,
      });
    } catch (error) {
      console.log("Erro ao salvar tempo:", error);
    }
  }

  render() {
    const { botaoDesabilitado, tempoRestante, textoFrase, img } = this.state;

    return (
      <View style={styles.container}>
        <Image source={img} style={styles.img} />

        <Text style={styles.textoFrase}>{textoFrase}</Text>

        <TouchableOpacity
          style={[styles.botao, botaoDesabilitado && styles.botaoDesabilitado]}
          onPress={this.quebraBiscoito}
          disabled={botaoDesabilitado}
        >
          <View style={styles.btnArea}>
            <Text
              style={[
                styles.btnTexto,
                botaoDesabilitado && styles.btnTextoDesabilitado,
              ]}
            >
              Quebrar Biscoito
            </Text>
          </View>
        </TouchableOpacity>

        {tempoRestante !== "" && (
          <Text style={styles.textoTempo}>🔒 {tempoRestante}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  img: {
    width: 250,
    height: 250,
  },
  textoFrase: {
    fontSize: 20,
    color: "#dd7b22",
    margin: 30,
    fontStyle: "italic",
    textAlign: "center",
  },
  botao: {
    width: 230,
    height: 50,
    borderWidth: 2,
    borderColor: "#dd7b22",
    borderRadius: 25,
  },
  botaoDesabilitado: {
    borderColor: "#ccc",
  },
  btnArea: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTexto: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dd7b22",
  },
  btnTextoDesabilitado: {
    color: "#ccc",
  },
  textoTempo: {
    marginTop: 14,
    fontSize: 14,
    color: "#dd7b22",
    textAlign: "center",
  },
});

export default App;
