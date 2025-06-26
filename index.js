// --- في أعلى ملف index.js --

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
    if (text === '.النكات') {
  const from = msg.key.remoteJid; // ✅ مهم: هذا يحل خطأ "from is not defined"
  const senderId = msg.key.participant || msg.key.remoteJid; // معرف الشخص الذي أرسل الرسالة

  if (!sentJokes[senderId]) sentJokes[senderId] = [];

  const remainingJokes = jokes.filter((_, i) => !sentJokes[senderId].includes(i));

  if (remainingJokes.length === 0) {
    sentJokes[senderId] = [];
  }

  const freshJokes = jokes.filter((_, i) => !sentJokes[senderId].includes(i));
  const randomIndex = Math.floor(Math.random() * freshJokes.length);
  const joke = freshJokes[randomIndex];
  const actualIndex = jokes.indexOf(joke);

  sentJokes[senderId].push(actualIndex);

  await sock.sendMessage(from, { text: joke }, { quoted: msg });
}
if (text.startsWith('.مخفي') && isGroup) {
  const metadata = await sock.groupMetadata(chatId);
  const allMembers = metadata.participants.map(p => p.id);

  const textToSend = text.slice(6).trim();
  if (!textToSend) {
    return await sock.sendMessage(chatId, {
      text: '❌ اكتب الرسالة بعد الأمر.',
      quoted: msg
    });
  }

  // رسالة فيها منشن مخفي فقط
  await sock.sendMessage(chatId, {
    text: textToSend,
    mentions: allMembers
  });
}
    // 💵 .ايداع بدون رقم
    if (text === '.ايداع') {
      const user = getUserBank(internalId)
      const { limit } = getUserLevel(user.balance)
      if (user.balance + 1 > limit) {
        await sock.sendMessage(chatId, {
          text: `❌ لقد وصلت حدك الأعلى وهو ${limit} جنيه.\n💡 حالتك لا تسمح بإيداع أكثر.`,
        }, { quoted: msg })
      } else {
        user.balance += 1
        saveBank()
        await sock.sendMessage(chatId, {
          text: `✅ تم إيداع 1 جنيه. رصيدك الحالي: ${user.balance}`
        }, { quoted: msg })
      }
    }
if (text.startsWith('.انمي')) {
  const num = parseInt(text.slice(5).trim());

  if (isNaN(num) || !animeQuestions[num]) return;

  if (activeAnime.answered && activeAnime.number === num) {
    await sock.sendMessage(chatId, { text: '❌ السؤال خلصان من بدري يا حلو 😅' }, { quoted: msg });
    return;
  }

  const q = animeQuestions[num];
  const questionText = `
╭━━━【🎌 سؤال أنمي ${num} 】━━━╮
┃
┃ 🧠 ${q.question}
┃
┃ - ${q.options[0]}
┃ - ${q.options[1]}
┃ - ${q.options[2]}
┃
╰━━━━━━━━━━━━━━━━━━━━╯`;

  activeAnime = {
    number: num,
    answer: q.answer,
    answered: false
  };

  await sock.sendMessage(chatId, { text: questionText }, { quoted: msg });
}

if (
  activeAnime.number !== null &&
  !activeAnime.answered &&
  text.trim() === activeAnime.answer
) {
  activeAnime.answered = true;
  const sender = msg.key.participant || msg.key.remoteJid;

  await sock.sendMessage(chatId, {
    text: `╭━━━┫ 🎊 *تهانينا* 🎊 ┣━━━╮
الفائز @${sender.split('@')[0]}
┃ ✅ لقد أنهيت السؤال بنجاح
┃ 💐 انت اوتاكو مخضرم
┃ 🤝 استمر في المشاهده والتعلم
╰━━━━━━━━━━━━━━━━━━╯`,
    mentions: [sender]
  }, { quoted: msg });

  // ✨ إعادة ضبط الحالة مباشرة بعد إعلان الفائز
  activeAnime = {
    number: null,
    answer: null,
    answered: false
  };
}
    // 💵 .ايداع رقم
    if (text.startsWith('.ايداع ')) {
      const amount = parseInt(text.split('.ايداع ')[1])
      if (isNaN(amount) || amount <= 0) {
        await sock.sendMessage(chatId, {
          text: '⚠️ يجب كتابة رقم صحيح بعد .ايداع'
        }, { quoted: msg })
        return
      }

      const user = getUserBank(internalId)
      const { limit } = getUserLevel(user.balance)
      if (user.balance + amount > limit) {
        await sock.sendMessage(chatId, {
          text: `❌ هذا الرقم يتجاوز حدك الأعلى (${limit}).\n💰 رصيدك الحالي: ${user.balance}`
        }, { quoted: msg })
      } else {
        user.balance += amount
        saveBank()
        await sock.sendMessage(chatId, {
          text: `✅ تم إيداع ${amount} جنيه بنجاح.\n💰 رصيدك الآن: ${user.balance}`
        }, { quoted: msg })
      }
    }

