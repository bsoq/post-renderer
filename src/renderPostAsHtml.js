import templates from './templates.js';

function renderPostAsHtml(post) {
    return post.isOp ? templates.op(post) : templates.post(post);
}

export default renderPostAsHtml;
