import React, { useEffect, useState } from "react";

interface Feedback {
    name: string;
    email: string;
    category?: string;
    feedback: string;
    timestamp: string;
}

const FeedbackDashboard: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000/feedback")

        .then((res) => res.json())
        .then((data : Feedback[]) => setFeedbacks(data));
    }, []);
    return(
        <div>
            <h1>Feedback</h1>
            <ul>
                {feedbacks.map((fb) => (
          <li key={fb.timestamp}>
            {fb.name}: {fb.feedback}
          </li>
        ))}
            </ul>
        </div>
    );

};

export default FeedbackDashboard;