if (text === '.منشن' && isGroup) {
      const metadata = await sock.groupMetadata(chatId)
      const mentions = metadata.participants.map(p => p.id)
      await sock.sendMessage(chatId, {
        text: '📢 منشن جماعي للجميع:',
        mentions
      }, { quoted: msg })
    }
 
    // 🎯 أمر تحويل المال
    if (text.startsWith('.تحويل ')) {
      const amount = parseInt(text.split('.تحويل ')[1])
      if (isNaN(amount) || amount <= 0) {
        await sock.sendMessage(chatId, {
          text: '⚠️ يجب كتابة رقم صالح بعد .تحويل'
        }, { quoted: msg })
        return
      }

      const sender = getUserBank(internalId)
      let receiverId = null
      if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        receiverId = msg.message.extendedTextMessage.contextInfo.mentionedJid[0]
      } else if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
        receiverId = msg.message.extendedTextMessage.contextInfo.participant
      }

      if (!receiverId || receiverId === internalId) {
        await sock.sendMessage(chatId, {
          text: '⚠️ يجب منشن شخص أو الرد على رسالته لإرسال المال إليه.'
        }, { quoted: msg })
        return
      }

      if (sender.balance < amount) {
        await sock.sendMessage(chatId, {
          text: `❌ لا يمكنك تحويل ${amount} جنيه لأن رصيدك ${sender.balance} فقط.`
        }, { quoted: msg })
        return
      }

      const receiver = getUserBank(receiverId)
      sender.balance -= amount
      receiver.balance += amount
      saveBank()

      await sock.sendMessage(chatId, {
        text: `✅ تم تحويل ${amount} جنيه بنجاح.

🔁 من: @${internalId.split('@')[0]}
📥 إلى: @${receiverId.split('@')[0]}

💰 رصيدك الجديد: ${sender.balance}`,
        mentions: [internalId, receiverId]
      }, { quoted: msg })
    }

    // 🏴‍☠️ أمر السرقة (خاص بالمطور فقط)
    if (text.startsWith('.سرقة ') && internalId === ownerId) {
      const amount = parseInt(text.split('.سرقة ')[1])
      if (isNaN(amount) || amount <= 0) {
        await sock.sendMessage(chatId, {
          text: '⚠️ يجب كتابة رقم صالح بعد .سرقة'
        }, { quoted: msg })
        return
      }

      let targetId = null
      if (msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        targetId = msg.message.extendedTextMessage.contextInfo.mentionedJid[0]
      } else if (msg.message?.extendedTextMessage?.contextInfo?.participant) {
        targetId = msg.message.extendedTextMessage.contextInfo.participant
      }

      if (!targetId || targetId === internalId) {
        await sock.sendMessage(chatId, {
          text: '⚠️ يجب منشن شخص أو الرد على رسالته لسرقته.'
        }, { quoted: msg })
        return
      }

      const targetUser = getUserBank(targetId)
      const thiefUser = getUserBank(ownerId)

      if (targetUser.balance < amount) {
        await sock.sendMessage(chatId, {
          text: `❌ لا يمكن سرقة ${amount} جنيه لأن رصيد الشخص المستهدف ${targetUser.balance} فقط.`
        }, { quoted: msg })
        return
      }

      targetUser.balance -= amount
      thiefUser.balance += amount
      saveBank()

      await sock.sendMessage(chatId, {
        text: `🏴‍☠️ تمت سرقة ${amount} جنيه بنجاح!

👤 المسروق: @${targetId.split('@')[0]}
🕵️‍♂️ السارق: @${ownerId.split('@')[0]}

💰 رصيد الضحية الآن: ${targetUser.balance}
💰 رصيدك الجديد: ${thiefUser.balance}
`,
        mentions: [targetId, ownerId]
      }, { quoted: msg })
    }
