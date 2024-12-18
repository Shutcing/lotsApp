let LOT_ID = 0;

function strToObject(str) {
  const obj = {};
  const params = str.split("=");

  for (let i = 0; i < params.length - 1; i += 2) {
    const key = params[i];
    const value = params[i + 1] === "1";
    obj[key] = value;
  }

  return obj;
}

async function fetchGetInfo(userId, lotId) {
  const url = `https://30042283-1417-4aaa-8cea-2f352728861b-00-3koorsgn83t3o.worf.replit.dev/get_info?user_id=${userId}&lot_id=${lotId}`;

  try {
    const response = await fetch(url, {
      method: "GET", // Метод запроса
      headers: {
        "Content-Type": "application/json", // Указываем формат
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }

    const data = await response.json(); // Парсим JSON-ответ
    console.log("Ответ сервера:", data);
    return data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
  }
}

function getStartAppParam() {
  const params = new URLSearchParams(window.location.search);
  const startParam = params.get("tgWebAppStartParam");
  return int(startParam);
}

let answers = {
  join: "🎉 Теперь Вы участвуете в розыгрыше!",
  noReq: "📌 Вы ещё не подписались на все нужные каналы!",
  end: "❌ Розыгрыш уже завершен!",
  already: "✔️ Вы уже участвуете в этом розыгрыше!",
};

document.addEventListener("DOMContentLoaded", async () => {
  const startAppData = getStartAppParam();
  LOT_ID = startAppData;
});

const tg = window.Telegram.WebApp;

(async () => {
  if (tg && tg.initDataUnsafe) {
    const user = tg.initDataUnsafe.user;
    if (user) {
      data = await fetchGetInfo(user.id, LOT_ID);
      document.getElementById(
        "user-info"
      ).innerText = `${data[0]} ${data[1]} ${data[2]}`;
    } else {
      document.getElementById("user-info").innerText = "данных нет";
    }
  } else {
    document.getElementById("user-info").innerText =
      "Telegram WebApp не поддерживается.";
  }
})();
