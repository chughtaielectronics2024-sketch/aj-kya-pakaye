import React, { useState } from 'react';
import { FamilyMember, HealthCondition, Language } from '../types';
import { translations } from '../data/translations';
import { getLocalizedFamilyMember } from '../services/familyLocalization';
import { 
  Users, Plus, Trash2, Edit3, ShieldAlert, Heart, ThumbsDown, 
  Check, X, Sparkles, UserCheck 
} from 'lucide-react';

interface Props {
  members: FamilyMember[];
  onSaveMembers: (updated: FamilyMember[]) => void;
  lang: Language;
}

const deleteTexts: Record<Language, {
  confirmTitle: string;
  confirmPrompt: (name: string) => string;
  confirmBtn: string;
  cancelBtn: string;
  minOneRequired: string;
}> = {
  ur: {
    confirmTitle: 'فرد کو حذف کریں؟',
    confirmPrompt: (name) => `کیا آپ واقعی "${name}" کو فیملی لسٹ سے حذف کرنا چاہتے ہیں؟`,
    confirmBtn: 'ہاں، حذف کریں',
    cancelBtn: 'منسوخ',
    minOneRequired: 'گھر میں کم از کم ایک فرد کا ہونا ضروری ہے!'
  },
  en: {
    confirmTitle: 'Delete Family Member?',
    confirmPrompt: (name) => `Are you sure you want to remove "${name}" from your family list?`,
    confirmBtn: 'Yes, Delete',
    cancelBtn: 'Cancel',
    minOneRequired: 'At least one family member is required!'
  },
  ps: {
    confirmTitle: 'د کورنۍ غړی ړنګول؟',
    confirmPrompt: (name) => `ایا تاسو ډاډه یاست چې "${name}" له لیست څخه ړنګ کړئ؟`,
    confirmBtn: 'هو، ړنګ یې کړئ',
    cancelBtn: 'لغوه',
    minOneRequired: 'په کورنۍ کې لږترلږه د یو کس شتون اړین دی!'
  },
  pa: {
    confirmTitle: 'فرد نوں مٹاؤ؟',
    confirmPrompt: (name) => `کی تسی سچی "${name}" نوں ٹبر دی لسٹ چوں مٹانا چاہندے ہو؟`,
    confirmBtn: 'ہاں، مٹا دیو',
    cancelBtn: 'منسوخ',
    minOneRequired: 'ٹبر چ گھٹو گھٹ اک بندا ہونا ضروری اے!'
  },
  ar: {
    confirmTitle: 'حذف فرد من العائلة؟',
    confirmPrompt: (name) => `هل أنت متأكد من رغبتك في حذف "${name}" من القائمة؟`,
    confirmBtn: 'نعم، حذف',
    cancelBtn: 'إلغاء',
    minOneRequired: 'يجب أن يبقى فرد واحد على الأقل في العائلة!'
  },
  fa: {
    confirmTitle: 'حذف عضو خانواده؟',
    confirmPrompt: (name) => `آیا از حذف "${name}" از لیست خانواده اطمینان دارید؟`,
    confirmBtn: 'بله، حذف شود',
    cancelBtn: 'انصراف',
    minOneRequired: 'حداقل یک عضو باید در خانواده باقی بماند!'
  },
  es: {
    confirmTitle: '¿Eliminar Miembro?',
    confirmPrompt: (name) => `¿Está seguro de eliminar a "${name}" de la lista familiar?`,
    confirmBtn: 'Sí, Eliminar',
    cancelBtn: 'Cancelar',
    minOneRequired: '¡Se requiere al menos un miembro de la familia!'
  }
};