// ✍️ فعالية الكتابة
    if (text === '.كتابة') {
      if (writingGames.length === 0) writingGames = [...allWritingGames]
      const randomIndex = Math.floor(Math.random() * writingGames.length)
      activeWord = writingGames[randomIndex]
      winner = null
      writingGames.splice(randomIndex, 1)

      await sock.sendMessage(chatId, {
        text: `┏━━━〔 ✍️ فعالية الكتابة 〕━━━┓

💬 المطلوب: قم بكتابة الكلمة بشكل صحيح!

📌 الكلمة: ⟪ ${activeWord} ⟫
🎤 المُقدّم: ⟪ زينيتسو ⟫
┗━━━━━━━━━━━━━━━━━━┛`
      }, { quoted: msg })
    }

    // ✅ التحقق من إجابة الكتابة
    else if (activeWord && text.trim() === activeWord) {
      if (winner) {
        await sock.sendMessage(chatId, {
          text: '❗ السؤال خلصان من بدري يا حلو'
        }, { quoted: msg })
      } else {
        winner = msg.key.participant || msg.key.remoteJid
        const user = getUserBank(winner)
        user.balance += 5000
        saveBank()

        await sock.sendMessage(chatId, {
          text: `╭━━━┫ 🎊 تهانينا 🎊 ┣━━━╮

┃ الفائز: @${winner.split('@')[0]}
✅ أنهيت الفعالية بنجاح!
┃ 💸 تمت إضافة 5K إلى رصيدك
┃ ✨ شارك دائمًا وكن الأسرع
╰━━━━━━━━━━━━━━━━━━╯
✦ اكتب: .بنك 📎 لعرض رصيدك`,
          mentions: [winner]
        }, { quoted: msg })

        activeWord = null
      }
    }

    // 🧩 فعالية التفكيك
    if (text === '.تفكيك') {
      if (splitGames.length === 0) splitGames = [...allSplitGames]
      const randomIndex = Math.floor(Math.random() * splitGames.length)
      activeSplit = splitGames[randomIndex]
      splitWinner = null
      splitGames.splice(randomIndex, 1)

      await sock.sendMessage(chatId, {
        text: `┏━━━〔 ✂️ فعالية التفكيك 〕━━━┓
💬 المطلوب: قم بتفكيك الكلمة بشكل صحيح!

📌 الكلمة: ⟪ ${activeSplit} ⟫
🎤 المُقدّم: ⟪ زينيتسو ⟫
┗━━━━━━━━━━━━━━━━━┛`
      }, { quoted: msg })
    }

    // ✅ التحقق من إجابة التفكيك
    else if (activeSplit && text.trim().replace(/ /g, '') === activeSplit) {
      if (splitWinner) {
        await sock.sendMessage(chatId, {
          text: '❗ الفعالية تم حلها بالفعل يا بطل!'
        }, { quoted: msg })
      } else {
        splitWinner = msg.key.participant || msg.key.remoteJid
        const user = getUserBank(splitWinner)
        user.balance += 5000
        saveBank()

        await sock.sendMessage(chatId, {
          text: `╭━━━┫ 🎉 تهانينا ┣━━━╮

🏆 الفائز: @${splitWinner.split('@')[0]}
✂️ أنهيت فعالية التفكيك بنجاح!
💰 تمت إضافة 5K إلى رصيدك البنكي

✨ استمر في التفاعل مع الفعاليات لتكسب أكثر!
╰━━━━━━━━━━━━━━━━━━━━╯
اكتب: .بنك 📎 لعرض رصيدك`,
          mentions: [splitWinner]
        }, { quoted: msg })

        activeSplit = null
      }
    }

    // 🔁 فعالية العكس
    if (text === '.عكس') {
      if (reverseGames.length === 0) reverseGames = [...allReverseGames]
      const randomIndex = Math.floor(Math.random() * reverseGames.length)
      activeReverse = reverseGames[randomIndex]
      reverseWinner = null
      reverseGames.splice(randomIndex, 1)

      await sock.sendMessage(chatId, {
        text: `┏━━━〔 🔁 فعالية العَكـس 〕━━━┓
💬 المطلوب: قم بعكس الكلمة بشكل صحيح!

📌 الكلمة: ⟪ ${activeReverse} ⟫  
🎤 المُقدّم: ⟪ زينيتسو ⟫
┗━━━━━━━━━━━━━━━━━━┛`
      }, { quoted: msg })
    }

    // ✅ التحقق من إجابة العكس
    else if (activeReverse && text.trim() === [...activeReverse].reverse().join('')) {
      if (reverseWinner) {
        await sock.sendMessage(chatId, {
          text: '❗ الفعالية تم حلها بالفعل يا نجم.'
        }, { quoted: msg })
      } else {
        reverseWinner = msg.key.participant || msg.key.remoteJid
        const user = getUserBank(reverseWinner)
        user.balance += 5000
        saveBank()

        await sock.sendMessage(chatId, {
          text: `╭━━━┫ 🎉 تهانينا ┣━━━╮

🏆 الفائز: @${reverseWinner.split('@')[0]}
🔁 أنهيت فعالية العَكـس بنجاح!
💰 تمت إضافة 5K إلى رصيدك البنكي

✨ استمر في التفاعل مع الفعاليات لتكسب أكثر!
╰━━━━━━━━━━━━━━━━━━━━╯
✦ اكتب: .بنك 📎 لعرض رصيدك`,
          mentions: [reverseWinner]
        }, { quoted: msg })

        activeReverse = null
      }
    }
    if (text === '.بوت') {
      const imagePath = path.join(__dirname, 'zenitsu.jpg')
      const buffer = fs.readFileSync(imagePath)
      await sock.sendMessage(chatId, {
        image: buffer,
        caption: `✦━━『 ZENITSU BOT 』━━✦

╭───────────────╮
│     ⚡  𝙕𝙀𝙉𝙄𝙏𝙎𝙐 ⚡     │
╰───────────────╯
مرحباً بك في بوت ZENITSU 💛أنا هنا لأجعل تجربتك أسهل وأمتع على واتساب!

🧩 الأوامر المتوفرة:
➤ .اوامر
➤ .المطور
➤ .الفعاليات

✨ تابعنا دائماً لتجربة متجددة ومميزة!`
      }, { quoted: msg })
    }

