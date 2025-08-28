import React, { useEffect, useRef, useState } from 'react';
import '../plant-analyzer.css';

const API_BASE = (process.env.REACT_APP_API_BASE as string) || 'http://localhost:5000';

type Issue = {
  type?: string;
  name?: string;
  severity?: string;
  description?: string;
};

type Recommendation = {
  category?: string; // treatment/prevention/care/solution
  action?: string;
  priority?: string;
  timeframe?: string;
};

type Analysis = {
  plantType?: string;
  healthStatus?: string;
  confidence?: number | string;
  issues?: Issue[];
  recommendations?: Recommendation[];
  overallAssessment?: string;
  nextSteps?: string;
};

type DonutProps = { value?: number; size?: number; stroke?: number };
function Donut({ value = 0, size = 64, stroke = 8 }: DonutProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, Number(value) || 0));
  const offset = c * (1 - clamped / 100);
  const center = size / 2;
  return (
    <svg width={size} height={size} className="pa-donut" viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="pa-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--pa-accent-start)" />
          <stop offset="100%" stopColor="var(--pa-accent-end)" />
        </linearGradient>
      </defs>
      <circle className="pa-track" cx={center} cy={center} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round" />
      <circle
        className="pa-progress"
        cx={center}
        cy={center}
        r={r}
        fill="none"
        stroke="url(#pa-grad)"
        strokeWidth={stroke}
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="pa-donut-label">
        {Math.round(clamped)}%
      </text>
    </svg>
  );
}

const PlantAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pa_last_result');
    if (saved) {
      try { setAnalysis(JSON.parse(saved)); } catch {}
    }
  }, []);

  const onPick = () => inputRef.current?.click();
  const reset = () => {
    setFile(null);
    setPreview(null);
    setAnalysis(null);
    setError('');
    try { localStorage.removeItem('pa_last_result'); } catch {}
    if (inputRef.current) inputRef.current.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const takeFile = (f?: File) => {
    if (!f) return;
    setFile(f);
    setAnalysis(null);
    setError('');
    const url = URL.createObjectURL(f);
    setPreview(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => takeFile(e.target.files?.[0]);
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDrag(true); };
  const handleDragLeave = () => setDrag(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = (e.dataTransfer.files && e.dataTransfer.files[0]) || undefined;
    takeFile(f);
  };

  const analyze = async () => {
    if (!file) { setError('Please select an image first.'); return; }
    try {
      setLoading(true);
      setError('');
      setAnalysis(null);
      const form = new FormData();
      form.append('image', file);
      const resp = await fetch(`${API_BASE}/analyze-plant`, { method: 'POST', body: form });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server error (${resp.status}): ${text}`);
      }
      const data = await resp.json();
      const a = (data?.analysis || data?.data?.analysis) as Analysis | null;
      setAnalysis(a || null);
      try { localStorage.setItem('pa_last_result', JSON.stringify(a || {})); } catch {}
    } catch (e: any) {
      setError(e?.message || 'Failed to analyze image.');
    } finally {
      setLoading(false);
    }
  };

  const parseConfidence = (c?: number | string | null) => {
    if (c == null) return null;
    if (typeof c === 'number') return Math.max(0, Math.min(100, c));
    const n = parseFloat(String(c).replace('%', '').trim());
    return Number.isFinite(n) ? Math.max(0, Math.min(100, n)) : null;
  };

  const conf = parseConfidence(analysis?.confidence);
  const healthClass = (h?: string) => {
    const s = String(h || '').toLowerCase();
    if (s.includes('healthy')) return 'pa-status pa-status-healthy';
    if (s.includes('critical')) return 'pa-status pa-status-critical';
    if (s.includes('unhealthy') || s.includes('diseased')) return 'pa-status pa-status-unhealthy';
    return 'pa-status';
  };

  const issues = Array.isArray(analysis?.issues) ? analysis!.issues! : [];
  const recommendations = Array.isArray(analysis?.recommendations) ? analysis!.recommendations! : [];
  const treatments = recommendations.filter((r) => String(r.category || '').toLowerCase().includes('treat') || String(r.category || '') === 'solution' || String(r.category || '') === 'care');
  const preventions = recommendations.filter((r) => String(r.category || '').toLowerCase().includes('prevent'));

  return (
    <div className="pa-root">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Plant Health Scan</h2>
          <p className="section-description">Upload or capture a plant photo to get AI-powered diagnosis, treatments and prevention tips.</p>
        </div>

        <section className="pa-card">
          <h3 className="pa-card-title">📸 Upload</h3>
          <div
            className={`pa-dropzone ${drag ? 'drag' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="pa-preview">
              {preview ? (
                <img src={preview} alt="Plant preview" />
              ) : (
                <img
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><rect width='100%' height='100%' rx='14' fill='%23eef7f1'/><text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle' fill='%235a7a66' font-family='Inter' font-size='12'>No image</text></svg>`
                  )}`}
                  alt="placeholder"
                />
              )}
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div className="pa-hint">Drag & drop a plant photo here, or</div>
              <div className="pa-controls">
                <button className="pa-btn" onClick={onPick}>Upload / Take Photo</button>
                {file && <button className="pa-btn secondary" onClick={reset}>Remove</button>}
              </div>
              <input ref={inputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
          </div>

          <div className="pa-section">
            <button className="pa-btn" onClick={analyze} disabled={loading || !file}>
              {loading ? (<><span className="pa-spinner"/> Analyzing…</>) : 'Analyze with AI'}
            </button>
            <div className="pa-hint">Average analysis time: 3–10s</div>
            {error && <div className="pa-error" style={{marginTop:10}}>{error}</div>}
          </div>
        </section>

        <section className="pa-card">
          <h3 className="pa-card-title">🔎 Results</h3>
          {!analysis && !error && <div className="pa-sub">Your AI-generated insights will appear below after analysis.</div>}

          {analysis && (
            <div className="pa-results">
              <div className="pa-result">
                <div className="pa-result-title">🪴 Plant</div>
                <div className="pa-kv">
                  <div className="key">Name</div><div>{analysis.plantType || '—'}</div>
                  <div className="key">Condition</div>
                  <div>
                    <span className={healthClass(analysis.healthStatus)}>{analysis.healthStatus || 'Unknown'}</span>
                  </div>
                  <div className="key">Confidence</div>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    {conf != null ? (<Donut value={conf} size={72} stroke={10} />) : (<div>—</div>)}
                  </div>
                </div>
              </div>

              <div className="pa-result">
                <div className="pa-result-title">⚠️ Disease</div>
                {issues.length === 0 ? (
                  <div className="pa-hint" style={{marginTop:6}}>No diseases detected.</div>
                ) : (
                  <div className="pa-list">
                    {issues.map((it, idx) => (
                      <div className="pa-item" key={idx}>
                        <strong>{it.name || it.type || 'Issue'}</strong>
                        <div className="pa-kv small">
                          <div className="key">Type</div><div>{it.type || '—'}</div>
                          <div className="key">Severity</div><div>{it.severity || '—'}</div>
                        </div>
                        {it.description && <div className="pa-hint" style={{marginTop:6}}>{it.description}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pa-result">
                <div className="pa-result-title">💊 Solution</div>
                {treatments.length === 0 ? (
                  <div className="pa-hint" style={{marginTop:6}}>No specific treatments suggested.</div>
                ) : (
                  <ol className="pa-ol">
                    {treatments.map((r, idx) => (
                      <li key={idx}>
                        <strong>{r.action || 'Action'}</strong>
                        <div className="pa-kv small">
                          <div className="key">Priority</div><div>{r.priority || '—'}</div>
                          <div className="key">Timeframe</div><div>{r.timeframe || '—'}</div>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="pa-result">
                <div className="pa-result-title">🛡️ Prevention</div>
                {(preventions.length === 0 && !analysis.nextSteps) ? (
                  <div className="pa-hint" style={{marginTop:6}}>No preventive tips available.</div>
                ) : (
                  <ul className="pa-ul">
                    {preventions.map((r, idx) => (
                      <li key={idx}>{r.action || 'Tip'}</li>
                    ))}
                    {analysis.nextSteps && (
                      <li style={{marginTop:8}}>{analysis.nextSteps}</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          )}

          {(file || analysis) && (
            <div style={{ display:'flex', justifyContent:'center', marginTop: 12 }}>
              <button className="pa-btn secondary" onClick={reset}>Scan Another Plant</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PlantAnalyzer;
