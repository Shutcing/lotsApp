// function strToObject(str) {
//   const obj = {};
//   const params = str.split("=");

//   for (let i = 0; i < params.length - 1; i += 2) {
//     const key = params[i];
//     const value = params[i + 1] === "1";
//     obj[key] = value;
//   }

//   return obj;
// }

// function getStartAppParam() {
//   const params = new URLSearchParams(window.location.search);
//   const startParam = params.get("tgWebAppStartParam");
//   return strToObject(startParam);
// }

// let answers = {
//   join: "🎉 Теперь Вы участвуете в розыгрыше!",
//   noReq: "📌 Вы ещё не подписались на все нужные каналы!",
//   end: "❌ Розыгрыш уже завершен!",
//   already: "✔️ Вы уже участвуете в этом розыгрыше!",
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const startAppData = getStartAppParam();
//   let text = document.querySelector(".main__text");
//   if (startAppData.isNew && startAppData.isDoReq && startAppData.isLotActual) {
//     text.textContent = answers.join;
//   } else if (!startAppData.isLotActual) {
//     text.textContent = answers.end;
//   } else if (!startAppData.isNew) {
//     text.textContent = answers.already;
//   } else if (!startAppData.isDoReq) {
//     text.textContent = answers.noReq;
//   }
// });

const tg = window.Telegram.WebApp;

if (tg && tg.initDataUnsafe) {
  const user = tg.initDataUnsafe.user;
  if (user) {
    const userInfo = `ID: ${user.id}, Имя: ${user.first_name}, Username: @${user.username}`;
    document.getElementById("user-info").innerText = userInfo;
  } else {
    document.getElementById("user-info").innerText =
      "Информация о пользователе недоступна.";
  }
} else {
  document.getElementById("user-info").innerText =
    "Telegram WebApp не поддерживается.";
}
