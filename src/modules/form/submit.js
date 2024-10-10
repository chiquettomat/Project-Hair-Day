import dayjs from "dayjs";
import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selecteDate = document.getElementById("date");

// Data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e define a data miníma como sendo a data atual.
selecteDate.value = inputToday;
selecteDate.min = inputToday;

form.onsubmit = async (event) => {
  // Previne o evento padrão de recarregar a página.
  event.preventDefault();

  try {
    // Recuperando o nome do cliente.
    const name = clientName.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente");
    }

    // Recupera o horario selecionado.
    const hourSelected = document.querySelector(".hour-selected");

    // Validando o horario selecionado
    if (!hourSelected) {
      return alert("Selecione o horário");
    }

    // Recuperar somente e a hora
    const [hour] = hourSelected.innerText.split(":");

    // Insere a hora na data
    const when = dayjs(selecteDate.value).add(hour, "hour");

    // Gera um ID
    const id = new Date().getTime().toString();

    // Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });

    // Recarrega os agendamentos
    await schedulesDay();

    // Limpa o input de nome do cliente
    clientName.value = "";
  } catch (error) {
    alert("Não foi possivel realizar o agendamento");
    console.log(error);
  }
};
