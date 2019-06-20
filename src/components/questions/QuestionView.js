import React from 'react';
import { Skeleton } from 'react-loading-skeleton';
import styled from 'styled-components';

const QuestionView = ({ q }) => {
    return (
        <QuestionContainer>
            <Left>
                <p>Question: {q.question || <Skeleton />}</p>
                <p>Answer: {q.answer || <Skeleton />}</p>
                <TagContainer>
                    {q.tags.map((tag, index) => (
                        <Tag key={index}>{`${tag}`}</Tag>
                    ))}
                </TagContainer>
            </Left>
            <Right>
                {q.points ? (
                    <span>${q.points}</span>
                ) : (
                    <span>No points set</span>
                )}
            </Right>
        </QuestionContainer>
    );
};

export default QuestionView;
const QuestionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e8e9eb;
    padding: 10px 0;
`;

const TagContainer = styled.div`
    display: flex;
    height: 25px;
    align-items: center;
    /* justify-content: center; */
`;
const Tag = styled.span`
    background-color: #5bc0de;
    color: #fff;
    font-size: 1rem;
    padding: 4px 4px;
    border-radius: 4px;
    margin-right: 5px;
`;
const Left = styled.div`
    display: flex;
    flex-direction: column;
`;
const Right = styled.div`
    display: flex;
    flex-direction: column;
`;
