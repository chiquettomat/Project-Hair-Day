import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules }) {
  // Limpa a lista de horarios
  hours.innerHTML = "";

  // Obtém a lista de todos os horarios ocupados.
  const unavailableHours = dailySchedules.map((schedule) =>
    dayjs(schedule.when).format("HH:mm")
  );

  const opening = openingHours.map((hour) => {
    // Recupera somente a hora
    const [schedulesHour] = hour.split(":");

    // Adiciona a hora na data e verifica se esta no passado
    const isHourPast = dayjs(date).add(schedulesHour, "hour").isBefore(dayjs());

    const available = !unavailableHours.includes(hour) && !isHourPast;

    // Define se o horario está disponivel
    return {
      hour,
      available,
    };
  });

  // Renderiza os horarios
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "09:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.append(li);
  });

  // Adiciona o evento de click nos horarios disponiveis.
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
