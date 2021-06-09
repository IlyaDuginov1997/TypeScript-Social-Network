import React from 'react';
import classes from './Post.module.css'

type PostPropsType = {
    message: string
    likesCount: number
}

function Post(props: PostPropsType) {
    return (
        <div className={classes.item}>
            <img src='https://avatarko.ru/img/kartinka/2/Gubka_Bob.jpg' alt=''/>
            {props.message}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>
    );
}

export default Post;