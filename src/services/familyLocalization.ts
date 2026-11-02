import { FamilyMember, HealthCondition, Language } from '../types';

export interface LocalizedFamilyMember {
  id: string;
  name: string;
  role: string;
  healthConditions: HealthCondition[];
  likes: string[];
  dislikes: string[];
}

interface MemberLanguageData {
  name: string;
  role: string;
  likes: string[];
  dislikes: string[];
}

type StandardMemberKey = 'father' | 'mother' | 'grandfather' | 'grandmother' | 'children';

const standardMembersData: Record<StandardMemberKey, Record<Language, MemberLanguageData>> = {
  father: {
    ur: {
      name: 'ابو جان',
      role: 'سربراہِ خانہ',
      likes: ['پتلی تڑکا دال', 'موسمی سبزی اور روٹی', 'سفید ابلے چاول', 'دیگی چکن یخنی پلاؤ'],
      dislikes: ['زیادہ تیل و گھی (کولیسٹرول)', 'زیادہ نمک (بلڈ پریشر)', 'تیز لال مرچیں']
    },
    en: {
      name: 'Father',
      role: 'Head of Household',
      likes: ['Light Tadka Daal', 'Seasonal Sabzi & Roti', 'Steamed White Rice', 'Chicken Yakhni Pulao'],
      dislikes: ['Excess Oil & Ghee (Cholesterol)', 'High Salt (Blood Pressure)', 'Spicy Red Chillies']
    },
    ps: {
      name: 'پلار جان',
      role: 'د کور مشر',
      likes: ['نرۍ دال', 'موسمي سبزي او ډوډۍ', 'سپینې وریجې', 'د چرګ پلاو'],
      dislikes: ['ډېر تېل او غوړي (کولیسټرول)', 'ډېره مالګه (بلډ پریشر)', 'تېزه سره مرچ']
    },
    pa: {
      name: 'ابو جی',
      role: 'گھر دا وڈا',
      likes: ['پتلی تڑکا دال', 'موسمی سبزی تے پھلکا', 'ابلے چاول', 'یخنی پلاؤ'],
      dislikes: ['بہتا تیل تے گھیو (کولیسٹرول)', 'چوکھا نمک (بلڈ پریشر)', 'تکھیاں لال مرچاں']
    },
    ar: {
      name: 'الوالد',
      role: 'رب الأسرة',
      likes: ['عدس خفيف بتتبيلة التادكا', 'خضار موسمية وخبز روتي', 'أرز أبيض مسلوق', 'برياني وبلو الدجاج الخفيف'],
      dislikes: ['الزيوت والدهون الزائدة (الكوليسترول)', 'الملح الزائد (ضغط الدم)', 'الفلفل الأحمر الحار']
    },
    fa: {
      name: 'پدر جان',
      role: 'سرپرست خانواده',
      likes: ['دال عدس سبک و کم‌چرب', 'سبزیجات فصلی و نان روغنی', 'برنج کته ساده', 'پلو مرغ خوش‌طعم'],
      dislikes: ['روغن و چربی زیاد (کلسترول)', 'نمک زیاد (فشار خون)', 'فلفل تند قرمز']
    },
    es: {
      name: 'Padre',
      role: 'Jefe de Familia',
      likes: ['Lentejas ligeras (Daal)', 'Verduras de temporada con pan Roti', 'Arroz blanco al vapor', 'Pulao de pollo ligero'],
      dislikes: ['Exceso de aceite y grasas (Colesterol)', 'Sal alta (Presión arterial)', 'Chile rojo picante']
    }
  },
  mother: {
    ur: {
      name: 'امی جان',
      role: 'گھر کی دیکھ بھال',
      likes: ['گھیا توری کی بھجیا', 'گھیا کدو / لوکی', 'مونگ مسور دال', 'نرم پھلکا روٹی'],
      dislikes: ['فاسٹ فوڈ (برگر، پیزا)', 'تلی ہوئی پوریاں / پکوڑے', 'ہیوی روغنی کھانے (معدے کا بوجھ)', 'تیزابیت پیدا کرنے والے مصالحے']
    },
    en: {
      name: 'Mother',
      role: 'Homemaker',
      likes: ['Ridge Gourd (Tori)', 'Bottle Gourd (Kaddu/Lauki)', 'Moong Masoor Daal', 'Soft Phulka Roti'],
      dislikes: ['Fast Food (Burgers, Pizza)', 'Deep-Fried Foods (Puris/Pakoras)', 'Heavy Oily Meals (Stomach & Digestion)', 'Acidic Sharp Spices']
    },
    ps: {
      name: 'مور جانې',
      role: 'د کور چاره',
      likes: ['تورۍ', 'کدوان / لوکي', 'مونګ مسور دال', 'نرمه پتیره ډوډۍ'],
      dislikes: ['فاسټ فوډ (برګر، پیزا)', 'تلي شوي خواړه', 'درانده روغني خواړه (د معدې تکلیف)', 'تېز مصالحې']
    },
    pa: {
      name: 'امی جی',
      role: 'گھر دی دیکھ بھال',
      likes: ['توری دی بھجیا', 'گھیا کدو / لوکی', 'مونگ مسور دال', 'نرم پھلکا روٹی'],
      dislikes: ['فاسٹ فوڈ (برگر، پیزا)', 'تلیاں پوریاں / پکوڑے', 'بھاری روغنی کھانے (معدے دا بوجھ)', 'تیزابیت آلے مصالحے']
    },
    ar: {
      name: 'الوالدة',
      role: 'ربة المنزل',
      likes: ['كوسا طرية', 'قرع خفيف (لوكي)', 'عدس أصفر خفيف', 'خبز طري وصحي'],
      dislikes: ['الوجبات السريعة (برجر، بيتزا)', 'المقليات الثقيلة', 'الأطعمة الدسمة الدهنية (مشاكل المعدة)', 'البهارات الحارة الحامضة']
    },
    fa: {
      name: 'مادر جان',
      role: 'مدیر خانه',
      likes: ['کدو خورشتی تازه', 'کدو حلوایی و لوکی سبک', 'سوپ دال عدس', 'نان نازک و نرم سبوس‌دار'],
      dislikes: ['فست فود (برگر، پیتزا)', 'غذاهای سرخ‌کردنی روغنی', 'غذاهای سنگین هضم (بیماری معده)', 'ادویه‌های تند اسیدی']
    },
    es: {
      name: 'Madre',
      role: 'Madre de Familia',
      likes: ['Calabacín tierno (Tori)', 'Calabaza ligera (Lauki)', 'Lentejas suaves', 'Pan Roti suave y tierno'],
      dislikes: ['Comida rápida (Hamburguesas, Pizza)', 'Fritos pesados', 'Comidas grasas pesadas (Salud estomacal)', 'Especias picantes ácidas']
    }
  },
  grandfather: {
    ur: {
      name: 'دادا جان',
      role: 'بزرگ',
      likes: ['آلو گوشت شوربہ', 'پتلی دال', 'شلجم کی بھجیا'],
      dislikes: ['سخت گوشت', 'چنے کی دال (یورک ایسڈ)']
    },
    en: {
      name: 'Grandfather',
      role: 'Elder',
      likes: ['Tender Meat Gravy (Aloo Gosht)', 'Light Daal', 'Mashed Turnip (Shaljam)'],
      dislikes: ['Tough Chewy Meat', 'Split Chickpeas (Chana Daal - Uric Acid)']
    },
    ps: {
      name: 'نیکه جان',
      role: 'مشر',
      likes: ['د الو غوښې ښوروا', 'نرۍ دال', 'شلغم'],
      dislikes: ['سخته غوښه', 'د چڼو دال (یوریک اسید)']
    },
    pa: {
      name: 'دادا جی',
      role: 'بزرگ',
      likes: ['آلو گوشت شوربہ', 'پتلی دال', 'شلجم دی بھجیا'],
      dislikes: ['سخت گوشت', 'چنے دی دال']
    },
    ar: {
      name: 'الجد',
      role: 'كبير السن',
      likes: ['مرق لحم البطاطس الطري', 'عدس خفيف', 'لفت مسلوق طري'],
      dislikes: ['اللحوم القاسية صعبة المضغ', 'حمص ثقيل (حمض اليوريك)']
    },
    fa: {
      name: 'پدربزرگ',
      role: 'بزرگتر خانواده',
      likes: ['خورش گوشت نرم با سیب‌زمینی', 'عدس پخته سبک', 'شلغم پخته نرم'],
      dislikes: ['گوشت سفت و دیرپز', 'نخود و لپه سنگین (اسید اوریک)']
    },
    es: {
      name: 'Abuelo',
      role: 'Adulto Mayor',
      likes: ['Guiso tierno de carne con patatas', 'Lentejas ligeras', 'Puré suave de nabos'],
      dislikes: ['Carne dura difícil de masticar', 'Garbanzos pesados (Ácido úrico)']
    }
  },
  grandmother: {
    ur: {
      name: 'دادی جان',
      role: 'بزرگ',
      likes: ['چکن سوپ', 'نرم کھچڑی', 'گھیا لوکی سالن'],
      dislikes: ['سخت روٹی', 'زیادہ تیز مصالحے']
    },
    en: {
      name: 'Grandmother',
      role: 'Elder',
      likes: ['Chicken Soup', 'Soft Khichdi', 'Steamed Bottle Gourd'],
      dislikes: ['Hard Chewy Bread', 'Extremely Spicy Dishes']
    },
    ps: {
      name: 'نیا جانې',
      role: 'مشره',
      likes: ['د چرګ ښوروا', 'نرمه کچړي', 'لوکي'],
      dislikes: ['سخته ډوډۍ', 'تېز مصالحې']
    },
    pa: {
      name: 'دادی جی',
      role: 'بزرگ',
      likes: ['چکن سوپ', 'نرم کھچڑی', 'گھیا کدو'],
      dislikes: ['سخت پھلکا', 'تکھے مصالحے']
    },
    ar: {
      name: 'الجدة',
      role: 'كبيرة السن',
      likes: ['شوربة دجاج دافئة', 'أرز خفيف طري', 'قرع مسلوق'],
      dislikes: ['الخبز القاسي', 'البهارات الحارة جداً']
    },
    fa: {
      name: 'مادربزرگ',
      role: 'بزرگتر خانواده',
      likes: ['سوپ مرغ گرم', 'کته نرم و سبک', 'کدو پخته نرم'],
      dislikes: ['نان سفت و خشک', 'غذاهای بسیار تند']
    },
    es: {
      name: 'Abuela',
      role: 'Adulto Mayor',
      likes: ['Sopa de pollo suave', 'Arroz suave y ligero', 'Calabaza al vapor'],
      dislikes: ['Pan duro', 'Comidas excesivamente picantes']
    }
  },
  children: {
    ur: {
      name: 'بچے',
      role: 'بچے',
      likes: ['چکن بریانی', 'چکن پلاؤ', 'چکن زنگر برگر'],
      dislikes: ['کریلا', 'شلجم']
    },
    en: {
      name: 'Children',
      role: 'Kids',
      likes: ['Chicken Biryani', 'Chicken Pulao', 'Crispy Zinger Burger'],
      dislikes: ['Bitter Gourd (Karela)', 'Turnips (Shaljam)']
    },
    ps: {
      name: 'ماشومان',
      role: 'ماشومان',
      likes: ['د چرګ بریاني', 'چکن پلاو', 'زنګر برګر'],
      dislikes: ['ترخه کریلې', 'شلغم']
    },
    pa: {
      name: 'بال (بچے)',
      role: 'بال بچے',
      likes: ['چکن بریانی', 'چکن پلاؤ', 'چکن زنگر برگر'],
      dislikes: ['کریلا', 'شلجم']
    },
    ar: {
      name: 'الأطفال',
      role: 'الأطفال',
      likes: ['برياني الدجاج الشهي', 'بلو الدجاج', 'برجر كرسبي زنجر'],
      dislikes: ['القرع المر (كاريلا)', 'اللفت']
    },
    fa: {
      name: 'کودکان',
      role: 'فرزندان',
      likes: ['بریانی لذیذ مرغ', 'پلو مرغ زعفرانی', 'برگر سوخاری'],
      dislikes: ['کدو تلخ', 'شلغم']
    },
    es: {
      name: 'Hijos',
      role: 'Niños',
      likes: ['Biryani de pollo', 'Pulao de pollo', 'Hamburguesa crujiente'],
      dislikes: ['Melón amargo (Karela)', 'Nabos']
    }
  }
};

