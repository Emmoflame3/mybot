٨خخخخ// --- في أعلى ملف index.js --

const bannedUsersPath = './banned-users.json'
let bannedUsers = []

// تحميل المحظورين عند بدء البوت
if (fs.existsSync(bannedUsersPath)) {
  bannedUsers = JSON.parse(fs.readFileSync(bannedUsersPath))
}

// حفظ التعديلات
const saveBannedUsers = () => {
  fs.writeFileSync(bannedUsersPath, JSON.stringify(bannedUsers, null, 2))
}

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { downloadContentFromMessage } from '@whiskeysockets/baileys'
import { writeFile } from 'fs/promises'
import { downloadMediaMessage } from '@whiskeysockets/baileys'
const axios = require('axios'); // الآن يعمل بدون خطأ

import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imagePath = path.join(__dirname, 'zenitsu.jpg')

import pkg from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import { exec } from 'child_process'

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = pkg

let botEnabled = true
let isBotReady = false
const ownerId = '38989813805275@lid'
// 🔡 كلمات فعالية الكتابة
const allWritingGames = [
  'ناروتو', 'ايتاتشي', 'ساسكي', 'ايرين', 'ليفاي',
  'تانجيرو', 'نيزوكو', 'غوكو', 'فيجيتا', 'لوفي',
  'زورو', 'شانكس', 'كونان', 'كاكاشي', 'هيسوكا',
  'كيلوا', 'غون', 'كورابيكا', 'سانجي', 'يوسوب',
  'ريوك', 'مادارا', 'زينيتسو', 'إينوسكي', 'هاشيراما',
  'جوحو', 'كاجومي', 'شينوبو', 'دابي', 'ميليوداس'
]
let writingGames = [...allWritingGames]
let activeWord = null
let winner = null

// 🧩 كلمات فعالية التفكيك
const allSplitGames = [
  'غوكو', 'لوفي', 'ناروتو', 'زورو', 'ساسكي',
  'تانجيرو', 'نيزوكو', 'فيجيتا', 'إينوسكي', 'مادارا',
  'كاكاشي', 'ايرين', 'ليفاي', 'شانكس', 'غون',
  'كيلوا', 'كورابيكا', 'ريوك', 'هاشيراما', 'جوحو',
  'شينوبو', 'دابي', 'ميليوداس', 'إيتاتشي', 'كاجومي',
  'هيسوكا', 'سانجي', 'يوسوب', 'كونان', 'سينكو'
]
let splitGames = [...allSplitGames]
let activeSplit = null
let splitWinner = null

