import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Pill, FileText, TrendingUp, Heart, Users, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Analyses Done', value: '12', icon: Activity, color: 'text-primary' },
  { label: 'Active Alerts', value: '2', icon: AlertTriangle, color: 'text-warning' },
  { label: 'Medications', value: '4', icon: Pill, color: 'text-secondary' },
  { label: 'Health Score', value: '82%', icon: Heart, color: 'text-accent' },
];

const recentAnalyses = [
  { date: 'Mar 15, 2026', symptoms: 'Headache, Fever', result: 'Viral Infection', risk: 'Medium' },
  { date: 'Mar 12, 2026', symptoms: 'Cough, Fatigue', result: 'Common Cold', risk: 'Low' },
  { date: 'Mar 8, 2026', symptoms: 'Chest Pain', result: 'Anxiety', risk: 'Medium' },
];

const alerts = [
  { type: 'Drug Interaction', msg: 'Aspirin + Ibuprofen combination detected', severity: 'High' },
  { type: 'Health Trend', msg: 'Recurring headache pattern over 2 weeks', severity: 'Medium' },
];

const riskBadge = (risk: string) => {
  if (risk === 'High') return 'bg-destructive/10 text-destructive';
  if (risk === 'Medium') return 'bg-warning/10 text-warning-foreground';
  return 'bg-secondary/10 text-secondary';
};

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Dashboard</h1>
        <p className="text-muted-foreground mt-1">Your personal health overview and recent activity.</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-xl bg-surface shadow-card"
          >
            <s.icon className={`w-8 h-8 ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses */}
        <div className="lg:col-span-2 rounded-xl bg-surface shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Recent Analyses</h2>
            <Link to="/analyzer" className="text-sm text-primary font-medium hover:underline">New Analysis →</Link>
          </div>
          <div className="space-y-3">
            {recentAnalyses.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{a.result}</p>
                  <p className="text-xs text-muted-foreground">{a.symptoms} · {a.date}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${riskBadge(a.risk)}`}>
                  {a.risk}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-xl bg-surface shadow-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Active Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg border ${a.severity === 'High' ? 'border-destructive/20 bg-destructive/5' : 'border-warning/20 bg-warning/5'}`}
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase">{a.type}</p>
                <p className="text-sm text-foreground mt-1">{a.msg}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Analyze Symptoms', to: '/analyzer', icon: Activity, desc: 'Start a new AI symptom analysis' },
          { label: 'Check Drugs', to: '/drug-checker', icon: Pill, desc: 'Verify medication safety' },
          { label: 'View Report', to: '/report', icon: FileText, desc: 'See your latest health report' },
        ].map((action, i) => (
          <Link key={action.to} to={action.to}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="p-5 rounded-xl bg-surface shadow-card hover:shadow-elevated transition-shadow group cursor-pointer"
            >
              <action.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground">{action.label}</h3>
              <p className="text-sm text-muted-foreground">{action.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
