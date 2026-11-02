import re

with open('src/data/translations.ts', 'r', encoding='utf-8') as f:
    text = f.read()

interface_fields = '''  openOptions: string;
  closeOptions: string;
  selectMealTime: string;
  chooseOne: string;
  openBadge: string;
  dishesCountLabel: string;
  menuAllBreakfast: string;
  menuAllLunch: string;
  menuAllDinner: string;
  menuCountAvailable: string;
  allDishes: string;
  spotlight: string;
  hideAllMenu: string;
  hideAllMenuDesc: string;
  searchInMenuPlaceholder: string;
  noDishesFound: string;
  trySearchingElse: string;
  aiKitchenChange: string;
  aiKitchenClickHint: string;
  whenLastPrepared: string;
  frontRecord: string;
  frontRecordSubtitle: string;
  sameDayLastWeek: string;
  yesterdayAndDayBefore: string;
  historyLogged: string;
  aiSmartReasoning: string;
  fullDayMenuStrip: string;
  changeAiMenuHint: string;
  hide: string;
  pastCookedMeals: string;
'''

if 'openOptions: string;' not in text:
    text = text.replace('  recIdealChoice: string;\n}', '  recIdealChoice: string;\n' + interface_fields + '}')

lang_additions = {
    'ur': '''    "openOptions": "آپشن کھولیں",
    "closeOptions": "آپشن بند کریں",
    "selectMealTime": "کھانے کا وقت منتخب کریں (پورا مینیو کھل جائے گا):",
    "chooseOne": "تینوں میں سے ایک منتخب کریں",
    "openBadge": "کھلا ہے ✓",
    "dishesCountLabel": "پکوان",
    "menuAllBreakfast": "ناشتہ کا تمام مینیو",
    "menuAllLunch": "دوپہر کا تمام مینیو",
    "menuAllDinner": "رات کا تمام مینیو",
    "menuCountAvailable": "لذیذ پکوان دستیاب ہیں، ترکیب پڑھیں یا پکانے کیلئے منتخب کریں",
    "allDishes": "تمام پکوان لسٹ",
    "spotlight": "خاص تجویز",
    "hideAllMenu": "سارا مینیو بند کریں",
    "hideAllMenuDesc": "مینیو لسٹ بند کریں (اوپر والے بٹن کھلے رہیں گے)",
    "searchInMenuPlaceholder": "اس مینیو میں تلاش کریں (مثلاً چنے، پراٹھا، آلو، پالک)...",
    "noDishesFound": "کوئی ڈش نہیں ملی",
    "trySearchingElse": "تلاش کا لفظ تبدیل کریں",
    "aiKitchenChange": "AI Kitchen (تبدیل کریں 🔄)",
    "aiKitchenClickHint": "کلک کریں اور مینیو تجویز حاصل کریں، بار بار کلک کرنے سے مینیو تبدیل ہوگا",
    "whenLastPrepared": "یہ مینیو آخری بار کب بنایا تھا؟",
    "frontRecord": "فرنٹ ریکارڈ",
    "frontRecordSubtitle": "کچن ہسٹری و پچھلے دنوں کا مکمل فرنٹ ریکارڈ",
    "sameDayLastWeek": "پچھلے ہفتے آج کے دن کا ریکارڈ:",
    "yesterdayAndDayBefore": "کل اور پرسوں کیا پکا تھا:",
    "historyLogged": "کچن ریکارڈ محفوظ ہے",
    "aiSmartReasoning": "AI اسمارٹ تجزیہ:",
    "fullDayMenuStrip": "پورے دن کا تجویز کردہ متوازن دسترخوان (ہر وقت کا آخری ریکارڈ):",
    "changeAiMenuHint": "مینیو تبدیل کرنے کیلئے اوپر موجود AI Kitchen بٹن پر کلک کریں۔",
    "hide": "چھپائیں",
    "pastCookedMeals": "پچھلے کھانے",
''',
    'en': '''    "openOptions": "Open Options",
    "closeOptions": "Close Options",
    "selectMealTime": "Select meal time (opens full menu):",
    "chooseOne": "Choose one",
    "openBadge": "Open ✓",
    "dishesCountLabel": "items",
    "menuAllBreakfast": "Breakfast Full Menu",
    "menuAllLunch": "Lunch Full Menu",
    "menuAllDinner": "Dinner Full Menu",
    "menuCountAvailable": "delicious dishes available. View recipe or cook today.",
    "allDishes": "All Dishes",
    "spotlight": "Spotlight",
    "hideAllMenu": "Hide All Menu",
    "hideAllMenuDesc": "Hide menu list while keeping slot buttons open",
    "searchInMenuPlaceholder": "Search in this menu (e.g. chanay, paratha, aloo, palak)...",
    "noDishesFound": "No dishes found",
    "trySearchingElse": "Try searching for something else",
    "aiKitchenChange": "AI Kitchen (Change 🔄)",
    "aiKitchenClickHint": "Click to suggest menu, tap again to cycle dishes",
    "whenLastPrepared": "When Was This Menu Last Prepared?",
    "frontRecord": "Front Record",
    "frontRecordSubtitle": "Complete kitchen timeline & front record",
    "sameDayLastWeek": "Same Day Last Week Record:",
    "yesterdayAndDayBefore": "Yesterday & Day Before:",
    "historyLogged": "History logged",
    "aiSmartReasoning": "AI Smart Reasoning:",
    "fullDayMenuStrip": "Full day recommended menu & last cooked records:",
    "changeAiMenuHint": "To change the menu, tap the AI Kitchen button above.",
    "hide": "Hide",
    "pastCookedMeals": "Past Meals",
''',
    'pa': '''    "openOptions": "آپشن کھولو",
    "closeOptions": "آپشن بند کرو",
    "selectMealTime": "کھانے دا ویلا چنو (پورا مینیو کھل جائے گا):",
    "chooseOne": "تیناں چوں اک چنو",
    "openBadge": "کھلیا اے ✓",
    "dishesCountLabel": "پکوان",
    "menuAllBreakfast": "ناشتے تے نہاری دا سارا مینیو",
    "menuAllLunch": "دوپہر دے کھانیاں دا سارا مینیو",
    "menuAllDinner": "رات دے کھانیاں دا سارا مینیو",
    "menuCountAvailable": "سوادی پکوان موجود نیں، ترکیب ویکھو یا پکاؤ",
    "allDishes": "سارے پکوان لسٹ",
    "spotlight": "خاص تجویز",
    "hideAllMenu": "سارا مینیو بند کرو",
    "hideAllMenuDesc": "مینیو لسٹ بند کرو (بٹن کھلے رہن گے)",
    "searchInMenuPlaceholder": "اس مینیو چوں لبھو (مثلاً چنے، پرونا، آلو، پالک)...",
    "noDishesFound": "کوئی ڈش نئیں لبھی",
    "trySearchingElse": "کوئی ہور ناں لکھ کے لبھو",
    "aiKitchenChange": "AI Kitchen (بدلو 🔄)",
    "aiKitchenClickHint": "کلک کرو تے مینیو پاؤ، مڑ کلک کرن تے مینیو بدلے گا",
    "whenLastPrepared": "ایہ مینو آخری واری کَدوں بنایا سی؟",
    "frontRecord": "فرنٹ ریکارڈ",
    "frontRecordSubtitle": "کچن ہسٹری تے پچھلے دناں دا پورا فرنٹ ریکارڈ",
    "sameDayLastWeek": "پچھلے ہفتے اج دے دن دا ریکارڈ:",
    "yesterdayAndDayBefore": "کل تے پرسوں کیہ پکیا سی:",
    "historyLogged": "کچن ریکارڈ محفوظ اے",
    "aiSmartReasoning": "AI اسمارٹ سوچ:",
    "fullDayMenuStrip": "پورے دن دا متوازن مینو (ہر ویلے دا آخری ریکارڈ):",
    "changeAiMenuHint": "مینیو بدلن لئی اتے دتے AI Kitchen بٹن نوں دباؤ۔",
    "hide": "چھپاؤ",
    "pastCookedMeals": "پچھلے پکے کھانے",
''',
    'ps': '''    "openOptions": "اختیارات خلاص کړئ",
    "closeOptions": "اختیارات وتړئ",
    "selectMealTime": "د خوړو وخت وټاکئ (بشپړ مینو به خلاص شي):",
    "chooseOne": "له درې واړو څخه یو وټاکئ",
    "openBadge": "خلاص دی ✓",
    "dishesCountLabel": "خواړه",
    "menuAllBreakfast": "د سهارني بشپړه مینو",
    "menuAllLunch": "د غرمې ډوډۍ بشپړه مینو",
    "menuAllDinner": "د ماښام ډوډۍ بشپړه مینو",
    "menuCountAvailable": "خوندور خواړه شته، طریقه ولولئ یا یې پخ کړئ",
    "allDishes": "د ټولو خواړو لست",
    "spotlight": "ځانګړی وړاندیز",
    "hideAllMenu": "ټوله مینو وتړئ",
    "hideAllMenuDesc": "د مینو لست وتړئ (پورته تڼۍ به خلاصې وي)",
    "searchInMenuPlaceholder": "په دې مینو کې ولټوئ (لکه چڼې، پراټه، کچالو، پالک)...",
    "noDishesFound": "هیڅ خواړه ونه موندل شول",
    "trySearchingElse": "د لټون بله کلمه هڅه وکړئ",
    "aiKitchenChange": "AI Kitchen (بدل کړئ 🔄)",
    "aiKitchenClickHint": "کلیک وکړئ او مینو ترلاسه کړئ، بیا کلیک سره مینو بدلیږي",
    "whenLastPrepared": "دا مینو وروستی ځل کله پخه شوې وه؟",
    "frontRecord": "مخکینی ریکارډ",
    "frontRecordSubtitle": "د پخلنځي تاریخ او د تېرو ورځو بشپړ ریکارډ",
    "sameDayLastWeek": "تېره اونۍ نننۍ ورځ څه پخه شوې وه:",
    "yesterdayAndDayBefore": "پرون او وړمه ورځ څه پخه شوې وه:",
    "historyLogged": "د پخلنځي ریکارډ ثبت دی",
    "aiSmartReasoning": "د AI هوښیار تحلیل:",
    "fullDayMenuStrip": "د ټولې ورځې متوازن خواړه (د هر وخت وروستی ریکارډ):",
    "changeAiMenuHint": "د مینو بدلولو لپاره د پورته AI Kitchen تڼۍ کېکاږئ.",
    "hide": "پټ کړئ",
    "pastCookedMeals": "تېر پخه شوي خواړه",
''',
    'ar': '''    "openOptions": "فتح الخيارات",
    "closeOptions": "إغلاق الخيارات",
    "selectMealTime": "اختر وقت الوجبة (ستفتح القائمة كاملة):",
    "chooseOne": "اختر واحدة من الثلاثة",
    "openBadge": "مفتوح ✓",
    "dishesCountLabel": "أطباق",
    "menuAllBreakfast": "قائمة طعام الإفطار كاملة",
    "menuAllLunch": "قائمة طعام الغداء كاملة",
    "menuAllDinner": "قائمة طعام العشاء كاملة",
    "menuCountAvailable": "أطباق لذيذة متوفرة، شاهد الوصفة أو اطبخ اليوم",
    "allDishes": "قائمة جميع الأطباق",
    "spotlight": "المقترح المميز",
    "hideAllMenu": "إغلاق كامل القائمة",
    "hideAllMenuDesc": "إغلاق قائمة الطعام مع بقاء الأزرار مفتوحة",
    "searchInMenuPlaceholder": "ابحث في هذه القائمة (مثال: دجاج، حمص، خضار، بطاطا)...",
    "noDishesFound": "لم يتم العثور على أطباق",
    "trySearchingElse": "جرب كلمة بحث أخرى",
    "aiKitchenChange": "مطبخ الذكاء الاصطناعي (تغيير 🔄)",
    "aiKitchenClickHint": "انقر لاقتراح قائمة طعام، انقر مجدداً لتغييرها",
    "whenLastPrepared": "متى تم تحضير هذه القائمة آخر مرة؟",
    "frontRecord": "السجل المباشر",
    "frontRecordSubtitle": "تاريخ المطبخ وسجل الأيام السابقة الكامل",
    "sameDayLastWeek": "سجل نفس اليوم من الأسبوع الماضي:",
    "yesterdayAndDayBefore": "ما تم طبخه بالأمس وقبل أمس:",
    "historyLogged": "تم حفظ السجل",
    "aiSmartReasoning": "تحليل الذكاء الاصطناعي الذكي:",
    "fullDayMenuStrip": "قائمة اليوم المتوازنة المقترحة (آخر سجل لكل وجبة):",
    "changeAiMenuHint": "لتغيير القائمة، انقر على زر مطبخ الذكاء الاصطناعي أعلاه.",
    "hide": "إخفاء",
    "pastCookedMeals": "الوجبات المطهوة سابقاً",
''',
    'fa': '''    "openOptions": "باز کردن گزینه‌ها",
    "closeOptions": "بستن گزینه‌ها",
    "selectMealTime": "زمان وعده غذایی را انتخاب کنید (منوی کامل باز می‌شود):",
    "chooseOne": "یکی از سه مورد را انتخاب کنید",
    "openBadge": "باز است ✓",
    "dishesCountLabel": "غذا",
    "menuAllBreakfast": "منوی کامل صبحانه",
    "menuAllLunch": "منوی کامل ناهار",
    "menuAllDinner": "منوی کامل شام",
    "menuCountAvailable": "غذای لذیذ آماده است، دستور پخت را ببینید یا انتخاب کنید",
    "allDishes": "لیست همه غذاها",
    "spotlight": "پیشنهاد ویژه",
    "hideAllMenu": "بستن تمام منو",
    "hideAllMenuDesc": "بستن لیست منو (دکمه‌های بالا باز می‌مانند)",
    "searchInMenuPlaceholder": "در این منو جستجو کنید (مثلاً نخود، پراتا، سیب‌زمینی، اسفناج)...",
    "noDishesFound": "هیچ غذایی یافت نشد",
    "trySearchingElse": "کلمه جستجوی دیگری را امتحان کنید",
    "aiKitchenChange": "آشپزخانه هوشمند (تغییر 🔄)",
    "aiKitchenClickHint": "کلیک کنید تا منو پیشنهاد شود، کلیک دوباره منو را تغییر می‌دهد",
    "whenLastPrepared": "این منو آخرین بار چه زمانی پخته شده بود؟",
    "frontRecord": "گزارش کارهای اخیر",
    "frontRecordSubtitle": "تاریخچه آشپزخانه و وعده‌های پخته شده اخیر",
    "sameDayLastWeek": "گزارش همین روز در هفته گذشته:",
    "yesterdayAndDayBefore": "دیروز و پریروز چه پخته شد:",
    "historyLogged": "تاریخچه ذخیره است",
    "aiSmartReasoning": "تحلیل هوشمند سرآشپز:",
    "fullDayMenuStrip": "برنامه متعادل غذایی کل روز (آخرین زمان پخت هر وعده):",
    "changeAiMenuHint": "برای تغییر منو، دکمه آشپزخانه هوشمند بالا را بزنید.",
    "hide": "پنهان کردن",
    "pastCookedMeals": "غذاهای پخته شده قبلی",
''',
    'es': '''    "openOptions": "Abrir Opciones",
    "closeOptions": "Cerrar Opciones",
    "selectMealTime": "Seleccione el momento de la comida (abre menú completo):",
    "chooseOne": "Elija uno de los tres",
    "openBadge": "Abierto ✓",
    "dishesCountLabel": "platos",
    "menuAllBreakfast": "Menú Completo de Desayuno",
    "menuAllLunch": "Menú Completo de Almuerzo",
    "menuAllDinner": "Menú Completo de Cena",
    "menuCountAvailable": "deliciosos platos disponibles. Ver receta o cocinar hoy.",
    "allDishes": "Todos los Platos",
    "spotlight": "Destacado",
    "hideAllMenu": "Ocultar Todo el Menú",
    "hideAllMenuDesc": "Ocultar la lista de platos manteniendo los botones abiertos",
    "searchInMenuPlaceholder": "Buscar en este menú (ej. pollo, lentejas, espinacas)...",
    "noDishesFound": "No se encontraron platos",
    "trySearchingElse": "Intente con otra búsqueda",
    "aiKitchenChange": "Chef IA (Cambiar 🔄)",
    "aiKitchenClickHint": "Toque para sugerir menú, toque de nuevo para cambiar",
    "whenLastPrepared": "¿Cuándo se preparó este menú por última vez?",
    "frontRecord": "Registro Reciente",
    "frontRecordSubtitle": "Historial de cocina y registro de días anteriores",
    "sameDayLastWeek": "Mismo día de la semana pasada:",
    "yesterdayAndDayBefore": "Ayer y anteayer:",
    "historyLogged": "Historial registrado",
    "aiSmartReasoning": "Análisis Inteligente de la IA:",
    "fullDayMenuStrip": "Menú equilibrado del día y registro de última preparación:",
    "changeAiMenuHint": "Para cambiar el menú, toque el botón de Chef IA arriba.",
    "hide": "Ocultar",
    "pastCookedMeals": "Comidas Anteriores",
'''
}

for lang, add in lang_additions.items():
    if f'"openOptions"' in text and f'"{lang}":' in text:
        # Check if already in this language
        pos = text.find(f'"{lang}":')
        next_pos = text.find('\n  },', pos)
        if next_pos == -1: next_pos = text.find('\n  }', pos)
        if '"openOptions"' in text[pos:next_pos]:
            print(f'{lang} already has openOptions, skipping')
            continue

    pattern = r'(\"' + lang + r'\":\s*\{[^}]*?\"recIdealChoice\":\s*\"[^\"]*\",?\n)'
    m = re.search(pattern, text)
    if m:
        old_chunk = m.group(1)
        new_chunk = old_chunk + add
        text = text.replace(old_chunk, new_chunk, 1)
        print(f'Successfully updated {lang}')
    else:
        print(f'Failed to match pattern for {lang}')

with open('src/data/translations.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print('Finished updating translations.ts successfully!')