// 🔁 كلمات فعالية العكس
const allReverseGames = [
  'ناروتو', 'غوكو', 'لوفي', 'ساسكي', 'فيجيتا',
  'تانجيرو', 'نيزوكو', 'ليفاي', 'ايرين', 'كاكاشي',
  'إينوسكي', 'مادارا', 'غون', 'كيلوا', 'كورابيكا',
  'ريوك', 'جوحو', 'ميليوداس', 'إيتاتشي', 'شانكس',
  'سانجي', 'يوسوب', 'هيسوكا', 'كونان', 'شينوبو',
  'كاجومي', 'دابي', 'سينكو', 'ميكو', 'ايتسوكي'
]
let reverseGames = [...allReverseGames]
let activeReverse = null
let reverseWinner = null
const footballQuestions = {
  1: {
    question: 'من هو الهداف التاريخي لمنتخب البرتغال؟',
    options: ['كريستيانو رونالدو', 'ناني', 'أوزيبيو'],
    answer: 'كريستيانو رونالدو'
  },
  2: {
    question: 'من فاز بكأس العالم 2014؟',
    options: ['البرازيل', 'ألمانيا', 'الأرجنتين'],
    answer: 'ألمانيا'
  },
  3: {
    question: 'كم عدد بطولات دوري أبطال أوروبا لريال مدريد؟',
    options: ['10', '14', '12'],
    answer: '14'
  },
  4: {
    question: 'من هو أكثر لاعب سجل أهدافًا في التاريخ؟',
    options: ['بيليه', 'رونالدو', 'كريستيانو رونالدو'],
    answer: 'كريستيانو رونالدو'
  },
  5: {
    question: 'من هو نادي محمد صلاح الحالي؟',
    options: ['تشيلسي', 'ليفربول', 'روما'],
    answer: 'ليفربول'
  },
  6: {
    question: 'كم مرة فازت فرنسا بكأس العالم؟',
    options: ['مرة', 'مرتين', '3 مرات'],
    answer: 'مرتين'
  },
  7: {
    question: 'من هو حارس مرمى منتخب مصر الأساسي في 2018؟',
    options: ['الشناوي', 'عصام الحضري', 'أبو جبل'],
    answer: 'عصام الحضري'
  },
  8: {
    question: 'من هو هداف كأس العالم 2022؟',
    options: ['ميسي', 'مبابي', 'هالاند'],
    answer: 'مبابي'
  },
  9: {
    question: 'أين أقيمت كأس العالم 2010؟',
    options: ['جنوب أفريقيا', 'ألمانيا', 'البرازيل'],
    answer: 'جنوب أفريقيا'
  },
  10: {
    question: 'من فاز بكأس أمم أوروبا 2016؟',
    options: ['إسبانيا', 'فرنسا', 'البرتغال'],
    answer: 'البرتغال'
  },
  11: {
    question: 'من هو مدرب مانشستر سيتي الحالي؟',
    options: ['بيب غوارديولا', 'كلوب', 'أنشيلوتي'],
    answer: 'بيب غوارديولا'
  },
  12: {
    question: 'من هو أسرع لاعب في فيفا 23؟',
    options: ['فينيسيوس', 'مبابي', 'هالاند'],
    answer: 'مبابي'
  },
  13: {
    question: 'كم عدد اللاعبين في فريق كرة القدم؟',
    options: ['10', '11', '12'],
    answer: '11'
  },
  14: {
    question: 'أين يلعب كريستيانو رونالدو حاليًا؟',
    options: ['النصر السعودي', 'ريال مدريد', 'مانشستر يونايتد'],
    answer: 'النصر السعودي'
  },
  15: {
    question: 'من هو اللاعب العربي الذي فاز بدوري الأبطال مع ليفربول؟',
    options: ['رياض محرز', 'محمد صلاح', 'بن عطية'],
    answer: 'محمد صلاح'
  },
  16: {
    question: 'ما هي الدولة التي فازت بكأس العالم أكثر عدد مرات؟',
    options: ['إيطاليا', 'البرازيل', 'ألمانيا'],
    answer: 'البرازيل'
  },
  17: {
    question: 'من هو هداف كأس العالم عبر التاريخ؟',
    options: ['ميروسلاف كلوزه', 'رونالدو', 'ميسي'],
    answer: 'ميروسلاف كلوزه'
  },
  18: {
    question: 'من هو قائد منتخب الأرجنتين في كأس العالم 2022؟',
    options: ['دي ماريا', 'ميسي', 'أوتاميندي'],
    answer: 'ميسي'
  },
  19: {
    question: 'من هو أشهر مدافع في تاريخ إيطاليا؟',
    options: ['بونوتشي', 'مالديني', 'كانافارو'],
    answer: 'مالديني'
  },
  20: {
    question: 'أين أقيمت كأس العالم 2022؟',
    options: ['قطر', 'روسيا', 'ألمانيا'],
    answer: 'قطر'
  }
}
let activeFootball = {
  number: null,
  answer: null,
  timeout: null,
  answered: false
}
// بيانات أسئلة الأنمي
const animeQuestions = {
  1: {
    question: 'من هو من قتل غوجو ساتورو؟',
    options: ['سوكونا', 'كريف', 'يوجي'],
    answer: 'سوكونا'
  },
  2: {
    question: 'من هو الهوكاجي السابع؟',
    options: ['ميناتو', 'ناروتو', 'كاكاشي'],
    answer: 'ناروتو'
  },
  3: {
    question: 'من هو قبطان قبعة القش؟',
    options: ['لوفي', 'زورو', 'سانجي'],
    answer: 'لوفي'
  },
  4: {
    question: 'من هو قاتل إيتاتشي؟',
    options: ['مادارا', 'ساسكي', 'أوبيتو'],
    answer: 'ساسكي'
  },
  5: {
    question: 'من هو والد غون؟',
    options: ['جين', 'كايت', 'ليوريو'],
    answer: 'جين'
  },
  6: {
    question: 'من يمتلك تيتان المؤسس؟',
    options: ['راينر', 'إيرين', 'آني'],
    answer: 'إيرين'
  },
  7: {
    question: 'من هو قائد فرقة الاستطلاع؟',
    options: ['ليفاي', 'إيروين', 'هانجي'],
    answer: 'ليفاي'
  },
  8: {
    question: 'من هو غول طوكيو؟',
    options: ['توكا', 'كانيكي', 'أريما'],
    answer: 'كانيكي'
  },
  9: {
    question: 'من هو الشينيغامي مع لايت؟',
    options: ['ريوك', 'إل', 'رام'],
    answer: 'ريوك'
  },
  10: {
    question: 'من هو سايتاما؟',
    options: ['البطل المقنع', 'الرجل بنقرة', 'كابتن تسوباسا'],
    answer: 'الرجل بنقرة'
  },
  11: {
    question: 'من هو محقق ديث نوت؟',
    options: ['إل', 'واتاري', 'نيير'],
    answer: 'إل'
  },
  12: {
    question: 'من هو خصم تانجيرو الرئيسي؟',
    options: ['موزان', 'رينغوكو', 'إينوسكي'],
    answer: 'موزان'
  },
  13: {
    question: 'من هو من يستخدم رسائل الموت؟',
    options: ['لايت', 'مات', 'إل'],
    answer: 'لايت'
  },
  14: {
    question: 'من هو الذي يمتلك عين الشارينغان؟',
    options: ['ساسكي', 'غارا', 'روك لي'],
    answer: 'ساسكي'
  },
  15: {
    question: 'من هو ملك القراصنة؟',
    options: ['لوفي', 'روجر', 'اللحية البيضاء'],
    answer: 'روجر'
  },
  16: {
    question: 'من هو قائد الأكاتسوكي؟',
    options: ['باين', 'إيتاتشي', 'توبّي'],
    answer: 'باين'
  },
  17: {
    question: 'من هو أخو ألفونس؟',
    options: ['إدوارد', 'هيوز', 'رووي'],
    answer: 'إدوارد'
  },
  18: {
    question: 'من هو الذي يتحول لسوبر سايان؟',
    options: ['غوكو', 'بيكولو', 'كريلين'],
    answer: 'غوكو'
  },
  19: {
    question: 'من هو صديق كيلوا؟',
    options: ['كورابيكا', 'غون', 'هيسوكا'],
    answer: 'غون'
  },
  20: {
    question: 'من هو مستخدم أنفاس الشمس؟',
    options: ['تانجيرو', 'رينغوكو', 'توميكا'],
    answer: 'تانجيرو'
  }
}

