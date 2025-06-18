"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"
import reportServices from "@/services/reportServices"
import { Mail, User, AlertTriangle, Clock, CheckCircle } from "lucide-react"

const ReportCard = ({ report, onActionTaken }) => {
  const [loading, setLoading] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [selectedWarning, setSelectedWarning] = useState("")
  const [actionCompleted, setActionCompleted] = useState(false)

  const warningTemplates = [
    "Inappropriate behavior reported.",
    "Violation of community guidelines.",
    "Spamming or misleading information.",
    "Abusive or offensive language.",
  ]

  const handleTakeAction = async () => {
    if (!selectedWarning) {
      alert("Please select a warning message.")
      return
    }

    setLoading(true)
    try {
      const response = await reportServices.warnUser(report.reported._id, selectedWarning)

      // Set action as completed to show success message
      setActionCompleted(true)

      // After a short delay, call the parent function to move this report to actioned
      setTimeout(() => {
        onActionTaken(report._id, {
          warningMessage: selectedWarning,
          actionType: "warning_sent",
          adminResponse: response,
        })
      }, 2000) // 2 second delay to show the success message
    } catch (error) {
      console.error("Failed to send warning:", error?.response || error.message || error)
      alert("Warning could not be sent. Check console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <Card className="w-full bg-white border-2 border-emerald-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section with Strong Border */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 px-6 py-5 border-b-3 border-emerald-300">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-800">{report.reportType}</h3>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 mt-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{new Date(report.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  actionCompleted
                    ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                    : "bg-amber-100 text-amber-700 border-amber-300"
                }`}
              >
                {actionCompleted ? "COMPLETED" : "PENDING"}
              </div>
            </div>
          </div>

          {/* Content Section with Clear Separation */}
          <div className="p-6 bg-gradient-to-b from-white to-emerald-50/30">
            {/* User Information with Strong Borders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl p-5 border-2 border-emerald-200 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base font-bold text-emerald-700">Reporter</span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800 text-lg">{report.reporter?.name}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {report.reporter?.email}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border-2 border-emerald-300 shadow-sm">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-emerald-200">
                  <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base font-bold text-emerald-800">Reported User</span>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-slate-800 text-lg">{report.reported?.name}</p>
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {report.reported?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Description with Border */}
            <div className="bg-white rounded-xl p-5 border-2 border-emerald-200 shadow-sm mb-6">
              <h4 className="font-bold text-emerald-800 mb-3 pb-2 border-b border-emerald-100">Report Description</h4>
              <p className="text-slate-700 leading-relaxed text-base">{report.description}</p>
            </div>

            {/* Action Section with Strong Border */}
            <div className="bg-white rounded-xl border-2 border-emerald-300 shadow-sm overflow-hidden">
              <div className="bg-emerald-50 px-5 py-3 border-b-2 border-emerald-200">
                <h4 className="font-bold text-emerald-800">Administrative Actions</h4>
              </div>

              <div className="p-5">
                {actionCompleted ? (
                  // Success state - show action taken
                  <div className="space-y-4">
                    <div className="bg-emerald-100 rounded-xl p-5 border-2 border-emerald-400">
                      <div className="flex items-center gap-3 text-emerald-800 mb-3">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-bold text-lg">Warning sent successfully!</span>
                      </div>
                      <p className="text-emerald-700 text-sm">
                        <strong>Message sent:</strong> {selectedWarning}
                      </p>
                    </div>

                    <button
                      disabled
                      className="w-full sm:w-auto px-8 py-4 bg-emerald-600 text-white font-bold rounded-xl cursor-not-allowed opacity-75 border-2 border-emerald-500"
                    >
                      Action Taken
                    </button>
                  </div>
                ) : !showOptions ? (
                  <button
                    onClick={() => setShowOptions(true)}
                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 border-2 border-emerald-500"
                  >
                    Take Action
                  </button>
                ) : (
                  <div className="space-y-5">
                    <div className="bg-emerald-50 rounded-xl p-5 border-2 border-emerald-200">
                      <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-emerald-700" />
                        Select Warning Message
                      </h4>

                      <select
                        value={selectedWarning}
                        onChange={(e) => setSelectedWarning(e.target.value)}
                        className="w-full px-4 py-4 bg-white border-2 border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors font-medium text-slate-700"
                      >
                        <option value="">-- Select a warning message --</option>
                        {warningTemplates.map((template, index) => (
                          <option key={index} value={template}>
                            {template}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={handleTakeAction}
                        disabled={loading || !selectedWarning}
                        className="flex-1 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 border-2 border-emerald-500"
                      >
                        {loading ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending Warning...
                          </span>
                        ) : (
                          "Send Warning"
                        )}
                      </button>

                      <button
                        onClick={() => setShowOptions(false)}
                        className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors border-2 border-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom separator line to clearly distinguish reports */}
      <div className="h-1 bg-gradient-to-r from-transparent via-emerald-300 to-transparent mt-4"></div>
    </div>
  )
}

export default ReportCard
