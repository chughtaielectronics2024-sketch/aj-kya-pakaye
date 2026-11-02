export interface TimeEvaluationResult {
  currentHour: number;
  currentMinute: number;
  timeString12h: string;
  timeStringUrdu: string;
  isWeekend: boolean;
  isPublicHoliday: boolean;
  dayNameEn: string;
  dayNameUrdu: string;
  slot: 'nashta' | 'dopahar' | 'raat';
  slotNameUrdu: string;
  slotNameEn: string;
  breakfastCutoffHour: number; // 10 on weekdays, 12 on weekends/holidays
  timeEvaluationExplanationUrdu: string;
  timeEvaluationExplanationEn: string;
}

const URDU_DAYS = ['اتوار (Sunday)', 'پیر (Monday)', 'منگل (Tuesday)', 'بدھ (Wednesday)', 'جمعرات (Thursday)', 'جمعہ (Friday)', 'ہفتہ (Saturday)'];
const URDU_DAYS_SHORT = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];
const EN_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Pakistan public holidays check (MM-DD)
const PAKISTAN_PUBLIC_HOLIDAYS: Record<string, string> = {
  '01-01': 'نئے سال کی چھٹی (New Year)',
  '02-05': 'یوم یکجہتی کشمیر (Kashmir Day)',
  '03-23': 'یوم پاکستان (Pakistan Day)',
  '05-01': 'یوم مزدور (Labour Day)',
  '08-14': 'یوم آزادی (Independence Day)',
  '11-09': 'یوم اقبال (Iqbal Day)',
  '12-25': 'یوم قائد اعظم / کرسمس (Quaid Day)'
};