let activeAnime = {
  number: null,
  answer: null,
  timeout: null,
  answered: false
}
const jokes = [
  "😂 مرة واحد دخل محل موبايلات قال للبائع: عندك تلفون ضد الغباء؟ قاله: لا بس عندي كفر 😅",
  "🤣 مرة واحد بخيل اتجوز بخيلة، خلفوا ولد سموه حصالة.",
  "😆 واحد راح للدكتور قاله كل ما أشرب شاي أحس بألم في عيني، قاله الدكتور: شيل الملعقة قبل ما تشرب!",
  "😂 مرة واحد اشترى نظارة جديدة، راح يقرأ الجرائد القديمة يشوف الأخبار تغيرت ولا لأ.",
  "🤣 مرة واحد فتح محل كتب، كتب على المحل: كتبنا عليكم الصيام.",
  "😆 مرة واحد محشش سألته أمه: وين كنت؟ قالها: كنت مع الزمن الجميل.",
  "😂 مرة واحد راح للطبيب قاله: كل ما أشرب شاي أحس بحاجة تبكيني، قاله: جرب من غير بصل.",
  "🤣 واحد اشترى سيارة جديدة، كتب عليها: لا تسرقوني أنا فقير زيكم.",
  "😆 فيه نملة طاحت من فوق السرير ماتت من الضحك لأنها نكتة.",
  "😂 مرة واحد اتصل على مطعم، قاله: هل عندكم بيتزا؟ قاله: نعم، قاله: طيب شوف أحد ثاني أطلب له.",
  "🤣 مرة واحد غبي يذاكر، قال لأخوه: شوف لي حرف B كم بي؟",
  "😆 مرة واحد سأل واحد: إنت نايم؟ قاله: لا أنا في وضع حفظ الطاقة.",
  "😂 وحدة راحت تعمل دايت، حطت صورة بيتزا كخلفية للجوال حتى تتعذب كل مرة تمسكه.",
  "🤣 واحد راح البنك قالهم: ممكن أفتح حساب في فيسبوك؟ قالوا له هذا بنك! قالهم: مش كلكم بتقولوا حساب؟",
  "😆 مرة مدرس رياضيات خلف ولد، سماه: زايد.",
  "😂 واحد سأل صاحبه: إذا شربت شاي بالنعناع، تعتبرني شارب نعناع ولا شاي؟",
  "🤣 مرة واحد مشى جنب مستشفى المجانين، سمعهم بيغنوا: كلنا في الهوا سوا... راح وقع في البالوعة، قالوا له: تحت تحت!",
  "😆 مرة واحد تعب راح لطبيب نفسي، قاله: أنا بتخيل نفسي تلاجة، قاله الدكتور: هدي شوي لا تسرب غاز.",
  "😂 واحد بخيل عمل حفلة، كتب على الدعوة: الحضور بالبطاقة التموينية.",
  "🤣 مرة واحد غبي فتح مطعم سماه: (أكلك علينا)... وبعد شهر أفلس.",
  "😆 مرة واحد نام وهو فاتح الكتاب، صحى والكتاب حافظه.",
  "😂 محشش اتصل على مطعم، قالهم: عندكم عشاء لاثنين؟ قالوا: نعم، قالهم: طيب تعالوا عندي أنا جوعان.",
  "🤣 واحد جاله صرصور في بيته، كتب إعلان: للكراء، شقة مؤثثة بصديق قديم.",
  "😆 واحد يسأل الثاني: بتحب البامية؟ قاله: لا، قاله: بتعرفها؟ قاله: لا، قاله: ليه بتكرهها؟",
  "😂 مرة نملة ركبت دراجة، وقعت... رفعت قضية ضد العجلة.",
  "🤣 واحد ذهب للجزار، قاله: عندك قلب خروف؟ قاله: عندي، قاله: لا تزعلني، كنت بسأل.",
  "😆 محشش قرر يصوم، قاله صاحبه: ليه؟ قاله: عشان أشوف طعم الجوع.",
  "😂 بنت قالت لأبوها: بابا أنا حبيت، قالها: عادي يا بنتي كلنا بنغلط.",
  "🤣 مرة واحد سأل واحد: إيش طموحك؟ قاله: أكون غني، قاله: طب ما تطمح تكون ذكي؟ قاله: لا كده كده مش هعرف أحققها.",
  "😆 واحد سأل جوجل: من أنا؟ رد عليه: بيانات غير كافية.",
];
let sentJokes = {};
const generalFacts = [
  "القرش لا ينام طوال حياته.",
  "أطول نهر في العالم هو نهر النيل.",
  "أول دولة استخدمت طابعة ورقية هي الصين.",
  "القلب يدق حوالي 100,000 مرة في اليوم.",
  "أسرع حيوان على وجه الأرض هو الفهد.",
  "المشتري هو أكبر كوكب في النظام الشمسي.",
  "اللغة الأكثر تحدثًا في العالم هي الصينية.",
  "يحتوي دم الإنسان على الحديد.",
  "العنكبوت ليس من فصيلة الحشرات.",
  "النحلة تموت بعد أن تلسع.",
  "الكهرباء تُكتشف في القرن الثامن عشر.",
  "الذهب لا يصدأ أبدًا.",
  "الزرافة لا تصدر أي صوت تقريبًا.",
  "الخفاش هو الثديي الوحيد القادر على الطيران.",
  "النيزك يحترق عندما يدخل الغلاف الجوي.",
  "العقل البشري يحتوي على 100 مليار خلية عصبية.",
  "القطط ترى في الظلام أفضل من البشر.",
  "أول من مشى على سطح القمر هو نيل آرمسترونغ.",
  "أكثر حاسة قوية عند الكلاب هي الشم.",
  "الأخطبوط يملك ثلاث قلوب.",
  "الفيل لا يستطيع القفز.",
  "التمساح لا يستطيع إخراج لسانه.",
  "أطول عضلة في جسم الإنسان هي عضلة الفخذ.",
  "الحوت الأزرق هو أكبر حيوان على الإطلاق.",
  "الكرة الأرضية مغطاة بـ 71٪ ماء.",
  "التمساح يستطيع العيش بدون طعام لشهور.",
  "الحيوان الذي لا يشرب الماء أبدًا هو الكنغر البري.",
  "الضوء يستغرق 8 دقائق للوصول من الشمس إلى الأرض.",
  "الحرير يُستخرج من دودة القز.",
  "النحل يتعرف على الوجوه كالبشر."
];