if (text.startsWith('.ايديت ')) {
      const query = text.split('.ايديت ')[1].trim()
      const filename = `edit_${Date.now()}.mp4`

      await sock.sendMessage(chatId, {
        text: `🎬 جاري البحث عن إيديت لـ ${query}...`
      }, { quoted: msg })

      exec(`yt-dlp -f mp4 -o "${filename}" "ytsearch1:edit ${query}"`, async (err, stdout, stderr) => {
        if (err) {
          console.error(stderr)
          await sock.sendMessage(chatId, {
            text: '❌ حدث خطأ أثناء تحميل الفيديو. تأكد من أن yt-dlp مثبت.'
          }, { quoted: msg })
          return
        }

        try {
          const videoBuffer = fs.readFileSync(path.resolve(filename))
          await sock.sendMessage(chatId, {
            video: videoBuffer,
            caption: `🎬 إيديت للشخصية: ${query}`
          }, { quoted: msg })

          fs.unlinkSync(filename)
        } catch (e) {
          console.error(e)
          await sock.sendMessage(chatId, {
            text: '⚠️ لم أستطع إرسال الفيديو.'
          }, { quoted: msg })
        }
      })
    }
if (text === '.ملصق') {
  try {
    let targetMsg

    if (msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
      targetMsg = {
        key: {
          remoteJid: chatId,
          fromMe: false,
          id: msg.message.extendedTextMessage.contextInfo.stanzaId,
          participant: msg.message.extendedTextMessage.contextInfo.participant || chatId,
        },
        message: msg.message.extendedTextMessage.contextInfo.quotedMessage,
      }
    } else if (msg.message?.imageMessage) {
      targetMsg = msg
    }

    if (!targetMsg || !targetMsg.message?.imageMessage) {
      await sock.sendMessage(chatId, {
        text: '❗ يجب إرسال أو الرد على صورة حقيقية لتحويلها إلى ملصق.'
      }, { quoted: msg })
      return
    }

    const buffer = await downloadMediaMessage(targetMsg, 'buffer', {}, { logger: console, reuploadRequest: sock.reuploadRequest, })


await sock.sendMessage(chatId, {
  sticker: buffer,
  mimetype: 'image/webp',
  packname: 'ZENITSU',
  author: 'BOT'
}, { quoted: msg })


  } catch (err) {
    console.error(err)
    await sock.sendMessage(chatId, {
      text: '⚠️ حدث خطأ أثناء تحويل الصورة إلى ملصق.'
    }, { quoted: msg })
  }
}

if (text === '.مسيحي') {
  const randomVerse = christianVerses[Math.floor(Math.random() * christianVerses.length)]
  await sock.sendMessage(chatId, { text: `📖 آية مسيحية عشوائية:\n\n${randomVerse}` }, { quoted: msg })
}
if (text === '.الفعاليات') {
      await sock.sendMessage(chatId, {
        text: `╔═━━━━✦『 🎯 قسم الفعاليات 』✦━━━━═╗

🌟 أهلاً بك في قسم الفعاليات 🎉
⚠️ الرجاء اختيار فعاليتك فقط بدون الرد على هذه الرسالة

┌──⊰ الفعاليات المتاحة ⊱──┐
✍️ - كتابة
🧩 - تفكيك
🌍 - العلم
🔄 - العكس
└──────────────────┘

✨ استمتع وورّينا مهاراتك 🎯
╚═━━━━✦『 ZENITSU BOT 』✦━━━━═╝`
      }, { quoted: msg })
    }
