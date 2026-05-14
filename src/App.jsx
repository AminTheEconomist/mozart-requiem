import { useState } from "react";

// ─── PERSIAN DATA ────────────────────────────────────────────────────────────
const movements = [
  {
    num: "I", latin: "Introitus", english: "The Entrance",
    fa_title: "درآمد", fa_sub: "ورود به مراسم — نخستین دعا",
    key: "ر مینور · آداجیو", mood: "باشکوه", arc: 55, color: "#4a6fa5", author: "موتزارت — کامل",
    text: [
      { la: "Requiem aeternam dona eis, Domine,\net lux perpetua luceat eis.", fa: "پروردگارا، آرامش ابدی به آنان ببخش،\nو نور جاودان بر آنان بتابد." },
      { la: "Exaudi orationem meam,\nad te omnis caro veniet.", fa: "دعایم را بشنو،\nکه تمام آدمیان نزد تو خواهند آمد." },
    ],
    meaning_fa: "موتزارت مراسم را نه با وحشت، بلکه با دعا آغاز می‌کند — دو خواسته که کل اثر را شکل می‌دهند: آرامش و نور.\n\nآخرین جمله عمیق‌ترین حقیقت این مراسم را بیان می‌کند: «تمام آدمیان نزد تو خواهند آمد.» هیچ استثنایی وجود ندارد. سفری که در پیش است سفر همگان است.",
    note_fa: "این تنها موومانی است که موتزارت پیش از مرگش به‌طور کامل ارکسترال کرد. هر نتی که می‌شنوید از اوست.",
  },
  {
    num: "II", latin: "Kyrie", english: "A Prayer for Mercy",
    fa_title: "کیری", fa_sub: "دعا برای رحمت — تنها متن یونانی",
    key: "ر مینور · آلگرو · فوگ مضاعف", mood: "انضباطی", arc: 60, color: "#4a6fa5", author: "موتزارت — کامل",
    text: [
      { la: "Kyrie eleison.\nChriste eleison.\nKyrie eleison.", fa: "پروردگارا، رحم کن.\nمسیحا، رحم کن.\nپروردگارا، رحم کن." },
    ],
    meaning_fa: "کیری کهن‌ترین متن در کل مراسم است — آنقدر کهن که هرگز از یونانی ترجمه نشد. کلمه «الئیسون» فریاد ناتوان در برابر قدرتمند مطلق است.\n\nموتزارت این چند هجا را به‌صورت فوگ مضاعف می‌نویسد: دو موضوع موسیقی که در هم تنیده‌اند. شکل خود الهیات را بیان می‌کند — رحمت با مسیح گره خورده؛ نمی‌توان آن‌ها را از هم جدا کرد.",
    note_fa: "موتزارت موضوع فوگ را از هندل وام گرفت. در پایان به همین موسیقی باز می‌گردد — اما آنگاه دعا پاسخ یافته است.",
  },
  {
    num: "III", latin: "Dies Irae", english: "The Day of Wrath",
    fa_title: "روز خشم", fa_sub: "آغاز سکانس قرون وسطایی",
    key: "ر مینور · آلگرو آسای", mood: "آخرالزمانی", arc: 5, color: "#8b1e1e", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Dies irae, dies illa,\nsolvet saeclum in favilla,\nteste David cum Sibylla.", fa: "روز خشم، آن روز،\nجهان را به خاکستر تبدیل خواهد کرد،\nچنان‌که داوود و سیبیل پیشگویی کردند." },
      { la: "Quantus tremor est futurus,\nquando judex est venturus.", fa: "چه لرزش عظیمی خواهد بود\nآنگاه که داوری فرا می‌رسد." },
    ],
    meaning_fa: "پس از دو موومان دعای آرام، پرده دریده می‌شود. این شعر لاتین قرن سیزدهم پایان جهان را توصیف می‌کند.\n\nجفت‌شدن عجیب «داوود» پیامبر عبری و «سیبیل» کاهنه رومی را در نظر بگیرید. هر دو سنت همان پایان را پیش‌گویی کرده‌اند. هیچ فرهنگی مصون نیست.\n\nواژه فاویلا به معنای «اخگر» است — نه خاکستر سرد، بلکه بازمانده آتش. جهان تنها پایان نمی‌یابد؛ می‌سوزد.",
    note_fa: null,
  },
  {
    num: "IV", latin: "Tuba Mirum", english: "The Trumpet's Wondrous Sound",
    fa_title: "شیپور شگفت‌انگیز", fa_sub: "رستاخیز مردگان",
    key: "سی♭ ماژور · آندانته", mood: "شگفت‌زده", arc: 18, color: "#8b1e1e", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Tuba mirum spargens sonum\nper sepulcra regionum,\ncoget omnes ante thronum.", fa: "شیپور با نوای شگفت‌انگیزش\nبر فراز گورستان‌های سرزمین‌ها طنین می‌اندازد،\nهمگان را پیش تخت فرامی‌خواند." },
      { la: "Liber scriptus proferetur,\nunde mundus judicetur.", fa: "کتاب نوشته‌شده بیرون آورده می‌شود،\nکه جهان بر اساس آن داوری خواهد شد." },
    ],
    meaning_fa: "تصویر شیپوری که مردگان را از قبر فرامی‌خواند از قدیس پولس (اول قرنتیان ۱۵:۵۲) است. موتزارت آن را واقعی می‌کند — تنبون تنور سولو این موومان را آغاز می‌کند، تنها، یکی از مشهورترین سولوهای تنبون در موسیقی کلاسیک.\n\nسپس کتاب می‌آید — دفتری که در آن هر عمل هر زندگی ثبت شده. چهار سولیست یکی‌یکی وارد می‌شوند — باس، تنور، آلتو، سوپرانو — هر کدام در پیشگاه تخت می‌ایستند.",
    note_fa: null,
  },
  {
    num: "V", latin: "Rex Tremendae", english: "King of Tremendous Majesty",
    fa_title: "شاه هیبت‌انگیز", fa_sub: "شاه عظمت بی‌پایان",
    key: "سل مینور · گراو", mood: "التماس", arc: 30, color: "#8b1e1e", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Rex tremendae majestatis,\nqui salvandos salvas gratis,\nsalva me, fons pietatis.", fa: "ای شاه عظمت هیبت‌انگیز،\nکه نجات‌یافتگان را رایگان نجات می‌دهی،\nمرا نجات ده، ای سرچشمه مهربانی." },
    ],
    meaning_fa: "مفصل الهیاتی کل سکانس داوری. متن دو ایده را در تنش غیرقابل‌تحمل نگه می‌دارد: خدا پادشاهی هراس‌انگیز و مطلق است — و با این حال رایگان (گراتیس) نجات می‌دهد. این واژه ریشه کلمه انگلیسی «گریس» است.\n\nدو هجای پایانی: سالوا مه. مرا نجات ده. تا این لحظه خدا به‌صورت سوم شخص توصیف شده بود. ناگهان دعا شخصی می‌شود. روح از میان جمعیت بیرون آمده.",
    note_fa: "موتزارت این را با آکوردهای پرقدرت می‌نویسد، سپس برای دو هجای التماس‌گونه به زمزمه فرو می‌نشیند.",
  },
  {
    num: "VI", latin: "Recordare", english: "Remember, Merciful Jesus",
    fa_title: "به یاد آر", fa_sub: "جسورانه‌ترین استدلال روح",
    key: "فا ماژور · آندانته", mood: "صمیمی", arc: 40, color: "#7a4f1e", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Recordare, Jesu pie,\nquod sum causa tuae viae,\nne me perdas illa die.", fa: "به یاد آر، عیسای مهربان،\nکه من دلیل سفر توام،\nمرا در آن روز از دست مده." },
      { la: "Tantus labor non sit cassus.", fa: "این همه زحمت بیهوده نباشد." },
    ],
    meaning_fa: "روح جسورانه‌ترین حرکت الهیاتی در کل مراسم را انجام می‌دهد: به مسیح یادآوری می‌کند که چرا آمده. «من دلیل سفر توام.» اگر مسیح گنه‌کار را نجات ندهد، تمام رنج‌های مسیح بیهوده بوده.\n\nموتزارت طولانی‌ترین موومان سکانس را اینجا می‌نویسد — بیش از شش دقیقه، فقط چهار سولیست، بدون کر. مذاکره‌ای آرام میان روح و مسیح، در گوشه‌ای از دادگاه.",
    note_fa: null,
  },
  {
    num: "VII", latin: "Confutatis", english: "The Separation of Souls",
    fa_title: "جدایی روح‌ها", fa_sub: "هنگامی که ملعونان محکوم می‌شوند",
    key: "لا مینور ← فا ماژور", mood: "دوگانه", arc: 8, color: "#8b1e1e", author: "موتزارت (عمدتاً)",
    text: [
      { la: "Confutatis maledictis,\nflammis acribus addictis,\nvoca me cum benedictis.", fa: "هنگامی که ملعونان محکوم می‌شوند\nو به شعله‌های تند محکوم می‌گردند،\nمرا با برکت‌یافتگان بخوان." },
      { la: "Cor contritum quasi cinis,\ngere curam mei finis.", fa: "قلبم مثل خاکستر خرد شده،\nپایان مرا سرپرستی کن." },
    ],
    meaning_fa: "لحظه جدایی. تصویرسازی روانشناختی موتزارت یکی از بزرگ‌ترین‌هاست: صداهای مردانه خط «ملعونان» را با غرش‌های خشمگین پایین می‌خوانند — مجازات قابل شنیدن. در برابر آن‌ها، صداهای زنانه در فرازی آرام شناور هستند — بهشت، دست‌نخورده از هرج‌ومرج پایین.\n\nهر دو جهان را در یک اندازه می‌شنوید. جهنم در پایین صفحه. بهشت در بالا. روح فریاد می‌زند: وکا مه — «مرا [با آنان] بخوان».",
    note_fa: null,
  },
  {
    num: "VIII", latin: "Lacrimosa", english: "Full of Tears",
    fa_title: "سرشار از اشک", fa_sub: "اینجاست که موتزارت قلم را زمین گذاشت",
    key: "ر مینور · لارگتو", mood: "گریان", arc: 52, color: "#3d5a80", author: "۸ میزان موتزارت، بقیه زوسمایر",
    text: [
      { la: "Lacrimosa dies illa,\nqua resurget ex favilla\njudicandus homo reus.", fa: "آن روز سرشار از اشک خواهد بود،\nآنگاه که گنه‌کار\nاز خاکستر برخیزد تا داوری شود." },
      { la: "Huic ergo parce, Deus,\ndona eis requiem. Amen.", fa: "پس بر او رحم کن، ای خدا،\nآرامش به آنان ببخش. آمین." },
    ],
    meaning_fa: "سکانس نه با وحشت، بلکه با اشک پایان می‌یابد. پس از توصیف خشم، شیپور، تخت، جدایی — متن بالاخره اجازه می‌دهد که گریه کند.\n\nدستور زبان دعا تغییر می‌کند: «آرامش به آنان ببخش.» عزادار دیگر برای خود التماس نمی‌کند؛ برای همه مردگان دعا می‌کند.\n\nهشت میزان بعد، روی کلمات «یودیکاندوس هومو ریوس» — گنه‌کاری که باید داوری شود — موتزارت دیگر ننوشت. آن شب مُرد.",
    note_fa: "پنجم دسامبر ۱۷۹۱. اینها آخرین میزان‌هایی هستند که موتزارت نوشت. روی کلمات «گنه‌کاری که باید داوری شود» متوقف شد.",
  },
  {
    num: "IX", latin: "Domine Jesu", english: "The Offering Begins",
    fa_title: "خداوندا عیسی", fa_sub: "آغاز پیشکش — دعا برای رهایی",
    key: "سل مینور · آندانته", mood: "دسترسی", arc: 62, color: "#4a6fa5", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Domine Jesu Christe, Rex gloriae,\nlibera animas omnium fidelium defunctorum\nde poenis inferni et de profundo lacu.", fa: "خداوندا عیسی مسیح، شاه جلال،\nارواح تمام مؤمنان درگذشته را\nاز عذاب دوزخ و چاه عمیق رها کن." },
      { la: "Libera eas de ore leonis.", fa: "آنان را از دهان شیر برهان." },
    ],
    meaning_fa: "داوری تمام شد. حالا پیشکشی آغاز می‌شود — جایی که مراسم به‌طور رسمی دعاها را به نمایندگی از مردگان تقدیم می‌کند.\n\nدستور زبان کاملاً به «آنان را رها کن» تغییر کرده. عزادار دیگر تنها نیست. این موومان با فوگی روی کلمات «کوام اولیم آبراهاه پرومیسیستی» پایان می‌یابد — استناد به کهن‌ترین پیمان در تورات.",
    note_fa: null,
  },
  {
    num: "X", latin: "Hostias", english: "Sacrifices and Prayers",
    fa_title: "قربانی‌ها و دعاها", fa_sub: "پیشکش و امید",
    key: "می♭ ماژور · آندانته", mood: "اعتماد", arc: 72, color: "#5a7d5a", author: "موتزارت (طرح‌کلی)",
    text: [
      { la: "Hostias et preces tibi, Domine,\nlaudis offerimus.", fa: "قربانی‌ها و دعاهای ستایش\nبه تو تقدیم می‌کنیم، پروردگارا." },
      { la: "Fac eas, Domine,\nde morte transire ad vitam.", fa: "آنان را، خداوندا،\nاز مرگ به زندگی عبور ده." },
    ],
    meaning_fa: "واژه هوستیا به معنای «قربانی» در لاتین است — همان ریشه‌ای که به انگلیسی کلمه Host، نان مقدس مراسم عشای ربانی را می‌دهد.\n\nعبارت پایانی بیانیه الهیاتی صریح این اثر است: د مورته ترانسیره آد ویتام. «از مرگ به زندگی عبور ده.» مرگ مقصد نیست؛ گذرگاه است. روح باید از آن بگذرد.",
    note_fa: null,
  },
  {
    num: "XI", latin: "Sanctus", english: "Holy, Holy, Holy",
    fa_title: "قدوس", fa_sub: "سرود فرشتگان",
    key: "ر ماژور · آداجیو", mood: "فرشته‌وار", arc: 68, color: "#5a7d5a", author: "عمدتاً زوسمایر",
    text: [
      { la: "Sanctus, sanctus, sanctus,\nDominus Deus Sabaoth.", fa: "قدوس، قدوس، قدوس،\nخداوند خدای لشکرها." },
      { la: "Pleni sunt caeli et terra gloria tua.\nHosanna in excelsis.", fa: "آسمان و زمین از جلال تو پر است.\nهوسانا در اعلا." },
    ],
    meaning_fa: "تنها لحظه‌ای در مراسم که انسان‌ها آنچه فرشتگان می‌خوانند را می‌خوانند. از اشعیا ۶:۳، جایی که پیامبر سرافیمان را دور تخت خدا می‌بیند.\n\nتغییر گام را بشنوید. ریکوییم تقریباً تمام وقت در ر مینور بوده. سنکتوس به ر ماژور می‌رود — همان نت پایه، اما ناگهان آسمان گشوده شده.",
    note_fa: null,
  },
  {
    num: "XII", latin: "Benedictus", english: "Blessed Is He Who Comes",
    fa_title: "مبارک باد آنکه می‌آید", fa_sub: "متبرک است آنکه به نام خداوند می‌آید",
    key: "سی♭ ماژور · آندانته", mood: "استقبال", arc: 72, color: "#5a7d5a", author: "موتزارت/زوسمایر",
    text: [
      { la: "Benedictus qui venit\nin nomine Domini.\nHosanna in excelsis.", fa: "متبرک است آنکه\nبه نام خداوند می‌آید.\nهوسانا در اعلا." },
    ],
    meaning_fa: "فریاد جمعیت هنگام ورود مسیح به اورشلیم در یکشنبه شاخه‌ها. مراسم این مسیح که به اورشلیم آمد را با مسیحی که به محراب می‌آید یکی می‌داند.\n\nبرای چهار سولیست نوشته شده — صمیمی، لطیف، مثل چهار صدایی که به آینده‌ای خوش‌آمد می‌گویند.",
    note_fa: null,
  },
  {
    num: "XIII", latin: "Agnus Dei", english: "Lamb of God",
    fa_title: "بره خدا", fa_sub: "که گناه جهان را می‌برد",
    key: "ر مینور · لارگتو", mood: "پذیرش", arc: 78, color: "#5a7d5a", author: "عمدتاً زوسمایر",
    text: [
      { la: "Agnus Dei, qui tollis peccata mundi,\ndona eis requiem.", fa: "ای بره خدا، که گناه جهان را می‌بری،\nآرامش به آنان ببخش." },
      { la: "Agnus Dei, qui tollis peccata mundi,\ndona eis requiem sempiternam.", fa: "ای بره خدا، که گناه جهان را می‌بری،\nآرامش جاودان به آنان ببخش." },
    ],
    meaning_fa: "از یحیای تعمیددهنده: «اینک بره خدا که گناه جهان را می‌برد.» مسیح را با بره فصح عهد عبری یکی می‌کند.\n\nکلمه واحد سمپیترنام — جاودان — چیزی است که کل اثر به سوی آن حرکت کرده. ترس تمام شده. آنچه می‌ماند درخواستی است که این آرامش، وقتی آمد، هرگز پایان نیابد.",
    note_fa: null,
  },
  {
    num: "XIV", latin: "Lux Aeterna", english: "Eternal Light",
    fa_title: "نور ابدی", fa_sub: "نور جاودان — بازگشت به آغاز",
    key: "ر مینور ← ر ماژور", mood: "درخشان", arc: 88, color: "#c8982a", author: "بازاستفاده از درآمد",
    text: [
      { la: "Lux aeterna luceat eis, Domine,\ncum sanctis tuis in aeternum,\nquia pius es.", fa: "نور ابدی بر آنان بتابد، پروردگارا،\nبا قدیسانت تا ابد،\nزیرا که تو مهربانی." },
      { la: "Requiem aeternam dona eis, Domine,\net lux perpetua luceat eis.", fa: "آرامش ابدی به آنان ببخش، پروردگارا،\nو نور جاودان بر آنان بتابد." },
    ],
    meaning_fa: "دو خواسته اولین موومان — آرامش و نور — بالاخره با هم فرا می‌رسند. سفر از خلال وحشت، داوری، جدایی و غم به مقصدش رسیده: نوری که هرگز پایان نمی‌یابد.\n\nمتن لاتین اینجا حرفاً سطرهایی از درآمد را تکرار می‌کند. موتزارت و زوسمایر این تقارن ساختاری را در موسیقی آشکار می‌کنند: موسیقی لوکس اترنا همان موسیقی درآمد است. ریکوییم جایی که آغاز کرده پایان می‌یابد. اما روح حرکت کرده.",
    note_fa: "دایره بسته می‌شود. روح گذر کرده.",
  },
  {
    num: "XV", latin: "Cum Sanctis Tuis", english: "With Your Saints Forever",
    fa_title: "با قدیسان تو", fa_sub: "با قدیسانت تا ابد — فوگ پایانی",
    key: "ر مینور ← ر ماژور · فوگ", mood: "ابدی", arc: 95, color: "#c8982a", author: "بازاستفاده از فوگ کیری",
    text: [
      { la: "Cum sanctis tuis in aeternum,\nquia pius es.", fa: "با قدیسانت تا ابد،\nزیرا که تو مهربانی." },
    ],
    meaning_fa: "آخرین کلمات یک درخواست نیستند. بیان اعتماد هستند. کویا پیوس اس — «زیرا که تو مهربانی.» روح دیگر نمی‌خواهد. در پاسخ آرام گرفته.\n\nموتزارت فوگ کیری را دوباره به کار می‌گیرد — همان نت‌هایی که برای رحمت التماس می‌کردند حالا با اطمینان می‌خوانند. روحی که فریاد «پروردگارا، رحم کن» سر داده بود حالا «با قدیسانت تا ابد، زیرا که تو مهربانی» می‌خواند.\n\nآخرین آکورد در ر ماژور است — یک سوم پیکاردی. سایه در نور حل می‌شود.",
    note_fa: "اثر در گامی پایان می‌یابد که تمام وقت از آن پرهیز کرده بود: ر ماژور. نور.",
  },
];