let usedFacts = [];
const footballFacts = [
  "بيليه هو اللاعب الوحيد الذي فاز بكأس العالم 3 مرات.",
  "أسرع هدف في تاريخ كأس العالم سُجل بعد 11 ثانية.",
  "رونالدو البرازيلي سجل 15 هدفًا في كأس العالم.",
  "ليونيل ميسي هو أكثر من صنع أهداف في كأس العالم.",
  "كريستيانو رونالدو هو أول لاعب يسجل في 5 نسخ من كأس العالم.",
  "زيدان طُرد في نهائي كأس العالم 2006 بسبب النطحة الشهيرة.",
  "مارادونا سجل هدفًا بيده وسُمي 'يد الله'.",
  "ريال مدريد هو النادي الأكثر تتويجًا بدوري الأبطال.",
  "أكثر منتخب حصل على كأس العالم هو البرازيل (5 مرات).",
  "أول كأس عالم أقيمت في أوروغواي عام 1930.",
  "محمد صلاح من أكثر اللاعبين تسجيلًا في موسم واحد للبريميرليج.",
  "الأرجنتين فازت بكأس العالم 2022 بقيادة ميسي.",
  "الحكم يمكنه طرد مدرب الفريق بالبطاقة الحمراء.",
  "عدد حكام المباراة هو 4 (الساحة، مساعدين، رابع).",
  "أكبر نتيجة في تاريخ كأس العالم كانت 10-1.",
  "يوفنتوس هبط للدرجة الثانية بسبب فضيحة تلاعب.",
  "نيمار هو أكثر لاعب تعرض للعرقلة في كأس العالم 2018.",
  "أول هدف ذهبي في كأس العالم سجله لوران بلان.",
  "مانشستر سيتي فاز بالثلاثية التاريخية في 2023.",
  "الدوري الإنجليزي هو الأقوى من حيث المشاهدة عالميًا.",
  "أول كأس أمم أفريقيا أُقيمت عام 1957.",
  "الكاميرون أكثر المنتخبات الإفريقية فوزًا بكأس الأمم.",
  "أول لاعب عربي يسجل هاتريك في كأس العالم هو السعودي سامي الجابر.",
  "الكرة المستعملة في كأس العالم 2018 كانت 'Telstar 18'.",
  "أول ركلة جزاء في كأس العالم كانت عام 1930.",
  "كأس العالم للسيدات بدأ عام 1991.",
  "الحكم لا يمكنه تغيير قراره بعد استئناف اللعب.",
  "الهدف الذهبي ألغي بعد 2004.",
  "عدد الفرق المشاركة في كأس العالم 2026 سيكون 48.",
  "أصغر لاعب شارك في كأس العالم هو نورمان وايتسايد بعمر 17 عامًا."
];

