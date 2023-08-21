module.exports = {
    "start": "Старт",
    "home": "Главная",
    "home_text": `Привет! Это ЗАРУБА - здесь ты можешь взять себе реального профессионального бойца.

    Когда твой боец участвует в боях ты получаешь за это деньги 💰.
    
    За каждую победу 10 000 рублей. Ничья - 5000 рублей Проигрыш - 2000 рублей.
    
    Интересно?! Смотри меню.
    Ваш пригласитель`,
    "referal_link": "Ваша реферальная ссылка: ",
    "all_referals": "Рефералов",
    "of_level": "уровня",
    "new_referal1": "По вашей ссылке зарегистрирован реферал первого уровня. Приглашайте ещё и зарабатывайте: ",
    "new_referal2": function(n) {
        n += 1;
        return `По вашей ссылке зарегистрирован реферал ${n} уровня. Приглашайте ещё и зарабатывайте: `;
    },
    "lang": "Выбрать язык",
    "selected_language": "Вы выбрали язык: Русский.",
    "back": "↩️ назад",
    "cancel": "❌ Отмена",
    "news": "🆕 Новости",
    "type_news": "Введите новость",
"my_wallet": "💰 Мой кошелёк",
"start_my_wallet_text": "💰 Мой кошелёк. Адрес",
"ref_contact": "Связь с пригласителем",
"ref_balance": function(min_withdraw) {
    return `Баланс пригласителя (выводится из бота от ${min_withdraw} DEL в ZARUBA)`;
},
"ref_withdraw": "Вывести прибыль пригласителя",
"no_min_ref_withdraw": "Сумма меньше минимальной для вывода",
"ref_withdrawing": "Вывод будет произведён.",
"ref_withdraw_order": function(id, address, amount) {
return `Новая заявка на вывод от <a href="tg://user?id=${id}">пользователя</a> с адресом
${address}
На сумму ${amount}`
},
"mw_balances": "Балансы токенов",
"mw_nfts": "Принадлежащие вам NFT",

"bid": "✅ Ставка",
"bid_text": "Нужны деньги? Можешь легко заработать и без вложений.  Тебе необходимо выбрать кто победит в бою или поставить на ничью.  Если угадаешь получишь 1 токен ZARUBA",
"you_selected_bid": "🙆‍♂️ Вы уже сделали свой выбор.",
"not_active_event": "🤷‍♂️ Нет активного события. Ждите анонса в канале, чтобы сделать ставку.",
"number1": "1️⃣ Первый боец",
"number2": "2️⃣ Второй боец",
"all_numbers": "*️⃣ Ничья",

"bid_save": "✅ заявка принята",
"buy_number": "🥊 Покупка бойца",
"bn_not": "🤷‍♂️ На данный момент NFT-карт бойцов в продаже нет",
    "bn_data": function(amount, lider_amount) {
        return `СТАРТ АУКЦИОНА

        ▪️Продажа идёт по типу: АУКЦИОН
        ▪️Начальная цена: 999 DEL
        ▪️Минимальный шаг повышения цены: 10 DEL
        
        ▪️ Ваша сумма ставки: ${amount} DEL
        ▪️ Текущая сумма ставки: ${lider_amount} DEL.
        
        1️⃣ Нажмите кнопку «установить цену»
        2️⃣ Пиши цену цифрами. 
        3️⃣ Дожидайтесь остановки аукциона.
        4️⃣ Конкурируй ценой.
        
        Например: 1000
        
        ❗️Участник предложивший наивысшую цену на момент остановки аукциона забирает NFT карту.
        
        Подробности о бойце в следующем сообщении:`;
    },
"bn_price": "Установить цену",
    "enter_bn": `Введите вашу ставку для покупки бойца с шагом в 10 DEL.`,
    "bn_not_save": "❌ Ставка не сохранена. Вероятно ошибка подключения к Ноде или вы ввели не число.",
    "bn_not_10": "❌ ставка не пройдёт (минимальное повышение 10)",
    "bn_not_balance": "❌ Баланс меньше суммы ставки.",
    "bn_not_lider": "❌ данная цена уже установлена другим участником или меньше цены лидера в ",
    "bn_save": "✅ Ставка на покупку бойца сохранена.",
    "new_bn_lider": function(amount, names) {
        return `цена за бойца выставлена ${amount} пользователем с ником ${names}`;
    },
    "bn_on": "Начать продажу",
    "bn_on_text": "Вы действительно хотите начать продажу карты бойца? Если да, введите ссылку на пост в Telegram канале.",
    "bn_on_ok": "Аукцион запущен.!",
    "bn_finish": "Завершить аукцион",
    "bn_finish_text": "Вы действительно хотите завершить аукцион?",
    "bn_not_winners": "В этот раз участников не было.",
    "bn_selected_winner": "Аукцион завершён.",
    "bn_winner_amount": "Сумма победителя",
    "bn_ref_deposited": "Завершено. Пригласители 1, 2 и 3 уровня получили свои бонусы на баланс.",
   "bn_ref_canceled": "Ok. Аукцион завершён с отменой начислений пригласителям победителя в связи с неуплатой ставки.",
    "bn_contact": "Связь с победителем",
    "bn_ref_deposit": "Завершить заявку",
    "bn_ref_cancel": "Победитель не оплатил",
    "settings": "⚙️ Настройки",
    "settings_text": "Меню настроек.",
    "change_wallet": "Привязать кошелёк",
    "enter_wallet": "Укажите ваш адрес кошелька DecimalChain для корректной работы бота",
    "wallet_saved": "✅ Кошелёк привязан",
    "wallet_not_save": "❌ Кошелёк не привязан. Проверьте правильность ввода адреса",
    "info": "ℹ️ Информация",
"info_text": `Обязательно подпишись на наш новостной канал @gozaruba и Инстаграм: instagram.com/go_zaruba/ чтобы бы не пропустить важную информацию - возможность заработать.`,
"instructions": "📄 Инструкции",
"roadmap": "🗓 Дорожная карта",
"support": "👨‍💻 Служба поддержки",
"instructions_text": `⭕️ Презентация "ЗАРУБА" (<a href="https://www.canva.com/design/DAEsnjJeLfs/U1WFaU6ADOBH9ovuWeAr2g/view?utm_content=DAEsnjJeLfs&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton#1">смотреть</a>) 

⭕️ Что необходимо сделать чтобы купить NFT-карту ? 

1️⃣ Создать кошелёк на блокчейне DecimalChain.    (<a href="https://www.youtube.com/watch?list=PLNy9jvA_r4X8XAjasEAkn_8VZEMcdTZ5X&v=8No1fuOYPYo&feature=youtu.be">смотреть видео</a>)

2️⃣ Купить монеты DEL  на обменном сервисе Bit.team ( <a href="https://www.youtube.com/watch?v=tD18CDQcEXM&feature=youtu.be">смотреть видео</a>)  

🔻 перевести их на свой кошелёк

3️⃣ Перевести монеты DEL  ( <a href="https://youtu.be/TkP8p-8gVqM?list=PLNy9jvA_r4X8XAjasEAkn_8VZEMcdTZ5X">смотреть видео</a> )

4️⃣  Участие в аукционе и покупка NFT-карты бойца.   
Для этого необходимо дождаться начала аукциона и установить свою цену.  Победитель аукциона тот, кто предложит наивысшую цену на момент окончания аукциона. 

5️⃣ После участия в бою вашего бойца вы получаете вознаграждение в токенах ZARUBA  на ваш кошелёк (величина вознаграждения зависит от результата боя)

6️⃣ Полученные токены ZARUBA можно: 
🔸 <a href="https://www.youtube.com/watch?v=yIVaHCye-G4&feature=youtu.be">Обменять на монету DEL</a> и продать на обменном сервисе Bit.team ( <a href="https://www.youtube.com/watch?list=PLNy9jvA_r4X8XAjasEAkn_8VZEMcdTZ5X&v=5pZyEkcL7zQ&feature=youtu.be">смотреть видео</a>)
🔸 Оставить хранить на кошельке 
🔸 Делегировать (заморозить чтобы на них получать ежедневные дивиденды в монете DEL) (<a href="https://www.youtube.com/watch?v=eCKYnlOJ5vE&feature=youtu.be">смотреть видео</a>)



⭕️ Вы всегда можете предложить создать NFT-карту бойца, которая ещё не создана.

⭕️ Если ваша NFT-карта участвовала в бою, а на канале не было об этом информации, то свяжитесь со мной для получения вознаграждения @tomzaruba.  

⭕️ Почему это безопасно? 

◾️ NFT-карта хранится на вашем криптовалютном кошельке.
◾️ Все награды экономически обоснованы и идут из бюджета, который формируется благодаря продаже NFT-карт и <a href="https://www.youtube.com/watch?v=OwFQrSsxTsE&feature=youtu.be">стейкингу</a>.  
◾️ Вы можете следить через "<a href="https://www.youtube.com/watch?list=PLNy9jvA_r4X8XAjasEAkn_8VZEMcdTZ5X&v=LvSL9QrgnvY&feature=youtu.be">обозреватель</a>"  за всеми транзакциями моего кошелька, а так же видеть какой сформирован "бюджет" и сколько он даёт.     Данная прозрачность даст вам осознание безопасности и обоснованность всех выплат.

Вступай в  ЗАРУБА чат  https://t.me/+9Sv5XfjoWKhjNTMy`,
"support_text": "👨‍💻 Связь: @tomzarubba",

    "collection": "Коллекция",
"creator": "Создатель",
"meta_data": "Мета данные",
"owners": "Владельцы",
"quantity": "Количество",
"start_reserve": "Стартовый резерв",
"total_reserve": "Текущий резерв",
"allow_mint": "Эмиссия включена",
"yes": "Да",
"no": "Нет",
"created": "Создан",
"updated": "Обновлён",
"headline": "Заголовок",
"description": "Описание",
"status": "Статус",
"active": "Активный",
"not_active": "Не активный",
"nft_link": "Смотреть",
"nft_transaction": "Транзакция создания NFT",
"admin_text": "Выбери пункт меню админки.",
"event_on": "Включить событие",
"event_on_text": "Вы действительно хотите начать событие?",
"event_on_ok": "Событие начато!",
"event_finish": "Завершить событие",
"event_finish_text": "Выберите бойца для завершения события или нажмите назад",
"not_selected_number": "Ошибка с выбором бойца.",
"not_bid_winners": "Нет победителя или участников нет, но событие завершено.",
"bid_selected": "Ставка сделана.",
"winners_will_send": `Победителям будут отправлены 1 ZARUBA. Если через минут 10 ничего не произошло, пробуем ещё раз.`,
"bids_members_count": "Всего участников",
"active_cards": "Карты с владельцами",
"to_page": "Страница",
"select_fighter_action": "Выберите результат боя.",
"winn_fighter": "Выиграл",
"lost_fighter": "Проиграл",
"draw_fighter": "* Ничья",
"active_cards_text": "Выберите пост с картой, у которой есть владелец, нажав на соответствующую кнопку.",
"not_selected_fighter_action": "Не выбрано действие или введено неверное.",
"your_fighter_is_winn": "Ваш боец выиграл. Вы получаете ",
"your_fighter_is_lost": "Ваш боец проиграл. Вы получаете ",
"your_fighter_is_draw": "Ваш боец сыграл с другим в ничью. Вы получаете ",

"conferm": "✅ Подтвердить",
"you_winn": `Поздравляем вас с получением токена ZARUBA за правильный прогноз!`,
"help": "Справка",
	"help_text": "Бот проекта ZARUBA. Позволяет узнать инфу по текущим владельцам NFT и т. д.\r\nВведите команду /nft NFT_ID, где NFT_ID - id NFT в Decimal chain для получения информации по токену."
}