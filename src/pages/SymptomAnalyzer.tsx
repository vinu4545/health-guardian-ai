import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertTriangle, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const SYMPTOM_TAGS = ['Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Chest Pain', 'Shortness of Breath', 'Dizziness', 'Sore Throat', 'Body Aches'];

interface Prediction {
  disease: string;
  probability: number;
  risk: 'Low' | 'Medium' | 'High';
}

const MOCK_PREDICTIONS: Record<string, Prediction[]> = {
  'fever,headache': [
    { disease: 'Viral Infection', probability: 78, risk: 'Medium' },
    { disease: 'Influenza', probability: 65, risk: 'Medium' },
    { disease: 'Dengue Fever', probability: 32, risk: 'High' },
  ],
  'cough,fever': [
    { disease: 'Common Cold', probability: 72, risk: 'Low' },
    { disease: 'Bronchitis', probability: 55, risk: 'Medium' },
    { disease: 'Pneumonia', probability: 28, risk: 'High' },
  ],
  'chest pain,shortness of breath': [
    { disease: 'Anxiety/Panic Attack', probability: 45, risk: 'Medium' },
    { disease: 'Angina', probability: 38, risk: 'High' },
    { disease: 'Cardiac Event', probability: 22, risk: 'High' },
  ],
  default: [
    { disease: 'General Infection', probability: 55, risk: 'Low' },
    { disease: 'Stress-Related Condition', probability: 42, risk: 'Low' },
    { disease: 'Nutritional Deficiency', probability: 30, risk: 'Medium' },
  ],
};

function getPredictions(symptoms: string[]): Prediction[] {
  const key = symptoms.map(s => s.toLowerCase()).sort().join(',');
  return MOCK_PREDICTIONS[key] || MOCK_PREDICTIONS.default;
}

const riskColor = (risk: string) => {
  if (risk === 'High') return 'bg-destructive/10 text-destructive';
  if (risk === 'Medium') return 'bg-warning/10 text-warning-foreground';
  return 'bg-secondary/10 text-secondary';
};

const SymptomAnalyzer: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptom, setCustomSymptom] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Prediction[] | null>(null);

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const addCustom = () => {
    if (customSymptom.trim() && !selectedSymptoms.includes(customSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, customSymptom.trim()]);
      setCustomSymptom('');
    }
  };

  const analyze = () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    setResults(null);
    setTimeout(() => {
      setResults(getPredictions(selectedSymptoms));
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Symptom Analyzer</h1>
        <p className="text-muted-foreground mt-1">Describe your symptoms for an AI-powered health analysis.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Symptoms input */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-surface shadow-card space-y-4">
          <label className="text-sm font-medium text-foreground">Select or type your symptoms</label>
          <div className="flex flex-wrap gap-2">
            {SYMPTOM_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => toggleSymptom(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedSymptoms.includes(tag)
                    ? 'gradient-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {selectedSymptoms.includes(tag) ? '✓' : '+'} {tag}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={customSymptom}
              onChange={e => setCustomSymptom(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCustom()}
              placeholder="Add custom symptom..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
            <button onClick={addCustom} className="px-4 py-2.5 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              Add
            </button>
          </div>
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
              {selectedSymptoms.map(s => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {s}
                  <button onClick={() => toggleSymptom(s)} className="ml-1 hover:text-destructive">×</button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Context */}
        <div className="p-6 rounded-xl gradient-health space-y-4">
          <h3 className="font-semibold text-primary-foreground">Patient Context</h3>
          <div className="space-y-3">
            <input
              value={age}
              onChange={e => setAge(e.target.value)}
              placeholder="Age"
              type="number"
              className="w-full px-4 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground text-sm placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            />
            <select
              value={gender}
              onChange={e => setGender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-primary-foreground/10 text-primary-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
            >
              <option value="" className="text-foreground">Select Gender</option>
              <option value="male" className="text-foreground">Male</option>
              <option value="female" className="text-foreground">Female</option>
              <option value="other" className="text-foreground">Other</option>
            </select>
          </div>
          <button
            onClick={analyze}
            disabled={selectedSymptoms.length === 0 || loading}
            className="w-full mt-4 py-3 rounded-xl bg-surface text-foreground font-semibold shadow-card hover:shadow-elevated transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? 'Analyzing...' : 'Analyze Symptoms'}
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Analysis Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((r, i) => (
              <motion.div
                key={r.disease}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-xl bg-surface shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riskColor(r.risk)}`}>
                    {r.risk} Risk
                  </span>
                  <span className="text-2xl font-bold text-foreground">{r.probability}%</span>
                </div>
                <h3 className="font-semibold text-foreground">{r.disease}</h3>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${r.probability}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full gradient-primary"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-4 rounded-xl glass-warning flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">This is an AI-powered pre-analysis and <strong>not a medical diagnosis</strong>. Always consult a healthcare professional for proper diagnosis and treatment.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SymptomAnalyzer;
