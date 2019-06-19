import { css } from 'styled-components';

export const Buttons = css`
    .btn {
        display: inline-block;
        margin: 0 5px;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    }
    .primary {
        color: #fff;
        background-color: #337ab7;
        border-color: #2e6da4;
    }
    .danger{
        color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
    }
    .success{
        color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
    }
    .input{
        display: block;
    width: 100%;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
    }
`;
