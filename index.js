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