const themes = [
  { icon: "☩", name_fa: "آرامش", latin: "requiem · sempiternam", desc_fa: "نخستین کلمه مراسم و مرکزی‌ترین خواسته آن. به‌صورت ریکوییم آغاز می‌شود و با ریکوییم سمپیترنام — آرامش ابدی — پایان می‌یابد. سفر فاصله میان این دو عبارت است." },
  { icon: "✦", name_fa: "نور", latin: "lux · luceat · aeterna", desc_fa: "با آرامش در درآمد جفت می‌شود، سپس در طول داوری تقریباً غایب است، و در پایان غالب می‌شود. روح از دعا برای نور به ایستادن در آن حرکت می‌کند." },
  { icon: "♡", name_fa: "رحمت", latin: "eleison · pius es", desc_fa: "در کیری التماس می‌شود. در رکس ترمندا به‌عنوان طبیعت خدا نامیده می‌شود. در کلمات پایانی به‌عنوان واقعیت تأیید می‌شود: کویا پیوس اس — زیرا که تو مهربانی." },
  { icon: "▲", name_fa: "آتش و خاکستر", latin: "favilla · flammis · cinis", desc_fa: "جهان در خاکستر ذوب می‌شود. ملعونان به شعله‌های تند محکوم می‌شوند. قلب «مثل خاکستر خرد شده». آتش واسطه هم داوری و هم ندامت است." },
  { icon: "⚖", name_fa: "داور و بره", latin: "Rex tremendae · Agnus Dei", desc_fa: "همان مسیح با دو نام خوانده می‌شود. در مرکز: داور هراس‌انگیز روی تخت. در پایان: بره‌ای که گناه را می‌برد. ریکوییم به شنونده می‌آموزد که یکی را در دیگری ببیند." },
  { icon: "→", name_fa: "من ← آنان", latin: "salva me → dona eis", desc_fa: "دستور زبان دعا تغییر می‌کند. موومان‌های اولیه برای فرد التماس می‌کنند: مرا نجات ده. پس از لاکریموزا، روح برای همه مردگان دعا می‌کند: آرامش به آنان ببخش." },
  { icon: "↔", name_fa: "گذر", latin: "de morte transire ad vitam", desc_fa: "الهیات اثر در یک عبارت، پنهان در هوستیاس: مرگ پایان نیست بلکه گذرگاه است. کل ریکوییم سفر آن عبور است." },
];

