import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";

// import { sendDataAboutButton } from "./tgterminal.js";
// import { sendDataAboutError } from "./tgterminal.js";
// import { sendDataAboutText } from "./tgterminal.js";

const TOKENs = [
	"7072188605:AAGRJq0QEasOS3CYVBnjBZdnIzpRDRWoYpI",
	"7068045329:AAF0ZeLcIKKEvcubFTb2rWhmFBqrlWId0i8",
];

const TOKEN = TOKENs[1]; // 1 - оригинал
const bot = new TelegramBot(TOKEN, { polling: true });

const qu1z3xId = "923690530";
const jackId = "6815420098";
let BotName = "digfusionbot";

let usersData = [];

bot.setMyCommands([
	{
		command: "/clear",
		description: "Бессрочное удаление ❌",
	},
	{
		command: "/settime",
		description: "Изменить срок сообщений ⌛",
	},
	{
		command: "/history",
		description: "Недавно удаленные 🕝",
	},
	{
		command: "/profile",
		description: "Профиль 👤",
	},
]);

let rndNum, textToSayHello, match, rndId;

async function firstMeeting(chatId, numOfStage = 1) {
	const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

	try {
		switch (numOfStage) {
			case 1:
				dataAboutUser.userAction = "firstMeeting1";

				await bot.editMessageText(
					`<b>${
						dataAboutUser.login
					} привет!</b>👋\nИспользуй меня как <b>самоочищающийся черновик</b> для самых <b>неаккуратных заметок!</b> 😉\n\n<b>Срок для сообщений: ${
						dataAboutUser.periodOfDays * 24 + dataAboutUser.periodOfHours
					}ч</b>`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId)
							.messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: "Изменить срок ⌛",
										callback_data: "firstMeeting2",
									},
								],
								[
									{
										text: "Приступим! 😉",
										callback_data: "firstMeeting3",
									},
								],
							],
						},
					}
				);
				break;
			case 2:
				dataAboutUser.userAction = "firstMeeting2";

				await bot.editMessageText(
					`<b><i>🕝 Срок сообщений ⌛</i></b>\n\nДавай определимся со <b>сроком хранения</b> твоих <b>набросков (сообщений)</b> в этом чате! 🤔\n\n${
						dataAboutUser.periodOfDays * 24 +
							dataAboutUser.periodOfHours >
						0
							? `Удаление <b>через ${
									dataAboutUser.periodOfDays
										? `${dataAboutUser.periodOfDays}дн`
										: ``
							  }${
									dataAboutUser.periodOfDays != 0 &&
									dataAboutUser.periodOfHours != 0
										? " и "
										: ""
							  }${
									dataAboutUser.periodOfHours
										? `${dataAboutUser.periodOfHours}ч`
										: ``
							  }${
									dataAboutUser.periodOfDays == 0 &&
									dataAboutUser.periodOfHours != 0
										? ``
										: ` (${
												dataAboutUser.periodOfDays * 24 +
												dataAboutUser.periodOfHours
										  }ч)`
							  }</b> после написания! 🕝`
							: `Сообщения <B>не будут</B> удаляться! 🚫`
					}`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId)
							.messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: `${
											dataAboutUser.periodOfDays == 0 &&
											dataAboutUser.periodOfHours == 0
												? "• Без срока 🚫 •"
												: "Сбросить / Без срока 🚫"
										}`,
										callback_data: "setPeriod0",
									},
								],
								[
									{
										text: `${
											dataAboutUser.periodOfDays == 1
												? "• 1д •"
												: "1д"
										}`,
										callback_data: `${
											dataAboutUser.periodOfDays == 1
												? "setPeriodOfDays0"
												: "setPeriodOfDays1"
										}`,
									},
									{
										text: `${
											dataAboutUser.periodOfDays == 7
												? "• Нед •"
												: "Нед"
										}`,
										callback_data: `${
											dataAboutUser.periodOfDays == 7
												? "setPeriodOfDays0"
												: "setPeriodOfDays7"
										}`,
									},
									{
										text: `${
											dataAboutUser.periodOfDays == 30
												? "• Мес •"
												: "Мес"
										}`,
										callback_data: `${
											dataAboutUser.periodOfDays == 30
												? "setPeriodOfDays0"
												: "setPeriodOfDays30"
										}`,
									},
								],
								[
									{
										text: `${
											dataAboutUser.periodOfHours == 5
												? "• 5ч •"
												: "5ч"
										}`,
										callback_data: `${
											dataAboutUser.periodOfHours == 5
												? "setPeriodOfHours0"
												: "setPeriodOfHours5"
										}`,
									},
									{
										text: `${
											dataAboutUser.periodOfHours == 10
												? "• 10ч •"
												: "10ч"
										}`,
										callback_data: `${
											dataAboutUser.periodOfHours == 10
												? "setPeriodOfHours0"
												: "setPeriodOfHours10"
										}`,
									},
									{
										text: `${
											dataAboutUser.periodOfHours == 15
												? "• 15ч •"
												: "15ч"
										}`,
										callback_data: `${
											dataAboutUser.periodOfHours == 15
												? "setPeriodOfHours0"
												: "setPeriodOfHours15"
										}`,
									},
									{
										text: `${
											dataAboutUser.periodOfHours == 20
												? "• 20ч •"
												: "20ч"
										}`,
										callback_data: `${
											dataAboutUser.periodOfHours == 20
												? "setPeriodOfHours0"
												: "setPeriodOfHours20"
										}`,
									},
								],
								[
									{
										text: "Принять изменения ✅",
										callback_data: "deleteexcess",
									},
								],
							],
						},
					}
				);
				break;
			case 3:
				dataAboutUser.userAction = "firstMeeting3";

				await bot.editMessageText(
					`Чтобы ты <B>не заблудился(лась),</B> вот <b>список команд</b> для <b>изменения параметров:</b> <blockquote><b>"/clear"</b> - удаляет сообщения бессрочно, кроме отмеченных "❕"\n\n<b>"/settime"</b> - изменение срока сообщений ⌛\n\n<b>"/history"</b> - история недавно удаленных сообщений 🕝\n\n<b>"/profile"</b> - ваш профиль с личной информацией и статистикой пользования 👤</blockquote>\n\nЧтобы <b>отметить</b> сообщение, которое <b>не стоит удалять,</b> напиши <b>"❕" в начале сообщения!</b> 😉`,
					{
						parse_mode: "html",
						chat_id: chatId,
						message_id: usersData.find((obj) => obj.chatId == chatId)
							.messageId,
						disable_web_page_preview: true,
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: "Спасибо! 🙏",
										callback_data: "deleteexcess",
									},
								],
							],
						},
					}
				);
				break;
			case 4:
				break;
			case 4:
				break;
			case 2:
				break;
		}
	} catch (error) {
		console.log(error);
	}
}

