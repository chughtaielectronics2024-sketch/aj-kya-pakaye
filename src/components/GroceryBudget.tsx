import React, { useState, useEffect } from 'react';
import { GroceryItem, MarketRates, Language } from '../types';
import { translations } from '../data/translations';
import { 
  ShoppingBag, Calculator, Plus, Trash2, CheckCircle2, Circle, 
  Share2, RefreshCw, DollarSign, Tag, Check, SlidersHorizontal,
  Minus, Sparkles
} from 'lucide-react';
import { 
  estimateItemPrice, 
  stepQuantityAndPrice, 
  parseQuantity 
} from '../services/groceryPricing';

interface Props {
  groceryItems: GroceryItem[];
  onUpdateGrocery: (items: GroceryItem[]) => void;
  marketRates: MarketRates;
  onUpdateRates: (rates: MarketRates) => void;
  lang: Language;
}

export const GroceryBudget: React.FC<Props> = ({
  groceryItems,
  onUpdateGrocery,
  marketRates,
  onUpdateRates,
  lang
}) => {
  const t = translations[lang] || translations.ur;
  const isEn = lang === 'en';
  const isEs = lang === 'es';
  const [activeTab, setActiveTab] = useState<'list' | 'rates'>('list');
  const [copiedNotification, setCopiedNotification] = useState(false);

  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1 kg');
  const [newItemCat, setNewItemCat] = useState<GroceryItem['category']>('produce');
  const [newItemPrice, setNewItemPrice] = useState<string>('');
  const [isPriceCustomOverridden, setIsPriceCustomOverridden] = useState(false);

  // Auto-calculate realistic price whenever item name, quantity, or category changes
  useEffect(() => {
    if (!newItemName.trim()) {
      if (!isPriceCustomOverridden) {
        setNewItemPrice('');
      }
      return;
    }

    if (!isPriceCustomOverridden) {
      const estimated = estimateItemPrice(newItemName, newItemQty || '1 kg', newItemCat, marketRates);
      setNewItemPrice(String(estimated));
    }
  }, [newItemName, newItemQty, newItemCat, marketRates, isPriceCustomOverridden]);

  const handleToggleBought = (id: string) => {
    const updated = groceryItems.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item
    );
    onUpdateGrocery(updated);
  };

  const handleDeleteItem = (id: string) => {
    const updated = groceryItems.filter((item) => item.id !== id);
    onUpdateGrocery(updated);
  };

  const handleClearBought = () => {
    const updated = groceryItems.filter((item) => !item.isBought);
    onUpdateGrocery(updated);
  };

  const handleAdjustQuantity = (id: string, direction: 'inc' | 'dec') => {
    const updated = groceryItems.map((item) => {
      if (item.id !== id) return item;
      const { newQtyStr, newPrice } = stepQuantityAndPrice(
        item.quantity,
        direction,
        item.approxPkr,
        item.name,
        item.category,
        marketRates
      );
      return {
        ...item,
        quantity: newQtyStr,
        approxPkr: newPrice
      };
    });
    onUpdateGrocery(updated);
  };

  // Recalculate all items with actual market rates and quantity
  const handleRecalculateAllRates = () => {
    const updated = groceryItems.map((item) => {
      const actualPrice = estimateItemPrice(item.name, item.quantity, item.category, marketRates);
      return {
        ...item,
        approxPkr: actualPrice
      };
    });
    onUpdateGrocery(updated);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const qtyString = newItemQty.trim() || '1 kg';
    let priceNum = parseInt(newItemPrice, 10);
    if (isNaN(priceNum) || priceNum <= 0) {
      priceNum = estimateItemPrice(newItemName, qtyString, newItemCat, marketRates);
    }

    const item: GroceryItem = {
      id: 'groc-' + Date.now(),
      name: newItemName.trim(),
      nameUrdu: newItemName.trim(),
      category: newItemCat,
      quantity: qtyString,
      approxPkr: priceNum,
      isBought: false
    };

    onUpdateGrocery([...groceryItems, item]);
    setNewItemName('');
    setNewItemQty('1 kg');
    setNewItemPrice('');
    setIsPriceCustomOverridden(false);
  };

  // Group items by category with localized labels
  const categories: { id: GroceryItem['category']; label: string; icon: string }[] = [
    { id: 'produce', label: t.catProduce, icon: '🥬' },
    { id: 'meat', label: t.catMeat, icon: '🍗' },
    { id: 'pantry', label: t.catPantry, icon: '🌾' },
    { id: 'dairy', label: t.catDairy, icon: '🥛' },
    { id: 'spices', label: t.catSpices, icon: '🌶️' }
  ];

  const totalBudget = groceryItems.reduce((sum, item) => sum + (item.approxPkr || 0), 0);
  const remainingBudget = groceryItems
    .filter((i) => !i.isBought)
    .reduce((sum, item) => sum + (item.approxPkr || 0), 0);

  // WhatsApp formatted share
  const handleShareWhatsApp = () => {
    if (groceryItems.length === 0) return;

    let text = t.whatsappHeader;

    categories.forEach((cat) => {
      const itemsInCat = groceryItems.filter((i) => i.category === cat.id);
      if (itemsInCat.length > 0) {
        text += `*${cat.label}*\n`;
        itemsInCat.forEach((item) => {
          const status = item.isBought ? '✅' : '▫️';
          const itemName = isEn ? item.name : (item.nameUrdu || item.name);
          text += `${status} ${itemName} - ${item.quantity} (~${item.approxPkr} ${t.pkrCurrency})\n`;
        });
        text += `\n`;
      }
    });

    text += `💰 *${t.totalEstimatedBudget}:* ${totalBudget} ${t.pkrCurrency}${t.whatsappFooter}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="text-start">
          <div className="flex items-center gap-2 mb-1">
            <ShoppingBag className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-xl font-extrabold text-stone-900 leading-tight sm:leading-snug rtl:leading-[1.7]">
              {t.groceryList}
            </h2>
          </div>
          <p className="text-xs text-stone-500 leading-normal rtl:leading-[1.6]">
            {t.groceryDesc}
          </p>
        </div>

        {/* Tab Switcher: List vs Market Rates */}
        <div className="inline-flex p-1 bg-stone-100 rounded-2xl border border-stone-200">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'list'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.groceryList} ({groceryItems.length})
          </button>
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'rates'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.marketRatesTitle.split('(')[0]}
          </button>
        </div>
      </div>

      {/* Main Budget Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gradient-to-br from-emerald-700 to-teal-800 rounded-3xl p-5 text-white shadow-md">
          <span className="text-xs text-emerald-200 font-semibold block">{t.totalEstimatedBudget}</span>
          <p className="text-2xl font-black mt-1">{totalBudget} {t.pkrCurrency}</p>
          <span className="text-[11px] text-emerald-100 block mt-1">{t.estCostAllItems}</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs">
          <span className="text-xs text-stone-500 font-semibold block">{t.remainingShopping}</span>
          <p className="text-2xl font-black text-emerald-800 mt-1">{remainingBudget} {t.pkrCurrency}</p>
          <span className="text-[11px] text-stone-400 block mt-1">
            {groceryItems.filter((i) => !i.isBought).length} {t.itemsToBuy}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <span className="text-xs text-stone-500 font-semibold block">{t.shareClear}</span>
          <div className="flex flex-col gap-2 mt-2">
            <button
              onClick={handleShareWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 shrink-0" />
              <span>{copiedNotification ? t.copySuccess : t.shareList}</span>
            </button>
            <button
              onClick={handleClearBought}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-800 text-xs font-semibold transition active:scale-95"
              title={t.clearBought}
            >
              <Trash2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>{t.clearBought}</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'list' ? (
        <div className="space-y-6">
          {/* Add Item Quick Form */}
          <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-700" />
                <span>{t.addItem}</span>
              </h3>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t.realTimePriceByQty}
              </span>
            </div>

            <form onSubmit={handleAddItem} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
                {/* Item Name */}
                <div className="sm:col-span-4">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    {t.itemName}
                  </label>
                  <input
                    type="text"
                    placeholder={t.itemNamePlaceholder}
                    value={newItemName}
                    onChange={(e) => {
                      setNewItemName(e.target.value);
                      setIsPriceCustomOverridden(false);
                    }}
                    required
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Quantity */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    {t.quantity}
                  </label>
                  <input
                    type="text"
                    placeholder="1 kg, 2 kg, 500 g"
                    value={newItemQty}
                    onChange={(e) => {
                      setNewItemQty(e.target.value);
                      setIsPriceCustomOverridden(false);
                    }}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>

                {/* Category */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    {t.category}
                  </label>
                  <select
                    value={newItemCat}
                    onChange={(e) => {
                      setNewItemCat(e.target.value as GroceryItem['category']);
                      setIsPriceCustomOverridden(false);
                    }}
                    className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-white"
                  >
                    <option value="produce">{t.catProduce}</option>
                    <option value="meat">{t.catMeat}</option>
                    <option value="pantry">{t.catPantry}</option>
                    <option value="dairy">{t.catDairy}</option>
                    <option value="spices">{t.catSpices}</option>
                  </select>
                </div>

                {/* Price (PKR) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    {t.pricePkr}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="PKR"
                      value={newItemPrice}
                      onChange={(e) => {
                        setNewItemPrice(e.target.value);
                        setIsPriceCustomOverridden(true);
                      }}
                      className="w-full p-2.5 rounded-xl border border-emerald-300 font-extrabold text-emerald-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none bg-emerald-50/30"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Preset Item Chips */}
              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                <span className="text-[10px] text-stone-500 font-semibold">
                  {t.quickItems}
                </span>
                {[
                  { name: isEn ? 'Chicken' : isEs ? 'Pollo' : lang === 'ps' ? 'چرګ' : lang === 'ar' ? 'دجاج' : lang === 'fa' ? 'مرغ' : 'چکن', qty: '1 kg', cat: 'meat' as const },
                  { name: isEn ? 'Tomato' : isEs ? 'Tomate' : lang === 'ps' ? 'بانجان' : lang === 'ar' ? 'طماطم' : lang === 'fa' ? 'گوجه' : 'ٹماٹر', qty: '1 kg', cat: 'produce' as const },
                  { name: isEn ? 'Potato' : isEs ? 'Patata' : lang === 'ps' ? 'کچالو' : lang === 'ar' ? 'بطاطس' : lang === 'fa' ? 'سیب زمینی' : 'آلو', qty: '2 kg', cat: 'produce' as const },
                  { name: isEn ? 'Onion' : isEs ? 'Cebolla' : lang === 'ps' ? 'پیاز' : lang === 'ar' ? 'بصل' : lang === 'fa' ? 'پیاز' : 'پیاز', qty: '2 kg', cat: 'produce' as const },
                  { name: isEn ? 'Milk' : isEs ? 'Leche' : lang === 'ps' ? 'شیدې' : lang === 'ar' ? 'حليب' : lang === 'fa' ? 'شیر' : 'دودھ', qty: '2 liter', cat: 'dairy' as const },
                  { name: isEn ? 'Eggs' : isEs ? 'Huevos' : lang === 'ps' ? 'هګۍ' : lang === 'ar' ? 'بيض' : lang === 'fa' ? 'تخم مرغ' : 'انڈے', qty: '1 dozen', cat: 'dairy' as const },
                  { name: isEn ? 'Cooking Oil' : isEs ? 'Aceite' : lang === 'ps' ? 'تېل' : lang === 'ar' ? 'زيت طهي' : lang === 'fa' ? 'روغن' : 'کوکنگ آئل', qty: '1 liter', cat: 'pantry' as const },
                  { name: isEn ? 'Atta' : isEs ? 'Harina' : lang === 'ps' ? 'اوړه' : lang === 'ar' ? 'طحين' : lang === 'fa' ? 'آرد' : 'آٹا', qty: '5 kg', cat: 'pantry' as const }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setNewItemName(preset.name);
                      setNewItemQty(preset.qty);
                      setNewItemCat(preset.cat);
                      setIsPriceCustomOverridden(false);
                      const estimated = estimateItemPrice(preset.name, preset.qty, preset.cat, marketRates);
                      setNewItemPrice(String(estimated));
                    }}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-emerald-100 hover:text-emerald-800 text-stone-700 transition"
                  >
                    + {preset.name} ({preset.qty})
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-[11px] text-stone-500">
                  {newItemPrice && (
                    <span className="font-semibold text-emerald-800">
                      💰 {
                        lang === 'en' ? `Est: ${newItemPrice} PKR for ${newItemQty || '1'}` :
                        lang === 'es' ? `Est: ${newItemPrice} PKR por ${newItemQty || '1'}` :
                        lang === 'pa' ? `حساب: ${newItemQty || '1'} دی قیمت اندازاً ${newItemPrice} روپے` :
                        lang === 'ps' ? `حساب: د ${newItemQty || '1'} اټکلي نرخ ${newItemPrice} روپۍ` :
                        lang === 'ar' ? `الحساب: ${newItemQty || '1'} بسعر تقريبي ${newItemPrice} روبية` :
                        lang === 'fa' ? `محاسبه: ${newItemQty || '1'} حدوداً ${newItemPrice} روپیه` :
                        `حساب: ${newItemQty || '1'} کی قیمت تقریباً ${newItemPrice} روپے`
                      }
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition active:scale-95 shadow-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.addItem}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Categorized Grocery Checklist */}
          {groceryItems.length === 0 ? (
            <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center text-xs text-stone-500">
              <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <p className="font-semibold text-stone-700">{t.groceryEmpty}</p>
              <p className="mt-1">
                {t.tapToGenerateGrocery}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs text-stone-500 font-semibold">
                  {t.adjustPriceHelper}
                </span>
                <button
                  onClick={handleRecalculateAllRates}
                  className="text-[11px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 hover:bg-emerald-100 transition active:scale-95"
                  title={t.syncMarketRates}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.syncMarketRates}</span>
                </button>
              </div>

              {categories.map((cat) => {
                const itemsInCat = groceryItems.filter((i) => i.category === cat.id);
                if (itemsInCat.length === 0) return null;

                return (
                  <div
                    key={cat.id}
                    className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs"
                  >
                    <div className="bg-stone-50 px-4 py-2.5 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-800">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span>{cat.label}</span>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {itemsInCat.filter((i) => i.isBought).length}/{itemsInCat.length} {t.itemBoughtCount}
                      </span>
                    </div>

                    <div className="divide-y divide-stone-100">
                      {itemsInCat.map((item) => {
                        const displayName = isEn ? item.name : (item.nameUrdu || item.name);
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleBought(item.id)}
                            className={`flex items-center justify-between p-3.5 hover:bg-emerald-50/40 cursor-pointer transition text-xs select-none gap-2 ${
                              item.isBought ? 'bg-stone-50/80 text-stone-400 line-through' : 'text-stone-900'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center border shrink-0 transition ${
                                item.isBought ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300'
                              }`}>
                                {item.isBought && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                              <div className="min-w-0">
                                <span className="font-bold text-sm block truncate">
                                  {displayName}
                                </span>
                                {/* Quantity with dynamic +/- stepper */}
                                <div className="flex items-center gap-1.5 mt-0.5" onClick={(e) => e.stopPropagation()}>
                                  <span className="text-[11px] text-stone-500">
                                    {t.quantityLabel}:
                                  </span>
                                  <div className="inline-flex items-center bg-stone-100 border border-stone-200 rounded-lg overflow-hidden">
                                    <button
                                      type="button"
                                      onClick={() => handleAdjustQuantity(item.id, 'dec')}
                                      className="p-1 text-stone-600 hover:text-emerald-700 hover:bg-stone-200 transition"
                                      title={t.decreaseQty}
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="px-1.5 text-[11px] font-bold text-stone-800 whitespace-nowrap min-w-10 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleAdjustQuantity(item.id, 'inc')}
                                      className="p-1 text-stone-600 hover:text-emerald-700 hover:bg-stone-200 transition"
                                      title={t.increaseQty}
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 text-xs">
                                ~{item.approxPkr} {t.pkrCurrency}
                              </span>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-stone-300 hover:text-rose-600 p-1.5 rounded-lg hover:bg-stone-100 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Market Benchmark Rates Customizer */
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <h3 className="font-black text-stone-900 text-base">
                {t.marketRatesTitle}
              </h3>
              <p className="text-xs text-stone-500">
                {t.marketRatesDesc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateChickenName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.chickenPerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, chickenPerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateBeefName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.beefPerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, beefPerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateMuttonName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.muttonPerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, muttonPerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateSabziName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.seasonalSabziAvgPerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, seasonalSabziAvgPerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateOilName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.cookingOilPerLiter}
                  onChange={(e) => onUpdateRates({ ...marketRates, cookingOilPerLiter: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateRiceName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.basmatiRicePerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, basmatiRicePerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateAttaName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.attaPerKg}
                  onChange={(e) => onUpdateRates({ ...marketRates, attaPerKg: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200">
              <label className="font-bold text-stone-700 block mb-1">
                {t.rateEggsName}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={marketRates.eggsPerDozen}
                  onChange={(e) => onUpdateRates({ ...marketRates, eggsPerDozen: Number(e.target.value) || 0 })}
                  className="w-full p-2 rounded-xl bg-white border border-stone-300 font-bold text-stone-900 outline-none"
                />
                <span className="text-stone-500 text-[11px]">{t.pkrCurrency}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
