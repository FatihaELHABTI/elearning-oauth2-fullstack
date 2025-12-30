import React, { useEffect, useState } from 'react';
import keycloak from './Keycloak';
import * as api from './services/api';
import { 
  BookOpen, LayoutDashboard, LogOut, Plus, Trash2, Edit, Users, X, Info, 
  ShieldCheck, Mail, GraduationCap, Award, Search, Sparkles, TrendingUp
} from 'lucide-react';

function App() {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingInstructor, setViewingInstructor] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  const [courseForm, setCourseForm] = useState({ title: '', description: '', level: 'Débutant', studentsCount: 0, instructor: { id: '' } });
  const [instForm, setInstForm] = useState({ name: '', email: '', bio: '' });

  const username = keycloak.tokenParsed?.preferred_username || "User";
  const isAdmin = keycloak.tokenParsed?.realm_access?.roles.includes('ADMIN');

  useEffect(() => { refreshData(); }, []);

  const refreshData = async () => {
    const [cRes, iRes] = await Promise.all([api.getCourses(), api.getInstructors()]);
    setCourses(cRes.data);
    setInstructors(iRes.data);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    const payload = { ...courseForm, instructor: courseForm.instructor.id ? { id: Number(courseForm.instructor.id) } : null, studentsCount: Number(courseForm.studentsCount) };
    if (editingItem) await api.updateCourse(editingItem.id, payload);
    else await api.saveCourse(payload);
    closeModal(); refreshData();
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      if (activeTab === 'courses') setCourseForm({ ...item, instructor: { id: item.instructor?.id || '' } });
      else setInstForm(item);
    } else {
      setEditingItem(null);
      setCourseForm({ title: '', description: '', level: 'Débutant', studentsCount: 0, instructor: { id: '' } });
      setInstForm({ name: '', email: '', bio: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); };

  return (
    <div className="flex min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      
      {/* SIDEBAR MODERNE */}
      <aside className="w-20 lg:w-72 bg-[#0F172A] flex flex-col sticky top-0 h-screen transition-all duration-300 shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 mb-10">
          <div className="bg-indigo-500 p-2.5 rounded-2xl shadow-indigo-500/50 shadow-lg">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="hidden lg:block text-white text-2xl font-black tracking-tighter italic">E-LAB</span>
        </div>

        <nav className="flex-1 px-4 space-y-3">
          <MenuBtn icon={<LayoutDashboard/>} label="Dashboard" active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} />
          {isAdmin && <MenuBtn icon={<Users/>} label="Instructeurs" active={activeTab === 'instructors'} onClick={() => setActiveTab('instructors')} />}
        </nav>

        <div className="p-4 bg-slate-800/50 m-4 rounded-3xl border border-slate-700">
          <div className="hidden lg:flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">{username[0].toUpperCase()}</div>
            <div className="truncate"><p className="text-xs font-black text-white">{username}</p><p className="text-[9px] text-indigo-400 font-bold uppercase">{isAdmin ? 'Admin' : 'Student'}</p></div>
          </div>
          <button onClick={() => keycloak.logout()} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-400 py-3 rounded-2xl text-[10px] font-black hover:bg-red-500 hover:text-white transition-all"><LogOut size={14}/> DECO</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 lg:p-14 overflow-y-auto">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-indigo-500 w-4 h-4 animate-pulse" />
                <span className="text-indigo-600 font-bold text-[10px] tracking-[0.3em] uppercase">Plateforme Certifiée</span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">Bonjour, {username}</h1>
          </div>
          {isAdmin && (
            <button onClick={() => openModal()} className="group relative flex items-center gap-3 bg-slate-900 text-white px-8 py-5 rounded-[2rem] font-bold hover:bg-indigo-600 transition-all shadow-xl">
              <Plus size={22}/> Ajouter {activeTab === 'courses' ? 'un Cours' : 'un Prof'}
            </button>
          )}
        </header>

        {/* STATS RAPIDES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatBox icon={<BookOpen/>} label="Cours Actifs" value={courses.length} color="text-blue-500" bg="bg-blue-50" />
            <StatBox icon={<Users/>} label="Profs Experts" value={instructors.length} color="text-indigo-500" bg="bg-indigo-50" />
            <StatBox icon={<TrendingUp/>} label="Apprenants" value="1.2k" color="text-emerald-500" bg="bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          {activeTab === 'courses' ? courses.map((c, i) => (
            <div key={c.id} className="group bg-white rounded-[3rem] border border-slate-100 p-4 hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className={`h-52 rounded-[2.5rem] mb-6 relative overflow-hidden bg-gradient-to-br ${grad[i % grad.length]} flex items-center justify-center`}>
                <BookOpen size={60} className="text-white/20 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-[9px] font-black">{c.level.toUpperCase()}</div>
              </div>
              <div className="px-4 pb-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-black text-slate-800 leading-tight">{c.title}</h3>
                  {isAdmin && <div className="flex gap-1"><button onClick={() => openModal(c)} className="p-2 text-slate-300 hover:text-indigo-500 transition-colors"><Edit size={16}/></button><button onClick={() => handleDeleteCourse(c.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button></div>}
                </div>
                <p className="text-slate-400 text-xs font-medium mb-8 line-clamp-2">{c.description}</p>
                <button onClick={() => setViewingInstructor(c.instructor)} className="mt-auto flex items-center gap-3 p-3 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors group/prof">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-indigo-500 shadow-sm border border-slate-100 group-hover/prof:bg-indigo-500 group-hover/prof:text-white transition-all">{c.instructor?.name[0]}</div>
                  <div className="text-left"><p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Instructeur</p><p className="text-xs font-bold text-slate-700">{c.instructor?.name}</p></div>
                  <Info size={14} className="ml-auto text-slate-200 group-hover/prof:text-indigo-400" />
                </button>
              </div>
            </div>
          )) : instructors.map(inst => (
            <div key={inst.id} className="bg-white rounded-[3rem] p-8 border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center text-indigo-500 font-black text-4xl mb-6 group-hover:scale-110 transition-transform duration-500">{inst.name[0]}</div>
                <h4 className="text-2xl font-black text-slate-800 mb-1 tracking-tight">{inst.name}</h4>
                <p className="text-indigo-500 font-bold text-[10px] uppercase mb-8">{inst.email}</p>
                <div className="flex gap-3 w-full">
                    <button onClick={() => setViewingInstructor(inst)} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold text-[10px] hover:bg-indigo-600 transition-all shadow-lg">CONSULTER BIO</button>
                    {isAdmin && <button onClick={() => handleDeleteInst(inst.id)} className="bg-red-50 text-red-500 p-4 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>}
                </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- MODALE DÉTAILS PROF --- */}
      {viewingInstructor && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-sm rounded-[3.5rem] overflow-hidden shadow-2xl relative animate-in zoom-in duration-300">
                <div className="h-32 bg-indigo-600 relative flex items-center justify-center">
                    <button onClick={() => setViewingInstructor(null)} className="absolute top-6 right-6 text-white/50 hover:text-white"><X size={24}/></button>
                    <Award className="text-white/20 w-20 h-20" />
                </div>
                <div className="px-10 pb-12 -mt-12 text-center relative">
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] p-1 mx-auto shadow-2xl mb-6"><div className="w-full h-full bg-slate-50 rounded-[2.2rem] flex items-center justify-center text-3xl font-black text-indigo-600 uppercase">{viewingInstructor.name[0]}</div></div>
                    <h3 className="text-2xl font-black text-slate-800 mb-1">{viewingInstructor.name}</h3>
                    <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold text-[10px] tracking-widest uppercase mb-8"><ShieldCheck size={14}/> Partenaire Certifié E-LAB</div>
                    <div className="text-left bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Biographie Professionnelle</p><p className="text-xs text-slate-600 leading-relaxed italic">"{viewingInstructor.bio}"</p></div>
                    <div className="flex items-center gap-4 bg-indigo-50 p-5 rounded-3xl border border-indigo-100 text-indigo-700"><Mail size={20}/><div className="text-left"><p className="text-[8px] font-black uppercase opacity-60">Contact Email</p><p className="text-xs font-bold">{viewingInstructor.email}</p></div></div>
                </div>
            </div>
        </div>
      )}

      {/* MODALE FORMULAIRE (ADD/EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-2xl rounded-[3.5rem] p-12 shadow-2xl animate-in zoom-in duration-300 relative">
            <button onClick={closeModal} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition-colors"><X size={32}/></button>
            <h2 className="text-4xl font-black mb-10 tracking-tight">{editingItem ? 'Mettre à jour' : 'Ajouter une ressource'}</h2>
            <form onSubmit={activeTab === 'courses' ? handleSaveCourse : async (e) => { e.preventDefault(); await api.saveInstructor(instForm); closeModal(); refreshData(); }} className="space-y-8">
              {activeTab === 'courses' ? (
                <>
                  <Input label="Titre du module" value={courseForm.title} onChange={v => setCourseForm({...courseForm, title: v})} />
                  <Input label="Description pédagogique" value={courseForm.description} onChange={v => setCourseForm({...courseForm, description: v})} />
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-3 block ml-1">Niveau</label><select value={courseForm.level} onChange={e => setCourseForm({...courseForm, level: e.target.value})} className="w-full bg-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"><option>Débutant</option><option>Intermédiaire</option><option>Avancé</option></select></div>
                    <div><label className="text-[10px] font-black text-slate-400 uppercase mb-3 block ml-1">Instructeur</label><select value={courseForm.instructor.id} onChange={e => setCourseForm({...courseForm, instructor: {id: e.target.value}})} className="w-full bg-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"><option value="">-- Sélectionner --</option>{instructors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}</select></div>
                  </div>
                </>
              ) : (
                <>
                  <Input label="Nom de l'instructeur" value={instForm.name} onChange={v => setInstForm({...instForm, name: v})} />
                  <Input label="Email Professionnel" value={instForm.email} onChange={v => setInstForm({...instForm, email: v})} />
                  <Input label="Bio / Spécialités" value={instForm.bio} onChange={v => setInstForm({...instForm, bio: v})} />
                </>
              )}
              <button type="submit" className="w-full bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all">CONFIRMER ET PUBLIER</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const MenuBtn = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-white/5'}`}>
    {React.cloneElement(icon, { size: 20 })}
    <span className="hidden lg:block text-sm font-black tracking-tight">{label}</span>
  </button>
);

const StatBox = ({ icon, label, value, color, bg }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 shadow-sm">
    <div className={`w-16 h-16 ${bg} ${color} rounded-2xl flex items-center justify-center`}>{React.cloneElement(icon, { size: 28 })}</div>
    <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p><p className="text-3xl font-black text-slate-900 tracking-tight">{value}</p></div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <div><label className="text-[10px] font-black text-slate-400 uppercase mb-3 block ml-1 tracking-widest">{label}</label><input value={value} onChange={e => onChange(e.target.value)} className="w-full bg-slate-50 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" placeholder={`Entrez ${label.toLowerCase()}...`} /></div>
);

const grad = ["from-indigo-500 to-violet-600", "from-blue-500 to-cyan-500", "from-emerald-500 to-teal-600", "from-rose-500 to-orange-500", "from-amber-400 to-orange-600", "from-fuchsia-500 to-purple-700"];

export default App;