if (text === '.المطور') {
      await sock.sendMessage(chatId, {
        text: `
╔═━━━✦•❃°•°❀°•°❃•✦━━━═╗
『 💻 المطـــور الرسمي 💻 』
╚═━━━✦•❃°•°❀°•°❃•✦━━━═╝

𓆩 👨‍💻 الاسم: 『 زينيتسو 』
𓆩 ☎️ الرقم: +201115393590
𓆩 📩 التواصل: واتساب فقط

💬 لا تتردد في التواصل معنا عند وجود مشكلة،
نحن هنا لخدمتكم دائمًا بكل حب واحترام 🤍
`
      }, { quoted: msg })
    }
    if (text === '.v' && msg.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
  const quotedMsg = msg.message.extendedTextMessage.contextInfo.quotedMessage
  const type = quotedMsg.imageMessage ? 'imageMessage' :
               quotedMsg.videoMessage ? 'videoMessage' : null

  if (!type || !quotedMsg[type]?.mediaKey) {
    await sock.sendMessage(msg.key.remoteJid, { text: '❌ لا يمكن تحميل الوسائط. قد تكون شوهدت بالفعل أو غير صالحة.' }, { quoted: msg })
    return
  }

  try {
    const stream = await downloadContentFromMessage(quotedMsg[type], type === 'imageMessage' ? 'image' : 'video')
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }

    await sock.sendMessage(msg.key.remoteJid, { [type === 'imageMessage' ? 'image' : 'video']: buffer }, { quoted: msg })
  } catch (err) {
await sock.sendMessage(msg.key.remoteJid, { text: '⚠️ حدث خطأ أثناء تحميل الوسائط.' }, { quoted: msg })
    console.error(err)
  }
}
if (text === '.الانمي') {
  const message = `╭━━━【🎌 قسم الأنمي 】━━━╮  
┃ ✦ اكتب "انمي" متبوعة بالرقم لاختيار السؤال  
┃  
┃ 🎌 انمي 1
┃ 🎌 انمي 2
┃ 🎌 انمي 3
┃ 🎌 انمي 4
┃ 🎌 انمي 5
┃ 🎌 انمي 6
┃ 🎌 انمي 7
┃ 🎌 انمي 8
┃ 🎌 انمي 9
┃ 🎌 انمي 10
┃ 🎌 انمي 11
┃ 🎌 انمي 12
┃ 🎌 انمي 13
┃ 🎌 انمي 14
┃ 🎌 انمي 15
┃ 🎌 انمي 16
┃ 🎌 انمي 17
┃ 🎌 انمي 18
┃ 🎌 انمي 19
┃ 🎌 انمي 20
╰━━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
}
if (text === '.الدين') {
  const form = `
╔═════ ⛪ ═════╗
       🕊️ اختر دينك 🕊️
╚═════ ⛪ ═════╝

اكتب الأمر مسبوقًا بـ (.) مثل:
مثال: .مسلم أو .مسيحي

╔═✧✦✧══════╗
┃  ✝️ .مسيحي
┃  ☪️ .مسلم
╚══════════╝
`.trim()

  await sock.sendMessage(chatId, { text: form }, { quoted: msg });
}
if (text === '.الأسئلة') {
  const message = `╭━━━【🧠 قائمة الأسئلة 】━━━╮  
┃  
┃ ⚽ كرة القدم  
┃ 🎌 الأنمي  
┃  
╰━━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
}