/**
 * Detects whether a given family member corresponds to a standard role
 */
function detectStandardMemberKey(member: FamilyMember): StandardMemberKey | null {
  const id = member.id.toLowerCase();
  if (id === 'fam-1') return 'father';
  if (id === 'fam-2') return 'mother';
  if (id === 'fam-3') return 'grandfather';
  if (id === 'fam-4') return 'children';
  if (id === 'fam-5') return 'grandmother';

  const rawName = (member.name || '').toLowerCase();
  const rawRole = (member.role || '').toLowerCase();
  const text = `${rawName} ${rawRole}`;

  if (text.includes('father') || text.includes('ابو') || text.includes('والد') || text.includes('پلار') || text.includes('پدر') || text.includes('padre')) {
    return 'father';
  }
  if (text.includes('mother') || text.includes('امی') || text.includes('والدہ') || text.includes('مور') || text.includes('مادر') || text.includes('madre')) {
    return 'mother';
  }
  if (text.includes('grandfather') || text.includes('دادا') || text.includes('نیکه') || text.includes('abuelo') || (text.includes('جد') && !text.includes('جدة'))) {
    return 'grandfather';
  }
  if (text.includes('grandmother') || text.includes('دادی') || text.includes('نیا') || text.includes('abuela') || text.includes('جدة')) {
    return 'grandmother';
  }
  if (text.includes('child') || text.includes('kid') || text.includes('بچے') || text.includes('ماشوم') || text.includes('طفل') || text.includes('اطفال') || text.includes('کودک') || text.includes('hijo')) {
    return 'children';
  }

  return null;
}

