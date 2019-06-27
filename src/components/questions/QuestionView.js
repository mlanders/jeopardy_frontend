import React from 'react';
import { Skeleton } from 'react-loading-skeleton';
import styled from 'styled-components';
import axios from 'axios';

const QuestionView = ({ q }) => {
    // console.log(q);

    const deleteQuestion = e => {
        e.preventDefault();
        console.log(q.id);
        axios
            .delete(
                'https://us-central1-jeopardy-firebase.cloudfunctions.net/jeopardy/deleteQuestion',
                { data: { id: q.id } }
            )
            .then(res => {
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <QuestionContainer>
            <Left>
                <p>Question: {q.question || <Skeleton />}</p>
                <p>Answer: {q.answer || <Skeleton />}</p>
                {q.tags === undefined ? null : (
                    <TagContainer>
                        {q.tags.map((tag, index) => (
                            <Tag key={index}>{`${tag}`}</Tag>
                        ))}
                    </TagContainer>
                )}
            </Left>
            <Right>
                {q.points ? (
                    <span>${q.points}</span>
                ) : (
                    <span>No points set</span>
                )}
            </Right>
            <button className="btn danger" onClick={deleteQuestion}>
                Delete
            </button>
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