export const FamilyManager: React.FC<Props> = ({
  members,
  onSaveMembers,
  lang
}) => {
  const t = translations[lang] || translations.ur;
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);
  const [warningMsg, setWarningMsg] = useState<string | null>(null);

  // Form states for add / edit
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formConditions, setFormConditions] = useState<HealthCondition[]>([]);
  const [formLikes, setFormLikes] = useState('');
  const [formDislikes, setFormDislikes] = useState('');

  const conditionOptions: { id: HealthCondition; label: string; desc: string }[] = [
    { 
      id: 'diabetes', 
      label: t.conditionDiabetes, 
      desc: t.condDescDiabetes 
    },
    { 
      id: 'hypertension', 
      label: t.conditionHypertension, 
      desc: t.condDescHypertension 
    },
    { 
      id: 'uric_acid', 
      label: t.conditionUricAcid, 
      desc: t.condDescUricAcid 
    },
    { 
      id: 'cholesterol_heart', 
      label: t.conditionCholesterol, 
      desc: t.condDescCholesterol 
    },
    { 
      id: 'stomach_digestive', 
      label: t.conditionStomach, 
      desc: t.condDescStomach 
    },
    { 
      id: 'kidney_care', 
      label: t.conditionKidney, 
      desc: t.condDescKidney 
    },
    { 
      id: 'gluten_intolerance', 
      label: t.conditionGluten, 
      desc: t.condDescGluten 
    },
    { 
      id: 'lactose_intolerance', 
      label: t.conditionLactose, 
      desc: t.condDescLactose 
    },
    { 
      id: 'weight_loss', 
      label: t.conditionWeightLoss, 
      desc: t.condDescWeightLoss 
    }
  ];

  const openAddModal = () => {
    setFormName('');
    setFormRole('');
    setFormConditions(['none']);
    setFormLikes('');
    setFormDislikes('');
    setIsAddingNew(true);
    setEditingMember(null);
  };

  const openEditModal = (member: FamilyMember) => {
    const loc = getLocalizedFamilyMember(member, lang);
    setFormName(loc.name);
    setFormRole(loc.role);
    setFormConditions(member.healthConditions);
    setFormLikes(loc.likes.join(', '));
    setFormDislikes(loc.dislikes.join(', '));
    setEditingMember(member);
    setIsAddingNew(true);
  };

  const handleToggleCondition = (condId: HealthCondition) => {
    if (formConditions.includes(condId)) {
      const filtered = formConditions.filter((c) => c !== condId);
      setFormConditions(filtered.length === 0 ? ['none'] : filtered);
    } else {
      const cleaned = formConditions.filter((c) => c !== 'none');
      setFormConditions([...cleaned, condId]);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const likesArray = formLikes.split(',').map(s => s.trim()).filter(Boolean);
    const dislikesArray = formDislikes.split(',').map(s => s.trim()).filter(Boolean);

    if (editingMember) {
      const updated = members.map(m => m.id === editingMember.id ? {
        ...m,
        name: formName.trim(),
        role: formRole.trim() || (lang === 'en' ? 'Member' : 'فرد'),
        healthConditions: formConditions,
        likes: likesArray,
        dislikes: dislikesArray
      } : m);
      onSaveMembers(updated);
    } else {
      const newMember: FamilyMember = {
        id: 'fam-' + Date.now(),
        name: formName.trim(),
        role: formRole.trim() || (lang === 'en' ? 'Member' : 'فرد'),
        healthConditions: formConditions,
        likes: likesArray,
        dislikes: dislikesArray
      };
      onSaveMembers([...members, newMember]);
    }

    setIsAddingNew(false);
    setEditingMember(null);
  };

  const promptDeleteMember = (target: FamilyMember) => {
    if (members.length <= 1) {
      const dText = deleteTexts[lang] || deleteTexts.ur;
      setWarningMsg(dText.minOneRequired);
      setTimeout(() => setWarningMsg(null), 3200);
      return;
    }
    setMemberToDelete(target);
  };

  const confirmDeleteMember = () => {
    if (!memberToDelete) return;
    const updated = members.filter(m => m.id !== memberToDelete.id);
    onSaveMembers(updated);
    setMemberToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 p-4 sm:p-6 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="text-start">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-emerald-700 shrink-0" />
            <h2 className="text-xl font-extrabold text-stone-900 leading-tight sm:leading-snug rtl:leading-[1.7]">
              {t.familyMembersTitle}
            </h2>
          </div>
          <p className="text-xs text-stone-500 leading-normal rtl:leading-[1.6]">
            {t.familyMembersDesc}
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition active:scale-95 cursor-pointer leading-normal"
        >
          <Plus className="w-4 h-4" />
          <span>{t.addMember}</span>
        </button>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {members.map((rawMember) => {
          const member = getLocalizedFamilyMember(rawMember, lang);
          const activeConditions = rawMember.healthConditions.filter(c => c !== 'none');

          return (
            <div
              key={rawMember.id}
              className="bg-white rounded-3xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between"
            >
              <div>
                {/* Member Header - Name & Role have full unrestricted visibility */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-stone-100 mb-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-black text-lg shadow-xs shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 text-start">
                    <h3 className="font-extrabold text-stone-900 text-base sm:text-lg leading-snug rtl:leading-[1.7] break-words">
                      {member.name}
                    </h3>
                    <div className="mt-1">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-lg inline-block">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Health & Parhez Conditions */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                    {t.dietaryParhez}:
                  </span>
                  {activeConditions.length === 0 ? (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                      <UserCheck className="w-3.5 h-3.5" />
                      {t.noParhezMsg}
                    </span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {activeConditions.map((cond) => {
                        const opt = conditionOptions.find(o => o.id === cond);
                        return (
                          <span
                            key={cond}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-900 bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200"
                          >
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            {opt?.label || cond}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Likes & Dislikes */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-stone-100">
                  <div className="bg-stone-50 p-2.5 rounded-2xl">
                    <div className="flex items-center gap-1 text-stone-500 font-semibold mb-1">
                      <Heart className="w-3 h-3 text-rose-500" />
                      <span>{t.likes}</span>
                    </div>
                    <p className="text-stone-800 font-medium line-clamp-2">
                      {member.likes.length > 0 ? member.likes.join(', ') : t.allFoodsLiked}
                    </p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-2xl">
                    <div className="flex items-center gap-1 text-stone-500 font-semibold mb-1">
                      <ThumbsDown className="w-3 h-3 text-stone-500" />
                      <span>{t.dislikes}</span>
                    </div>
                    <p className="text-stone-800 font-medium line-clamp-2">
                      {member.dislikes.length > 0 ? member.dislikes.join(', ') : t.noDislikes}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Actions Footer: Clear Edit & Delete Buttons with plenty of space */}
              <div className="pt-3.5 mt-3.5 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(rawMember)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 text-xs font-bold transition active:scale-95 cursor-pointer"
                  title={t.editMember}
                >
                  <Edit3 className="w-3.5 h-3.5 text-stone-500" />
                  <span>{t.editMember}</span>
                </button>
                <button
                  type="button"
                  onClick={() => promptDeleteMember(rawMember)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
                  title={t.deleteMember}
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{t.deleteMember}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Member Modal Dialog */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-emerald-100 max-h-[90vh] overflow-y-auto text-stone-900">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h3 className="font-extrabold text-base text-stone-900">
                {editingMember ? t.editMember : t.addMember}
              </h3>
              <button
                onClick={() => setIsAddingNew(false)}
                className="p-1.5 rounded-full text-stone-400 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.memberName}</label>
                <input
                  type="text"
                  required
                  placeholder={t.formNamePlaceholder}
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">{t.memberRole}</label>
                <input
                  type="text"
                  placeholder={t.formRolePlaceholder}
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              {/* Conditions Checklist */}
              <div>
                <label className="font-bold text-stone-700 block mb-1.5">
                  {t.parhezSelectLabel}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {conditionOptions.map((opt) => {
                    const isChecked = formConditions.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => handleToggleCondition(opt.id)}
                        className={`p-2.5 rounded-xl border text-start transition flex items-start gap-2 ${
                          isChecked
                            ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-stone-400'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="block text-xs">{opt.label}</span>
                          <span className="text-[10px] text-stone-500 font-normal block leading-tight">{opt.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.likes}
                </label>
                <input
                  type="text"
                  placeholder={t.formLikesPlaceholder}
                  value={formLikes}
                  onChange={(e) => setFormLikes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {t.dislikes}
                </label>
                <input
                  type="text"
                  placeholder={t.formDislikesPlaceholder}
                  value={formDislikes}
                  onChange={(e) => setFormDislikes(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-xs"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                {editingMember ? (
                  <button
                    type="button"
                    onClick={() => {
                      const target = editingMember;
                      setIsAddingNew(false);
                      promptDeleteMember(target);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition active:scale-95 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>{t.deleteMember}</span>
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition cursor-pointer"
                  >
                    {t.save}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-rose-100 text-stone-900 animate-in zoom-in-95 duration-150 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-xs">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="font-black text-base text-stone-900 leading-snug">
                {(deleteTexts[lang] || deleteTexts.ur).confirmTitle}
              </h3>
              <p className="text-xs text-stone-600 font-medium leading-relaxed">
                {(deleteTexts[lang] || deleteTexts.ur).confirmPrompt(
                  getLocalizedFamilyMember(memberToDelete, lang).name
                )}
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition active:scale-95 cursor-pointer"
              >
                {(deleteTexts[lang] || deleteTexts.ur).cancelBtn}
              </button>
              <button
                type="button"
                onClick={confirmDeleteMember}
                className="flex-1 py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition active:scale-95 shadow-md shadow-rose-600/25 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{(deleteTexts[lang] || deleteTexts.ur).confirmBtn}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Warning Toast for min 1 member */}
      {warningMsg && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{warningMsg}</span>
          <button onClick={() => setWarningMsg(null)} className="p-0.5 text-stone-400 hover:text-white cursor-pointer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
