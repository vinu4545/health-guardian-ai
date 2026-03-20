import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, AlertTriangle, CheckCircle, Shield, Activity, Pill } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const HealthReport: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const report = {
    date: 'March 16, 2026',
    symptoms: ['Headache', 'Fever', 'Fatigue'],
    predictions: [
      { disease: 'Viral Infection', probability: 78, risk: 'Medium' as const },
      { disease: 'Influenza', probability: 65, risk: 'Medium' as const },
    ],
    medications: ['Paracetamol', 'Ibuprofen'],
    interactions: [
      { drugs: 'Paracetamol + Ibuprofen', severity: 'Mild', note: 'Generally safe when taken at different times. Avoid combining frequently.' },
    ],
    recommendations: [
      'Rest and maintain hydration',
      'Monitor temperature every 4 hours',
      'Consult a doctor if symptoms persist beyond 48 hours',
      'Avoid combining NSAIDs without medical advice',
    ],
  };

  const riskColor = (r: string) => r === 'High' ? 'text-destructive' : r === 'Medium' ? 'text-warning' : 'text-secondary';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight <= pageHeight - margin * 2) {
      pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
    } else {
      // If content is taller than page, split into pages.
      let position = 0;
      let remainingHeight = imgHeight;

      while (remainingHeight > 0) {
        pdf.addImage(imgData, 'PNG', margin, -position + margin, imgWidth, imgHeight);
        remainingHeight -= pageHeight - margin * 2;
        position += pageHeight - margin * 2;
        if (remainingHeight > 0) pdf.addPage();
      }
    }

    pdf.save(`health-report-${report.date.replace(/ /g, '-')}.pdf`);
  };

  return (
    <div className="space-y-8" ref={printRef}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Health Report</h1>
          <p className="text-muted-foreground mt-1">Generated on {report.date}</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label className="text-sm font-medium">
            Upload image for PDF:
            <input type="file" accept="image/*" onChange={handleFileChange} className="ml-2" />
          </label>
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl gradient-primary text-primary-foreground text-sm font-semibold shadow-card hover:shadow-elevated transition-shadow flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {uploadedImage && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-surface shadow-card">
          <h2 className="text-lg font-semibold text-foreground">Uploaded Visual</h2>
          <img src={uploadedImage} alt="Uploaded visual" className="mt-3 max-h-72 w-full object-contain rounded-lg border" />
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symptom Summary */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-surface shadow-card space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Symptom Summary
          </h2>
          <div className="flex flex-wrap gap-2">
            {report.symptoms.map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">{s}</span>
            ))}
          </div>
        </motion.div>

        {/* Medications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-surface shadow-card space-y-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Pill className="w-5 h-5 text-secondary" /> Current Medications
          </h2>
          <div className="flex flex-wrap gap-2">
            {report.medications.map(m => (
              <span key={m} className="px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium">{m}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Predictions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-surface shadow-card space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> Disease Predictions
        </h2>
        <div className="space-y-3">
          {report.predictions.map(p => (
            <div key={p.disease} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium text-foreground">{p.disease}</p>
                <p className={`text-sm font-semibold ${riskColor(p.risk)}`}>{p.risk} Risk</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${p.probability}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full gradient-primary" />
                </div>
                <span className="text-lg font-bold text-foreground w-12 text-right">{p.probability}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interactions */}
      {report.interactions.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-xl glass-warning space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Drug Interaction Alerts
          </h2>
          {report.interactions.map((inter, i) => (
            <div key={i} className="p-4 rounded-lg bg-amber-100/50">
              <p className="font-medium">{inter.drugs} — <span className="font-semibold">{inter.severity}</span></p>
              <p className="text-sm mt-1 opacity-80">{inter.note}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-xl bg-surface shadow-card space-y-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-secondary" /> Recommendations
        </h2>
        <ul className="space-y-2">
          {report.recommendations.map((r, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
              {r}
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="p-4 rounded-xl bg-muted/50 text-center">
        <p className="text-sm text-muted-foreground">⚕️ This report is AI-generated and should not replace professional medical advice. Consult your healthcare provider.</p>
      </div>
    </div>
  );
};

export default HealthReport;
