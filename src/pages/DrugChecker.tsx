import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Pill, AlertTriangle, CheckCircle, Plus, X, Loader2, Shield } from 'lucide-react';

interface Interaction {
  drugs: [string, string];
  severity: 'Severe' | 'Moderate' | 'Mild';
  description: string;
}

const INTERACTION_DB: Record<string, Interaction> = {
  'aspirin+ibuprofen': { drugs: ['Aspirin', 'Ibuprofen'], severity: 'Severe', description: 'Increased risk of gastrointestinal bleeding. Both are NSAIDs and should not be combined.' },
  'warfarin+aspirin': { drugs: ['Warfarin', 'Aspirin'], severity: 'Severe', description: 'Severe risk of internal bleeding. Aspirin enhances the anticoagulant effect of Warfarin.' },
  'lisinopril+ibuprofen': { drugs: ['Lisinopril', 'Ibuprofen'], severity: 'Moderate', description: 'NSAIDs may reduce the blood pressure-lowering effect of ACE inhibitors and increase kidney damage risk.' },
  'metformin+alcohol': { drugs: ['Metformin', 'Alcohol'], severity: 'Severe', description: 'Alcohol increases risk of lactic acidosis with Metformin, a potentially fatal condition.' },
  'simvastatin+grapefruit': { drugs: ['Simvastatin', 'Grapefruit'], severity: 'Moderate', description: 'Grapefruit can increase statin levels in blood, raising the risk of muscle damage.' },
  'ssri+tramadol': { drugs: ['SSRI', 'Tramadol'], severity: 'Severe', description: 'Risk of serotonin syndrome — a potentially life-threatening condition.' },
};

function checkInteractions(drugs: string[]): Interaction[] {
  const found: Interaction[] = [];
  for (let i = 0; i < drugs.length; i++) {
    for (let j = i + 1; j < drugs.length; j++) {
      const pair = [drugs[i].toLowerCase(), drugs[j].toLowerCase()].sort().join('+');
      if (INTERACTION_DB[pair]) found.push(INTERACTION_DB[pair]);
    }
  }
  return found;
}

const severityStyle = (s: string) => {
  if (s === 'Severe') return 'bg-destructive/10 text-destructive border-destructive/20';
  if (s === 'Moderate') return 'bg-warning/10 text-warning-foreground border-warning/20';
  return 'bg-secondary/10 text-secondary border-secondary/20';
};

const DrugChecker: React.FC = () => {
  const [drugs, setDrugs] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Interaction[] | null>(null);
  const [checked, setChecked] = useState(false);

  const addDrug = () => {
    if (input.trim() && !drugs.includes(input.trim())) {
      setDrugs(prev => [...prev, input.trim()]);
      setInput('');
      setResults(null);
      setChecked(false);
    }
  };

  const removeDrug = (d: string) => {
    setDrugs(prev => prev.filter(x => x !== d));
    setResults(null);
    setChecked(false);
  };

  const check = () => {
    if (drugs.length < 2) return;
    setLoading(true);
    setTimeout(() => {
      setResults(checkInteractions(drugs));
      setChecked(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Drug Interaction Checker</h1>
        <p className="text-muted-foreground mt-1">Enter your medications to detect potentially dangerous combinations.</p>
      </header>

      <div className="p-6 rounded-xl bg-surface shadow-card space-y-4">
        <label className="text-sm font-medium text-foreground">Add your medications</label>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addDrug()}
            placeholder="e.g., Aspirin, Ibuprofen, Warfarin..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
          <button onClick={addDrug} className="px-4 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-medium flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        {drugs.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {drugs.map(d => (
              <span key={d} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Pill className="w-3.5 h-3.5" />
                {d}
                <button onClick={() => removeDrug(d)} className="hover:text-destructive"><X className="w-3.5 h-3.5" /></button>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={check}
          disabled={drugs.length < 2 || loading}
          className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold shadow-card hover:shadow-elevated transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
          {loading ? 'Checking...' : 'Check Interactions'}
        </button>
      </div>

      {checked && results !== null && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {results.length === 0 ? (
            <div className="p-6 rounded-xl bg-secondary/10 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-secondary" />
              <div>
                <h3 className="font-semibold text-foreground">No Interactions Found</h3>
                <p className="text-sm text-muted-foreground">Your current medication combination appears safe. Always verify with your pharmacist.</p>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                {results.length} Interaction{results.length > 1 ? 's' : ''} Detected
              </h2>
              {results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-5 rounded-xl border ${severityStyle(r.severity)} space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{r.drugs[0]} + {r.drugs[1]}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase">{r.severity}</span>
                  </div>
                  <p className="text-sm opacity-90">{r.description}</p>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      )}

      <div className="p-4 rounded-xl glass-warning flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <p className="text-sm">This tool checks against a limited database. Always consult your doctor or pharmacist for complete interaction checks.</p>
      </div>
    </div>
  );
};

export default DrugChecker;