if (text === '.فوتبول') {
  const message = `تفضل:

╭━━━【⚽ قسم كرة القدم 】━━━╮  
┃ ✦ اكتب "كرة" متبوعة بالرقم لاختيار السؤال  
┃  
┃ ⚽ كرة 1
┃ ⚽ كرة 2
┃ ⚽ كرة 3
┃ ⚽ كرة 4
┃ ⚽ كرة 5
┃ ⚽ كرة 6
┃ ⚽ كرة 7
┃ ⚽ كرة 8
┃ ⚽ كرة 9
┃ ⚽ كرة 10
┃ ⚽ كرة 11
┃ ⚽ كرة 12
┃ ⚽ كرة 13
┃ ⚽ كرة 14
┃ ⚽ كرة 15
┃ ⚽ كرة 16
┃ ⚽ كرة 17
┃ ⚽ كرة 18
┃ ⚽ كرة 19
┃ ⚽ كرة 20
╰━━━━━━━━━━━━━━━━━━━━╯`;

  await sock.sendMessage(msg.key.remoteJid, { text: message }, { quoted: msg });
}
if (text === '.ترقية') {
  const from = msg.key.remoteJid; // ✅ تعريف المتغير from

  // تحقق من أن الأمر في جروب
  if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ هذا الأمر يعمل فقط داخل المجموعات.' }, { quoted: msg });

  // تحقق من أن المرسل مشرف
  const metadata = await sock.groupMetadata(from);
  const sender = msg.key.participant || msg.key.remoteJid; // ⬅️ تعريف المرسل
  const senderIsAdmin = metadata.participants.find(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
  if (!senderIsAdmin) return sock.sendMessage(from, { text: '❌ فقط المشرفين يمكنهم استخدام هذا الأمر.' }, { quoted: msg });

  // الحصول على المعرف المراد ترقيته
  const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  const replyJid = msg.message?.extendedTextMessage?.contextInfo?.participant;

  const targetJid = mentionedJid || replyJid;
  if (!targetJid) return sock.sendMessage(from, { text: '❌ يجب منشن عضو أو الرد على رسالته.' }, { quoted: msg });

  try {
    // ترقية العضو
    await sock.groupParticipantsUpdate(from, [targetJid], 'promote');

    // إرسال رسالة الترحيب
    const message = `╭━━━〔 🌟 استمارة ترقية ⭐ 〕━━━╮  
┃  
┃ 🎉 مبروك يا بطل!  
┃ 🏅 تم ترقية العضو إلى *مشرف*  
┃  
┃ 👤 المنشن: @${targetJid.split('@')[0]}  
┃  
┃ ونتمنى لك التوفيق في مهامك الجديدة!  
╰━━━━━━━━━━━━━━━━━━━━╯`;

    await sock.sendMessage(from, {
      text: message,
      mentions: [targetJid]
    }, { quoted: msg });

  } catch (e) {
    console.error('خطأ في الترقية:', e);
    await sock.sendMessage(from, { text: '❌ حدث خطأ أثناء الترقية. تأكد أن البوت مشرف أيضاً.' }, { quoted: msg });
  }
}
if (text === '.اعفاء') {
  const from = msg.key.remoteJid;

  // التحقق من أن الأمر في مجموعة
  if (!from.endsWith('@g.us')) return sock.sendMessage(from, { text: '❌ هذا الأمر يعمل فقط داخل المجموعات.' }, { quoted: msg });

  // التحقق أن المرسل مشرف
  const metadata = await sock.groupMetadata(from);
  const sender = msg.key.participant || msg.key.remoteJid;
  const senderIsAdmin = metadata.participants.find(p => p.id === sender && (p.admin === 'admin' || p.admin === 'superadmin'));
  if (!senderIsAdmin) return sock.sendMessage(from, { text: '❌ فقط المشرفين يمكنهم استخدام هذا الأمر.' }, { quoted: msg });

  // الحصول على المعرف المراد إعفاؤه
  const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
  const replyJid = msg.message?.extendedTextMessage?.contextInfo?.participant;

  const targetJid = mentionedJid || replyJid;
  if (!targetJid) return sock.sendMessage(from, { text: '❌ يجب منشن عضو أو الرد على رسالته.' }, { quoted: msg });

  try {
    // إزالة المشرف
    await sock.groupParticipantsUpdate(from, [targetJid], 'demote');

    // رسالة الإعفاء
    const message = `╭━━━〔 ⚠️ استمارة إعفاء 〕━━━╮  
┃  
┃ 📣 تم إعفاء العضو من مهام *الإشراف*  
┃  
┃ 👤 المنشن: @${targetJid.split('@')[0]}  
┃  
┃ ✅ شكرًا على جهودك السابقة!  
╰━━━━━━━━━━━━━━━━━━━━╯`;

    await sock.sendMessage(from, {
      text: message,
      mentions: [targetJid]
    }, { quoted: msg });

  } catch (e) {
    console.error('خطأ في الإعفاء:', e);
    await sock.sendMessage(from, { text: '❌ حدث خطأ أثناء الإعفاء. تأكد أن البوت مشرف أيضاً.' }, { quoted: msg });
  }
}
if (text === '.اوامر') {
      await sock.sendMessage(chatId, {
        text: `╔═━━━━✦✿✦━━━━═╗

🌟 أهلاً بك في بوت 『 زينيتسو 』 🌟
╚═━━━━✦✿✦━━━━═╝

🤖 أفضل بوت في المجال
🎯 دقة ⚡ سرعة 💬 تفاعل 🎉

📌 الأقسام:
🔹 الفعاليات
🔹 الاسئلة
🔹  بوت
🔹  المطور
🔹 النكات
🔹 معلومات عامة
🔹 الحقائق الكروية
🔹 الدين
🔹 الدعم النفسي
🔹 الأغاني
🔹 الألعاب
🔹 الملصقات
🔹 القصص
🔹ايديت
🔹زواج 
🔹إظهار صورة مرة واحدة v
🔹إظهار id
🔹طرد
🔹بنك
🔹سرقة
🔹تحويل 
🔹ترحيب 
🔹وداع 
🔹ترقية 
🔹 اعفا
🔹مخفي`
      }, { quoted: msg })
    }
// ✅ فعالية .العلم
if (text === '.العلم') {
  if (usedFlags.length === flagActivities.length) usedFlags = []

  const available = flagActivities.filter(f => !usedFlags.includes(f.flag))
  const chosen = available[Math.floor(Math.random() * available.length)]
  currentFlag = chosen
  usedFlags.push(chosen.flag)
  flagAnswered = false

  await sock.sendMessage(chatId, {
    text: `┏━━━〔 🌍فعالية العلم ة 〕━━━┓

💬 المطلوب: قم بكتابة اسم الدولة بشكل صحيح!

📌 العلم: ⟪ ${chosen.flag} ⟫
🎤 المُقدّم: ⟪ زينيتسو ⟫

✦ للحصول على تلميح اكتب: .تلميح
┗━━━━━━━━━━━━━━━━━━┛`
  }, { quoted: msg })
}

// ✅ التلميح: حرف - مخفي - حرف - مخفي ...
if (text === '.تلميح' && currentFlag && !flagAnswered) {
  const letters = currentFlag.country.split('')
  const hint = letters.map((c, i) => i % 2 === 0 ? c : '*').join('*')
  await sock.sendMessage(chatId, {
    text: `🔍 التلميح:\n${hint}`
  }, { quoted: msg })
}

// ✅ التحقق من الإجابة
if (currentFlag && !flagAnswered && text === currentFlag.country) {
  flagAnswered = true

  const userData = getUserBank(sender)
  userData.balance += 5000
  saveBank()

  await sock.sendMessage(chatId, {
    text: `╭━━━┫ 🎊 تهانينا 🎊 ┣━━━╮

┃ الفائز: @${sender.split('@')[0]}
✅ أنهيت الفعالية بنجاح!
┃ 💸 تمت إضافة 5K إلى رصيدك
┃ ✨ شارك دائمًا وكن الأسرع
╰━━━━━━━━━━━━━━━━━━╯
✦ اكتب: .بنك 📎 لعرض رصيدك`,
    mentions: [sender]
  }, { quoted: msg })
      }
if (text === '.مسلم') {
  const verse = islamicVerses[Math.floor(Math.random() * islamicVerses.length)]
  await sock.sendMessage(chatId, { text: `﴿ آية اليوم ﴾\n\n${verse}` }, { quoted: msg })
}
if (text === '.id' && internalId === ownerId) {
      let targetId
      if (msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
        targetId = msg.message.extendedTextMessage.contextInfo.mentionedJid[0]
      } else if (msg.message.extendedTextMessage?.contextInfo?.participant) {
        targetId = msg.message.extendedTextMessage.contextInfo.participant
      }

      if (!targetId) {
        await sock.sendMessage(chatId, {
          text: '⚠️ قم بعمل منشن أو الرد على رسالة الشخص لإظهار الـ ID.',
        }, { quoted: msg })
      } else {
        await sock.sendMessage(chatId, {
          text: `🆔 آي دي هذا الشخص هو:\n${targetId}`
        }, { quoted: msg })
      }
    }
// 🚫 أمر الطرد
// 🚫 أمر طرد البوت (خاص بالمطور فقط)
if (isGroup && internalId === ownerId && text.startsWith('.طرد ')) {
  const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid || []
  if (mentioned.length === 0) {
    await sock.sendMessage(chatId, {
      text: '❌ من فضلك منشن الشخص الذي تريد طرده.'
    }, { quoted: msg })
    return
  }

  try {
    await sock.groupParticipantsUpdate(chatId, mentioned, 'remove')
    await sock.sendMessage(chatId, {
      text: `✅ تم طرد العضو/الأعضاء المذكورين بنجاح.`
    }, { quoted: msg })
  } catch (e) {
    await sock.sendMessage(chatId, {
      text: `❌ حدث خطأ أثناء محاولة الطرد.`
    }, { quoted: msg })
  }
}
const reacts = {
  '147640121569529@lid': '🐟',
  '25036001943643@lid': '💍',
  [ownerId]: '♥️',
  '77400108957885@lid': '🔫',
  '125232773882006@lid': '☠️',
  '56346246397957@lid': '🎀',
  '178254631718959@lid': '🐦',
  '260653344370934@lid': '👑',
  '101555088978098@lid': '🌸',
  '262332877930659@lid': '🙂',
  '143555658010713@lid': '💕',
  '166142823919772@lid': '🤑',     // ✅ الشخص الأول
  '109427747201175@lid': '🐦‍⬛'    // ✅ الشخص الثاني
}

  if (reacts[internalId]) {
  await sock.sendMessage(chatId, {
    react: { text: reacts[internalId], key: msg.key }
  });
}
if (text === '.تشغيل' && internalId === ownerId) {
      botEnabled = true
      await sock.sendMessage(chatId, {
        text: '✅ تم التفعيل للكل، الآن يستطيع الجميع استخدام البوت.'
      }, { quoted: msg })
    }



if (text.startsWith('.تعريف')) {
  const developerJid = '38989813805275@lid'
  if (sender !== developerJid) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '🚫 هذا الأمر مخصص للمطور فقط.'
    }, { quoted: msg })
    return
  }

  const mentionedJid = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0]
  if (!mentionedJid) {
    await sock.sendMessage(msg.key.remoteJid, {
      text: '✋ منشن شخص بعد الأمر مثل: .تعريف @العضو'
    }, { quoted: msg })
    return
  }

  try {
    const ppUrl = await sock.profilePictureUrl(mentionedJid, 'image').catch(() => null)
    const num = mentionedJid.split('@')[0]

    const caption = `╔═════◇❖◇═════╗
        🪪 𝙏𝘼𝙍𝙄𝙁 𝘼𝙇𝙈𝘼𝙊𝙁 🪪
╚═════◇❖◇═════╝

⫷ 👤 الـمـنـشـن: @num
⫷ ☎️ الـرقــم: +{num}
⫷ 🆔 الآي دي: ${mentionedJid}
⫷ 🖼️ الـصـورة: مـوجـودة أسـفـل (إذا تـوفـرت)

╔═════◇❖◇═════╗
        ⚡ zenitsu bot ⚡
╚═════◇❖◇═════╝`

    if (ppUrl) {
      await sock.sendMessage(msg.key.remoteJid, {
        image: { url: ppUrl },
        caption,
mentions: [mentionedJid]
      }, { quoted: msg })
    } else {
      await sock.sendMessage(msg.key.remoteJid, {
        text: caption,
        mentions: [mentionedJid]
      }, { quoted: msg })
    }

  } catch (err) {
    console.log('خطأ في أمر تعريف:', err)
    await sock.sendMessage(msg.key.remoteJid, {
      text: '❌ تعذر جلب المعلومات. تأكد من أن الشخص لم يحظر البوت أو ليس لديه صورة.'
    }, { quoted: msg })
  }
}