let usedFootballFacts = [];
const christianVerses = [
  "«أُحِبُّوا بَعْضُكُمْ بَعْضًا كَمَا أَحْبَبْتُكُمْ أَنَا» - يوحنا ١٣:٣٤",
  "«كُلَّ مَا تُرِيدُونَ أَنْ يَفْعَلَ النَّاسُ بِكُمْ، افْعَلُوا هكَذَا أَنْتُمْ أَيْضًا بِهِمْ» - متى ٧:١٢",
  "«الرَّبُّ نُورِي وَخَلاَصِي، مِمَّنْ أَخَافُ؟» - مزمور ٢٧:١",
  "«لَا تَدِينُوا لِكَيْ لاَ تُدَانُوا» - متى ٧:١",
  "«الرَّبُّ رَاعِيَّ فَلَا يُعْوِزُنِي شَيْءٌ» - مزمور ٢٣:١",
  "«تَعَالَوْا إِلَيَّ يَا جَمِيعَ الْمُتْعَبِينَ» - متى ١١:٢٨",
  "«سَلاَمِي أُعْطِيكُمْ» - يوحنا ١٤:٢٧",
  "«مَنْ يُثَابِرْ إِلَى الْمُنْتَهَى فَهُوَ يُخَلَّصُ» - متى ٢٤:١٣",
  "«بِالنِّعْمَةِ أَنْتُمْ مُخَلَّصُونَ» - أفسس ٢:٨",
  "«لاَ تَهْتَمُّوا لِشَيْءٍ» - فيلبي ٤:٦",
  "«طُوبَى لِلْوُدَعَاءِ، لِأَنَّهُمْ يَرِثُونَ الْأَرْضَ» - متى ٥:٥",
  "«كُونُوا رُحَمَاءَ، كَمَا أَنَّ أَبَاكُمْ رَحِيمٌ» - لوقا ٦:٣٦",
  "«إِنْ أَحْبَبْتُمْ بَعْضُكُمْ بَعْضًا، فَبِهَذَا يَعْرِفُ الْجَمِيعُ أَنَّكُمْ تَلَامِيذِي» - يوحنا ١٣:٣٥",
  "«كُلُّ شَيْءٍ يَجْتَمِعُ لِلْخَيْرِ لِلَّذِينَ يُحِبُّونَ اللهَ» - رومية ٨:٢٨",
  "«الرب قريب لكل من يدعوه» - مزمور ١٤٥:١٨",
  "«الذي فيكم أعظم من الذي في العالم» - ١ يوحنا ٤:٤",
  "«اثبتوا في محبتي» - يوحنا ١٥:٩",
  "«لِيَ الْحَيَاةُ هِيَ الْمَسِيحُ» - فيلبي ١:٢١",
  "«سراجٌ لرجلي كلامك» - مزمور ١١٩:١٠٥",
  "«كُونُوا نَاسِكِينَ وَاصْحُوا» - بطرس الأولى ٥:٨",
  "«مَجْدًا لِلَّهِ فِي الْعُلاَ» - لوقا ٢:١٤",
  "«لاَ تَخَفْ، لأَنِّي مَعَكَ» - إشعياء ٤١:١٠",
  "«اغفروا يُغفر لكم» - لوقا ٦:٣٧",
  "«كُونُوا مُتَمَثِّلِينَ بِاللَّهِ كَأَوْلاَدٍ أَحِبَّاءَ» - أفسس ٥:١",
  "«فِي الضِّيقِ تَفَاءَلُوا، لِأَنِّي قَدْ غَلَبْتُ الْعَالَمَ» - يوحنا ١٦:٣٣",
  "«أحْسِنُوا إِلَى مُبْغِضِيكُمْ» - لوقا ٦:٢٧",
  "«مَنْ يُحِبُّ أَخَاهُ، يَثْبُتُ فِي النُّورِ» - ١ يوحنا ٢:١٠",
  "«اِفْرَحُوا فِي الرَّبِّ كُلَّ حِينٍ» - فيلبي ٤:٤",
  "«كُلُّ مَا تَفْعَلُونَهُ، فَافْعَلُوا كُلَّ شَيْءٍ لِمَجْدِ اللهِ» - ١ كورنثوس ١٠:٣١",
  "«مَن يزرع بالبركة فبالبركة أيضًا يحصد» - ٢ كورنثوس ٩:٦"
];
const islamicVerses = [
  '﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾ [الشرح:6]',
  '﴿ وَعَسَىٰ أَن تَكْرَهُوا۟ شَيْـًٔا وَهُوَ خَيْرٌۭ لَّكُمْ ﴾ [البقرة:216]',
  '﴿ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ﴾ [الزمر:53]',
  '﴿ وَمَا تَوْفِيقِىٓ إِلَّا بِٱللَّهِ ﴾ [هود:88]',
  '﴿ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ ﴾ [البقرة:153]',
  '﴿ فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا ﴾ [الشرح:5]',
  '﴿ رَّبِّ ٱشْرَحْ لِى صَدْرِى ﴾ [طه:25]',
  '﴿ وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًۭا ﴾ [الطلاق:2]',
  '﴿ وَقُل رَّبِّ زِدْنِى عِلْمًۭا ﴾ [طه:114]',
  '﴿ فَصَبْرٌۭ جَمِيلٌۭ ﴾ [يوسف:18]',
  '﴿ إِنَّ رَبِّى لَسَمِيعُ ٱلدُّعَآءِ ﴾ [إبراهيم:39]',
  '﴿ وَرَحْمَتِى وَسِعَتْ كُلَّ شَىْءٍ ﴾ [الأعراف:156]',
  '﴿ إِنَّ ٱللَّهَ غَفُورٌۭ رَّحِيمٌۭ ﴾ [البقرة:173]',
  '﴿ فَإِنِّى قَرِيبٌ ﴾ [البقرة:186]',
  '﴿ ٱللهُ نُورُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ﴾ [النور:35]',
  '﴿ وَمَا تَدْرِى نَفْسٌۭ مَّاذَا تَكْسِبُ غَدًۭا ﴾ [لقمان:34]',
  '﴿ وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ ﴾ [آل عمران:139]',
  '﴿ إِنَّ مَعَ ٱلصَّبْرِ نَصْرًۭا ﴾ [الأنفال:46]',
  '﴿ إِنَّ رَبِّى قَرِيبٌۭ مُّجِيبٌۭ ﴾ [هود:61]',
  '﴿ إِنَّ ٱللَّهَ كَانَ عَلَيْكُمْ رَقِيبًۭا ﴾ [النساء:1]',
  '﴿ ٱللَّهُ خَيْرٌۭ حَـٰفِظًۭا ﴾ [يوسف:64]',
  '﴿ إِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ ﴾ [التوبة:120]',
  '﴿ وَعِندَهُۥ مَفَاتِحُ ٱلْغَيْبِ ﴾ [الأنعام:59]',
  '﴿ وَٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ﴾ [البقرة:45]',
  '﴿ إِنَّ ٱللَّهَ يُحِبُّ ٱلتَّوَّابِينَ ﴾ [البقرة:222]',
  '﴿ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُ ﴾ [الطلاق:3]',
  '﴿ إِنَّهُۥ بِكُلِّ شَىْءٍۢ عَلِيمٌۭ ﴾ [الأنعام:101]',
  '﴿ ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ﴾ [البقرة:255]',
  '﴿ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ﴾ [الفاتحة:2]',
  '﴿ وَمَا بِكُم مِّن نِّعْمَةٍۢ فَمِنَ ٱللَّهِ ﴾ [النحل:53]'
]
const flagActivities = [
  { flag: '🇦🇷', country: 'الأرجنتين' },
  { flag: '🇧🇷', country: 'البرازيل' },
  { flag: '🇸🇦', country: 'السعودية' },
  { flag: '🇪🇬', country: 'مصر' },
  { flag: '🇯🇵', country: 'اليابان' },
  { flag: '🇩🇪', country: 'ألمانيا' },
  { flag: '🇫🇷', country: 'فرنسا' },
  { flag: '🇨🇳', country: 'الصين' },
  { flag: '🇮🇹', country: 'إيطاليا' },
  { flag: '🇲🇦', country: 'المغرب' },
  { flag: '🇹🇳', country: 'تونس' },
  { flag: '🇩🇿', country: 'الجزائر' },
  { flag: '🇰🇼', country: 'الكويت' },
  { flag: '🇶🇦', country: 'قطر' },
  { flag: '🇦🇪', country: 'الإمارات' },
  { flag: '🇵🇸', country: 'فلسطين' },
  { flag: '🇱🇧', country: 'لبنان' },
  { flag: '🇸🇾', country: 'سوريا' },
  { flag: '🇮🇶', country: 'العراق' },
  { flag: '🇸🇩', country: 'السودان' },
  { flag: '🇺🇸', country: 'أمريكا' },
  { flag: '🇨🇦', country: 'كندا' },
  { flag: '🇬🇧', country: 'بريطانيا' },
  { flag: '🇪🇸', country: 'إسبانيا' },
  { flag: '🇳🇱', country: 'هولندا' },
  { flag: '🇸🇪', country: 'السويد' },
  { flag: '🇳🇴', country: 'النرويج' },
  { flag: '🇮🇳', country: 'الهند' },
  { flag: '🇰🇷', country: 'كوريا الجنوبية' },
  { flag: '🇹🇷', country: 'تركيا' },
];
let currentFlag = null;
let usedFlags = [];
let flagAnswered = false;
// 💰 إعداد نظام البنك
const bankDB = JSON.parse(fs.existsSync('./bank.json') ? fs.readFileSync('./bank.json') : '{}')
const saveBank = () => fs.writeFileSync('./bank.json', JSON.stringify(bankDB, null, 2))