const arcPoints = movements.map((m, i) => ({
  x: 60 + (i / (movements.length - 1)) * 880,
  y: 20 + ((100 - m.arc) / 100) * 200,
  m,
}));

// ─── RTL HELPER ──────────────────────────────────────────────────────────────
const FA = { fontFamily: "'Vazirmatn', 'Tahoma', sans-serif", direction: "rtl", textAlign: "right" };
const FA_SERIF = { fontFamily: "'Amiri', 'Vazirmatn', 'Tahoma', serif", direction: "rtl", textAlign: "right" };

// ─── SHARED MODAL ────────────────────────────────────────────────────────────
function Modal({ m, onClose }) {
  if (!m) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(14px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0f0c08", border: `1px solid ${m.color}55`, maxWidth: 720, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: "2.5rem", position: "relative", animation: "slideUp .3s ease", boxShadow: `0 0 80px ${m.color}22`, direction: "rtl" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "1.25rem", left: "1.25rem", background: "none", border: "none", color: "rgba(255,255,255,.4)", cursor: "pointer", fontSize: "1.2rem" }}>✕</button>

        <div style={{ ...FA, fontSize: ".6rem", letterSpacing: ".1em", color: m.color, marginBottom: ".5rem" }}>موومان {m.num} · {m.key}</div>
        <h2 style={{ ...FA_SERIF, fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 700, color: "#f3ead5", lineHeight: 1.2, marginBottom: ".3rem" }}>{m.fa_title}</h2>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".85rem", color: "#a07840", marginBottom: ".25rem", direction: "ltr", textAlign: "left" }}>{m.latin}</p>
        <p style={{ ...FA, fontSize: ".85rem", color: "rgba(255,255,255,.4)", marginBottom: "1.25rem" }}>{m.fa_sub}</p>

        <div style={{ display: "flex", gap: ".75rem", marginBottom: "1.5rem", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={{ background: m.color + "22", border: `1px solid ${m.color}55`, color: m.color, padding: ".25rem .75rem", ...FA, fontSize: ".7rem" }}>{m.mood}</span>
          <span style={{ border: "1px solid rgba(255,255,255,.12)", color: "rgba(255,255,255,.4)", padding: ".25rem .75rem", ...FA, fontSize: ".7rem" }}>{m.author}</span>
        </div>

        <div style={{ height: 1, background: `linear-gradient(270deg,${m.color}88,transparent)`, marginBottom: "1.75rem" }} />

        {/* Latin + Persian */}
        <div style={{ ...FA, fontSize: ".6rem", letterSpacing: ".05em", color: "rgba(255,255,255,.3)", marginBottom: "1rem" }}>متن لاتین و ترجمه فارسی</div>
        {m.text.map((t, i) => (
          <div key={i} style={{ marginBottom: "1.5rem", paddingRight: "1rem", borderRight: `2px solid ${m.color}66` }}>
            <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: "1rem", color: m.color, lineHeight: 1.6, marginBottom: ".5rem", direction: "ltr", textAlign: "left", whiteSpace: "pre-line" }}>{t.la}</p>
            <p style={{ ...FA_SERIF, fontSize: "1.15rem", color: "rgba(255,255,255,.85)", lineHeight: 1.9, whiteSpace: "pre-line" }}>{t.fa}</p>
          </div>
        ))}

        <div style={{ ...FA, fontSize: ".6rem", color: "rgba(255,255,255,.3)", margin: "1.5rem 0 1rem" }}>معنا و شرح</div>
        {m.meaning_fa.split("\n\n").map((p, i) => (
          <p key={i} style={{ ...FA_SERIF, fontSize: "1.1rem", lineHeight: 2, color: "rgba(255,255,255,.8)", marginBottom: "1rem" }}>{p}</p>
        ))}

        {m.note_fa && (
          <div style={{ background: m.color + "15", border: `1px solid ${m.color}44`, padding: "1rem 1.25rem", marginTop: "1rem" }}>
            <div style={{ ...FA, fontSize: ".6rem", color: m.color, marginBottom: ".4rem" }}>یادداشت</div>
            <p style={{ ...FA_SERIF, fontSize: "1rem", color: "rgba(255,255,255,.72)", lineHeight: 1.8 }}>{m.note_fa}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ARC SVG ─────────────────────────────────────────────────────────────────
function ArcSVG({ selected, onSelect, light = false }) {
  const path = arcPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const tc = light ? "rgba(15,26,46,0.45)" : "rgba(255,255,255,0.3)";
  const bg = light ? "#f3ead5" : "#080705";
  return (
    <svg viewBox="0 0 1000 260" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="ag2" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#4a6fa5" /><stop offset="40%" stopColor="#8b1e1e" />
          <stop offset="70%" stopColor="#8b1e1e" /><stop offset="100%" stopColor="#c8982a" />
        </linearGradient>
        <linearGradient id="fg2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8b1e1e" stopOpacity=".18" />
          <stop offset="100%" stopColor="#8b1e1e" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[["وحشت", 25], ["غم", 120], ["آرامش", 215]].map(([l, y]) => (
        <g key={l}>
          <line x1="50" x2="940" y1={y} y2={y} stroke="rgba(128,100,60,0.15)" strokeDasharray="3,4" />
          <text x="956" y={y + 4} textAnchor="start" fill={tc} style={{ fontFamily: "Vazirmatn,Tahoma,sans-serif", fontSize: 9 }}>{l}</text>
        </g>
      ))}
      <path d={`${path} L ${arcPoints[arcPoints.length - 1].x} 240 L ${arcPoints[0].x} 240 Z`} fill="url(#fg2)" />
      <path d={path} fill="none" stroke="url(#ag2)" strokeWidth="2" strokeLinejoin="round" />
      {arcPoints.map((p, i) => {
        const sel = selected?.latin === p.m.latin;
        return (
          <g key={i} onClick={() => onSelect(p.m)} style={{ cursor: "pointer" }}>
            <circle cx={p.x} cy={p.y} r={sel ? 9 : 5} fill={sel ? p.m.color : bg} stroke={p.m.color} strokeWidth="2" style={{ transition: "r .2s,fill .2s" }} />
            <text x={p.x} y={p.y - 13} textAnchor="middle" fill={sel ? p.m.color : tc}
              style={{ fontFamily: "Vazirmatn,Tahoma,sans-serif", fontSize: 9, pointerEvents: "none" }}>{p.m.fa_title}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 1 — تعاملی (Interactive / Dark)
// ══════════════════════════════════════════════════════════════════════════════
function ViewInteractive() {
  const [selected, setSelected] = useState(null);
  const [openTheme, setOpenTheme] = useState(null);

  return (
    <div style={{ background: "#080705", minHeight: "100vh" }}>
      {/* Hero */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center", background: "radial-gradient(ellipse at 50% 30%,rgba(139,30,30,.2),transparent 65%)", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".75rem", letterSpacing: ".05em", color: "#b8893a", marginBottom: "2rem" }}>ریکوییم · کوشل ۶۲۶ · ولفگانگ آمادئوس موتزارت · ۱۷۹۱</p>
        <h1 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(2.5rem,8vw,6rem)", lineHeight: 1.15, color: "#f3ead5", marginBottom: "1.5rem" }}>
          گذر روح<br />
          <span style={{ color: "#b8893a" }}>از ریکوییم موتزارت</span>
        </h1>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".75rem", letterSpacing: ".4em", color: "rgba(255,255,255,.4)", marginBottom: "3rem", direction: "ltr" }}>REQUIEM · K. 626 · 1791</p>
        <div style={{ width: 200, height: 1, background: "linear-gradient(90deg,transparent,#b8893a,transparent)", margin: "0 auto 2rem", position: "relative" }}>
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#080705", padding: "0 1rem", color: "#b8893a" }}>✦</span>
        </div>
        <p style={{ ...FA_SERIF, fontSize: "1.2rem", color: "rgba(255,255,255,.65)", maxWidth: 580, lineHeight: 2, marginBottom: "3rem" }}>
          از نخستین دعا برای آرامش ابدی تا آخرین نور میان قدیسان — مراقبه‌ای بر مرگ، داوری و رحمت که در قبر خود آهنگساز ناتمام ماند.
        </p>
        <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a" }}>↓ برای کاوش پایین بروید ↓</p>
      </div>

      {/* Arc */}
      <div style={{ padding: "5rem 2rem 3rem", maxWidth: 1100, margin: "0 auto", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a", marginBottom: ".75rem" }}>قوس احساسی</p>
        <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#f3ead5", marginBottom: ".75rem" }}>از <span style={{ color: "#8b1e1e" }}>تاریکی</span> به نور</h2>
        <p style={{ ...FA_SERIF, fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,.5)", marginBottom: "2.5rem", maxWidth: 560 }}>روی هر نقطه روی قوس یا هر کارت موومان کلیک کنید تا متن و معنا را ببینید.</p>
        <div style={{ height: 270 }}><ArcSVG selected={selected} onSelect={setSelected} /></div>
      </div>

      {/* Grid */}
      <div style={{ padding: "2rem 2rem 6rem", maxWidth: 1100, margin: "0 auto", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a", marginBottom: "2rem" }}>پانزده موومان — کلیک کنید تا باز شود</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 1, background: "rgba(255,255,255,.05)" }}>
          {movements.map(m => {
            const sel = selected?.latin === m.latin;
            return (
              <div key={m.latin} onClick={() => setSelected(m)}
                onMouseEnter={e => { if (!sel) e.currentTarget.style.background = "#1a1612"; }}
                onMouseLeave={e => { if (!sel) e.currentTarget.style.background = "#0f0e0b"; }}
                style={{ background: sel ? m.color + "18" : "#0f0e0b", padding: "1.5rem 1.25rem", cursor: "pointer", borderTop: sel ? `2px solid ${m.color}` : "2px solid transparent", transition: "all .25s", direction: "rtl", position: "relative" }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: ".65rem", color: m.color, marginBottom: ".4rem", direction: "ltr" }}>{m.num}</div>
                <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "1.3rem", color: "#f3ead5", lineHeight: 1.2, marginBottom: ".25rem" }}>{m.fa_title}</h3>
                <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".65rem", color: "rgba(255,255,255,.3)", direction: "ltr", marginBottom: ".4rem" }}>{m.latin}</p>
                <p style={{ ...FA, fontSize: ".7rem", color: m.color, opacity: .8 }}>{m.mood}</p>
                <div style={{ position: "absolute", bottom: 0, right: 0, left: 0, height: 2, background: `linear-gradient(270deg,${m.color}66,transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Themes */}
      <div style={{ background: "#0a0906", padding: "5rem 2rem", borderTop: "1px solid rgba(255,255,255,.05)", direction: "rtl" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a", marginBottom: ".75rem" }}>نخ‌های تکرارشونده</p>
          <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#f3ead5", marginBottom: "2.5rem" }}>هفت کلمه که <span style={{ color: "#b8893a" }}>کل معنا</span> را حمل می‌کنند</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 1, background: "rgba(255,255,255,.04)" }}>
            {themes.map(t => {
              const open = openTheme?.name_fa === t.name_fa;
              return (
                <div key={t.name_fa} onClick={() => setOpenTheme(open ? null : t)}
                  onMouseEnter={e => { if (!open) e.currentTarget.style.background = "#110f0a"; }}
                  onMouseLeave={e => { if (!open) e.currentTarget.style.background = "#0a0906"; }}
                  style={{ background: open ? "rgba(184,137,58,.1)" : "#0a0906", padding: "1.75rem", cursor: "pointer", borderTop: open ? "2px solid #b8893a" : "2px solid transparent", transition: "all .25s" }}>
                  <div style={{ fontSize: "1.5rem", color: "#b8893a", marginBottom: ".75rem" }}>{t.icon}</div>
                  <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "1.1rem", color: "#b8893a", marginBottom: ".4rem" }}>{t.name_fa}</h3>
                  <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".78rem", color: "rgba(255,255,255,.3)", marginBottom: open ? "1rem" : 0, direction: "ltr" }}>{t.latin}</p>
                  {open && <p style={{ ...FA_SERIF, fontSize: "1rem", color: "rgba(255,255,255,.72)", lineHeight: 2, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: "1rem" }}>{t.desc_fa}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "2.5rem", borderTop: "1px solid rgba(184,137,58,.2)", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a" }}>✦ ولفگانگ آمادئوس موتزارت · کوشل ۶۲۶ · ۱۷۹۱ ✦</p>
      </div>
      <Modal m={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 2 — شعری (Poetic / Parchment)
// ══════════════════════════════════════════════════════════════════════════════
function ViewPoetic() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ background: "#f3ead5", minHeight: "100vh", backgroundImage: "radial-gradient(ellipse at 20% 10%,rgba(184,137,58,.08),transparent 50%),radial-gradient(ellipse at 80% 60%,rgba(107,31,31,.05),transparent 50%)" }}>

      {/* Hero */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "4rem 2rem", textAlign: "center", background: "radial-gradient(ellipse at center,rgba(15,26,46,.93),rgba(7,13,28,.98))", color: "#f3ead5", position: "relative", direction: "rtl" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 30%,rgba(212,166,74,.15),transparent 60%)" }} />
        <p style={{ ...FA, fontSize: ".8rem", color: "#d4a64a", marginBottom: "2.5rem", position: "relative" }}>ریکوییم ✦ کوشل ۶۲۶ ✦ ۱۷۹۱</p>
        <h1 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(2.8rem,8vw,5.5rem)", lineHeight: 1.2, marginBottom: "1.5rem", position: "relative" }}>
          گذر روح<br />
          <span style={{ color: "#d4a64a" }}>از ریکوییم موتزارت</span>
        </h1>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: ".8rem", letterSpacing: ".35em", color: "rgba(243,234,213,.6)", marginBottom: "3rem", position: "relative", direction: "ltr" }}>A MEDITATION IN FIFTEEN MOVEMENTS</p>
        <div style={{ width: 200, height: 1, background: "linear-gradient(90deg,transparent,#b8893a,transparent)", margin: "0 auto 2rem", position: "relative" }}>
          <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "#070d1c", padding: "0 1rem", color: "#d4a64a" }}>✦</span>
        </div>
        <p style={{ ...FA_SERIF, fontSize: "1.2rem", color: "rgba(243,234,213,.85)", maxWidth: 560, lineHeight: 2, position: "relative" }}>
          از نخستین دعا برای آرامش ابدی تا آخرین نور میان قدیسان — مراقبه‌ای بر مرگ، داوری و رحمت که در قبر خود آهنگساز ناتمام ماند.
        </p>
      </div>

      {/* Prologue */}
      <div style={{ padding: "6rem 2rem 4rem", maxWidth: 760, margin: "0 auto", textAlign: "center", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".8rem", color: "#b8893a", marginBottom: "1.5rem" }}>پیش‌درآمد</p>
        <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.6rem,4vw,2.4rem)", color: "#0f1a2e", marginBottom: "2rem", lineHeight: 1.4 }}>آهنگسازی که همراه روحی که می‌نوشت، می‌مُرد.</h2>
        {[
          "در تابستان ۱۷۹۱، پیکی ناشناس با سفارشی برای یک مراسم ریکوییم به در خانه موتزارت آمد. کمیسیون‌دهنده — که بعدها کنت والزگ شناخته شد و قصد داشت اثر را به نام خود جا بزند — هرگز نمی‌دانست که عجیب‌ترین همکاری در تاریخ موسیقی را آغاز کرده.",
          "موتزارت سی و پنج ساله بود. تا پاییز بیمار شد. تا دسامبر موومان‌های ابتدایی را کامل کرده و بیشتر بقیه را طرح‌کلی زده بود و تنها هشت میزان از لاکریموزا نوشته بود، پیش از آنکه دیگر نتواند بنویسد.",
          "آنچه می‌شنوید مراقبه‌ای است درباره گذر روح از زندگی — که توسط مردی ساخته شده که در آن هفته‌های یکسان، دقیقاً همان گذر را می‌کرد.",
        ].map((p, i) => (
          <p key={i} style={{ ...FA_SERIF, fontSize: "1.15rem", color: "rgba(15,26,46,.85)", marginBottom: "1.5rem", lineHeight: 2 }}>{p}</p>
        ))}
      </div>

      {/* Arc */}
      <div style={{ padding: "4rem 2rem 3rem", maxWidth: 1100, margin: "0 auto", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".8rem", color: "#b8893a", marginBottom: ".75rem" }}>قوس احساسی</p>
        <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.5rem)", color: "#0f1a2e", marginBottom: ".75rem" }}>از <span style={{ color: "#6b1f1f" }}>تاریکی</span> به نور</h2>
        <p style={{ ...FA_SERIF, fontStyle: "italic", fontSize: "1.1rem", color: "rgba(15,26,46,.65)", marginBottom: "2.5rem" }}>روی هر موومان کلیک کنید تا متن و معنا را ببینید.</p>
        <div style={{ height: 270 }}><ArcSVG selected={selected} onSelect={setSelected} light /></div>
      </div>

      {/* Spine */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 2rem 6rem", position: "relative", direction: "rtl" }}>
        <div style={{ position: "absolute", right: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,transparent,#b8893a 5%,#b8893a 95%,transparent)", opacity: .25, transform: "translateX(50%)" }} />
        {movements.map((m, idx) => {
          const isRight = idx % 2 === 0;
          return (
            <div key={m.latin} onClick={() => setSelected(m)} style={{ display: "grid", gridTemplateColumns: "1fr 60px 1fr", gap: "2rem", alignItems: "start", marginBottom: "4.5rem", cursor: "pointer" }}>
              <div style={{ gridColumn: isRight ? 1 : 3, gridRow: 1, textAlign: isRight ? "left" : "right", direction: "rtl" }}>
                <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "2rem", color: "#0f1a2e", lineHeight: 1.2, marginBottom: ".25rem" }}>{m.fa_title}</h3>
                <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".85rem", color: "#b8893a", marginBottom: ".75rem", direction: "ltr", textAlign: isRight ? "left" : "right" }}>{m.latin}</p>
                {m.text[0] && (
                  <div style={{ borderTop: "1px solid #b8893a", borderBottom: "1px solid #b8893a", padding: ".75rem 0", margin: ".75rem 0" }}>
                    <p style={{ ...FA_SERIF, fontSize: "1.05rem", color: "#6b1f1f", lineHeight: 1.7, marginBottom: ".3rem" }}>{m.text[0].fa.split("\n")[0]}</p>
                    <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".7rem", color: "rgba(15,26,46,.5)", direction: "ltr", textAlign: isRight ? "left" : "right" }}>{m.text[0].la.split("\n")[0]}</p>
                  </div>
                )}
                <p style={{ ...FA_SERIF, fontSize: "1rem", lineHeight: 2, color: "rgba(15,26,46,.85)" }}>{m.meaning_fa.split("\n\n")[0]}</p>
                {m.note_fa && <p style={{ marginTop: ".75rem", ...FA_SERIF, fontSize: ".9rem", color: "rgba(15,26,46,.55)", borderTop: "1px dotted #b8893a", paddingTop: ".75rem" }}>{m.note_fa}</p>}
              </div>
              <div style={{ gridColumn: 2, gridRow: 1, width: 50, height: 50, borderRadius: "50%", background: "#f3ead5", border: `1px solid #b8893a`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cinzel',serif", fontSize: ".75rem", color: "#b8893a", boxShadow: "0 0 0 6px #f3ead5", margin: "0 auto", alignSelf: "start", marginTop: ".5rem" }}>{m.num}</div>
              <div style={{ gridColumn: isRight ? 3 : 1, gridRow: 1 }} />
            </div>
          );
        })}
      </div>

      {/* Themes dark */}
      <div style={{ background: "#0f1a2e", padding: "6rem 2rem", direction: "rtl" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ ...FA, fontSize: ".8rem", color: "#d4a64a", marginBottom: ".75rem" }}>نخ‌های در تار و پود اثر</p>
          <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.8rem,4vw,3rem)", color: "#f3ead5", marginBottom: "3rem" }}>هفت کلمه که <span style={{ color: "#d4a64a" }}>کل معنا</span> را حمل می‌کنند</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "2rem" }}>
            {themes.map(t => (
              <div key={t.name_fa} style={{ border: "1px solid rgba(184,137,58,.3)", padding: "2rem 1.75rem", background: "rgba(7,13,28,.4)", transition: "all .4s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#d4a64a"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(184,137,58,.3)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: "1.8rem", color: "#d4a64a", marginBottom: "1rem" }}>{t.icon}</div>
                <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "1.2rem", color: "#d4a64a", marginBottom: ".75rem" }}>{t.name_fa}</h3>
                <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".78rem", color: "#b8893a", marginBottom: "1rem", direction: "ltr" }}>{t.latin}</p>
                <p style={{ ...FA_SERIF, fontSize: ".97rem", color: "rgba(243,234,213,.78)", lineHeight: 2 }}>{t.desc_fa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div style={{ padding: "7rem 2rem", maxWidth: 760, margin: "0 auto", textAlign: "center", direction: "rtl" }}>
        <p style={{ color: "#b8893a", fontSize: "1.5rem", letterSpacing: "1rem", marginBottom: "2rem" }}>✦ · ✦ · ✦</p>
        <p style={{ ...FA_SERIF, fontSize: "1.35rem", lineHeight: 2, color: "#0f1a2e", marginBottom: "1.5rem" }}>موتزارت با این اثر ناتمام درگذشت — لاکریموزا در میان جمله قطع شد، روی کلمات <span style={{ color: "#6b1f1f" }}>«گنه‌کاری که باید داوری شود».</span></p>
        <p style={{ ...FA_SERIF, fontSize: "1.35rem", lineHeight: 2, color: "#0f1a2e" }}>آنچه می‌شنوید مراقبه‌ای است درباره مرگ که توسط مردی ساخته شده که در همان هفته‌ها، دقیقاً آن گذر را می‌کرد. ریکوییم فقط درباره گذر روح <span style={{ color: "#6b1f1f" }}>نیست</span>. خودِ گذر روح <span style={{ color: "#6b1f1f" }}>هست</span>.</p>
        <div style={{ marginTop: "3rem", ...FA_SERIF, fontSize: "1.4rem", color: "#6b1f1f", lineHeight: 1.9 }}>
          <div>آرامش ابدی به آنان ببخش، پروردگارا،</div>
          <div>و نور جاودان بر آنان بتابد.</div>
          <div style={{ marginTop: ".75rem", fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(15,26,46,.4)", direction: "ltr" }}>Requiem aeternam dona eis, Domine,<br />et lux perpetua luceat eis.</div>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "2.5rem", borderTop: "1px solid rgba(184,137,58,.3)", direction: "rtl" }}>
        <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a" }}>✦ ولفگانگ آمادئوس موتزارت · کوشل ۶۲۶ · ۱۷۹۱ ✦</p>
      </div>
      <Modal m={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 3 — موزه‌ای (Museum Exhibit)
// ══════════════════════════════════════════════════════════════════════════════
function ViewMuseum() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ background: "#f5f1eb", minHeight: "100vh" }}>

      {/* Museum bar */}
      <div style={{ background: "#1c1816", padding: ".6rem 2rem", display: "flex", justifyContent: "space-between", fontSize: ".7rem", letterSpacing: ".15em", borderBottom: "1px solid #8a6a2f", direction: "rtl" }}>
        <span style={{ ...FA, color: "#b8893a" }}>گالری موسیقی · نمایشگاه ویژه</span>
        <span style={{ ...FA, color: "rgba(245,241,235,.5)" }}>سالن اول · ورود رایگان</span>
      </div>

      {/* Title wall */}
      <div style={{ minHeight: "88vh", background: "#1c1816", color: "#faf7f1", padding: "5rem 3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center", position: "relative", direction: "rtl" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 30%,rgba(184,137,58,.12),transparent 50%),radial-gradient(circle at 80% 70%,rgba(107,31,31,.08),transparent 50%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ ...FA, fontSize: ".75rem", color: "#b8893a", marginBottom: "2rem" }}>نمایشگاه ویژه</div>
          <h1 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1.1, marginBottom: "2rem" }}>
            ریکوییم<br /><span style={{ color: "#b8893a" }}>گذر روح</span>
          </h1>
          <p style={{ ...FA_SERIF, fontSize: "1.4rem", color: "rgba(250,247,241,.8)", marginBottom: "3rem", lineHeight: 1.7 }}>آخرین اثر ولفگانگ آمادئوس موتزارت، در پانزده موومان</p>
          <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a", paddingTop: "2rem", borderTop: "1px solid rgba(184,137,58,.3)" }}>کوشل ۶۲۶ · ساخته شده ۱۷۹۱ · کامل شده ۱۷۹۲</p>
        </div>
        <div style={{ position: "relative", borderRight: "1px solid rgba(184,137,58,.3)", paddingRight: "4rem" }}>
          {[
            "در تابستان ۱۷۹۱، یک کمیسیون‌دهنده ناشناس یک مراسم ریکوییم از ولفگانگ آمادئوس موتزارت سفارش داد. او زنده نمی‌ماند تا آن را تمام کند.",
            "این نمایشگاه موومان به موومان از اثر می‌گذرد — متن لاتین، معنای الهیاتی، و حرکات موسیقایی که موتزارت برای تجسم آن‌ها استفاده کرد.",
            "موتزارت در پنجم دسامبر ۱۷۹۱، در میان جمله، هشت میزان درون لاکریموزا درگذشت. شاگردش فرانتس کساویر زوسمایر نسخه نهایی را کامل کرد.",
          ].map((p, i) => (
            <p key={i} style={{ ...FA_SERIF, fontSize: "1.15rem", lineHeight: 1.9, color: "rgba(250,247,241,.85)", marginBottom: "1.5rem" }}>{p}</p>
          ))}
        </div>
      </div>

      {/* Arc room */}
      <div style={{ padding: "6rem 3rem", background: "#faf7f1", borderBottom: "1px solid #c9bfa9", direction: "rtl" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ ...FA, fontSize: ".75rem", color: "#8a6a2f", marginBottom: ".75rem" }}>گالری اول · جهت‌گیری</p>
          <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#1a1a1a", marginBottom: ".75rem" }}>قوس <span style={{ color: "#8b3a2a" }}>احساسی</span></h2>
          <p style={{ ...FA_SERIF, fontStyle: "italic", fontSize: "1.15rem", color: "#4a4540", marginBottom: "3rem", maxWidth: 700 }}>روی هر نقطه روی قوس یا هر اتاق گالری کلیک کنید تا متن و معنا را بخوانید.</p>
          <div style={{ background: "#f5f1eb", border: "1px solid #c9bfa9", padding: "3rem 2rem", position: "relative" }}>
            <div style={{ position: "absolute", top: -10, right: "2rem", background: "#faf7f1", padding: "0 .75rem", ...FA, fontSize: ".65rem", color: "#8a6a2f" }}>شکل اول</div>
            <div style={{ height: 280 }}><ArcSVG selected={selected} onSelect={setSelected} light /></div>
          </div>
        </div>
      </div>

      {/* Gallery rooms */}
      {movements.map((m, idx) => {
        const even = idx % 2 === 0;
        return (
          <div key={m.latin} onClick={() => setSelected(m)} style={{ padding: "4rem 3rem", borderBottom: "1px solid #c9bfa9", background: even ? "#faf7f1" : "#f5f1eb", cursor: "pointer", transition: "background .2s", direction: "rtl" }}
            onMouseEnter={e => e.currentTarget.style.background = even ? "#f0ece2" : "#ece8de"}
            onMouseLeave={e => e.currentTarget.style.background = even ? "#faf7f1" : "#f5f1eb"}>
            <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "200px 1fr", gap: "3.5rem", alignItems: "start" }}>
              {/* Label */}
              <div style={{ direction: "rtl" }}>
                <p style={{ ...FA, fontSize: ".65rem", color: "#8a6a2f", marginBottom: ".6rem" }}>موومان {m.num}</p>
                <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "1.8rem", color: "#1a1a1a", lineHeight: 1.2, marginBottom: ".4rem" }}>{m.fa_title}</h3>
                <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".85rem", color: "#8a8278", marginBottom: ".4rem", direction: "ltr", textAlign: "right" }}>{m.latin}</p>
                <p style={{ ...FA_SERIF, fontSize: ".95rem", color: "#8a8278", marginBottom: "1.5rem" }}>{m.fa_sub}</p>
                <div style={{ borderTop: "1px solid #c9bfa9", paddingTop: "1rem" }}>
                  {[["گام", m.key], ["حال و هوا", m.mood], ["نویسنده", m.author]].map(([k, v]) => (
                    <div key={k} style={{ paddingBottom: ".5rem", marginBottom: ".5rem", borderBottom: "1px dotted #c9bfa9" }}>
                      <p style={{ ...FA, fontSize: ".6rem", color: "#8a8278", marginBottom: ".15rem" }}>{k}</p>
                      <p style={{ ...FA_SERIF, fontSize: ".92rem", color: "#1a1a1a" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Content */}
              <div style={{ direction: "rtl" }}>
                <div style={{ borderRight: "3px solid #8b3a2a", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,.5)", marginBottom: "2rem" }}>
                  <p style={{ ...FA, fontSize: ".62rem", color: "#8a6a2f", marginBottom: ".75rem" }}>متن لاتین و ترجمه فارسی</p>
                  {m.text.map((t, i) => (
                    <div key={i} style={{ marginBottom: "1rem" }}>
                      <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", fontSize: ".95rem", color: "#8b3a2a", lineHeight: 1.6, marginBottom: ".35rem", direction: "ltr", textAlign: "right", whiteSpace: "pre-line" }}>{t.la}</p>
                      <p style={{ ...FA_SERIF, fontSize: "1.1rem", color: "#2a1a0a", lineHeight: 1.9, whiteSpace: "pre-line" }}>{t.fa}</p>
                    </div>
                  ))}
                </div>
                <p style={{ ...FA, fontSize: ".62rem", color: "#8a6a2f", marginBottom: ".75rem" }}>معنا و شرح</p>
                {m.meaning_fa.split("\n\n").map((p, i) => (
                  <p key={i} style={{ ...FA_SERIF, fontSize: "1.1rem", lineHeight: 2, color: "#4a4540", marginBottom: ".85rem" }}>{p}</p>
                ))}
                {m.note_fa && (
                  <div style={{ background: "rgba(184,137,58,.08)", border: "1px solid rgba(184,137,58,.3)", padding: ".85rem 1.1rem", marginTop: "1rem" }}>
                    <p style={{ ...FA, fontSize: ".6rem", color: "#8a6a2f", marginBottom: ".35rem" }}>یادداشت</p>
                    <p style={{ ...FA_SERIF, fontSize: ".97rem", color: "#4a4540", lineHeight: 1.9 }}>{m.note_fa}</p>
                  </div>
                )}
                <p style={{ ...FA, marginTop: "1.5rem", fontSize: ".65rem", color: "rgba(138,98,47,.5)" }}>← برای جزئیات کامل کلیک کنید</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Vitrines */}
      <div style={{ background: "#1c1816", padding: "6rem 3rem", position: "relative", direction: "rtl" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 25% 30%,rgba(184,137,58,.1),transparent 50%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <p style={{ ...FA, fontSize: ".75rem", color: "#b8893a", marginBottom: ".75rem" }}>گالری دوم · مضامین</p>
          <h2 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.8rem,3.5vw,2.8rem)", color: "#faf7f1", marginBottom: "3rem" }}>هفت کلمه که <span style={{ color: "#b8893a" }}>کل معنا</span> را حمل می‌کنند</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.5rem" }}>
            {themes.map(t => (
              <div key={t.name_fa} style={{ border: "1px solid rgba(184,137,58,.3)", padding: "2.25rem 2rem", background: "rgba(0,0,0,.15)", transition: "all .4s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#b8893a"; e.currentTarget.style.background = "rgba(184,137,58,.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(184,137,58,.3)"; e.currentTarget.style.background = "rgba(0,0,0,.15)"; }}>
                <p style={{ ...FA, fontSize: ".6rem", color: "#b8893a", marginBottom: ".85rem" }}>مضمون</p>
                <h3 style={{ ...FA_SERIF, fontWeight: 700, fontSize: "1.5rem", color: "#faf7f1", marginBottom: ".4rem" }}>{t.name_fa}</h3>
                <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", color: "#b8893a", marginBottom: "1.25rem", direction: "ltr", fontSize: ".78rem" }}>{t.latin}</p>
                <p style={{ ...FA_SERIF, fontSize: "1rem", color: "rgba(250,247,241,.78)", lineHeight: 2 }}>{t.desc_fa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exit wall */}
      <div style={{ background: "#faf7f1", padding: "7rem 3rem", textAlign: "center", direction: "rtl" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ ...FA, fontSize: ".75rem", color: "#8a6a2f", marginBottom: "2rem" }}>دیوار خروج</p>
          <p style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", lineHeight: 1.9, marginBottom: "2rem", color: "#1a1a1a" }}>موتزارت با این اثر ناتمام درگذشت — <span style={{ color: "#8b3a2a" }}>لاکریموزا</span> در میان جمله قطع شد، روی کلماتی برای <span style={{ color: "#8b3a2a" }}>«گنه‌کاری که باید داوری شود».</span></p>
          <p style={{ ...FA_SERIF, fontWeight: 700, fontSize: "clamp(1.3rem,2.5vw,1.7rem)", lineHeight: 1.9, color: "#1a1a1a" }}>آنچه می‌شنوید مراقبه‌ای است درباره مرگ که توسط مردی ساخته شده که دقیقاً همان گذر را می‌کرد. ریکوییم فقط درباره گذر روح <span style={{ color: "#8b3a2a" }}>نیست</span>. خودِ گذر روح <span style={{ color: "#8b3a2a" }}>هست</span>.</p>
          <div style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid #c9bfa9" }}>
            <p style={{ ...FA_SERIF, fontSize: "1.4rem", color: "#8b3a2a", lineHeight: 2 }}>آرامش ابدی به آنان ببخش، پروردگارا،<br />و نور جاودان بر آنان بتابد.</p>
            <p style={{ fontFamily: "'Cinzel',serif", fontStyle: "italic", marginTop: "1rem", fontSize: ".95rem", color: "#4a4540", direction: "ltr" }}>Requiem aeternam dona eis, Domine,<br />et lux perpetua luceat eis.</p>
          </div>
        </div>
      </div>

      <footer style={{ background: "#1c1816", color: "rgba(250,247,241,.45)", padding: "2.5rem 2rem", textAlign: "center", borderTop: "1px solid #8a6a2f", direction: "rtl" }}>
        <span style={{ color: "#b8893a" }}>ولفگانگ آمادئوس موتزارت</span> · ریکوییم در ر مینور · کوشل ۶۲۶ · ۱۷۹۱
      </footer>
      <Modal m={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ROOT
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("interactive");

  const views = [
    { id: "interactive", fa: "تعاملی", en: "Interactive" },
    { id: "poetic", fa: "شعری", en: "Poetic" },
    { id: "museum", fa: "موزه‌ای", en: "Museum" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f0c08; }
        ::-webkit-scrollbar-thumb { background: #3a2a1a; border-radius: 2px; }
        @keyframes slideUp { from { opacity:0;transform:translateY(20px) } to { opacity:1;transform:translateY(0) } }
        @media (max-width: 700px) {
          .tw-grid { grid-template-columns: 1fr !important; }
          .mu-grid { grid-template-columns: 1fr !important; }
          .spine { display: block !important; }
        }
      `}</style>

      {/* SWITCHER */}
      <div style={{ position: "fixed", top: "1rem", left: "50%", transform: "translateX(-50%)", zIndex: 300, background: "rgba(15,12,8,.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(184,137,58,.4)", borderRadius: 100, padding: ".3rem", display: "flex", gap: ".2rem", boxShadow: "0 8px 32px rgba(0,0,0,.4)", direction: "rtl" }}>
        {views.map(v => (
          <button key={v.id} onClick={() => { setView(v.id); window.scrollTo({ top: 0 }); }}
            style={{ fontFamily: "Vazirmatn,Tahoma,sans-serif", fontSize: ".72rem", padding: ".5rem 1.1rem", border: "none", borderRadius: 100, cursor: "pointer", transition: "all .25s", background: view === v.id ? "#b8893a" : "transparent", color: view === v.id ? "#1a1208" : "rgba(245,241,235,.55)", fontWeight: view === v.id ? 700 : 400, direction: "rtl" }}>
            {v.fa}
          </button>
        ))}
      </div>

      {view === "interactive" && <ViewInteractive />}
      {view === "poetic" && <ViewPoetic />}
      {view === "museum" && <ViewMuseum />}
    </>
  );
}