/**
 * Clean any bracketed terms like (Father), (Mother), (Grandfather), (Children) from user names
 */
export function cleanRawMemberName(name: string): string {
  if (!name) return '';
  return name
    .replace(/\s*\((Father|Mother|Grandfather|Grandmother|Children|Kids|Parents|Elder)\)/gi, '')
    .trim();
}

/**
 * Localizes a family member's display name, role, likes and dislikes based on the active language.
 * Completely eliminates unwanted bracketed foreign terms.
 */
export function getLocalizedFamilyMember(
  member: FamilyMember,
  lang: Language = 'ur'
): LocalizedFamilyMember {
  const standardKey = detectStandardMemberKey(member);

  if (standardKey && standardMembersData[standardKey]) {
    const langData = standardMembersData[standardKey][lang] || standardMembersData[standardKey].ur;
    return {
      id: member.id,
      name: langData.name,
      role: langData.role,
      healthConditions: member.healthConditions,
      likes: langData.likes,
      dislikes: langData.dislikes
    };
  }

  // Custom member: clean English brackets from the name and provide localized role if standard
  const cleanedName = cleanRawMemberName(member.name);
  let cleanedRole = cleanRawMemberName(member.role);

  // If role is generic, translate it to current language
  if (cleanedRole === 'سربراہ خانہ' || cleanedRole === 'سربراہِ خانہ' || cleanedRole.toLowerCase() === 'head of household') {
    cleanedRole = lang === 'en' ? 'Head of Household' :
                  lang === 'ps' ? 'د کور مشر' :
                  lang === 'pa' ? 'گھر دا وڈا' :
                  lang === 'ar' ? 'رب الأسرة' :
                  lang === 'fa' ? 'سرپرست خانواده' :
                  lang === 'es' ? 'Jefe de Familia' : 'سربراہِ خانہ';
  } else if (cleanedRole === 'بزرگ' || cleanedRole.toLowerCase() === 'elder') {
    cleanedRole = lang === 'en' ? 'Elder' :
                  lang === 'ps' ? 'مشر' :
                  lang === 'pa' ? 'بزرگ' :
                  lang === 'ar' ? 'كبير السن' :
                  lang === 'fa' ? 'بزرگتر خانواده' :
                  lang === 'es' ? 'Adulto Mayor' : 'بزرگ';
  } else if (cleanedRole === 'بچے' || cleanedRole.toLowerCase() === 'kids' || cleanedRole.toLowerCase() === 'children') {
    cleanedRole = lang === 'en' ? 'Children' :
                  lang === 'ps' ? 'ماشومان' :
                  lang === 'pa' ? 'بال بچے' :
                  lang === 'ar' ? 'الأطفال' :
                  lang === 'fa' ? 'فرزندان' :
                  lang === 'es' ? 'Hijos' : 'بچے';
  }

  return {
    id: member.id,
    name: cleanedName,
    role: cleanedRole,
    healthConditions: member.healthConditions,
    likes: member.likes,
    dislikes: member.dislikes
  };
}

export function getLocalizedFamilyMembers(
  members: FamilyMember[],
  lang: Language = 'ur'
): LocalizedFamilyMember[] {
  return members.map(m => getLocalizedFamilyMember(m, lang));
}