const levels = [
  { name: "فقير جدًا", limit: 50, min: 0, max: 10000 },
  { name: "فقير", limit: 150, min: 10000, max: 30000 },
  { name: "محتاج", limit: 300, min: 30000, max: 70000 },
  { name: "مبتدئ", limit: 600, min: 70000, max: 140000 },
  { name: "عادي", limit: 1000, min: 140000, max: 400000 },
  { name: "متوسط", limit: 2000, min: 400000, max: 600000 },
  { name: "غني", limit: 3500, min: 600000, max: 999999 },
  { name: "مليونير", limit: 6000, min: 1000000, max: 9999999 },
  { name: "ملياردير", limit: 10000, min: 1000000000, max: 999999999 }
]

function getUserBank(id) {
  if (!bankDB[id]) {
    bankDB[id] = { balance: 0 }
    saveBank()
  }
  return bankDB[id]
}

function getUserLevel(balance) {
  for (let i = 0; i < levels.length; i++) {
    if (balance >= levels[i].min && balance < levels[i].max) {
      return { level: levels[i].name, limit: levels[i].limit }
    }
  }
  // بدلًا من "أسطورة"، نُعيد المستوى الأخير (ملياردير)
  const lastLevel = levels[levels.length - 1]
  return { level: lastLevel.name, limit: lastLevel.limit }
}
const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./auth_info')
  const { version } = await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const isGroup = msg.key.remoteJid.endsWith('@g.us')
    const internalId = msg.key.participant || msg.key.remoteJid
    const chatId = msg.key.remoteJid

    if (!botEnabled && internalId !== ownerId) return

    let text = ''
    if (msg.message.conversation) text = msg.message.conversation
    else if (msg.message.extendedTextMessage?.text) text = msg.message.extendedTextMessage.text