async function StartAll() {
	if (TOKEN == TOKENs[1]) {
		BotName = "digfusionbot";
	} else if (TOKEN == TOKENs[0]) {
		BotName = "digtestingbot";
	}

	cron.schedule(`1 * * * * *`, function () {
		for (let i = 0; i < usersData.length; i++) {
			if (usersData[i].messageHistory) {
				for (let j = 0; j < usersData[i].messageHistory.length; j++) {
					// let currentTime = new Date().getTime();

					let differenceInHours =
						(new Date().getTime() -
							usersData[i].messageHistory[j].dateOfCreation) /
						(60 * 1000) /
						60;

					if (
						differenceInHours >=
							usersData[i].periodOfDays * 24 +
								usersData[i].periodOfHours &&
						usersData[i].periodOfDays * 24 + usersData[i].periodOfHours !=
							0
					) {
						if (
							!usersData[i].messageHistory[j].isDelete &&
							!usersData[i].messageHistory[j].content.includes("❕")
						) {
							try {
								bot.deleteMessage(
									usersData[i].chatId,
									usersData[i].messageHistory[j].messageId
								);

								bot.sendMessage(
									qu1z3xId,
									`<b>Сообщения по сроку - удалены! 😉</b>`,
									{
										parse_mode: "HTML",
										disable_web_page_preview: true,
									}
								);
							} catch (error) {}
						}

						usersData[i].messageHistory[j].isDelete = true;
					}
				}
			}
		}
	});

	bot.on("message", async (message) => {
		const chatId = message.chat.id;
		const text = message.text;

		try {
			if (!usersData.find((obj) => obj.chatId === chatId)) {
				usersData.push({
					chatId: chatId,
					login: message.from.first_name,
					messageId: null,

					messageHistory: [],
					periodOfHours: 0,
					periodOfDays: 1,
				});
			}

			const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

			if (dataAboutUser) {
				if (
					text == "/start" ||
					text == "/settime" ||
					text == "/history" ||
					text == "/profile"
				) {
					try {
						bot.deleteMessage(chatId, message.message_id);
					} catch (error) {}
				} else {
					dataAboutUser.messageHistory.push({
						messageId: message.message_id,
						content: text,
						dateOfCreation: new Date().getTime(),
						isDelete: false,
					});
				}

				switch (text) {
					case "/start":
					case "st":
					case "St":
					case "Ые":
					case "ые":
						await bot
							.sendMessage(chatId, "ㅤ")
							.then(
								(message) =>
									(dataAboutUser.messageId = message.message_id)
							);

						firstMeeting(chatId);
						break;
					case "":
						break;
					case "":
						break;
					case "/clear":
						if (dataAboutUser.messageHistory) {
							for (
								let j = 0;
								j < dataAboutUser.messageHistory.length;
								j++
							) {
								if (
									!dataAboutUser.messageHistory[j].isDelete &&
									!dataAboutUser.messageHistory[j].content.includes(
										"❕"
									)
								) {
									try {
										bot.deleteMessage(
											dataAboutUser.chatId,
											dataAboutUser.messageHistory[j].messageId
										);
									} catch (error) {}
								}

								dataAboutUser.messageHistory[j].isDelete = true;
							}
						}
						break;
					case "/settime":
						await bot
							.sendMessage(chatId, "ㅤ")
							.then(
								(message) =>
									(dataAboutUser.messageId = message.message_id)
							);
						firstMeeting(chatId, 2);

						break;
					case "/history":
						// try {
						// 	historyOfDeletedMessages(chatId);
						// } catch (error) {
						// 	await bot
						// 		.sendMessage(chatId, "ㅤ")
						// 		.then(
						// 			(message) =>
						// 				(dataAboutUser.messageId = message.message_id)
						// 		);
						// 	historyOfDeletedMessages(chatId);
						// }

						break;
					case "/profile":
						// try {
						// 	settings(chatId);
						// } catch (error) {
						// 	await bot
						// 		.sendMessage(chatId, "ㅤ")
						// 		.then(
						// 			(message) =>
						// 				(dataAboutUser.messageId = message.message_id)
						// 		);
						// 	settings(chatId);
						// }
						break;
					case "":
						break;
					case "":
						break;
					case "":
						break;
					case "":
						break;
				}
			}
		} catch (error) {
			console.log(error);
		}
	});

	bot.on("callback_query", (query) => {
		const chatId = query.message.chat.id;
		const data = query.data;

		const dataAboutUser = usersData.find((obj) => obj.chatId == chatId);

		try {
			if (dataAboutUser) {
				dataAboutUser.messageId = query.message.message_id;
				if (data.includes("firstMeeting")) {
					match = data.match(/^firstMeeting(\d+)$/);

					firstMeeting(chatId, parseInt(match[1]));
				}

				if (data.includes("setPeriodOfDays")) {
					match = data.match(/^setPeriodOfDays(\d+)$/);

					dataAboutUser.periodOfDays = parseInt(match[1]);

					firstMeeting(chatId, 2);
				}

				if (data.includes("setPeriodOfHours")) {
					match = data.match(/^setPeriodOfHours(\d+)$/);

					dataAboutUser.periodOfHours = parseInt(match[1]);

					firstMeeting(chatId, 2);
				}

				switch (data) {
					case "exit":
						menuHome(chatId);
						break;
					case "catalogOfServices":
						dataAboutUser.supportiveCount = 1;
						catalogOfServices(chatId);
						break;
					case "ideasForProjects":
						ideasForProjects(chatId);
						break;
					case "deleteexcess":
						try {
							bot.deleteMessage(chatId, query.message.message_id);
						} catch (error) {}
						break;
					case "setPeriod0":
						dataAboutUser.periodOfDays = 0;
						dataAboutUser.periodOfHours = 0;

						firstMeeting(chatId, 2);
						break;
					case "":
						break;
					case "":
						break;
				}
			}
		} catch (error) {
			console.log(error);
		}
	});
}

StartAll();