if (text === '.تعطيل' && internalId === ownerId) {
      botEnabled = false
      await sock.sendMessage(chatId, {
        text: '⛔❌ تم تعطيل البوت بنجاح حتى إشعار التشغيل من المطور.'
      }, { quoted: msg })
    }
if (text === '.زواج' && isGroup) {
      const metadata = await sock.groupMetadata(chatId)
      const members = metadata.participants.map(p => p.id).filter(id => id !== sock.user.id)
      if (members.length < 2) return

      const [person1, person2] = members.sort(() => 0.5 - Math.random()).slice(0, 2)
      await sock.sendMessage(chatId, {
        text: `
╔═━━━✦✿✦━━━═╗
💍💖 تهانينا القلبية 💖💍
╚═━━━✦✿✦━━━═╗

🤵‍♂️ العريس: @${person1.split('@')[0]}
👰‍♀️ العروس: @${person2.split('@')[0]}
💐 نتمنى لكم حياة زوجية سعيدة
🎉 مليئة بالمحبة والمودة والفرح

╔═━━━✦『 ZENITSU BOT 』✦━━━═╗
`,
        mentions: [person1, person2]
      }, { quoted: msg })
    }
if (text.startsWith('.اغنية ')) {  
  const query = text.split('.اغنية ')[1]  
  const filename = `song_${Date.now()}.mp3`  

  await sock.sendMessage(chatId, { text: `🎶 جاري البحث عن: ${query} ...` }, { quoted: msg })  

  exec(`yt-dlp -x --audio-format mp3 --output "${filename}" "ytsearch1:${query}"`, async (err, stdout, stderr) => {  
    if (err) {  
      console.error(stderr)  
      await sock.sendMessage(chatId, {  
        text: '❌ حدث خطأ أثناء تحميل الأغنية. تأكد من أن yt-dlp مثبت.'  
      }, { quoted: msg })  
      return  
    }  

    try {  
      const filePath = path.resolve(filename)  

      await sock.sendMessage(chatId, {  
        audio: fs.readFileSync(filePath),  
        mimetype: 'audio/mp4',  
        ptt: false  
      }, { quoted: msg })  

      fs.unlinkSync(filePath)  
    } catch (e) {  
      console.error(e)  
      await sock.sendMessage(chatId, {  
        text: '⚠️ لم أستطع إرسال الملف.'  
      }, { quoted: msg })  
    }  

  })  
}

})