const axios = require('axios')
const { exec } = require('child_process')
const fs = require('fs')
const sender = msg.key.participant || msg.key.remoteJid;
if (bannedUsers.includes(sender)) return;
// هذا يفترض أن لديك المتغيرات التالية معرفة مسبقاً:
// - sock (الموديل المسؤول عن الإرسال)
// - msg (الرسالة الأصلية)
// - chatId (رقم الشات)
// - text (نص الرسالة)
if (bannedUsers.includes(sender)) return

if (text === '.حقائق كروية') {
  if (usedFootballFacts.length === footballFacts.length) {
    usedFootballFacts = []; // إعادة التهيئة بعد استخدام كل الحقائق
  }

  const remainingFacts = footballFacts.filter(fact => !usedFootballFacts.includes(fact));
  const randomFact = remainingFacts[Math.floor(Math.random() * remainingFacts.length)];

  usedFootballFacts.push(randomFact);
const from = msg.key.remoteJid;

  await sock.sendMessage(from, { text: `⚽ حقيقة كروية:\n\n${randomFact}` }, { quoted: msg });
}
if (text === '.معلومات عامة') {
  if (usedFacts.length === generalFacts.length) {
    usedFacts = []; // إعادة التهيئة بعد استخدام كل المعلومات
  }

  // احصل على معلومات لم يتم استخدامها
  const remainingFacts = generalFacts.filter(fact => !usedFacts.includes(fact));
  const randomFact = remainingFacts[Math.floor(Math.random() * remainingFacts.length)];

  usedFacts.push(randomFact); // أضفها للقائمة المستخدمة
const from = msg.key.remoteJid;

  await sock.sendMessage(from, { text: `🧠 معلومة عامة:\n\n${randomFact}` }, { quoted: msg });
}

