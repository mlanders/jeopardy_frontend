import React from 'react';
import { Skeleton } from 'react-loading-skeleton';

const QuestionView = ({ q }) => {
    return (
        <div>
            <p>Question: {q.question || <Skeleton />}</p>
            <p>Answer: {q.answer || <Skeleton />}</p>
            <hr />
        </div>
    );
};

export default QuestionView;