sock.ev.on('group-participants.update', async (update) => {
  if (!isBotReady) return

  const { id, participants, action } = update

  for (const participant of participants) {
    const mentionTag = `@${participant.split('@')[0]}`

    if (action === 'add') {
      await sock.sendMessage(id, {
        text: `🎉 رسالة ترحيب:\n\nأهلًا وسهلًا بـ ${mentionTag} بيننا! نورت المجموعة ✨\nنتمنى لك وقتًا ممتعًا ومفيدًا معنا 💛`,
        mentions: [participant]
      })
    }

    if (action === 'remove') {
      await sock.sendMessage(id, {
        text: `💌 رسالة وداع:\n\nوداعًا يا ${mentionTag}، كانت لحظات جميلة معك، نتمنى لك التوفيق دائمًا 🤍✨`,
        mentions: [participant]
      })
    }
  }

  // ✅ حماية سحب الإشراف
  if (action === 'demote') {
    const trustedOwners = ['38989813805275@lid', '67478851993619@lid'] // الأيدي الموثوق بها
    const initiator = update.author

    if (!trustedOwners.includes(initiator)) {
      try {
        const metadata = await sock.groupMetadata(id)
        const admins = metadata.participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        const adminIds = admins.map(p => p.id)

        const demoteList = adminIds.filter(uid => !trustedOwners.includes(uid))

        await sock.sendMessage(id, {
          text: `🚨 تم اكتشاف محاولة غير مصرح بها لسحب إشراف!\n🔒 سيتم سحب إشراف الجميع ما عدا أصحاب البوت.`,
        })

        if (demoteList.length > 0) {
          await sock.groupParticipantsUpdate(id, demoteList, 'demote')
        }
      } catch (err) {
        console.error('❌ خطأ في تنفيذ حماية الإشراف:', err)
      }
    }
  }
})
sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update

      if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode
        isBotReady = false

        if (reason !== DisconnectReason.loggedOut) {
          console.log('🔁 إعادة الاتصال...')
          startBot()
        } else {
          console.log('📴 تم تسجيل الخروج. احذف مجلد auth_info وأعد تسجيل الدخول.')
        }
      } else if (connection === 'open') {
        isBotReady = true
        console.log('✅ تم الاتصال بواتساب!')
      }
    })
}

  // 🚀 بدء تشغيل البوت
  startBot()
