import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from 'react';
import reportServices from "@/services/reportServices"; 
import { Mail, User } from 'lucide-react';

const ReportCard = ({ report }) => {
 const [actionTaken, setActionTaken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
const [selectedWarning, setSelectedWarning] = useState("");

 const warningTemplates = [
    "Inappropriate behavior reported.",
    "Violation of community guidelines.",
    "Spamming or misleading information.",
    "Abusive or offensive language.",
  ];

const handleTakeAction = async () => {
   console.log("handleTakeAction clicked");
    if (!selectedWarning) {
      alert("Please select a warning message.");
      return;
    }
  setLoading(true);
  try {
    console.log("Sending warning to:", report.reported._id); // debug
    const response = await reportServices.warnUser(report.reported._id,selectedWarning);
    console.log("Response from warnUser:", response); // debug
    setActionTaken(true); 
    
  } catch (error) {
    console.error("Failed to send warning:", error?.response || error.message || error);
    alert("Warning could not be sent. Check console.");
  } finally {
    setLoading(false);
  }
};



  return (
    <Card className="w-full shadow-md p-4 mb-4 rounded-2xl border border-gray-200">
      <CardContent className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold text-red-600">{report.reportType}</div>
          <span className="text-sm text-gray-500">{new Date(report.createdAt).toLocaleString()}</span>
        </div>

        <div className="text-sm text-gray-800">
          <p><User className="inline w-4 h-4 mr-1 text-gray-500" /> <strong>Reporter:</strong> {report.reporter?.name} ({report.reporter?.email})</p>
          <p><User className="inline w-4 h-4 mr-1 text-gray-500" /> <strong>Reported:</strong> {report.reported?.name} ({report.reported?.email})</p>
        </div>

        <div className="text-gray-700 mt-2">
          <strong>Description:</strong>
          <p className="text-sm text-gray-600 mt-1">{report.description}</p> </div>

                  {  /* {!actionTaken ? (
            <button
              onClick={handleTakeAction}
              disabled={loading}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            >
              {loading ? "Sending Warning..." : "Take Action"}
            </button>
          ) : (
            <p className="mt-3 text-green-600 font-semibold">✅ Warning sent</p>
          )} */}

  {!showOptions ? (
          <button
            onClick={() => setShowOptions(true)}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Take Action
          </button>
        ) : (
          <div className="space-y-3 mt-3">
            <p className="text-sm font-medium">Choose a warning message:</p>

            <select
              value={selectedWarning}
              onChange={(e) => setSelectedWarning(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">-- Select warning --</option>
              {warningTemplates.map((template, index) => (
                <option key={index} value={template}>
                  {template}
                </option>
              ))}
            </select>

            <button
              onClick={handleTakeAction}
              disabled={loading}
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Warning"}
            </button>
                {actionTaken && (
                <p className="text-green-600 font-semibold">✅ Warning sent successfully.</p>
              )}

            <button
              onClick={() => setShowOptions(false)}
              className="px-4 py-2 text-gray-600 underline"
            >
              Cancel
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportCard;