export function evaluateCurrentMealTime(customDate?: Date): TimeEvaluationResult {
  const now = customDate || new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const dayIndex = now.getDay(); // 0 = Sunday, 6 = Saturday

  const isWeekend = dayIndex === 0 || dayIndex === 6;

  // Check public holiday
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const holidayKey = `${month}-${day}`;
  const isPublicHoliday = Boolean(PAKISTAN_PUBLIC_HOLIDAYS[holidayKey]);
  const holidayName = PAKISTAN_PUBLIC_HOLIDAYS[holidayKey] || '';

  // 12-hour format strings
  const period = currentHour >= 12 ? 'PM' : 'AM';
  const periodUrdu = currentHour < 12 ? 'صبح' : (currentHour < 17 ? 'دوپہر' : (currentHour < 20 ? 'شام' : 'رات'));
  const hour12 = currentHour % 12 === 0 ? 12 : currentHour % 12;
  const minutePadded = String(currentMinute).padStart(2, '0');
  const timeString12h = `${hour12}:${minutePadded} ${period}`;
  const timeStringUrdu = `${periodUrdu} کے ${hour12}:${minutePadded}`;

  const dayNameEn = EN_DAYS[dayIndex];
  const dayNameUrdu = URDU_DAYS_SHORT[dayIndex];

  // Breakfast max cutoff:
  // Weekdays: max 10:00 AM
  // Weekends & Public Holidays: extended to 12:00 PM (برنچ / لیٹ ناشتہ)
  const isDayOff = isWeekend || isPublicHoliday;
  const breakfastCutoffHour = isDayOff ? 12 : 10;

  const totalMinutes = currentHour * 60 + currentMinute;

  let slot: 'nashta' | 'dopahar' | 'raat' = 'dopahar';
  let slotNameUrdu = 'دوپہر کا کھانا';
  let slotNameEn = 'Lunch';
  let timeEvaluationExplanationUrdu = '';
  let timeEvaluationExplanationEn = '';

  // 1. Breakfast Slot (صبح 5:00 سے ناشتے کے کٹ آف تک)
  if (totalMinutes >= 5 * 60 && totalMinutes < breakfastCutoffHour * 60) {
    slot = 'nashta';
    slotNameUrdu = 'ناشتہ (Breakfast)';
    slotNameEn = 'Breakfast';

    if (isDayOff) {
      const reasonDay = isPublicHoliday ? `عوامی چھٹی (${holidayName})` : `ویک اینڈ (${dayNameUrdu})`;
      timeEvaluationExplanationUrdu = `ابھی ${timeStringUrdu} ہوئے ہیں اور آج ${reasonDay} ہے۔ عام دنوں میں ناشتے کا وقت صبح 10:00 بجے تک ہوتا ہے، لیکن چھٹی اور ویک اینڈ کے دن ناشتے کا وقت بڑھ کر دوپہر 12:00 بجے تک ہو جاتا ہے! اس لیے ابھی دیر سے ناشتے (Late Breakfast / Brunch) کا وقت ہے۔`;
      timeEvaluationExplanationEn = `Current time is ${timeString12h} on ${isPublicHoliday ? 'Public Holiday' : 'Weekend'}. While weekday breakfast ends at 10:00 AM, weekend breakfast extends until 12:00 PM!`;
    } else {
      timeEvaluationExplanationUrdu = `ابھی ${timeStringUrdu} ہوئے ہیں اور آج عام دن (${dayNameUrdu}) ہے۔ عام دنوں میں ناشتے کا وقت صبح 10:00 بجے تک ہوتا ہے، اس لیے ابھی ناشتے (Breakfast) کا وقت ہے۔`;
      timeEvaluationExplanationEn = `Current time is ${timeString12h} on a regular weekday (${dayNameEn}). Breakfast hours are active (up to 10:00 AM max).`;
    }
  }
  // 2. Lunch Slot (ناشتے کے کٹ آف سے شام 4:30 بجے تک)
  else if (totalMinutes >= breakfastCutoffHour * 60 && totalMinutes < (16 * 60 + 30)) {
    slot = 'dopahar';
    slotNameUrdu = 'دوپہر کا کھانا (Lunch)';
    slotNameEn = 'Lunch';

    if (isDayOff) {
      timeEvaluationExplanationUrdu = `ابھی ${timeStringUrdu} ہوئے ہیں اور آج ${isPublicHoliday ? holidayName : `ویک اینڈ (${dayNameUrdu})`} ہے۔ ناشتے کا وقت ختم ہو چکا ہے اور یہ دوپہر کے کھانے (Lunch) کا وقت ہے۔`;
      timeEvaluationExplanationEn = `Current time is ${timeString12h}. Weekend extended breakfast is over; it is now lunch time.`;
    } else {
      timeEvaluationExplanationUrdu = `ابھی ${timeStringUrdu} ہوئے ہیں اور آج عام دن (${dayNameUrdu}) ہے۔ صبح 10:00 بجے ناشتے کا وقت مکمل ہو گیا تھا، اس لیے ابھی دوپہر کے کھانے (Lunch) کا وقت ہے۔`;
      timeEvaluationExplanationEn = `Current time is ${timeString12h}. Morning breakfast ended at 10:00 AM; it is now lunch time.`;
    }
  }
  // 3. Dinner Slot (شام 4:30 سے رات اور صبح 5:00 بجے سے پہلے تک)
  else {
    slot = 'raat';
    slotNameUrdu = 'رات کا کھانا (Dinner)';
    slotNameEn = 'Dinner';

    timeEvaluationExplanationUrdu = `ابھی ${timeStringUrdu} ہوئے ہیں۔ یہ رات کے کھانے (Dinner) کی تیاری اور کھانے کا وقت ہے۔`;
    timeEvaluationExplanationEn = `Current time is ${timeString12h}. It is now dinner time.`;
  }

  return {
    currentHour,
    currentMinute,
    timeString12h,
    timeStringUrdu,
    isWeekend,
    isPublicHoliday,
    dayNameEn,
    dayNameUrdu,
    slot,
    slotNameUrdu,
    slotNameEn,
    breakfastCutoffHour,
    timeEvaluationExplanationUrdu,
    timeEvaluationExplanationEn
  };
}
