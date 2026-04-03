import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  FileCode2,
  Lock,
  Network,
  Shield,
  TerminalSquare,
} from 'lucide-react'
import { useStore } from '@tanstack/react-store'

import AnalysisGraph from '@/components/AnalysisGraph'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { codeHawkStore } from '@/lib/codehawk-store'

const severityStyles: Record<string, string> = {
  Critical: 'text-red-300 border-red-500/30 bg-red-500/10',
  High: 'text-orange-300 border-orange-500/30 bg-orange-500/10',
  Medium: 'text-yellow-200 border-yellow-500/30 bg-yellow-500/10',
  Low: 'text-blue-200 border-blue-500/30 bg-blue-500/10',
}

function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span className={`border px-2 py-0.5 text-[10px] uppercase tracking-wider ${severityStyles[severity] ?? severityStyles.Low}`}>
      {severity}
    </span>
  )
}

export default function ReportPage() {
  const { latestReport } = useStore(codeHawkStore)
  const [selectedFile, setSelectedFile] = useState<string | null>(latestReport?.files[0]?.path ?? null)

  const report = latestReport
  const selectedFileReport = report?.files.find((file) => file.path === selectedFile) ?? null

  const graphData = useMemo(() => {
    if (!report) {
      return []
    }

    return [
      { subject: 'Security', A: report.overview.securityScore, B: 100, fullMark: 100 },
      { subject: 'Reliability', A: report.overview.reliability, B: 100, fullMark: 100 },
      { subject: 'Maintainability', A: report.overview.maintainability, B: 100, fullMark: 100 },
      {
        subject: 'Coverage',
        A: Math.min(100, Math.round((report.overview.filesWithIssues / Math.max(report.overview.scannedFiles || 1, 1)) * 100)),
        B: 100,
        fullMark: 100,
      },
    ]
  }, [report])

  if (!report) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-lg border border-white/10 bg-zinc-950/60 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">No report</p>
          <h1 className="mt-4 text-3xl font-semibold">Run an analysis first.</h1>
          <p className="mt-3 text-zinc-400">The report dashboard is now tied to the latest completed analysis session.</p>
          <Button asChild className="mt-6 bg-white text-black hover:bg-zinc-200">
            <Link to="/codehawk">Open workspace</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white font-general-sans selection:bg-white/20">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_30%)]" />

      <div className="relative grid min-h-screen lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-white/5 bg-zinc-950/95 lg:border-b-0 lg:border-r">
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-white text-black font-bold">K</div>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em]">KODEHAWK</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Live report</p>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm text-zinc-400">
              <p className="truncate font-mono text-zinc-200">{report.repoUrl}</p>
              <p>Generated: {report.generatedAt ?? 'Unknown'}</p>
            </div>
          </div>

          <div className="p-4 space-y-8">
            <div>
              <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">Navigation</p>
              <Button asChild variant="ghost" className="w-full justify-start text-zinc-300 hover:bg-white/5 hover:text-white">
                <Link to="/codehawk">
                  <ArrowLeft className="mr-3 h-4 w-4" />
                  Back to workspace
                </Link>
              </Button>
            </div>

            <div>
              <p className="mb-3 px-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500">Flagged files</p>
              <div className="space-y-1">
                {report.files.map((file) => (
                  <Button
                    key={file.path}
                    variant="ghost"
                    className={`w-full justify-start rounded-none border-l-2 px-3 text-left text-xs ${
                      selectedFile === file.path
                        ? 'border-white bg-white/5 text-white'
                        : 'border-transparent text-zinc-500 hover:bg-white/5 hover:text-white'
                    }`}
                    onClick={() => setSelectedFile(file.path)}
                  >
                    <div
                      className={`mr-3 h-2 w-2 rounded-full ${
                        file.highestSeverity === 'Critical'
                          ? 'bg-red-500'
                          : file.highestSeverity === 'High'
                            ? 'bg-orange-500'
                            : file.highestSeverity === 'Medium'
                              ? 'bg-yellow-500'
                              : 'bg-blue-500'
                      }`}
                    />
                    <span className="truncate font-mono">{file.path}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="relative p-6 lg:p-10">
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="flex flex-col gap-6 border-b border-white/5 pb-8 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <p className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
                  <Shield className="h-3.5 w-3.5" />
                  Analysis summary
                </p>
                <h1 className="text-4xl font-semibold tracking-tight">{report.repoName}</h1>
                <p className="mt-3 max-w-3xl text-zinc-400">
                  The dashboard is now driven by the backend report payload from the latest analyze or security command.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 text-right md:grid-cols-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Issues</p>
                  <p className="mt-2 text-3xl font-light">{report.overview.totalIssues}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Files</p>
                  <p className="mt-2 text-3xl font-light">{report.overview.filesWithIssues}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Scanned</p>
                  <p className="mt-2 text-3xl font-light">{report.overview.scannedFiles ?? 0}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600">Score</p>
                  <p className="mt-2 text-3xl font-light">{report.overview.securityScore}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { label: 'Security score', value: report.overview.securityScore, icon: Lock },
                  { label: 'Maintainability', value: report.overview.maintainability, icon: TerminalSquare },
                  { label: 'Reliability', value: report.overview.reliability, icon: Network },
                ].map((metric) => (
                  <Card key={metric.label} className="border-white/5 bg-zinc-900/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                        {metric.label}
                        <metric.icon className="h-4 w-4 opacity-40" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end gap-2">
                        <span className="text-5xl font-light">{metric.value}</span>
                        <span className="pb-1 text-sm text-zinc-500">/100</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border border-white/5 bg-zinc-900/40 p-4">
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-500">Metric profile</p>
                <AnalysisGraph data={graphData} />
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="border border-white/5 bg-zinc-900/40 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-sm font-medium tracking-wide">Top findings</h2>
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-zinc-300">
                    {report.overview.critical} critical
                  </Badge>
                </div>
                <div className="space-y-3">
                  {report.highlights.length > 0 ? (
                    report.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-start gap-4 border border-white/5 bg-black/20 p-4">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-red-400" />
                        <p className="text-sm text-zinc-200">{highlight}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-300">
                      <CheckCircle2 className="h-4 w-4" />
                      No high-priority findings in the current report.
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-white/5 bg-zinc-900/40 p-6">
                <h2 className="mb-6 text-sm font-medium tracking-wide">Severity breakdown</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['Critical', report.overview.critical],
                    ['High', report.overview.high],
                    ['Medium', report.overview.medium],
                    ['Low', report.overview.low],
                  ].map(([label, value]) => (
                    <div key={label} className="border border-white/5 bg-black/20 p-4">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{label}</p>
                      <p className="mt-2 text-3xl font-light">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-white/5 bg-zinc-900/30 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">Selected file</p>
                  <h2 className="mt-2 text-2xl font-medium">{selectedFileReport?.path ?? 'Pick a file from the sidebar'}</h2>
                </div>
                {selectedFileReport ? (
                  <Badge variant="outline" className="border-white/10 bg-white/5 text-zinc-200">
                    {selectedFileReport.issueCount} issues
                  </Badge>
                ) : null}
              </div>

              {!selectedFileReport ? (
                <div className="flex items-center gap-3 border border-white/10 bg-black/20 p-6 text-zinc-400">
                  <FileCode2 className="h-5 w-5" />
                  Select a flagged file to inspect concrete findings.
                </div>
              ) : selectedFileReport.issues.length === 0 ? (
                <div className="flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/10 p-6 text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                  No findings for this file in the current report.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedFileReport.issues.map((issue) => (
                    <div key={issue.id} className="border border-white/5 bg-black/20 p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <SeverityBadge severity={issue.severity} />
                          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">{issue.category}</span>
                          <Badge variant="outline" className="border-white/10 bg-white/5 text-zinc-300">
                            {issue.source}
                          </Badge>
                        </div>
                        <span className="font-mono text-xs text-zinc-500">
                          {issue.line ? `line ${issue.line}` : 'line n/a'}
                        </span>
                      </div>

                      <h3 className="text-lg font-medium text-white">{issue.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-zinc-400">{issue.description}</p>

                      {issue.recommendation ? (
                        <div className="mt-4 border border-white/5 bg-white/5 p-4 text-sm text-zinc-300">
                          <p className="mb-1 text-[10px] uppercase tracking-[0.25em] text-zinc-500">Recommendation</p>
                          {issue.recommendation}
                        </div>
                      ) : null}

                      {issue.snippet ? (
                        <div className="mt-4 overflow-hidden border border-white/10 bg-black">
                          <div className="border-b border-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                            Code snippet
                          </div>
                          <pre className="overflow-x-auto p-4 text-xs text-zinc-300">{issue.snippet}</pre>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
