import React from 'react';

const QuestionView = ({ q }) => {
    return (
        <div>
            <p>Question: {q.question}</p>
            <p>Answer: {q.answer}</p>
            <hr />
        </div>
    );
};

export default QuestionView;
