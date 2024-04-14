'use client';

import { useState } from "react";

interface Issue {
    id: number;
    description: string;
    response: string;
    closed: boolean;
}

const ReportedIssues: React.FC = () => {
    const [issues, setIssues] = useState<Issue[]>([
        { id: 1, description: 'Issue 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', response: '', closed: false },
        { id: 2, description: 'Issue 2: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', response: '', closed: false },
        // Add more issues as needed
    ]);

    const handleRespond = (index: number) => {
        const updatedIssues = [...issues];
        updatedIssues[index].closed = true;
        setIssues(updatedIssues);
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedIssues = [...issues];
        updatedIssues[index].response = event.target.value;
        setIssues(updatedIssues);
    };

    return (
        <div className="container mx-auto px-4 py-8 mt-10">
            <h2 className="text-xl font-semibold mb-4">Reported Issues</h2>
            <div className="flex flex-wrap justify-center items-stretch gap-x-6 gap-y-6">
                {issues.map((issue, index) => (
                    <div key={issue.id} className="max-w-xl bg-white rounded-lg shadow-md p-4">
                        <p className="text-lg mb-2">{issue.description}</p>
                        <textarea
                            className="w-full h-20 border border-gray-300 rounded-md px-2 py-1 mb-2"
                            placeholder="Enter response..."
                            value={issue.response}
                            onChange={(event) => handleInputChange(index, event)}
                        ></textarea>
                        <div className="text-right space-x-5">
                            <button
                                className="bg-blue-50 text-blue-600 rounded-full px-6 py-2"
                                onClick={() => handleResponseSubmit(index)}
                            >
                                Send
                            </button>
                            <button
                                className="bg-red-50 text-red-600 rounded-full px-6 py-2"
                                onClick={() => handleRespond(index)}
                            >
                                Close issue
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center text-orange-500"> <button>see more report</button></div>
        </div>
    );
};

export default ReportedIssues;