if (text?.startsWith('.حظر') || text?.startsWith('.فك الحظر')) {
    if (sender !== '38989813805275@lid') return

    let mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
    let replied = msg.message?.extendedTextMessage?.contextInfo?.participant
    let target = mentioned || replied

    if (!target) {
      await sock.sendMessage(msg.key.remoteJid, {
        text: '❌ يجب الرد على رسالة أو منشن المستخدم لحظره أو فكه.',
      }, { quoted: msg })
      return
    }

    if (text.startsWith('.حظر')) {
      if (bannedUsers.includes(target)) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: '🔒 المستخدم محظور بالفعل.',
        }, { quoted: msg })
      } else {
        bannedUsers.push(target)
        saveBannedUsers()
        await sock.sendMessage(msg.key.remoteJid, {
          text: `✅ تم حظر @${target.split('@')[0]} من استخدام البوت.`,
          mentions: [target],
        }, { quoted: msg })
      }
    }

    if (text.startsWith('.فك الحظر')) {
      if (!bannedUsers.includes(target)) {
        await sock.sendMessage(msg.key.remoteJid, {
          text: 'ℹ️ المستخدم غير محظور.',
        }, { quoted: msg })
      } else {
        bannedUsers = bannedUsers.filter(u => u !== target)
        saveBannedUsers()
        await sock.sendMessage(msg.key.remoteJid, {
          text: `🔓 تم فك الحظر عن @${target.split('@')[0]}.`,
          mentions: [target],
        }, { quoted: msg })
      }
    }
  }
    // 💰 .بنك
    if (text === '.بنك') {
      const user = getUserBank(internalId)
      const { level, limit } = getUserLevel(user.balance)
      await sock.sendMessage(chatId, {
        text: `🏦 حسابك البنكي الخاص:

👤 المنشن: @${internalId.split('@')[0]}
💰 الثروة: ${user.balance} جنيه
📈 حالتك المالية: ${level}
🔐 حد الإيداع: ${limit} جنيه

💡 هذا البنك الخاص بالجروب.
شارك في الفعاليات 🔥
اكتب: .ايداع 📥 لزيادة رصيدك بجنيه
او .ايداع [رقم] لإيداع رقم معين`,
        mentions: [internalId]
      }, { quoted: msg })
    }
if (text.startsWith('.كرة')) {
  const num = parseInt(text.split(' ')[1])
  if (!num || !footballQuestions[num]) {
    await sock.sendMessage(chatId, { text: '❌ رقم السؤال غير صحيح أو غير موجود (من 1 إلى 20).' }, { quoted: msg })
    return
  }

  if (activeFootball.answered === false && activeFootball.number !== null) {
    await sock.sendMessage(chatId, { text: '❗ هناك سؤال قيد اللعب، انتظر حتى ينتهي.' }, { quoted: msg })
    return
  }

  const q = footballQuestions[num]
  const questionText =
    `╭━━━【⚽ سؤال كرة القدم ${num} 】━━━╮\n` +
    `┃\n` +
    `┃ 🧠 *${q.question}*\n` +
    `┃\n` +
    `┃ - ${q.options[0]}\n` +
    `┃ - ${q.options[1]}\n` +
    `┃ - ${q.options[2]}\n` +
    `╰━━━━━━━━━━━━━━━━━━━━╯`

  await sock.sendMessage(chatId, { text: questionText }, { quoted: msg })

  activeFootball = {
    number: num,
    answer: q.answer,
    answered: false
  }
}

if (activeFootball.answer && text.trim() === activeFootball.answer && !activeFootball.answered) {
  activeFootball.answered = true

  const winnerMention = msg.key.participant || msg.key.remoteJid
  await sock.sendMessage(chatId, {
    text:
      `╭━━━┫ 🎊 تهانينا 🎊 ┣━━━╮\n` +
      `الفائز @${winnerMention.split('@')[0]}\n` +
      `┃ ✅ لقد أنهيت السؤال بنجاح\n` +
      `┃ ⚽ انت خبير كروي\n` +
      `┃ 🤝 استمر في التعلم والمعرفة\n` +
      `╰━━━━━━━━━━━━━━━━━━╯`,
    mentions: [winnerMention]
  }, { quoted: msg })

  // ❗ إعادة تعيين الحالة بعد إعلان الفائز
  activeFootball = {
    number: null,
    answer: null,
    answered: false
  }
      }
    
